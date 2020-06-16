/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-view.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 基于Cocos Creator设计的脚本组件
 * @see jees.game
 * @see jees.notifire
 */
jees.view = {
	init(_fire) {
		if (this._inited) return;
		this._inited = true;

		//TODO 用于场景初始化的jees公共函数
		//例如针对刘海屏做节点修正
		// if( !!_fire.head && jees.game.is){
		// this.nodeHead.active = true;
		// }
	},
};
/**
 * 核心脚本，生命周期方法请使用继承方法，请参考示例代码
 * jees.view.Comp
 * @extends cc.Component
 * @example extends: jees.view.Comp
 */
jees.view.Comp = cc.Class({
	extends: cc.Component,
	properties:{
		_ticks : new Array(),
	},
	onLoad() {
		this._ex_load && this._ex_load();
	},
	start() {
		this._ex_start && this._ex_start();
	},
	update(_t) {
		this._ex_update && this._ex_update(_t);
	},
	onEnable() {
		this._ex_enable && this._ex_enable();
	},
	onDisable() {
		this._ex_disable && this._ex_disable();
	},
	onDestroy() {
		let len = this._ticks.length;
		for( let i = 0; i < len; i ++ ){
			jees.game.removeTick( this._ticks[i] );
		}
		this.unscheduleAllCallbacks();
		this.unbind();
		this._ex_destroy && this._ex_destroy();
	},
	bind(_evt, _func) {
		jees.notifire.bind(this, _evt, _func);
	},
	unbind(_evt) {
		jees.notifire.unbind(this, _evt);
	},
	tick(_tick){
		this._ticks.push(_tick);
	},
	notify(_evt, _p0, _p1, _p2, _p3, _p4) {
		this._ex_notify && this._ex_notify(_evt, _p0, _p1, _p2, _p3, _p4);
	},
	click(_node, _func) {
		_node.on(cc.Node.EventType.TOUCH_END, () => {
			_func && _func();
		});
	},
});
/**
 * 场景根脚本
 * @extends jees.view.Comp
 * @example extends: jees.view.Fire
 */
jees.view.Fire = cc.Class({
	extends: jees.view.Comp,
	properties: {
		nodeBody: cc.Node,
		viewBody: cc.Prefab,
		nodeWind: cc.Node,
		nodeDialog: cc.Node,
		nodeNovice: cc.Node,
		nodeSys: cc.Node,
	},
	// 重载onload事件，用于初始化jees.game、jees.view相关内容
	onLoad() {
		jees.view.init(this);
		// 通过在编辑器绑定根节点预制体(Body)
		if (!!this.nodeBody && !!this.viewBody) {
			if ( jees.platform.isIPhoneX() ) {
				this.nodeBody.getComponent(cc.Widget).top = jsb.Device.getSafeAreaEdge().z;
				this.nodeBody.getComponent(cc.Widget).updateAlignment();
				this.nodeBody.width = window.innerWidth;
			}
			let body = cc.instantiate(this.viewBody);
			this.nodeBody.addChild(body);
		}
		this._ex_load && this._ex_load();

		this._windows = new Map();
	},
	start(){
		this._ex_start && this._ex_start();
		this.schedule( ()=>{ 
			this.second();
		}, 1);
	},
	// 每帧回调
	update(_t) {
		jees.game.update(_t);
		this._ex_update && this._ex_update(_t);
	},
	// 打开一个窗口型预制体
	openWindow(_name, _p0, _p1, _p2, _p3, _p4) {
		if (!this.nodeWind) return;
		this._open_profab( this.nodeWind, "views/window/", _name, _p0, _p1, _p2, _p3, _p4 )
	},
	openDialog( _name, _p0, _p1, _p2, _p3, _p4 ){
		if (!this.nodeDialog) return;
		this._open_profab( this.nodeDialog, "views/dialog/", _name, _p0, _p1, _p2, _p3, _p4 )
	},
	openNovice(_name, _p0, _p1, _p2, _p3, _p4){
		if (!this.nodeNovice) return;
		this._open_profab( this.nodeNovice, "views/novice/", _name, _p0, _p1, _p2, _p3, _p4 )
	},
	openSystem(_name, _p0, _p1, _p2, _p3, _p4){
		if (!this.nodeSys) return;
		this._open_profab( this.nodeSys, "views/system/", _name, _p0, _p1, _p2, _p3, _p4 )
	},
	_open_profab( _node, _path, _name, _p0, _p1, _p2, _p3, _p4 ){
		if( this._windows.has( _name ) ){
			let comp = cc.instantiate( this._windows.get( _name ) );
			let wind = comp.getComponent(jees.view.Window);
			wind.setParams(_p0, _p1, _p2, _p3, _p4);
			_node.addChild(comp);
		}else{
			jees.file.load( _path + _name, (_file) => {
				let comp = cc.instantiate(_file);
				let wind = comp.getComponent(jees.view.Window);
				wind.setParams(_p0, _p1, _p2, _p3, _p4);
				_node.addChild(comp);
				this._windows.set( _name, _file );
			});
		}
	},
	// 每秒回调
	second(){
		jees.game.timeplus();
		this._ex_second && this._ex_second();
	},
});
/**
 * Body预制体
 * @extends jees.view.Comp
 * @example extends: jees.view.Body
 */
jees.view.Body = cc.Class({
	extends: jees.view.Comp,
});
/**
 * 窗口显示效果类型
 */
window.ShowType = cc.Enum({
	NONE: -1,
	SCALE: -1,
});
/**
 * Window预制体
 * @extends jees.view.Comp
 * @example extends: jees.view.Window
 */
jees.view.Window = cc.Class({
	extends: jees.view.Comp,
	properties: {
		nodeClose: {
			default: null,
			type: cc.Node,
			tooltip: CC_DEV && '触发点击关闭事件的节点',
		},
		nodeBody: {
			default: null,
			type: cc.Node,
			tooltip: CC_DEV && '用于显示和隐藏时的主体节点',
		},
		ShowType: {
			default: ShowType.NONE,
			type: ShowType,
			tooltip: CC_DEV && '显示效果',
		},
		// TODO 加入可配置内容
		HideType: {
			default: ShowType.NONE,
			type: ShowType,
			tooltip: CC_DEV && '隐藏效果',
		},
		// TODO 加入可配置内容
	},
	onLoad() {
		// 通过在编辑器绑定根节点预制体(Body)
		if (!!this.nodeClose) {
			this.click(this.nodeClose, () => { this._hide(); });
		}
		this._ex_load && this._ex_load();
	},
	start() {
		this._show();
		this._ex_start && this._ex_start();
	},
	setParams(_p0, _p1, _p2, _p3, _p4) {
		this._params = [_p0, _p1, _p2, _p3, _p4];
	},
	_show() {
		switch (this.ShowType) {
			case ShowType.SCALE: this._scale_show(); break;
			case ShowType.NONE:
			default: this._on_show(); break;
		}
	},
	_hide() {
		switch (this.HideType) {
			case ShowType.SCALE: this._scale_hide(); break;
			case ShowType.NONE:
			default: this._on_hide(); break;
		}
	},
	_get_node() {
		return this.nodeBody || this.node;
	},
	_on_show() {
		this.node.active = true;
	},
	_on_hide() {
		this.node.active = false;
		this.node.destroy();
	},
	_scale_show() {
		let node = this._get_node();
		cc.tween(node).to(0, { scale: 0.1 }).to(0.2, { scale: 1.2 }).to(0.1, { scale: 1 }).call(() => {
			this._on_show();
		}).start();
	},
	_scale_hide() {
		let node = this._get_node();
		cc.tween(node).to(0.1, { scale: 1.2 }).to(0.2, { scale: 0.1 }).call(() => {
			this._on_hide();
		}).start();
	},
});