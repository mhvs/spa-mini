
define(function (require) {
    const Module = require('../common/Module');

    return class Login extends Module {
        constructor(options){
            super(options);
            this._unode = null;
        }

        build(context){
            super.build(context);
            this._body = document.createElement('div');
            this._unode = document.createElement('div');
            this._body.appendChild(this._unode);
        }

        show(context){
            super.show(context);
            this._doUpdateUser(context);
        }

        refresh(context){
            super.refresh(context);
            this._doUpdateUser(context);
        }

        handleClick(context){
            const self = this;
            document.getElementById('h-login-button').addEventListener('click',function () {
                const user = {
                    uid: Math.floor(Math.random()*10000000),
                    username : document.getElementById('h-username').value
                };
                context.setSession(user);
                context.redirect('/user/' + user.uid);
            })
        }

        _doUpdateUser(context){
            this._unode.innerHTML = '<p><input id="h-username" value="1"></p>' + '<p><button id="h-login-button">登录</button></p>';
            this.handleClick(context);
        }
    }
});