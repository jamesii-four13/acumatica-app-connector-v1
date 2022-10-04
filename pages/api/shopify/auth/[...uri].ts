import { NextApiRequest, NextApiResponse } from 'next';
import Shopify, { ShopifyAuth } from '../../../../lib/shopify/shopify';
import { Redirect } from '@shopify/app-bridge/actions';

export default ShopifyAuth({
	afterAuth: async (req: NextApiRequest, res: NextApiResponse, data) => {
		console.log('AFTER AUTH');
	}
});