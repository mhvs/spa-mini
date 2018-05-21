
define(function () {
    return function router(options) {
        let routes = options.routes || {};
        let current = null;

        return function (context, next) {
            let path = context.hash.pathname;
            let route = routes.find( r => r.path === path);
            if (!route) {
                context.redirect('/404');
                return;
            }

            const module = new route.component(options);
            routes[name] = module;
            module.build(context);

            if (module === current) {
                module.refresh(context);
            } else {
                if (current) {
                    current.hide();
                }
                current = module;
                current.show(context);
            }

            next();
        }
    }
});
