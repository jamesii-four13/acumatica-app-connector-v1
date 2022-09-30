import Shopify, { ApiVersion } from '@shopify/shopify-api';
import RedisStore from '../redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppInstallations } from '../../lib/shopify/app_installations';

const { HOST, NEXT_PUBLIC_SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, NODE_ENV } = process.env;

let sessionStorage: any;

if (NODE_ENV === 'production') {
	sessionStorage = new RedisStore();
}

const context = {
	API_KEY: NEXT_PUBLIC_SHOPIFY_API_KEY,
	API_SECRET_KEY: SHOPIFY_API_SECRET,
	SCOPES: SHOPIFY_SCOPES.split(','),
	HOST_NAME: `${HOST.replace(/https:\/\//, '')}`,
	IS_EMBEDDED_APP: false,
	API_VERSION: ApiVersion.July22, // all supported versions are available, as well as "unstable" and "unversioned"
	SESSION_STORAGE: NODE_ENV === 'production' ? new Shopify.Session.CustomSessionStorage(
		sessionStorage.storeCallback,
		sessionStorage.loadCallback,
		sessionStorage.deleteCallback,
	) : new Shopify.Session.MemorySessionStorage(),
}

Shopify.Context.initialize(context);

Shopify.Webhooks.Registry.addHandler('APP_UNINSTALLED', {
	path: '/api/webhooks/shopify',
	webhookHandler: async (topic, shop, body) => {
		await AppInstallations.delete(shop);
		console.log('APP_UNINSTALLED handler was executed', topic, shop, body)
	},
});

export default Shopify;

export function ShopifyAuth(config: any) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		const { shopify } = req.query;
		const { host } = req.headers;

		// Provide HOST_NAME here just in case it was not provided by env variable
		// This might occur during the first deploy to Vercel when you don't yet know 
		// what domain your app is being hosted on
		Shopify.Context.initialize({...context, HOST_NAME: host});

		switch(shopify.join('/')) {
			case 'shopify/login':
				return loginRoute(req, res);
			case 'shopify/callback':
				return callbackRoute(req, res, config.afterAuth);
		}
	}
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { shop } = req.query;

		const authRoute = await Shopify.Auth.beginAuth(req, res, shop.toString(), '/api/shopify/auth/shopify/callback', true);

		console.log("New OAuth process begining.")
		res.redirect(authRoute)
	} catch (e) {
		res.writeHead(500);
		if (e instanceof Shopify.Errors.ShopifyError) {
			res.end(e.message);
		} else {
			res.end(`Failed to complete OAuth process: ${e.message}`);
		}
	}
	return;
}

async function callbackRoute(req: NextApiRequest, res: NextApiResponse, afterAuth: Function) {
	let redirectUrl = `/?host=${req.query.host}`;

	try {
		await Shopify.Auth.validateAuthCallback(
			req,
			res,
			req.query
		);

		const currentSession = await Shopify.Utils.loadCurrentSession(req, res);

		if (typeof afterAuth === 'function') {
			redirectUrl = await afterAuth(req, res, currentSession) || redirectUrl;
		}
		
		res.writeHead(302, { 'Location': redirectUrl });
		res.end();
	} catch (e) {
		res.writeHead(500);

		if (e instanceof Shopify.Errors.ShopifyError) {
			res.end(e.message);
		} else {
			res.end(`Failed to complete OAuth process: ${e.message}`);
		}
	}
}

