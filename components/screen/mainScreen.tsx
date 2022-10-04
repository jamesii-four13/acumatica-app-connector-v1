import { Flex, FlexItem, Button, Box } from '@bigcommerce/big-design';
import HtmlWidget from '../widgets/htmlWidget';
import { Text, Loader } from '../global';

interface MainScreenProps {
	onCallback: Function;
	isLoading?: boolean;
}

const MainScreen = ({ onCallback, isLoading }: MainScreenProps) => {
	return (
		<Flex alignItems="center">
			<FlexItem paddingRight="xxLarge" style={{width: '400px'}}>
				<Text bold>{isLoading ? I18n('verifying') : I18n('connectToAcumatica')}</Text>
				{!isLoading && <HtmlWidget widget="MainScreen"></HtmlWidget>}
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Box 
					border="box" 
					borderRadius="normal"
  				padding="medium"
					shadow="raised"
				>
					<Flex justifyContent="flex-end">
						{isLoading ? <Loader size="small" /> : 
							<FlexItem>
								<Button variant="secondary" onClick={() => onCallback(0)}>{I18n('no')}</Button>
								<Button variant="primary" onClick={() => onCallback(1)}>{I18n('yes')}</Button>
							</FlexItem>
						}
					</Flex>
				</Box>
			</FlexItem>
		</Flex>
	);
};

export default MainScreen;