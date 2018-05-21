
define(function () {
    return function authFilter(options) {
        return function (context, next) {
            const uid = context.session && context.session.user && context.session.user.uid;
            const pathname = context.hash.pathname;
            if (!uid) {
                if(pathname!=='/login'&&pathname!=='/404'){
                    context.redirect('/login');
                }
            }
            next();
        }
    }
});
