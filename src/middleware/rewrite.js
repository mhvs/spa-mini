
define(function () {
    return function rewrite(options) {
        let rules = options.rules || [];
        rules.forEach(function (it) {
            let target = it.target;
            if(typeof target !== 'function'){
                it.target = function (context) {
                    return target
                }
            }

            let matcher = it.matcher;

            if(typeof matcher === 'function'){
                return;
            }

            if(typeof matcher === 'string'){
                it.matcher = function (ctx) {
                    return ctx.hash.pathname === matcher;
                };
                return;
            }

            if(matcher instanceof RegExp){
                it.matcher = function (ctx) {
                    return matcher.test(ctx.hash.pathname);
                };
                return;
            }

        });
        return function (context,next) {
            if(!context.hash || !context.hash.pathname){
                context.redirect('/');
                return;
            }

            let ret = rules.find(function (it) {
                return it.matcher(context);
            });

            if(!!ret){
                let target = ret.target(context);
                context.redirect(target);
                /*context.hash.pathname = target;
                if(!!context.hash){
                    context.hash.pathname = target;
                }*/
            } else {
                //console.log('context',context)
                next();
            }
        }
    }
});
