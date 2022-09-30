import { I18n } from '../utils/I18n';
import { GlobalContext } from '../context/app';
import { Card } from '../components/global';
import { useContext } from 'react';

global.I18n = I18n;

const Index = () => {
  const { app, shop, locale } = useContext(GlobalContext);

	return (
		<>
			<div style={{padding: '50px 100px'}}>
				<Card>
					{`APP: ${app} \n STORE: ${shop} \n STORE: ${locale}`}
					<p>{I18n('mainScreenQuestion')}</p>
				</Card>
			</div>
		</>
	);
};

export default Index;