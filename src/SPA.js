
define(function (require) {
    const Monitor = require('./middleware/Monitor');

    return class SPA {
        constructor(options){
            this.mws = [];
            this.monitor = null;
            this.session = null;
        }

        add(mw) {
            if(typeof mw === 'function'){
                this.mws.push(mw);
            }
        }

        dispatch(context) {
            let index = 0;
            let next = () => {
                let mw = this.mws[index];
                index++;
                if(mw){
                    return mw(context, next);
                }
            };
            next();
        }

        start(options){
            this.mws = this.mws.map(mw=>mw(options));
            const spa = this;
            this.monitor = new Monitor({
                onChange(event) {
                    spa.dispatch({
                        request: new URL(event.newValue),
                        session: spa.session,
                        redirect,
                        setSession: newSession => spa.session = newSession
                    });
                }
            });
            function redirect(hash) {
                window.location.hash = '#' + hash;
            }
        }

        destroy(){
            this.monitor.stop();
        }
    }
});
