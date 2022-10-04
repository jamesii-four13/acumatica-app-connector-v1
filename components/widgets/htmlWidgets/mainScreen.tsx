import { Text } from '../../global';
import { useContext } from "react";
import { GlobalContext } from '../../../context/app';

const MainScreenWidget = () => {
	const { app } = useContext(GlobalContext);

	return (
		<>
			<Text color={app === 'bigcommerce' ? 'secondary60' : 'subdued'}>{I18n('mainScreenQuestion')}</Text>
		</>
	)
}

export default MainScreenWidget;
