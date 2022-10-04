import { useState } from 'react';
import { Flex, Panel, FlexItem, Text } from '@bigcommerce/big-design';
import HtmlWidget from '../widgets/htmlWidget';
import AcumaticaScreenForm from '../forms/acumatica';
import { AcumaticaForm, AcumaticaInstance } from '../../types';

interface CreateAcumaticaScreenProps {
	onFormSubmit(form: AcumaticaForm): void;
	instance: AcumaticaInstance;
}

const CreateAcumaticaScreen = ({ onFormSubmit, instance }: CreateAcumaticaScreenProps) => {
	const [formData, setFormData] = useState<AcumaticaInstance>({
		...instance
	});

	return (
		<Flex>
			<FlexItem paddingRight="xxLarge" style={{width: '400px'}}>
				<Text bold>{I18n('connectYourERPAccount')}</Text>
				<HtmlWidget widget="AuthorizationScreen"></HtmlWidget>
			</FlexItem>
			<FlexItem flexGrow={1}>
				<Panel>
          <AcumaticaScreenForm formData={formData} onSubmit={onFormSubmit} />
				</Panel>
			</FlexItem>
		</Flex>
	);
};

export default CreateAcumaticaScreen;