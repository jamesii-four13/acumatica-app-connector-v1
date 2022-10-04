
import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const AuthorizedScreenWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('authorizedScreen-p1')}</Text>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('authorizedScreen-p2')}</Text>
		</>
	)
}

export default AuthorizedScreenWidget;
