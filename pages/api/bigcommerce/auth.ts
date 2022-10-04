import { NextApiRequest, NextApiResponse } from 'next';
import { getBCAuth, setSession, encodePayload } from '../../../lib/bigcommerce/auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Authenticate the app on install
		const session = await getBCAuth({
			...req.query,
		});

		const encodedContext = encodePayload(session); // Signed JWT to validate/ prevent tampering

		await setSession(session);
		
		res.redirect(302, `/?context=${encodedContext}&app=bigcommerce&shop=${session.context.replace('/', '-')}.mybigcommerce.com`);
	} catch (error) {
		const { message, response } = error;
		res.status(response?.status || 500).json({ message });
	}
}