import * as jwt from 'jsonwebtoken';
import * as BigCommerce from 'node-bigcommerce';
import { QueryParams, SessionProps } from '../../types';
// import { RedisStore } from './redis';

const { HOST, BIGCOMMERCE_CLIENT_ID, BIGCOMMERCE_CLIENT_SECRET, JWT_KEY } = process.env;

// Create BigCommerce instance
// https://github.com/bigcommerce/node-bigcommerce
const bigcommerce = new BigCommerce({
	logLevel: 'info',
	clientId: BIGCOMMERCE_CLIENT_ID,
	secret: BIGCOMMERCE_CLIENT_SECRET,
	callback: `${HOST}/api/bigcommerce/auth`, //set callback URL
	responseType: 'json',
	headers: { 'Accept-Encoding': '*' },
	apiVersion: 'v3',
});

const bigcommerceSigned = new BigCommerce({
	secret: BIGCOMMERCE_CLIENT_SECRET,
	responseType: 'json',
});

export function getBCAuth(query: QueryParams) {
	return bigcommerce.authorize(query);
}

export function getBCVerify({ signed_payload_jwt }: QueryParams) {
	return bigcommerceSigned.verifyJWT(signed_payload_jwt);
}

export function setSession(session: SessionProps) {
	// save db session
}

export function encodePayload({ ...session }: SessionProps) {
	const contextString = session?.context ?? session?.sub;
	const context = contextString.split('/')[1] || '';

	return jwt.sign({ context }, JWT_KEY, { expiresIn: '24h' });
}

export function decodePayload(encodedContext: string) {
	return jwt.verify(encodedContext, JWT_KEY);
}