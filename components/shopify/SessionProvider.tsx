import { useEffect } from 'react';
import {useRouter} from "next/router"
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function SessionProvider({children}) {
	const app = useAppBridge();
	
	useEffect(() => {
		const fetchSessionToken = async () => {
			const session = await getSessionToken(app);
			
			if (!session) {
				window.location.pathname = `/api/shopify/auth/shopify/login`;
			}
		};

		fetchSessionToken()
	}, []);
	
	return <>{children}</>;
}
