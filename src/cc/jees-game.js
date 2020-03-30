/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-game.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 游戏或应用流程管理器
 * 这里仅包含3个流程: 启动->更新\加载->主界面
 * @see jees.view
 * @see jees.data
 * @see jees.http
 * @see jees.socket
 */
jees.game = {
	// 设定场景从Start开始，与场景文件名称相同
	_mods: ["Start", "Update", "Game"],
	// _mods: ["Start", "Update", "Loading", "Game"], // 多一个预加载界面
	_modIdx: 1,
	_frame: [],
	// 初始化
	init( _opt ) {
		if (this._inited) return;
		this._inited = true;
		// 部分功能组件需要初始化, 部分有依赖顺序

		jees.data.init(); // 数据处理组件
		jees.http.init(); // 网络组件
		jees.socket.init(); // Socket组件
	},
	// 调用即代表流程进入下一阶段
	enter() {
		//必走的流程
		let mod = this._mods[this._modIdx];
		if (this._modIdx >= this._mods.length) return;
		this._modIdx++;
		cc.director.loadScene(mod);
	},
	// TODO 离开当前流程界面，应返回上一个流程界面
	leave() {},
	/**
	 * 在frame加入一个方法，在下次update时调用并移除，必须由脚本调用才触发。
	 * 需要在当前主场景调用jees.game.update();
	 * @param {Function} _func 执行方法
	 * @example jees.game.frame( ()=>{ ...下一帧待执行功能代码... } );
	 */
	frame(_func) {
		_func && this._frame.push(_func);
	},
	/**
	 * 帧函数，由脚本代码主动调用
	 * @param {Float} _tick 距离上一帧所用时间，秒。
	 * @example
	 */
	update(_tick) {
		let func = this._frame.shift();
		func && func();
	},
};