
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

        _doUpdateUser(context){
            this._unode.innerHTML = '<p>来到了未被发现的地方,宇宙寂静无声.</p>';
        }
    }
});
