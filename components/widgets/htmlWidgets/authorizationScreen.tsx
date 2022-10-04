import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const AuthorizationScreenWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('authorizationScreen')}</Text>
		</>
	)
}

export default AuthorizationScreenWidget;
