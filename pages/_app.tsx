import type { AppProps } from 'next/app';
import { useRouter } from 'next/router'
import SessionProvider from '../context/session';
import EmbeddedApp from "../components/shopify/EmbeddedApp";
import { useEffect, useState } from 'react';
import { GlobalContext } from '../context/app';
import { I18n } from '../utils/I18n';
import { GlobalStyles } from '@bigcommerce/big-design';

enum AppTypeEnum {
	shopify,
	default,
	bigcommerce
}

global.I18n = I18n;

const MyApp = ({ Component, pageProps }: AppProps) => {
	const BigcommerceComponent = () => <SessionProvider><GlobalStyles /><Component {...pageProps} /></SessionProvider>;
	const ShopifyComponent = () => <EmbeddedApp><Component {...pageProps} /></EmbeddedApp>;
	const DefaultComponent = () => <>Loading...</>;

	const [app, setApp] = useState<keyof typeof AppTypeEnum>();
	const [shop, setShop] = useState<string>();
	const { query } = useRouter();

	useEffect(() => {
		console.log(query.shop, 'query.shop')
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

	function SpecificComponent({ app = 'default'} : { app: keyof typeof AppTypeEnum }) {
		const components = {
			bigcommerce: BigcommerceComponent,
			shopify: ShopifyComponent,
			default: DefaultComponent
		};

		const SpecificLayout = components[app];
		
		return <SpecificLayout />;
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