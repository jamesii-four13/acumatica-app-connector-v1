import { GlobalContext } from '../context/app';
import { Card, Box } from '../components/global';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

import MainScreen from "../components/screen/mainScreen";

const Index = () => {
	const { app, shop, locale } = useContext(GlobalContext);

	const [disableBackButton, setDisableBackButton] = useState<boolean>(false);	
	const [screen, setScreen] = useState<string[]>([]);
	const [instances, setInstances] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const onCallbackMain = (answer: boolean) => {
		if (answer) {
			setScreen([...screen, 'new-instance']);
		} else {
			setScreen([...screen, 'lead-gen']);
		}
	};

	return (
		<>
			<div style={{padding: '50px 100px'}}>
				<Card sectioned>
					<Box>
					{instances.length <= 0 && !screen.length && <MainScreen isLoading={isLoading} onCallback={onCallbackMain} />}
					</Box>
				</Card>
			</div>
		</>
	);
};

export default Index;