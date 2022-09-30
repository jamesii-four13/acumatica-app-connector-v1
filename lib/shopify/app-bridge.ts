import { AppBridgeState, ClientApplication } from "@shopify/app-bridge";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";

export function fetch(app:  ClientApplication<AppBridgeState>) {
	const fetchFunction = authenticatedFetch(app);
	
	return async (uri, options) => {
		const response = await fetchFunction(uri, options);

		checkHeadersForReauthorization(response.headers, app);

		return response;
	};
}

function checkHeadersForReauthorization(headers, app) {
	if (headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
		const authUrlHeader =
			headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
			`/api/shopify/auth`;

		const redirect = Redirect.create(app);
		redirect.dispatch(
			Redirect.Action.APP,
			authUrlHeader.startsWith("/")
				? `https://${window.location.host}${authUrlHeader}`
				: authUrlHeader
		);
	}
}
