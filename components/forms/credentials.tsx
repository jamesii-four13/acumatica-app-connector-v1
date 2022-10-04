import { Flex, Input, Panel, FlexItem, Button, Form as StyledForm } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CredentialForm, StringKeyValue } from '../../types';

interface FormProps {
	formData: CredentialForm;
	onSubmit(form: CredentialForm): void;
}

const FormErrors = {
	storeName: 'Store name is required', 
	storeAdminPath: 'Store admin path is required', 
	apiPath: 'API path is required', 
	clientId: 'Client ID is required', 
	accessToken: 'Access token is required', 
	webdavPath: 'WebDAV path is required',
	webdavUsername: 'WebDAV username is required', 
	webdavPassword: 'WebDAV password is required' 
};

const Form = ({ formData, onSubmit }: FormProps) => {
		const { 
			storeName,
			storeAdminPath,
			apiPath,
			clientId,
			accessToken,
			webdavPath,
			webdavUsername,
			webdavPassword
		} = formData;

		const [form, setForm] = useState<CredentialForm>({ 
			storeName, 
			storeAdminPath, 
			apiPath, 
			clientId, 
			accessToken, 
			webdavPath, 
			webdavUsername, 
			webdavPassword
		});

		const [errors, setErrors] = useState<StringKeyValue>({});

		const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				const { name: formName, value } = event.target || {};
				setForm(prevForm => ({ ...prevForm, [formName]: value }));

				// Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
				!value && FormErrors[formName]
						? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
						: setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
		};

		const handleSubmit = (event: FormEvent<EventTarget>) => {
				event.preventDefault();

				// If there are errors, do not submit the form
				const hasErrors = Object.keys(errors).length > 0;
				if (hasErrors) return;

				onSubmit(form);
		};

		return (
			<StyledForm onSubmit={handleSubmit}>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1} paddingRight="xSmall">
						<Input
							error={errors?.name}
							label={`${I18n('storeName')}*`}
							name="storeName"
							required
							value={form.storeName}
							onChange={handleChange}
						/>
					</FlexItem>
					<FlexItem flexGrow={1} paddingLeft="xSmall">
						<Input
							error={errors?.storeAdminPath}
							label={`${I18n('storeAdminPath')}*`}
							name="storeAdminPath"
							required
							value={form.storeAdminPath}
							onChange={handleChange}
						/>
					</FlexItem>
				</Flex>
				
				<Panel header="REST Settings">
					<Flex marginBottom="small">
						<FlexItem flexGrow={1} paddingRight="xSmall">
							<Input
								error={errors?.apiPath}
								label={`${I18n('apiPath')}*`}
								name="apiPath"
								required
								value={form.apiPath}
								onChange={handleChange}
							/>
						</FlexItem>
						<FlexItem flexGrow={1} paddingLeft="xSmall">
							<Input
								error={errors?.clientId}
								label={`${I18n('clientId')}*`}
								name="clientId"
								required
								value={form.clientId}
								onChange={handleChange}
							/>
						</FlexItem>
					</Flex>
					<Flex marginBottom="small" style={{width: '50%'}}>
						<FlexItem flexGrow={1}>
							<Input
									error={errors?.accessToken}
									label={`${I18n('accessToken')}*`}
									name="accessToken"
								required
								value={form.accessToken}
								onChange={handleChange}
							/>
						</FlexItem>
					</Flex>
				</Panel>
				
				<Panel header="WebDAV Settings">
					<Flex marginBottom="small">
						<FlexItem flexGrow={1} paddingRight="xSmall">
							<Input
								error={errors?.webdavPath}
								label={`${I18n('webdavPath')}*`}
								name="webdavPath"
								required
								value={form.webdavPath}
								onChange={handleChange}
							/>
						</FlexItem>
						<FlexItem flexGrow={1} paddingLeft="xSmall">
							<Input
								error={errors?.webdavUsername}
								label={`${I18n('webdavUsername')}*`}
								name="webdavUsername"
								required
								value={form.webdavUsername}
								onChange={handleChange}
							/>
						</FlexItem>
					</Flex>
					<Flex marginBottom="small" style={{width: '50%'}}>
						<FlexItem flexGrow={1}>
							<Input
								error={errors?.webdavPassword}
								label={`${I18n('webdavPassword')}*`}
								name="webdavPassword"
								required
								value={form.webdavPassword}
								type="password"
								onChange={handleChange}
							/>
						</FlexItem>
					</Flex>
				</Panel>
				<Button variant="primary" >{I18n('next')}</Button>
			</StyledForm>
		);
};

export default Form;