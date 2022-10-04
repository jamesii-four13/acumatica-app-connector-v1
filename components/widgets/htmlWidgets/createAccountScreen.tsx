import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const CreateAccountScreenWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('createAccountScreen')}</Text>
		</>
	)
}

export default CreateAccountScreenWidget;
