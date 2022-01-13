import App from "./";

WJSRouters.HashRouter.create(
	{
		home: { title: "Auto Club Stat Tracker", component: App },
		404: {
			title: "404",
			component: () => (location.hash = "#"),
		},
	}
);
