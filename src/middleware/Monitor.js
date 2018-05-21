
define(function () {

    return class Monitor{
        constructor(options){
            this.options = options || {};
            this.last = null;
            this.timer = this.start();
        }
        runURLCheck() {
            let url = window.location.href;
            if( url !== this.last){
                let event = {
                    oldValue: this.last,
                    newValue: url
                };
                this.last = url;
                //console.log('url changed', event);
                if(typeof this.options.onChange === 'function'){
                    // 可以借助事件机制
                    this.options.onChange(event);
                }
            }
        }
        start(){
            return window.setInterval(this.runURLCheck.bind(this), 500);
        }
        stop(){
            if(this.timer){
                clearInterval(this.timer);
            }
        }
    }

});
