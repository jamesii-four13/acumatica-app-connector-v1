import { Message, Button, Flex, Input, Form as StyledForm, FlexItem } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ApiResponseMessage, LeadGenForm, StringKeyValue } from '../../types';
// import { submitLeadExistingCustomer } from '../../lib/acumatica/';

const FormErrors = {
	firstName: '',
	lastName: '',
	jobTitle: '',
	email: '',
	businessName: '',
	valueAtRisk: ''
};

const Form = () => {
  const [message, setMessage] = useState<ApiResponseMessage>({
		active: false,
		header: null,
		status: 'success',
		message: ''
	});

	const clear = () => {
		setMessage({ header: null, message: '', active: false, status: 'success' });
	}

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [form, setForm] = useState<LeadGenForm>({
		firstName: '',
		lastName: '',
		jobTitle: '',
		email: '',
		businessName: '',
		valueAtRisk: '',
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

	const handleSubmit = async (event: FormEvent<EventTarget>) => {
			clear();

			event.preventDefault();

			// If there are errors, do not submit the form
			const hasErrors = Object.keys(errors).length > 0;

			if (hasErrors) return;

			setIsLoading(true);
		
			// const data = await submitLeadExistingCustomer(form);

			// setMessage(data.message);
			setIsLoading(false);
	};

	return (
		<>
			{message.active && (
				<Message
					marginBottom="small"
					header={message.header}
					type={message.status}
					messages={[{ text: message.message }]}
					onClose={clear}
				/>
			)}

			<StyledForm onSubmit={handleSubmit}>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1} paddingRight="xSmall">
						<Input
							error={errors?.firstName}
							label={`${I18n('firstname')}*`}
							name="firstName"
							required
							value={form.firstName}
							onChange={handleChange}
						/>
					</FlexItem>
					<FlexItem flexGrow={1} paddingLeft="xSmall">
						<Input
							error={errors?.lastName}
							label={`${I18n('lastname')}*`}
							name="lastName"
							required
							value={form.lastName}
							onChange={handleChange}
						/>
					</FlexItem>
				</Flex>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1} paddingRight="xSmall">
						<Input
							error={errors?.jobTitle}
							label={`${I18n('jobTitle')}*`}
							name="jobTitle"
							required
							value={form.jobTitle}
							onChange={handleChange}
						/>
					</FlexItem>
					<FlexItem flexGrow={1} paddingLeft="xSmall">
						<Input
							error={errors?.email}
							label={`${I18n('email')}*`}
							name="email"
							type="email"
							required
							value={form.email}
							onChange={handleChange}
						/>
					</FlexItem>
				</Flex>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1} paddingRight="xSmall">
						<Input
							error={errors?.businessName}
							label={`${I18n('businessName')}*`}
							name="businessName"
							required
							value={form.businessName}
							onChange={handleChange}
						/>
					</FlexItem>
					<FlexItem flexGrow={1} paddingLeft="xSmall">
						<Input
							error={errors?.valueAtRisk}
							label="VAR"
							name="var"
							value={form.valueAtRisk}
							onChange={handleChange}
						/>
					</FlexItem>
				</Flex>
				<Flex>
					<Button isLoading={isLoading} type="submit">{I18n('submit')}</Button>
				</Flex>
			</StyledForm>
		</>
	);
};

export default Form;