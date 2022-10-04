import { ProgressCircle } from "@bigcommerce/big-design";
import { Spinner } from '@shopify/polaris';
import { useContext } from "react";
import { GlobalContext } from '../../context/app';

const components = {
	shopify: Spinner,
	bigcommerce: ProgressCircle,
};

interface LoaderProps {
	size?: string;
};

const Loader = ({ size }: LoaderProps) => {
	const { app } = useContext(GlobalContext);

	const StyledComponent = components[app];

	return (
		<>
			<StyledComponent size={size} />   
		</>
	);
};

export { Loader };
