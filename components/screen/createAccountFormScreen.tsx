import { Flex, Panel, FlexItem, Text } from '@bigcommerce/big-design';
import HtmlWidget from '../widgets/htmlWidget';
import CreateAccount from '../forms/createAcount';

const CreateAccountFormScreen = () => {
	return (
		<Flex>
			<FlexItem paddingRight="xxLarge" paddingTop="medium" style={{width: '400px'}}>
				<Text bold>{I18n('createAnAccount')}</Text>
				<HtmlWidget widget="CreateAccountScreen"></HtmlWidget>
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Panel>
					<CreateAccount />
				</Panel>
			</FlexItem>
		</Flex>
	);
};

export default CreateAccountFormScreen;