import { NextApiRequest, NextApiResponse } from 'next';
import { getBCVerify, decodePayload } from '../../../lib/bigcommerce/auth';

export default async function load(req: NextApiRequest, res: NextApiResponse) {
	try {
		const data = await getBCVerify(req.query);

		res.redirect(302, `/?app=bigcommerce&shop=${data.sub.replace('/', '-')}.mybigcommerce.com`);
	} catch (error) {
		const { message, response } = error;
		res.status(response?.status || 500).json({ message });
	}
}