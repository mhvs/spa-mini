
define(function () {

    // 用户验证中间件, 如果用户未登录, 那么需要登录一次
    return function authFilter(options) {
        return function (context, next) {
            const uid = context.session && context.session.user && context.session.user.uid;
            const pathname = context.hash.pathname;
            if (!uid) {
                if(pathname!=='/login'&&pathname!=='/404'){
                    context.redirect('/login');
                    return;
                }
            }
            next();
        }
    }
});
