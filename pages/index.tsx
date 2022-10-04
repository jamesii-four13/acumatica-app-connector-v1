import { GlobalContext } from '../context/app';
import { Card, Box } from '../components/global';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@bigcommerce/big-design';
import { ArrowBackIcon } from '@bigcommerce/big-design-icons';

import MainScreen from "../components/screen/mainScreen";
import InstancesScreen from "../components/screen/instancesScreen";
import LeadGenerationScreen from "../components/screen/leadGenerationScreen";
import LeadGenerationFormScreen from "../components/screen/leadGenerationFormScreen";
import CreateAccountFormScreen from "../components/screen/createAccountFormScreen";
import CreateInstanceScreen from "../components/screen/createInstanceScreen";
import CreateAcumaticaScreen from "../components/screen/createAcumaticaScreen";
import { CredentialForm, AcumaticaForm, AcumaticaInstance } from '../types';

const Index = () => {
	const { app, shop, locale } = useContext(GlobalContext);

	const [disableBackButton, setDisableBackButton] = useState<boolean>(false);	
	const [screen, setScreen] = useState<string[]>([]);
	const [instances, setInstances] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [instance, setInstance] = useState<AcumaticaInstance>();
	
	const isVisible = (widget: string): boolean => screen.length > 0 && screen.indexOf(widget) === screen.length - 1;

	const goBack = () => {
		const popScreen = screen.pop();
		
		if (popScreen === 'new-instance') {
			setInstance({
				storeName: 'Test',
				storeAdminPath: '',
				apiPath: '',
				clientId: '',
				accessToken: '',
				webdavPath: '',
				webdavUsername: '',
				webdavPassword: '',
				erpUrl: '',
				tenant: '',
			})
		}

		setScreen([...screen]);
	};

	const onCallbackMain = (answer: boolean) => {
		if (answer) {
			setScreen([...screen, 'new-instance']);
		} else {
			setScreen([...screen, 'lead-gen']);
		}
	};

	const onCallbackLead = (answer: boolean) => {
		if (answer) {
			setScreen([...screen, 'ac-lead-gen']);
		} else {
			setScreen([...screen, 'ac-new-account']);
		}
	};

	const onFormNextCredentials = (form: CredentialForm) => {
		setScreen([...screen, 'new-acumatica']);

		setInstance({
			...instance,
			...form
		});
	};

	const onFormInstanceSubmit = (form: AcumaticaForm) => {
		setInstance({
			...instance,
			...form
		});
	};

	const onNewAcumatica = () => {
		setScreen([...screen, 'new-instance']);
	};


	return (
		<>
			<div style={{padding: '50px 100px'}}>
				<Card sectioned>
					{screen.length > 0 && <Button onClick={goBack} disabled={disableBackButton} iconLeft={<ArrowBackIcon />} variant="secondary">{I18n('goBack')}</Button>}

					<Box>
						{instances.length > 0 && !screen.length && <InstancesScreen instances={instances} onNewAcumatica={onNewAcumatica} />}
						
						{instances.length <= 0 && !screen.length && <MainScreen isLoading={isLoading} onCallback={onCallbackMain} />}

						{isVisible('lead-gen') && <LeadGenerationScreen onCallback={onCallbackLead} />}

						{isVisible('ac-lead-gen') && <LeadGenerationFormScreen />}

						{isVisible('ac-new-account') && <CreateAccountFormScreen />}

						{isVisible('new-instance') && <CreateInstanceScreen instance={instance} onFormNext={onFormNextCredentials} />}

						{isVisible('new-acumatica') && <CreateAcumaticaScreen instance={instance} onFormSubmit={onFormInstanceSubmit} />}
					</Box>
				</Card>
			</div>
		</>
	);
};

export default Index;