import { Panel } from "@bigcommerce/big-design";
import { Card as CardComponent } from '@shopify/polaris';
import { useContext } from "react";
import { GlobalContext } from '../../context/app';

const components = {
	shopify: CardComponent,
	bigcommerce: Panel,
};
interface CardProps {
	children: React.ReactNode;
	sectioned?: boolean;
};

const Card = ({ children, sectioned }: CardProps) => {
	const { app } = useContext(GlobalContext);

	const StyledComponent = components[app];

	return (
		<>
			<StyledComponent sectioned={sectioned}> {children} </StyledComponent>      
		</>
	);
};

export { Card };
