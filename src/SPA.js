
define(function (require) {
    const Monitor = require('./middleware/Monitor');

    return class SPA {
        constructor(options){
            this.mws = [];
            this.monitor = null;
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
                        request: new URL(event.newValue)
                    });
                }
            });
        }

        destroy(){
            this.monitor.stop();
        }
    }
});
