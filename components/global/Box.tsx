import { Box as BoxComponent } from "@bigcommerce/big-design";
// import { Box } from '@shopify/polaris';
import { useContext } from "react";
import { GlobalContext } from '../../context/app';

const components = {
	shopify: 'div',
	bigcommerce: BoxComponent,
};

interface BoxProps {
	children: React.ReactNode;
}

const Box = ({ children }: BoxProps) => {
	const { app } = useContext(GlobalContext);

	const StyledComponent = components[app];

	return (
		<>
			<StyledComponent> {children} </StyledComponent>      
		</>
	);
};

export { Box };
