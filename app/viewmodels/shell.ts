import router = require("plugins/router");

class Shell {
    router: DurandalRootRouter = router;
    activate() {
        return router.map([
            { route: ['', 'customers'], moduleId: 'viewmodels/customers', title: 'Customers', nav: true },
            { route: 'customerdetails/:id', moduleId: 'viewmodels/customerDetails', title: 'Customer details' },
            { route: 'movies', moduleId: 'viewmodels/movies', title: 'Movies', nav: true }
        ]).buildNavigationModel()
            .mapUnknownRoutes('viewmodels/customers', '')
            .activate();
    }
}

export = Shell;