export interface CredentialForm {
  storeName: string;
  storeAdminPath: string;

  //rest settings
  apiPath: string;
  clientId: string;
  accessToken: string;

  //webdav settings
  webdavPath: string;
  webdavUsername: string;
  webdavPassword: string;
}

export interface AcumaticaForm {
  erpUrl: string;
  tenant: string;
}

export interface BasicLeadsInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  businessName: string;  
}

export interface LeadGenForm extends BasicLeadsInfo {
  valueAtRisk?: string;
}

export interface CreateAccountForm extends BasicLeadsInfo {
  phoneNumber: string;
  country: string;
  consideringPurchase?: boolean;
  financialSoftwareNeeds?: string;
}

export interface StringKeyValue {
  [key: string]: string;
}

export interface ApiResponse {
  data?: StringKeyValue;
  message: ApiResponseMessage;
};

export interface ApiResponseMessage {
  message?: string;
};