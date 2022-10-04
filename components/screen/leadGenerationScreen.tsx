import { Flex, Panel, FlexItem, Button, Text } from '@bigcommerce/big-design';

interface LeadGenerationScreenProps {
	onCallback: Function;
}

const LeadGenerationScreen = ({ onCallback }: LeadGenerationScreenProps) => {
	return (
		<Flex alignItems="center">
			<FlexItem paddingRight="xxLarge" style={{width: '400px'}}>
				<Text bold>{I18n('areYouExistingAcumatica')}</Text>
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Panel>
					<Flex justifyContent="flex-end">
						<FlexItem>
							<Button variant="secondary" onClick={() => onCallback(0)}>{I18n('no')}</Button>
							<Button variant="primary" onClick={() => onCallback(1)}>{I18n('yes')}</Button>
						</FlexItem>
					</Flex>
				</Panel>
			</FlexItem>
		</Flex>
	);
};

export default LeadGenerationScreen;