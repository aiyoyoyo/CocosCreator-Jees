/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-platform.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 利用Cocos Creator来获取应用平台的一些属性。
 */
jees.platform = {
	isNative() {
		return cc.sys.isNative;
	},
	isAndroid() {
		return cc.sys.os === cc.sys.OS_ANDROID;
	},
	isWechat(){
		return ( cc.sys.platform === cc.sys.WECHAT_GAME ) && !!wx;
	},
	request() {
		return cc.loader.getXMLHttpRequest();
	},
	localStorage() {
		return cc.sys.localStorage;
	},
	locale() {
		return cc.sys.languageCode;
	},
	audio(){
		return cc.audioEngine;
	},
	isIPhone(){
		return this.isNative() && cc.sys.platform == cc.sys.IPHONE;
	},
	isIPhoneX(){
		return this.isIPhone() && jsb.Device.getSafeAreaEdge().z;
	},
};