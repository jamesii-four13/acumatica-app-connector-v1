import { Flex, Panel, FlexItem, Text } from '@bigcommerce/big-design';
import HtmlWidget from '../widgets/htmlWidget';
import LeadGen from '../forms/leadgen';

const LeadGenerationFormScreen = () => {
	return (
		<Flex>
			<FlexItem paddingRight="xxLarge" paddingTop="medium" style={{width: '400px'}}>
				<Text bold>{I18n('existingAcumaticaCustomer')}</Text>
				<HtmlWidget widget="ExistingCustomerScreen"></HtmlWidget>
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Panel>
					<LeadGen />
				</Panel>
			</FlexItem>
		</Flex>
	);
};

export default LeadGenerationFormScreen;