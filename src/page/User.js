
define(function (require) {
    const Module = require('../common/Module');

    /**
     * @class User
     * @description 用户页面
     */
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
            this._doUpdateUser(context);
        }

        refresh(context){
            super.refresh(context);
            this._doUpdateUser(context);
        }

        _doUpdateUser(context){
            const text = context.hash && context.hash.restParams && context.hash.restParams.uid;
            this._unode.innerHTML = '<p>大家好, 我是用户' + text + '</p>';
        }
    }
});
