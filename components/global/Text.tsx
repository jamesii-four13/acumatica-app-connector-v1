import { Text as TextBigcommerceComponent } from "@bigcommerce/big-design";
import { Text as TextShopifyComponent } from '@shopify/polaris';
import { useContext } from "react";
import { GlobalContext } from '../../context/app';

const components = {
	shopify: TextShopifyComponent,
	bigcommerce: TextBigcommerceComponent,
};

interface TextProps {
	children: React.ReactNode;
	bold?: boolean;
	color?: string;
};

const Text = ({ children, bold, color }: TextProps) => {
	const { app } = useContext(GlobalContext);

	const StyledComponent = components[app];

	return (
		<>
			<StyledComponent 
				fontWeight={bold ? 'bold' : 'regular'}
				bold={bold}
				color={color}
			>
				{children} 
			</StyledComponent>      
		</>
	);
};

export { Text };
