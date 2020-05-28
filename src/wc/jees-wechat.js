/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/wc/jees-wechat.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 利用来获取微信平台的一些信息。
 */
jees.wechat = {
    _option: {
        locale: "zh_CN",
		startImgUrl: "",
    },
    init( _opt ){
        if(this._inited) return;
		this._inited = true;
		// 部分功能组件需要初始化, 部分有依赖顺序
		if( _opt ){
			for (var p in _opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = _opt[p];
				}
			}	
		}
    },
    isValid( _as ){
        this._as = _as;
        return !!this._as["scope.userInfo"];
    },
    login( _succ, _fail ){
        let self = this;
        wx.getSetting({
            success( _res ){
                if( self.isValid( _res.authSetting ) ){
                    self._real_login( _succ, _fail );
                }else{
                    // 未询问过用户授权，调用 wx.authorize 询问用户授权信息
                    self._chk_auth( "scope.userInfo", _succ, _fail );
                }
            }
        });
    },
    _chk_auth( _type, _succ, _fail ){
      let self = this;
      let status = false;
      wx.authorize({
          scope: _type,
          success(){
              // 授权成功，登录微信账号
              self._real_login( _succ, _fail );
              status = true;
          },
          complete(){
            if( !status ){
              _self._open_setting(  _succ, _fail );
            }
          },
      });
    },
    _open_setting( _succ, _fail ){
      let self = this;
      wx.openSetting({
        success( _res ){
            // 当发现用户拒绝过授权，重新授权后再次验证登录
            if( self.isValid( _res.authSetting ) ){
                self._real_login( _succ, _fail );
            }else{
                _fail && _fail();
            }
        }});
    },
    _real_login( _succ, _fail){
        let self = this;
        wx.login({
            success(_res){
                self._code = _res.code;
                wx.getUserInfo({
                    lang: self._option.locale,
                    success(__res){
                        self._ed = __res.encryptedData;
                        self._iv = __res.iv;
                        self._ui = __res.userInfo;
                        _succ && _succ();
                    }
                });
            },
        });
    },
    /**
     * 设置微信云数据
     */
    setKVData( _k, _v, _succ, _fail, _comp ){
        wx.setUserCloudStorage({
            KVDataList: [{ key: _k, value: _v }],
            success: _succ,
            fail: _fail,
            complete: _comp
        });
    },
    /**
     * 设置微信云数据
     * @param {Array< {key:String, value: String} >} _data
     */
    setKVDataList(_data, _succ, _fail, _comp){
        wx.setUserCloudStorage({
            KVDataList: _data,
            success: _succ,
            fail: _fail,
            complete: _comp
        });
    },
    /**
     * 向开放数据域发送消息
     * @param {Object} _data
     */
    post(_data){
        wx.postMessage(_data);
    },
    // 开放数据域方法 =============================================================
    /**
     * 监听主域请求
     * @param {Function} _func
     */
    onpost(_func){
        wx.onMessage((_data) => {
            _func && _func(_data);
        });
    },
    _create_storeage( _keys, _succ, _fail, _comp, _ticket ){
        return {
            shareTicket: _ticket,
            keyList: _keys,
            fail: _fail,
            complete: _comp,
            success(_res) {
                _succ && _succ(_res);
            },
        }
    },
    /**
     * 自己的云数据
     * @param {Array<String>} _keys
     */
    getUserKVDataList(_keys, _succ, _fail, _comp){
        wx.getUserCloudStorage( this._create_storeage( _keys, _succ, _fail, _comp ) );
    },
    /**
     * 群友云数据
     * @param {Array<String>} _keys
     */
    getGroupKVDataList( _ticket, _keys, _succ, _fail, _comp ){
        wx.getGroupCloudStorage( this._create_storeage( _keys, _succ, _fail, _comp, _ticket ) );
    },
    /**
     * 好友云数据
     * @param {Array<String>} _keyList
     */
    getFriendKVDataList(_keys,  _succ, _fail, _comp){
        wx.getFriendCloudStorage( this._create_storeage( _keys, _succ, _fail, _comp ) );
    },
};