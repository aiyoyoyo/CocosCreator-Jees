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
 * 核心脚本
 * jees.view.Comp
 * @extends cc.Component
 * @example extends: jees.view.Comp
 */
jees.view.Comp = cc.Class({
	extends: cc.Component,
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
		this._ex_destroy && this._ex_destroy();
	},
	bind(_evt, _func) {
		jees.notifire.bind(this, _evt, _func);
	},
	unbind(_evt) {
		jees.notifire.unbind(this, _evt);
	},
	notify(_evt, _p0, _p1, _p2, _p3, _p4) {
		this._ex_notify && this._ex_notify(_evt, _p0, _p1, _p2, _p3, _p4);
	}
});
/**
 * 场景根脚本
 * @extends jees.view.Comp
 * @example extends: jees.view.Fire
 */
jees.view.Fire = cc.Class({
	extends: jees.view.Comp,
	properties: {
		nodeHead: cc.Node,
		nodeBody: cc.Node,
		viewBody: cc.Prefab,
	},
	// 重载onload事件，用于初始化jees.game、jees.view相关内容
	onLoad() {
		jees.game.init();
		jees.view.init(this);
		// 通过在编辑器绑定根节点预制体(Body)
		if (!!this.nodeBody && !!this.viewBody) {
			var body = cc.instantiate(this.viewBody);
			this.nodeBody.addChild(body);
		}
		this._ex_load && this._ex_load();
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