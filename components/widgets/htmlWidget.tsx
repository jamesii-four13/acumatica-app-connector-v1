import AuthorizationScreenWidget from './htmlWidgets/authorizationScreen';
import AuthorizationErrorWidget from './htmlWidgets/authorizationError';
import ExistingCustomerScreenWidget from './htmlWidgets/existingCustomerScreen';
import CreateAccountScreenWidget from './htmlWidgets/createAccountScreen';
import MainScreenWidget from './htmlWidgets/mainScreen';
import AuthorizedScreenWidget from './htmlWidgets/authorizedScreen';

const HtmlWidget = (props) => (
  <>
    {props.widget === 'AuthorizationScreen' && (
      <AuthorizationScreenWidget></AuthorizationScreenWidget>
    )}
    {props.widget === 'AuthorizationError' && (
      <AuthorizationErrorWidget></AuthorizationErrorWidget>
    )}
    {props.widget === 'ExistingCustomerScreen' && (
      <ExistingCustomerScreenWidget></ExistingCustomerScreenWidget>
    )}
    {props.widget === 'CreateAccountScreen' && (
      <CreateAccountScreenWidget></CreateAccountScreenWidget>
    )}
    {props.widget === 'MainScreen' && <MainScreenWidget></MainScreenWidget>}
    {props.widget === 'AuthorizedScreen' && (
      <AuthorizedScreenWidget></AuthorizedScreenWidget>
    )}
  </>
);

export default HtmlWidget;
