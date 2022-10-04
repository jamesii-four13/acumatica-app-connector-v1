
declare var I18n;

import { Box, Button, Flex, Tabs } from '@bigcommerce/big-design';
import { BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import Logo from '../icons/logo';

const Header = () => {	
	return (
		<Flex justifyContent="space-between">
			<Box marginBottom="large">
				<Logo />
			</Box>
			<Button variant="subtle" iconLeft={<BaselineHelpIcon />}>{I18n('help')}</Button>
		</Flex>
	);
};

export default Header;