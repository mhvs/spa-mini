
define(function (require) {
    const Module = require('../common/Module');

    return class User extends Module {
        constructor(options){
            super(options);
        }

        build(context){
            super.build(context);
            this._body = document.createElement('div');
            this._unode = document.createElement('p');
            this._body.appendChild(this._unode);
        }

        show(context){
            super.show(context);
            let req = context.request;
            this._doUpdateUser(req.restParams.uid);
        }

        refresh(context){
            super.refresh(context);
            let req = context.request;
            this._doUpdateUser(req.restParams.uid);
        }

        _doUpdateUser(uid){
            this._unode.innerHTML = '<p>大家好, 我是用户'+uid+'</p>'
        }
    }
});
