
define(function () {
    return function authFilter(options) {
        return function (context, next) {
            let uid = context.session && context.session.user && context.session.user.uid;
            if (!uid) {
                context.redirect('/login')
            }
            next();
        }
    }
});
