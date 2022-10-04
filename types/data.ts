import { CredentialForm, AcumaticaForm } from './form';

export interface AcumaticaInstance extends CredentialForm, AcumaticaForm {}

export interface Instance {
  storeName: string;
  tenant: string;
  erp_url: string;
  client_id: string;
}