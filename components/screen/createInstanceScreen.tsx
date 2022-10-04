import { useState } from 'react';
import { Flex, Panel, FlexItem, Button, Text } from '@bigcommerce/big-design';
import HtmlWidget from '../widgets/htmlWidget';
import CredentialsScreenForm from '../forms/credentials';
import { CredentialForm, AcumaticaInstance } from '../../types';

interface CreateInstanceScreenProps {
	onFormNext(form: CredentialForm): void;
	instance: AcumaticaInstance;
}

const CreateInstanceScreen = ({ onFormNext, instance }: CreateInstanceScreenProps) => {

	const [formData, setFormData] = useState<CredentialForm>({
	  ...instance,
	});

	return (
		<Flex>
			<FlexItem paddingRight="xxLarge" style={{width: '400px'}}>
				<Text bold>{I18n('connectYourERPAccount')}</Text>
				<HtmlWidget widget="AuthorizationScreen"></HtmlWidget>
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Panel>
					<CredentialsScreenForm formData={formData} onSubmit={onFormNext} />
				</Panel>
			</FlexItem>
		</Flex>
	);
};

export default CreateInstanceScreen;