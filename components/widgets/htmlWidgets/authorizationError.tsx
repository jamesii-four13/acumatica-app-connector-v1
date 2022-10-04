import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const AuthorizationErrorWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('authorizationErrorWidget-p1')}</Text>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}> 
				<span dangerouslySetInnerHTML={{__html: I18n('authorizationErrorWidget-p2', { link: 'https://www.acumatica.com/contact-acumatica/' })}} />
			</Text>
		</>
	)
}

export default AuthorizationErrorWidget;
