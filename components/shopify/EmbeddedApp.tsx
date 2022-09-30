import { useEffect, useState } from 'react';
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import PolarisProvider from './PolarisProvider';
import SessionProvider from './SessionProvider';
import ApolloProvider from './ApolloProvider';


export default function EmbeddedApp({children}) {
	const { NEXT_PUBLIC_SHOPIFY_API_KEY } = process.env;

	const [host, setHost] = useState<string>();

	useEffect(() => {
		const url = new URL(window.location.href)
		const _host = url.searchParams.get('host');
		const _shop = url.searchParams.get('shop');

		// If host is not set, than the page is being loaded outside of App Bridge
		// so we should proceed with starting OAuth
		if (_host) {
			setHost(_host);
		} else {
			window.location.pathname = `/api/shopify/auth/shopify/login?shop=${_shop}`;
		}
		
	}, [])

	return <> {
		host && <>
			<PolarisProvider>
				<AppBridgeProvider 
					config={{ 
						apiKey: NEXT_PUBLIC_SHOPIFY_API_KEY,
						host,
						forceRedirect: true
					}}>
					<SessionProvider>
						<ApolloProvider>
							{children}
						</ApolloProvider>
					</SessionProvider>
				</AppBridgeProvider>
			</PolarisProvider>
		</>
		}
	</>
}