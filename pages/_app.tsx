import type { AppProps } from 'next/app';
import { useRouter } from 'next/router'
import SessionProvider from '../context/session';
import EmbeddedApp from "../components/shopify/EmbeddedApp";
import { useEffect, useState } from 'react';
import { GlobalContext } from '../context/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const BigcommerceComponent = () => <SessionProvider><Component {...pageProps} /></SessionProvider>;
	const ShopifyComponent = () => <EmbeddedApp><Component {...pageProps} /></EmbeddedApp>;
	const DefaultComponent = () => <>Loading...</>;

	const [app, setApp] = useState<string>();
	const [shop, setShop] = useState<string>();
	const { query } = useRouter();

	useEffect(() => {
		if (query.shop) {
			if (query.shop.indexOf('bigcommerce') > -1) {
				setApp('bigcommerce')
			} else if (query.shop.indexOf('shopify') > -1) {
				setApp('shopify')
			} else {
				setApp('default')
			}

			setShop(query.shop.toString())
		}
	}, [query.shop]);

	function SpecificComponent({ app = 'default'}) {
		const components = {
			bigcommerce: BigcommerceComponent,
			shopify: ShopifyComponent,
			default: DefaultComponent
		};

		const SpecificLayout = components[app];
		
		return <SpecificLayout shop={shop} />;
	}

	return (
		<>
			<GlobalContext.Provider value={{ shop, app, locale: /*temporary*/ app === 'shopify' ? 'de' : 'en' }}>
				<SpecificComponent app={app} />
			</GlobalContext.Provider>
		</>
	)
};

export default MyApp;