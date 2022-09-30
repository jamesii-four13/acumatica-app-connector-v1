const webhooks = {
	"APP_UNINSTALLED": {
			path: '/api/webhooks',
			webhookHandler: async (_topic, _shop, _body) => {
					console.log("App uninstalled")
			}
	}
}

export default webhooks