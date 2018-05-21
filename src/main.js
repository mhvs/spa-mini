
define(function (require) {

    const rest = require('./middleware/rest');
    const history = require('./middleware/history');
    const rewrite = require('./middleware/rewrite');
    const authFilter = require('./middleware/auth_filter');
    const router = require('./middleware/router');

    const SPA = require('./SPA');
    const Login = require('./page/Login');

    const app = new SPA();

    app.add(rest);
    app.add(history);
    app.add(rewrite);
    app.add(authFilter);
    app.add(router);

    const options = {
        root: document.getElementById('app'),
        matchers:[
            '/user/:uid',
            '/group/:gid/users'
        ],
        rules:[
            {
                matcher: /\/group\/[\d]+\/user\/[\d]/i,
                target: function (context) {
                    let ret = /^\/group\/([^\/]+?)\/user\/([^\/]+?)$/gi.exec(context.hash.pathname);
                    return '/user/' + ret[2];
                }
            },
            {
                matcher: '/',
                target: '/user/1'
            }
        ],
        routes: [
            {
                path: '/login',
                component: Login,
            }
        ]
    };

    app.start(options);
    window.app = app;
});
