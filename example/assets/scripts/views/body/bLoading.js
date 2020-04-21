cc.Class({
	extends: jees.view.Body,
	properties:{
		progLoading: cc.ProgressBar,
		labLoading: cc.Label,
	},
	_ex_load(){
		log( "Loading..." );
	},
	_ex_start(){
		jees.game.enter();
	},
});