
define(function (require) {
    const rest = require('./middleware/rest');
    const history = require('./middleware/history');
    const rewrite = require('./middleware/rewrite');
    const SPA = require('./SPA');

    const app = new SPA();
    app.add(rest);
    app.add(history);
    app.add(rewrite);

    app.start({
        matchers:[
            '/user/:id',
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
        routes: {
            '/index': null,
        }
    });
    window.app = app;
});
