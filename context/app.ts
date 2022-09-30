import React from "react";

export const GlobalContext = React.createContext(
	{
		app: null,
		shop: null,
		locale: 'en'
	}
);