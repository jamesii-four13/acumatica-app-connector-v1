import { Message, Button, Flex, Input, Text, Form as StyledForm, FlexItem } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";
import { AcumaticaForm, ApiResponseMessage, StringKeyValue } from '../../types';
import openSignInWindow from '../../utils/OpenSignInWindow';

interface FormProps {
	formData: AcumaticaForm;
	onSubmit(form: AcumaticaForm): void;
}

const FormErrors = {
	erpUrl: '',
	tenant: '',
	storeName: '',
};

const Form = ({ formData, onSubmit }: FormProps) => {
		const { erpUrl, tenant } = formData;
		const [form, setForm] = useState<AcumaticaForm>({
			erpUrl,
			tenant
		});
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [errors, setErrors] = useState<StringKeyValue>({});

		const [message, setMessage] = useState<ApiResponseMessage>({
			active: false,
			message: '',
			status: 'success',
		});
	
		const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				const { name: formName, value } = event.target || {};
				setForm(prevForm => ({ ...prevForm, [formName]: value }));

				// Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
				!value && FormErrors[formName]
						? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
						: setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
		};

		const onReceiveMessage = (event: any) => {
			console.log(event, "EVENT")
		};

		const handleSubmit = (event: FormEvent<EventTarget>) => {
				event.preventDefault();

				setIsLoading(true);

				// If there are errors, do not submit the form
				const hasErrors = Object.keys(errors).length > 0;
				if (hasErrors) return;

				const baseUrl = form.erpUrl.replace(/\/+$/, "");

				const urlParam = new URLSearchParams();
				urlParam.append('erpUrl', baseUrl);
				urlParam.append('tenant', form.tenant);

				onSubmit(form);

				axios
					.get(`/api/getErpUrl?${urlParam.toString()}`)
					.then((result) => {
						if (result.data?.success) {
							const width = 500;
							const height = 600;
							const left = window.screenX + (window.outerWidth - width) / 2;
							const top = window.screenY + (window.outerHeight - height) / 2.5;
							const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;
	
							const validUrl = new URL(result.data.authUrl)
							if (validUrl.searchParams.get("redirect_uri")) {
								localStorage.setItem("ruri", validUrl.searchParams.get("redirect_uri"))
							}

							openSignInWindow({
								url: result.data.authUrl, 
								name: 'Acumatica Sign-in', 
								strWindowFeatures: windowFeatures
							}, onReceiveMessage);
						} else {
							setMessage({
								header: I18n('somethingWentWrong'),
								active: true,
								message: result?.data?.error,
								status: 'error',
							});
						}
					})
					.catch((err) => {
						console.log(err, 'err')
					})
					.finally(() => {
						setIsLoading(false);
					})
		};

		return (
			<>
				{message.active && (
					<Message
						marginBottom="small"
						header={message.header}
						type={message.status}
						messages={[{ text: message.message }]}
						onClose={() => setMessage({ message: '', active: false, status: 'success' })}
					/>
				)}

				<StyledForm onSubmit={handleSubmit}>
					<Flex marginBottom="small">
						<FlexItem flexGrow={1}>
							<Input
								error={errors?.erpUrl}
								label={`${I18n('erpUrl')}*`}
								name="erpUrl"
								required
								value={form.erpUrl}
								onChange={handleChange}
							/>
							<Text color='secondary'>{I18n('exampleErpUrl')}</Text>
						</FlexItem>
					</Flex>
					<Flex marginBottom="small">
						<FlexItem flexGrow={1}>
							<Input
								error={errors?.tenant}
								label={`${I18n('tenantLoginName')}*`}
								name="tenant"
								required
								value={form.tenant}
								onChange={handleChange}
							/>
							<Text color='secondary'>{I18n('inserTenant')}</Text>
						</FlexItem>
					</Flex>
					<Flex>
						<Button type="submit" isLoading={isLoading}>{I18n('authorize')}</Button>
					</Flex>
				</StyledForm>
			</>
		);
};

export default Form;