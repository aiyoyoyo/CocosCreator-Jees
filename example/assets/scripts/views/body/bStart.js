cc.Class({
	extends: jees.view.Body,
	_ex_start(){
		jees.game.init( game );
		jees.game.frame( ()=>{ L.init(); } );
	},
	_ex_update(){
		if( L.isReady() && !this._inited ){
			this._inited = true;
			jees.game.enter();
		}
	}
});