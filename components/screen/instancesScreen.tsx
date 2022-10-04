import { Flex, Table, Message, InlineMessage, Modal, Button, Text } from '@bigcommerce/big-design';
import { useState } from 'react';
import { Instance } from '../../types';
import HtmlWidget from '../widgets/htmlWidget';

interface InstancesProps {
	instances: Instance[];
	onNewAcumatica: Function
}

const Index = ({ instances, onNewAcumatica }: InstancesProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAcumatica, setSelectedAcumatica] = useState<Instance>(null);
	
  const [message, setMessage] = useState({
    active: false,
    message: '',
    status: 'success',
  });

	const deleteAcumatica = () => {
		
	}
	
	return (
		<>
			{message.active && (
				<Message
					type={message.status === 'success' ? 'success' : 'error'}
					messages={[{ text: message.message }]}
					onClose={() => setMessage({ message: '', active: false, status: 'success' })}
				/>
			)}
			<Flex flexDirection="column">
				<InlineMessage
					type="info"
					marginBottom="small"
					messages={[{ 
						text: I18n('acumaticaListAccount')
					}]}
					actions={[
						{ text: I18n('newAcumatica'), onClick: () => onNewAcumatica() },
					]}
				/>
				<Table
					columns={[
						{
							header: I18n('storeName'),
							hash: 'sku',
							render: ({ storeName }) => storeName,
						},
						{ header: I18n('acumaticaURL'), hash: 'name', render: ({ erp_url }) => erp_url },
						{ header: I18n('tenant'), hash: 'tenant', render: ({ client_id }) => client_id.split('@')[1] },
						{ header: I18n('action'), hash: 'name', render: (instance) => {
							return <>
								<Button>{I18n('reinitialize')}</Button>

								<Button 
									actionType="destructive" 
									onClick={() => {
									setSelectedAcumatica(instance);
									setIsOpen(true);
								}}>
									{I18n('delete')}
								</Button>
							</>
						}},
					]}
					items={instances}
					stickyHeader
				/>
			</Flex>
			
			<Modal
        actions={[
          {
            text: I18n('cancel'),
            variant: 'subtle',
            onClick: () => setIsOpen(false),
          },
          { text: 'Apply', onClick: () => setIsOpen(false) },
        ]}
        closeOnClickOutside={false}
        closeOnEscKey={true}
        header={I18n('confirmDelete')}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="dialog"
      >
        <Text>
					<span dangerouslySetInnerHTML={{__html: I18n('deleteTextConfirmation', { erpUrl: `'${selectedAcumatica?.erp_url}'` })}} />
        </Text>
      </Modal>
		</>
	);
};

export default Index;