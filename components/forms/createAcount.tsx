import { Message, Button, Flex, Input, Select, Form as StyledForm, FlexItem } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ApiResponseMessage, CreateAccountForm, StringKeyValue } from '../../types';
// import { submitLeadnewCustomer } from '../../lib/acumatica/';
import countryList from "../../constants/countries.json";

const FormErrors = {
	firstName: '',
	lastName: '',
	jobTitle: '',
	email: '',
	phoneNumber: '',
	businessName: '',
	valueAtRisk: '',
	country: '',
	consideringPurchase: false
};

const Form = () => {
	const countries = countryList.map((e) => {
		return { content: e.name, value: e.name };
	});

	const clear = () => {
		setMessage({ header: null, message: '', active: false, status: 'success' });
	};

  const [message, setMessage] = useState<ApiResponseMessage>({
		active: false,
		header: null,
		status: 'success',
		message: ''
	});

	const [form, setForm] = useState<CreateAccountForm>({
		firstName: '',
		lastName: '',
		jobTitle: '',
		email: '',
		businessName: '',
    phoneNumber: '',
    country: 'United States',
		consideringPurchase: false,
		financialSoftwareNeeds: ''
	});

	const [errors, setErrors] = useState<StringKeyValue>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name: formName, value } = event.target || {};
		setForm(prevForm => ({ ...prevForm, [formName]: value }));

		// Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
		!value && FormErrors[formName]
			? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
				: setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
	};

	const handleSubmit = async(event: FormEvent<EventTarget>) => {
			event.preventDefault();

			// If there are errors, do not submit the form
			const hasErrors = Object.keys(errors).length > 0;
			if (hasErrors) return;

			setIsLoading(true);

			// const data = await submitLeadnewCustomer(form);

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
							error={errors?.phoneNumber}
							label={`${I18n('phoneNumber')}*`}
							name="phoneNumber"
							required
							value={form.phoneNumber}
							onChange={handleChange}
						/>
					</FlexItem>
					<FlexItem flexGrow={1} paddingLeft="xSmall">
						<Input
							error={errors?.businessName}
							label={`${I18n('businessName')}*`}
							name="businessName"
							required
							value={form.businessName}
							onChange={handleChange}
						/>
					</FlexItem>
				</Flex>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1} paddingRight="xSmall"  style={{width: '50%'}}>
						<Select
							error={errors?.country}
							filterable={true}
							label={`${I18n('countryOfBusiness')}*`}
							maxHeight={300}
							onOptionChange={(country) => setForm({ ...form, country })}
							options={countries}
							value={form.country}
							required
						/>
					</FlexItem>
					<FlexItem flexGrow={1}>
						<Select
							error={errors?.consideringPurchase}
							filterable={true}
							label={`${I18n('consideringPurchase')}`}
							maxHeight={300}
							onOptionChange={(consideringPurchase) => setForm({ ...form, consideringPurchase })}
							options={[
								{ value: true, content: 'Yes' },
								{ value: false, content: 'No' },
							]}
							value={form.consideringPurchase}
							required
						/>
					</FlexItem>
				</Flex>
				<Flex marginBottom="small">
					<FlexItem flexGrow={1}>
						<Input
								error={errors?.financialSoftwareNeeds}
								label={`${I18n('financialSoftwareNeeds')}*`}
								name="financialSoftwareNeeds"
								value={form.financialSoftwareNeeds}
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