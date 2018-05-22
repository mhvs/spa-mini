
define(function (require) {

    const request = require('../request/request');
    // 用户验证中间件, 如果用户未登录, 那么需要登录一次
    return function authFilter(options) {
        return function (context, next) {
            const uid = context.session && context.session.user && context.session.user.uid;
            const pathname = context.hash.pathname;
            if (!uid) {
                if(pathname!=='/login'&&pathname!=='/404'){
                    // 请求接口
                    request('/path/to/auth/user').then(res=>{
                        const user = res.data;
                        next();
                        context.setSession({ ...context.session, user });
                    }).catch(err=>{
                        alert(err.error_message);
                        context.redirect('/login');
                    });
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    }
});
