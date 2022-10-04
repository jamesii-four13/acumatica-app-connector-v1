import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const ExistingCustomerScreenWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('existingCustomerScreen-p1')}</Text>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('existingCustomerScreen-p2')}</Text>
		</>
	)
}

export default ExistingCustomerScreenWidget;
