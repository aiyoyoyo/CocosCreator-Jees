///<jscompress sourcefile="jees.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = {};;
///<jscompress sourcefile="jees-log.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-log.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 日志组件，将console.log、cc.log等简化为log、err来使用。
 * 提供一个字符串参数，和额外5个参数内容。
 * 未实现参数自动替换，解析等功能。
 * @example log( "xxx" ); err( "xxx" );
 */
jees.log = {
	TYPE_LOG: 0,
	TYPE_WARN: 1,
	TYPE_ERROR: 2,
	_history: [],
	_push(_txt, _type, _p0, _p1, _p2, _p3, _p4) {
		let param = [];
		if (_p4) param = [_p0, _p1, _p2, _p3, _p4];
		else if (_p3) param = [_p0, _p1, _p2, _p3];
		else if (_p2) param = [_p0, _p1, _p2];
		else if (_p1) param = [_p0, _p1];
		else if (_p0) param = [_p0];
		this._history.push({
			text: _txt,
			type: _type,
			params: param
		});
		if( this._history.length > 100 ){
			this._history.shift();
		}
	},
	_log(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.log("CCC.Log:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.log("CCC.Log:" + _txt, _p0, _p1);
		else if (_p0) console.log("CCC.Log:" + _txt, _p0);
		else console.log("CCC.Log:" + _txt);
		this._push(_txt, this.TYPE_LOG, _p0, _p1, _p2, _p3, _p4);
	},
	_warn(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.warn("CCC.Warn:" + _txt, _p0, _p1);
		else if (_p0) console.warn("CCC.Warn:" + _txt, _p0);
		else console.warn("CCC.Warn:" + _txt);
		this._push(_txt, this.TYEP_WARN, _p0, _p1, _p2, _p3, _p4);
	},
	_err(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.error("CCC.Err:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.error("CCC.Err:" + _txt, _p0, _p1);
		else if (_p0) console.error("CCC.Err:" + _txt, _p0);
		else console.error("CCC.Err:" + _txt);
		this._push(_txt, this.TYEP_ERROR, _p0, _p1, _p2, _p3, _p4);
	},
	log(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._log(_txt, _p0, _p1, _p2, _p3, _p4);
	},
	warn(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._warn(_txt, _p0, _p1, _p2, _p3, _p4);
	},
	err(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._err(_txt, _p0, _p1, _p2, _p3, _p4);
	},
};
window.log = function (_txt, _p0, _p1, _p2, _p3, _p4) {
	jees.log.log(_txt, _p0, _p1, _p2, _p3, _p4);
};
window.err = function (_txt, _p0, _p1, _p2, _p3, _p4) {
	jees.log.err(_txt, _p0, _p1, _p2, _p3, _p4);
};
window.warn = function () {
	jees.log.warn(_txt, _p0, _p1, _p2, _p3, _p4);
};;
///<jscompress sourcefile="jees-md5.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-md5.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 此处内容来自网络，除参数命名外，未做任何更改。
 * 来源: https://www.cnblogs.com/pixs-union/p/9435882.html
 * @example md5( "xxx" );
 */
jees.md5 = function (_txt) {
	let data = _txt;
	// for test/debug
	function fflog(msg) {
		try {
			log(msg);
		} catch (e) {}
	}

	// convert number to (unsigned) 32 bit hex, zero filled string
	function to_zerofilled_hex(n) {
		var t1 = (n >>> 24).toString(16);
		var t2 = (n & 0x00FFFFFF).toString(16);
		return "00".substr(0, 2 - t1.length) + t1 +
			"000000".substr(0, 6 - t2.length) + t2;
	}

	// convert a 64 bit unsigned number to array of bytes. Little endian
	function int64_to_bytes(num) {
		var retval = [];
		for (var i = 0; i < 8; i++) {
			retval.push(num & 0xFF);
			num = num >>> 8;
		}
		return retval;
	}

	//  32 bit left-rotation
	function rol(num, places) {
		return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
	}

	// The 4 MD5 functions
	function fF(b, c, d) {
		return (b & c) | (~b & d);
	}

	function fG(b, c, d) {
		return (d & b) | (~d & c);
	}

	function fH(b, c, d) {
		return b ^ c ^ d;
	}

	function fI(b, c, d) {
		return c ^ (b | ~d);
	}

	// pick 4 bytes at specified offset. Little-endian is assumed
	function bytes_to_int32(arr, off) {
		return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
	}
	// convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
	function int128le_to_hex(a, b, c, d) {
		var ra = "";
		var t = 0;
		var ta = 0;
		for (var i = 3; i >= 0; i--) {
			ta = arguments[i];
			t = (ta & 0xFF);
			ta = ta >>> 8;
			t = t << 8;
			t = t | (ta & 0xFF);
			ta = ta >>> 8;
			t = t << 8;
			t = t | (ta & 0xFF);
			ta = ta >>> 8;
			t = t << 8;
			t = t | ta;
			ra = ra + to_zerofilled_hex(t);
		}
		return ra;
	}

	// check input data type and perform conversions if needed

	if (!data instanceof Uint8Array) {
		fflog("input data type mismatch only support Uint8Array");
		return null;
	}
	var databytes = [];
	for (var i = 0; i < data.byteLength; i++) {
		databytes.push(data[i]);
	}

	// save original length
	var org_len = databytes.length;

	// first append the "1" + 7x "0"
	databytes.push(0x80);

	// determine required amount of padding
	var tail = databytes.length % 64;
	// no room for msg length?
	if (tail > 56) {
		// pad to next 512 bit block
		for (var i = 0; i < (64 - tail); i++) {
			databytes.push(0x0);
		}
		tail = databytes.length % 64;
	}
	for (i = 0; i < (56 - tail); i++) {
		databytes.push(0x0);
	}
	// message length in bits mod 512 should now be 448
	// append 64 bit, little-endian original msg length (in *bits*!)
	databytes = databytes.concat(int64_to_bytes(org_len * 8));

	// initialize 4x32 bit state
	var h0 = 0x67452301;
	var h1 = 0xEFCDAB89;
	var h2 = 0x98BADCFE;
	var h3 = 0x10325476;

	// temp buffers
	var a = 0,
		b = 0,
		c = 0,
		d = 0;


	function _add(n1, n2) {
		return 0x0FFFFFFFF & (n1 + n2)
	}

	// function update partial state for each run
	var updateRun = function (nf, sin32, dw32, b32) {
		var temp = d;
		d = c;
		c = b;
		//b = b + rol(a + (nf + (sin32 + dw32)), b32);
		b = _add(b,
			rol(
				_add(a,
					_add(nf, _add(sin32, dw32))
				), b32
			)
		);
		a = temp;
	};


	// Digest message
	for (i = 0; i < databytes.length / 64; i++) {
		// initialize run
		a = h0;
		b = h1;
		c = h2;
		d = h3;

		var ptr = i * 64;

		// do 64 runs
		updateRun(fF(b, c, d), 0xd76aa478, bytes_to_int32(databytes, ptr), 7);
		updateRun(fF(b, c, d), 0xe8c7b756, bytes_to_int32(databytes, ptr + 4), 12);
		updateRun(fF(b, c, d), 0x242070db, bytes_to_int32(databytes, ptr + 8), 17);
		updateRun(fF(b, c, d), 0xc1bdceee, bytes_to_int32(databytes, ptr + 12), 22);
		updateRun(fF(b, c, d), 0xf57c0faf, bytes_to_int32(databytes, ptr + 16), 7);
		updateRun(fF(b, c, d), 0x4787c62a, bytes_to_int32(databytes, ptr + 20), 12);
		updateRun(fF(b, c, d), 0xa8304613, bytes_to_int32(databytes, ptr + 24), 17);
		updateRun(fF(b, c, d), 0xfd469501, bytes_to_int32(databytes, ptr + 28), 22);
		updateRun(fF(b, c, d), 0x698098d8, bytes_to_int32(databytes, ptr + 32), 7);
		updateRun(fF(b, c, d), 0x8b44f7af, bytes_to_int32(databytes, ptr + 36), 12);
		updateRun(fF(b, c, d), 0xffff5bb1, bytes_to_int32(databytes, ptr + 40), 17);
		updateRun(fF(b, c, d), 0x895cd7be, bytes_to_int32(databytes, ptr + 44), 22);
		updateRun(fF(b, c, d), 0x6b901122, bytes_to_int32(databytes, ptr + 48), 7);
		updateRun(fF(b, c, d), 0xfd987193, bytes_to_int32(databytes, ptr + 52), 12);
		updateRun(fF(b, c, d), 0xa679438e, bytes_to_int32(databytes, ptr + 56), 17);
		updateRun(fF(b, c, d), 0x49b40821, bytes_to_int32(databytes, ptr + 60), 22);
		updateRun(fG(b, c, d), 0xf61e2562, bytes_to_int32(databytes, ptr + 4), 5);
		updateRun(fG(b, c, d), 0xc040b340, bytes_to_int32(databytes, ptr + 24), 9);
		updateRun(fG(b, c, d), 0x265e5a51, bytes_to_int32(databytes, ptr + 44), 14);
		updateRun(fG(b, c, d), 0xe9b6c7aa, bytes_to_int32(databytes, ptr), 20);
		updateRun(fG(b, c, d), 0xd62f105d, bytes_to_int32(databytes, ptr + 20), 5);
		updateRun(fG(b, c, d), 0x2441453, bytes_to_int32(databytes, ptr + 40), 9);
		updateRun(fG(b, c, d), 0xd8a1e681, bytes_to_int32(databytes, ptr + 60), 14);
		updateRun(fG(b, c, d), 0xe7d3fbc8, bytes_to_int32(databytes, ptr + 16), 20);
		updateRun(fG(b, c, d), 0x21e1cde6, bytes_to_int32(databytes, ptr + 36), 5);
		updateRun(fG(b, c, d), 0xc33707d6, bytes_to_int32(databytes, ptr + 56), 9);
		updateRun(fG(b, c, d), 0xf4d50d87, bytes_to_int32(databytes, ptr + 12), 14);
		updateRun(fG(b, c, d), 0x455a14ed, bytes_to_int32(databytes, ptr + 32), 20);
		updateRun(fG(b, c, d), 0xa9e3e905, bytes_to_int32(databytes, ptr + 52), 5);
		updateRun(fG(b, c, d), 0xfcefa3f8, bytes_to_int32(databytes, ptr + 8), 9);
		updateRun(fG(b, c, d), 0x676f02d9, bytes_to_int32(databytes, ptr + 28), 14);
		updateRun(fG(b, c, d), 0x8d2a4c8a, bytes_to_int32(databytes, ptr + 48), 20);
		updateRun(fH(b, c, d), 0xfffa3942, bytes_to_int32(databytes, ptr + 20), 4);
		updateRun(fH(b, c, d), 0x8771f681, bytes_to_int32(databytes, ptr + 32), 11);
		updateRun(fH(b, c, d), 0x6d9d6122, bytes_to_int32(databytes, ptr + 44), 16);
		updateRun(fH(b, c, d), 0xfde5380c, bytes_to_int32(databytes, ptr + 56), 23);
		updateRun(fH(b, c, d), 0xa4beea44, bytes_to_int32(databytes, ptr + 4), 4);
		updateRun(fH(b, c, d), 0x4bdecfa9, bytes_to_int32(databytes, ptr + 16), 11);
		updateRun(fH(b, c, d), 0xf6bb4b60, bytes_to_int32(databytes, ptr + 28), 16);
		updateRun(fH(b, c, d), 0xbebfbc70, bytes_to_int32(databytes, ptr + 40), 23);
		updateRun(fH(b, c, d), 0x289b7ec6, bytes_to_int32(databytes, ptr + 52), 4);
		updateRun(fH(b, c, d), 0xeaa127fa, bytes_to_int32(databytes, ptr), 11);
		updateRun(fH(b, c, d), 0xd4ef3085, bytes_to_int32(databytes, ptr + 12), 16);
		updateRun(fH(b, c, d), 0x4881d05, bytes_to_int32(databytes, ptr + 24), 23);
		updateRun(fH(b, c, d), 0xd9d4d039, bytes_to_int32(databytes, ptr + 36), 4);
		updateRun(fH(b, c, d), 0xe6db99e5, bytes_to_int32(databytes, ptr + 48), 11);
		updateRun(fH(b, c, d), 0x1fa27cf8, bytes_to_int32(databytes, ptr + 60), 16);
		updateRun(fH(b, c, d), 0xc4ac5665, bytes_to_int32(databytes, ptr + 8), 23);
		updateRun(fI(b, c, d), 0xf4292244, bytes_to_int32(databytes, ptr), 6);
		updateRun(fI(b, c, d), 0x432aff97, bytes_to_int32(databytes, ptr + 28), 10);
		updateRun(fI(b, c, d), 0xab9423a7, bytes_to_int32(databytes, ptr + 56), 15);
		updateRun(fI(b, c, d), 0xfc93a039, bytes_to_int32(databytes, ptr + 20), 21);
		updateRun(fI(b, c, d), 0x655b59c3, bytes_to_int32(databytes, ptr + 48), 6);
		updateRun(fI(b, c, d), 0x8f0ccc92, bytes_to_int32(databytes, ptr + 12), 10);
		updateRun(fI(b, c, d), 0xffeff47d, bytes_to_int32(databytes, ptr + 40), 15);
		updateRun(fI(b, c, d), 0x85845dd1, bytes_to_int32(databytes, ptr + 4), 21);
		updateRun(fI(b, c, d), 0x6fa87e4f, bytes_to_int32(databytes, ptr + 32), 6);
		updateRun(fI(b, c, d), 0xfe2ce6e0, bytes_to_int32(databytes, ptr + 60), 10);
		updateRun(fI(b, c, d), 0xa3014314, bytes_to_int32(databytes, ptr + 24), 15);
		updateRun(fI(b, c, d), 0x4e0811a1, bytes_to_int32(databytes, ptr + 52), 21);
		updateRun(fI(b, c, d), 0xf7537e82, bytes_to_int32(databytes, ptr + 16), 6);
		updateRun(fI(b, c, d), 0xbd3af235, bytes_to_int32(databytes, ptr + 44), 10);
		updateRun(fI(b, c, d), 0x2ad7d2bb, bytes_to_int32(databytes, ptr + 8), 15);
		updateRun(fI(b, c, d), 0xeb86d391, bytes_to_int32(databytes, ptr + 36), 21);

		// update buffers
		h0 = _add(h0, a);
		h1 = _add(h1, b);
		h2 = _add(h2, c);
		h3 = _add(h3, d);
	}
	// Done! Convert buffers to 128 bit (LE)
	return int128le_to_hex(h3, h2, h1, h0).toLowerCase();
};
window.md5 = function (_txt) {
	return jees.md5(_txt);
};;
///<jscompress sourcefile="jees-data.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-data.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 本地数据处理类
 * @example
 * jees.data.set( _key, _val );
 * jees.data.get( _key );
 * jees.data.get2( _key, new Object() );
 * @see jees.platform
 */
jees.data = {
	_local: null,
	init() {
		if (this._inited) return;
		this._inited = true;
		this._local = jees.platform.localStorage();
	},
	/**
	 * Set数据
	 * @param {String} _key 
	 * @param {String} _val 
	 */
	set(_key, _val) {
		this._local.setItem(_key, _val);
	},
	/**
	 * Get数据
	 * @param {String} _key 
	 */
	get(_key) {
		return this._local.getItem(_key);
	},
	/**
	 * 将数据转成本地JS对象，因为深度问题，所以未处理子属性中的非原生类型[String,Number]
	 * @param {String} _key 
	 * @param {Object} _obj 
	 */
	get2(_key, _obj) {
		let data = this.get(_key);
		if (data) {
			data = JSON.parse(data);
			for (var p in _obj) {
				// 仅处理最新的数据结构，旧的历史数据将被移除
				if (data.hasOwnProperty(p)) {
					// 属性转换部分
					// _obj[p] = data[p];
					if (_obj[p] instanceof Date) {
						_obj[p] = new Date(data[p]);
					} else {
						// 不转换_开头属性，便于本地处理数据
						if (!p.startsWith("_")) {
							_obj[p] = data[p];
						}
					}
				} else {
					// log( "移除属性: " + p );
				}
			}
			return _obj;
		}
		return null;
	},
	/**
	 * 将本地JS数据转成JSON，存储，移除_开头属性
	 * @param {String} _key 
	 * @param {Object} _obj 
	 */
	set2(_key, _obj) {
		for (var p in _obj) {
			if (p.startsWith("_")) {
				delete _obj[p];
			}
		}
		this.set(_key, JSON.stringify(_obj));
	},
	/**
	 * 移除本地数据
	 * @param {String} _key 
	 */
	del(_key) {
		return this._local.removeItem(_key);
	},
	// TODO 数据集合操作 //////
};;
///<jscompress sourcefile="jees-notifire.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-notifire.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 事件发射器
 * @example 
 * 脚本绑定 this.bind( _event, _callback ); 
 * 自定义绑定 jees.notifire.bind( _event, _callback );
 * 事件推送 notify( _event, _param... );
 * @see jees.view.Comp
 */
jees.notifire = {
	_events: new Map(),
	/**
	 * 绑定事件
	 * @param {Object} _com 
	 * @param {Number|String} _evt 
	 * @param {Function} _fun 
	 * @example jees.notifire.bind(this, _evt, _func);
	 */
	bind(_com, _evt, _fun) {
		if (!_com._evt_funs) {
			_com._evt_funs = new Map();
		}
		_fun && _com._evt_funs.set(_evt, _fun);

		let evt_coms = this._events.get(_evt);
		if (evt_coms) {
			evt_coms.add(_com);
		} else {
			evt_coms = new Set();
			evt_coms.add(_com);
			this._events.set(_evt, evt_coms);
		}
	},
	/**
	 * 解绑事件，可以指定_evt解绑单独的事件
	 * @param {Object} _com 
	 * @param {Number|String} _evt 
	 * @example jees.notifire.unbind(this, [_evt]);
	 */
	unbind(_com, _evt) {
		if (!!_evt) {
			_com._evt_funs.has(_evt) && _com._evt_funs.delete(_evt);
		} else {
			let evt_coms = this._events.get(_evt);
			if (evt_coms) {
				evt_coms.delete(_com);
			}
			_com._evt_funs = null;
		}
	},
	/**
	 * 推送事件
	 * @param {Number|String} _evt 
	 * @param {*} _p0 
	 * @param {*} _p1 
	 * @param {*} _p2 
	 * @param {*} _p3 
	 * @param {*} _p4 
	 * @example 
	 * notify( _evt, [_param] ); 
	 * jees.notifire.notify(_evt [_param] );
	 */
	notify(_evt, _p0, _p1, _p2, _p3, _p4) {
		let evt_coms = this._events.get(_evt);
		for (let com of evt_coms.keys()) {
			let nofun = true;
			if (com._evt_funs) {
				let fun = com._evt_funs.get(_evt);
				if (fun) {
					fun(_evt, _p0, _p1, _p2, _p3, _p4);
					nofun = false;
				}
			}
			if (nofun) {
				com.notify && com.notify(_evt, _p0, _p1, _p2, _p3, _p4);
			}
		}
	},
};
window.notify = function (_evt) {
	jees.notifire.notify(_evt);
};;
///<jscompress sourcefile="jees-http.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-http.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 来源: https://www.jianshu.com/p/37640cdc3717
 * @example
 * jees.http.post( "http:/xxx", [param], _callback );
 * jees.http.get( "http:/xxx", _callback );
 * @see jees.platform
 */
jees.http = {
	_requester: null,
	init() {
		if (this._inited) return;
		this._inited = true;
	},
	_callset(_callback) {
		let xhr = this._requester;
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status == 200) {
				let content = xhr.responseText;
				log("返回内容: ", content);
				_callback && _callback(content);
			} else if (xhr.readyState === 4 && xhr.status == 401) {
				err("401错误.");
			} else {
				// err( "其他错误: " + JSON.stringify( xhr ) );
			}
		};
		xhr.timeout = 5000;
	},
	_get(_url, _callback) {
		let xhr = this._requester = jees.platform.request();
		xhr.open("GET", _url, true);
		this._callset(_callback);
		xhr.send();
	},
	_post(_url, _params, _callback) {
		let xhr = this._requester = jees.platform.request();
		xhr.open("POST", _url, true);
		this._callset(_callback);
		xhr.send(JSON.stringify(_params));
	},
	/**
	 * Get请求
	 * @param {String} _url 
	 * @param {Function} _callback 
	 */
	get(_url, _callback) {
		this._get(_url, _callback);
	},
	/**
	 * Post请求
	 * @param {String} _url 
	 * @param {Array} _params 
	 * @param {Function} _callback 
	 */
	post(_url, _params, _callback) {
		// this._requester.withCredentials = false;
		this._post(_url, _params, _callback);
	},
};;
///<jscompress sourcefile="jees-socket.js" />

/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-socket.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * Socket工具
 * @see jees.http
 * @see jees.file
 */
jees.socket = {
	/**
	 * @example
	 * "http://127.0.0.1/socket.json", 远程参考
	 * "cfgs/socket", 本地参考 此处相对于Cocos resources路径
	 */
	_remote_config: "http://127.0.0.1/socket.json", //远程参考
	init() {
		if (this._inited) return;
		this._inited = true;
        
        let cfg = this._remote_config;

		if (cfg.startsWith("http")) {
			jees.http.get(cfg, (_content) => {
				this._servers = JSON.parse(_content).servers;
				jees.game.frame(() => {
					this.connect();
				});
			});
			return;
		} else {
			jees.file.json(cfg, (_json) => {
				this._servers = _json.servers;
				jees.game.frame(() => {
					this.connect();
				});
			});
		}
	},
	connect() {
		console.log("服务器配置: ", this._servers);
	},
	request() {

	},
};;
///<jscompress sourcefile="jees-unit.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-unit.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 单位转换类
 */
jees.unit = {
	byte2kb(_byte, _size) {
		return (_byte / 1024).toFixed(_size || 2) + "KB";
	},
	byte2mb(_byte, _size) {
		return (_byte / 1048576).toFixed(_size || 2) + "MB";
	},
	byte2gb(_byte, _size) {
		return (_byte / 1073741824).toFixed(_size || 2) + "GB";
	},
	byte2(_byte, _size) {
		let size = _byte / 1024;
		let unit = "KB";
		if (size > 100) {
			size = size / 1024
			unit = "MB";
		}
		if (size > 100) {
			size = size / 1024
			unit = "GB";
		}
		return size.toFixed(_size || 2) + unit;
    },
    // TODO 时间换算 ////
};;
///<jscompress sourcefile="jees-platform.js" />
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
	request() {
		return cc.loader.getXMLHttpRequest();
	},
	localStorage() {
		return cc.sys.localStorage;
	},
};;
///<jscompress sourcefile="jees-file.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-file.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 基于Cocos Creator文件加载
 * 本地文件均需要在resources下
 * @example
 * jees.file.load( _path|_file, _type, _succ, _fail );
 */
jees.file = {
	// 加载本地单个文件
	load(_path, _func, _errh) {
		cc.loader.loadRes(_path, (_err, _file) => {
			if (_err) {
				err("加载文件发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file);
		});
	},
	// 仅支持png
	loadRemote(_url, _func, _errh) {
		cc.loader.load(_url, (_err, _file) => {
			if (_err) {
				err("加载文件[" + _url + "]发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file);
		});
	},
	// 本地目录下指定类型文件
	files(_path, _type) {

	},
	// 获取本地json
	json(_path, _func, _errh) {
		cc.loader.loadRes(_path, (_err, _file) => {
			if (_err) {
				err("加载文件[" + _path + "]发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file.json);
		});
	},
	// 获取文件
	file(_file) {
		return cc.url.raw(_file);
	},
	// 获取文件内容，依赖jsb
	text(_file) {
		return jsb && jsb.fileUtils && jsb.fileUtils.getStringFromFile(_file);
	},
	// 删除本地文件
	remove(_file) {
		log("删除文件: " + _file);
		if (jsb && jsb.fileUtils && jsb.fileUtils.isFileExist(_file)) {
			jsb.fileUtils.removeFile(_file);
		}
	},
	// 删除本地目录
	removeDir(_dir) {
		log("删除目录: " + _dir);
		if (jsb && jsb.fileUtils && jsb.fileUtils.isDirectoryExist(_dir)) {
			jsb.fileUtils.removeDirectory(_dir);
		}
	},
};;
///<jscompress sourcefile="jees-game.js" />
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
};;
///<jscompress sourcefile="jees-view.js" />
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
});;
///<jscompress sourcefile="jees-hotUpdate.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-hotUpdate.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 热更事件类 此处基于Cocos Creator设计
 */
window.HotUpdateEvent = function (_code) {
	this._code = _code || jees.hotUpdate.UPDATE_FAILED;

	this.getEventCode = function () {
		return this._code;
	}
};
/**
 * 热更新组件,这里由jsb事件转为状态，如果需要根据状态和错误码调整提示和处理逻辑。
 * @example 
 * 	jees.hotUpdate.bind( ( _status, _evt )=>{} ); 
 * 	jees.hotUpdate.check();
 * @see jees.game
 * @see jees.http
 * @see jees.file
 */
jees.hotUpdate = {
	// 其他配置
	ANDROID_MAX_CONNECT: 2,
	// 热更状态
	_status: 0,
	STATUS_NONE: 0, // 检查中
	STATUS_UPDATING: 1, // 更新中
	STATUS_FINISH: 2, // 更新完毕
	STATUS_ISNEW: 3, // 已经是最新版本
	STATUS_FAILED: -1, // 更新失败，发生错误
	// jsb 的状态码，移到这里方便调试
	ERROR_NO_LOCAL_MANIFEST: 0,
	ERROR_DOWNLOAD_MANIFEST: 1,
	ERROR_PARSE_MANIFEST: 2,
	NEW_VERSION_FOUND: 3,
	ALREADY_UP_TO_DATE: 4,
	UPDATE_PROGRESSION: 5,
	ASSET_UPDATED: 6,
	ERROR_UPDATING: 7,
	UPDATE_FINISHED: 8,
	UPDATE_FAILED: 9,
	ERROR_DECOMPRESS: 10,
	// 配置信息
	_current_version: "1.0.0",
	/**
	 * 更新地址
	 * @example 
	 * "http://127.0.0.1/ccc/project.manifest", 远程参考
	 * "/resources/project.manifest", 本地参考 
	 */
	_remote_manifest: "http://127.0.0.1/ccc/project.manifest",
	_update_dir: "remote-assets",
	_manifest_name: "project.manifest",
	_manifest_file: null,
	// 版本比较，可以将首位当作大版本更新（应用商店更新)，常见工具版本升级
	_compare(_verA, _verB) {
		log("比较版本: " + _verA + ", 远程版本: " + _verB);
		var vA = _verA.split('.');
		var vB = _verB.split('.');
		// log( vA, vB );
		// 发现大版本更新，先移除旧的临时更新目录确保缓存是最新的
		// let local_temp = this._update_dir + "_temp";
		// log( "移除旧的临时目录: " + local_temp );
		// this.removeDirectory( local_temp );

		for (var i = 0; i < vA.length; ++i) {
			var a = parseInt(vA[i]);
			var b = parseInt(vB[i] || 0);
			if (a === b) {
				continue;
			} else {
				return a - b;
			}
		}
		if (vB.length > vA.length) {
			return -1;
		} else {
			return 0;
		}
	},
	// 文件校验, 这里为未做详细比较，所以文件默认更新。
	_verify(_path, _asset) {
		// log( "校验中..." );
		if (_asset.compressed) { // 压缩
			// log("校验 : " + _asset.path + "->" + _path );
			return true;
		} else { // 未压缩
			let md5_path = md5(jsb.fileUtils.getDataFromFile(_path));
			// log( "校验路径：" + _path );
			// log( "校验路径：" + _asset.path );
			// log( "MD5校验: " + md5_path + "->" + _asset.md5 );
			// return _asset.md5 != md5_path;  // TAG 这里只要有不一样的就会失败.
			return true;
		}
	},
	// 这里基于jsb.AssetsManager更新过程的回掉，优化一些细节，通过jees.hotUpdate._status来确定更新状态。
	_callback(_evt) {
		let code = _evt.getEventCode();
		log("更新状态: " + this.code(code));
		switch (code) {
			case this.UPDATE_PROGRESSION:
			case this.ASSET_UPDATED:
				// 直接通知脚本
				break;
			case this.NEW_VERSION_FOUND:
				if (this._status == this.STATUS_NONE) {
					this._status = this.STATUS_UPDATING;
					this._am.update();
				}
				break;
			case this.ALREADY_UP_TO_DATE:
				if (this._status == this.STATUS_NONE) {
					this._status = this.STATUS_ISNEW;
					this._am.setEventCallback(null);
				}
				break;
			case this.UPDATE_FINISHED:
				if (this._status == this.STATUS_UPDATING) {
					this._status = this.STATUS_FINISH;
					this._save();
					this._am.setEventCallback(null);
				}
				break;
			default:
				this._status = this.STATUS_FAILED;
				this._am.setEventCallback(null);
				return;
		}

		this._handler && this._handler(this._status, _evt);
	},
	// 更新成功后更新本地配置文件信息和查询路径
	_save() {
		log("更新完成, 保存更新信息.");
		let search_path = jsb.fileUtils.getSearchPaths();
		let new_path = this._am.getLocalManifest().getSearchPaths();
		log("新的搜索路径: " + JSON.stringify(new_path));
		Array.prototype.unshift(search_path, new_path);
		search_path = JSON.stringify(search_path);
		log("最终搜索路径: " + search_path);
		jees.data.set("HotUpdateSearchPaths", search_path);
		jsb.fileUtils.setSearchPaths(search_path);
	},
	/**
	 * 获取jsb状态码的描述信息
	 * @param {Number} _code 
	 * @returns {String}
	 * @example jees.hotUpdate.code( _evt.getEventCode() );
	 */
	code(_code) {
		let msg = "状态码[" + _code + "]: ";
		switch (_code) {
			case this.ERROR_NO_LOCAL_MANIFEST:
				msg = "本地Manifest文件没有找到!";
				break;
			case this.ERROR_DOWNLOAD_MANIFEST:
				msg = "远程Manifest文件下载失败!";
				break;
			case this.ERROR_PARSE_MANIFEST:
				msg = "远程Manifest文件解析失败!";
				break;
			case this.NEW_VERSION_FOUND:
				msg = "发现新的版本.";
				break;
			case this.ALREADY_UP_TO_DATE:
				msg = "当前已经是最新版本了.";
				break;
			case this.UPDATE_PROGRESSION:
				msg = "正在更新中...";
				break;
			case this.UPDATE_FINISHED:
				msg = "更新成功.";
				break;
			case this.UPDATE_FAILED:
				msg = "更新失败!";
				break;
			case this.ERROR_UPDATING:
				msg = "更新发生错误!";
				break;
			case this.ERROR_DECOMPRESS:
				msg = "解压发生错误!";
				break;
			case this.ASSET_UPDATED:
				msg = "资源已更新.";
				break;
		}
		return msg;
	},
	/**
	 * 获取当前版本号
	 * @returns {String}
	 * @example jees.hotUpdate.version();
	 */
	version() {
		return this._current_version;
	},
	/**
	 * 绑定更新状态回调事件
	 * @param {Function} _handler
	 * @example jees.hotUpdate.bind( ( _status, _evt )=>{} );
	 */
	bind(_handler) {
		this._handler = _handler || null;
	},
	/**
	 * 开始检查更新
	 * @param {String} _rm 更新对比地址
 	 * @example jees.hotUpdate.check();
	 */
	check( _rm ) {
		if( _rm ) this._remote_manifest = _rm;
		log("检查更新...");
		if (!jees.platform.isNative()) {
			log("无法使用在线更新");
			this._handler && this._handler(this.STATUS_FAILED, new HotUpdateEvent());
			return;
		}
		this._update_dir = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this._update_dir);
		this._manifest_file = this._update_dir + "/" + this._manifest_name;
		let manifest_content = "";
		if (jsb.fileUtils.isFileExist(this._manifest_file)) {
			log("使用本地已存储Manifest: " + this._manifest_file);
		} else {
			// 第一次更新
			log("第一次更新...");
			log("使用Manifest: " + this._remote_manifest);
			if (this._remote_manifest.startsWith("http")) {
				jees.http.get(this._remote_manifest, (_content) => {
					log("服务器返回2: ", _content);
					let content = JSON.parse(_content)
					content.version = this._current_version;
					content.assets = [];
					content.searchPaths = [];
					content = JSON.stringify(content);
					log("Manifest内容: " + content);
					this._manifest_file = new jsb.Manifest(content, this._update_dir);
					jees.game.frame(() => {
						this.starting();
					});
				});
				return;
			} else {
				this._manifest_file = jees.file.file(this._remote_manifest);
			}
		}
		manifest_content = jees.file.text(this._manifest_file);
		log("Manifest内容: " + manifest_content);
		this._current_version = JSON.parse(manifest_content).version;
		this.starting();
	},
	/**
	 * 开始检查版本并更新
	 * 这里目前为不提示，自动更新。
	 * @example jees.hotUpdate.starting();
	 */
	starting() {
		log("开始更新...");

		this._am = new jsb.AssetsManager(this._manifest_file, this._update_dir);
		this._am.setVerifyCallback(this._verify);
		this._am.setVersionCompareHandle(this._compare);
		this._am.setEventCallback(this._callback.bind(this));

		// if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
		//     this._am.retain();
		// }
		if (jees.platform.isAndroid()) {
			this._am.setMaxConcurrentTask(this.ANDROID_MAX_CONNECT);
			log("设置安卓设备同时最大下载数：" + this.ANDROID_MAX_CONNECT);
		}
		if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
			this._am.loadLocalManifest(this._manifest_file, this._update_dir);
		}

		let manifest = this._am.getLocalManifest();
		let is_loaded = manifest && manifest.isLoaded();
		if (!is_loaded) {
			log("Manifest文件无效或者加载失败." + JSON.stringify(manifest) + "->" + is_loaded);
			this._handler && this._handler(this.STATUS_FAILED, new HotUpdateEvent(this.ERROR_DOWNLOAD_MANIFEST));
			return;
		}
		this._am.checkUpdate();
	},
	/**
	 * 当存在更新失败的情况，可以重新发起更新
	 * @example jees.hotUpdate.retry();
	 */
	retry() {
		log("重新下载资源...");
		this._am.downloadFailedAssets();
	},
};;
