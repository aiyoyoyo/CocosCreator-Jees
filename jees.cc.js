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
		if (_p4!= undefined) param = [_p0, _p1, _p2, _p3, _p4];
		else if (_p3!= undefined) param = [_p0, _p1, _p2, _p3];
		else if (_p2!= undefined) param = [_p0, _p1, _p2];
		else if (_p1!= undefined) param = [_p0, _p1];
		else if (_p0!= undefined) param = [_p0];
		this._history.push({
			text: _txt,
			type: _type,
			params: param
		});
		if (this._history.length > 100) {
			this._history.shift();
		}
	},
	_log(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4 != undefined) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3 != undefined) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2 != undefined) console.log("CCC.Log:" + _txt, _p0, _p1, _p2);
		else if (_p1 != undefined) console.log("CCC.Log:" + _txt, _p0, _p1);
		else if (_p0 != undefined) console.log("CCC.Log:" + _txt, _p0);
		else console.log("CCC.Log:" + _txt);
		this._push(_txt, this.TYPE_LOG, _p0, _p1, _p2, _p3, _p4);
	},
	_warn(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4 != undefined) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3 != undefined) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2 != undefined) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2);
		else if (_p1 != undefined) console.warn("CCC.Warn:" + _txt, _p0, _p1);
		else if (_p0 != undefined) console.warn("CCC.Warn:" + _txt, _p0);
		else console.warn("CCC.Warn:" + _txt);
		this._push(_txt, this.TYEP_WARN, _p0, _p1, _p2, _p3, _p4);
	},
	_err(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4 != undefined) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3 != undefined) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2 != undefined) console.error("CCC.Err:" + _txt, _p0, _p1, _p2);
		else if (_p1 != undefined) console.error("CCC.Err:" + _txt, _p0, _p1);
		else if (_p0 != undefined) console.error("CCC.Err:" + _txt, _p0);
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
window.warn = function (_txt, _p0, _p1, _p2, _p3, _p4) {
	jees.log.warn(_txt, _p0, _p1, _p2, _p3, _p4);
};;
///<jscompress sourcefile="jees-util.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-util.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 通用工具库
 * @example
 * jees.util.random( 0, 1 ); // 0 或者 1
 * jees.util.randomFloat( -1, 1 ); // -1.00到1.00之间
 * jees.util.randomWeight( [ {name:'1',weight:1.5},{name:'2',weight:2.5},{name:'3',weight:3.5} ] ); // 返回其中一个
 * jees.util.decimal2string( new Decimal( 10000000 ) ); // 返回 10M
 * jees.util.string2decimal( "10|M" ); // 返回 new Decimal( 1000000 );
 */
jees.util = {
    _seed: 0,
    _units: null,
    _random_seed() {
        this._seed = (this._seed * 9301 + 49297) % 233280;
        return this._seed / 233280.0;
    },
    /**
     * 获取本地时间戳
     * @public
     * @returns {Long}
     */
    timestamp() {
        return new Date().getTime();
    },
    /**
     * 随机 min <= r <= max 之间的数
     * @public
     * @param {Integer} _n 最小值 
     * @param {Integer} _m 最大值
     * @returns {Integer}
     */
    random(_n, _m) {
        if (this._seed == 0) {
            this._seed = this._random_seed(this.timestamp());
        }
        var r0 = _m - _n;
        var r1 = Math.random(this._seed);
        return _n + Math.round(r0 * r1);
    },
    /**
     * 随机 -1 <= r <= 1 之间的数
     * @public
     * @param {Integer} _n 最小值 
     * @param {Integer} _m 最大值
     * @returns {Float}
     */
    randomFloat(_n, _m) {
        if (_n < -1) _n = -1;
        if (_m > 1) _m = 1;
        return this.random(_n * 100, _m * 100) / 100;
    },
    /**
     * 判断对象是否为整数
     * @public
     * @param {Object} _val 
     * @returns {Boolean}
     */
    isInteger(_val) {
        return typeof _val == "number" && _val % 1 == 0;
    },
    /**
    * js数组实现权重概率分配，支持数字比模式(支持2位小数)和百分比模式(不支持小数，最后一个元素多退少补)
    * @param  Array  arr  js数组，参数类型[Object,Object,Object……]
    * @return  Array      返回一个随机元素，概率为其weight/所有weight之和，参数类型Object
    * @author  shuiguang
    */
    randomWeight(_arr) {
        //参数arr元素必须含有weight属性，参考如下所示
        //var arr=[{name:'1',weight:1.5},{name:'2',weight:2.5},{name:'3',weight:3.5}];
        //var arr=[{name:'1',weight:'15%'},{name:'2',weight:'25%'},{name:'3',weight:'35%'}];
        //求出最大公约数以计算缩小倍数，perMode为百分比模式
        let per;
        let maxNum = 0;
        let perMode = false;
        //自定义Math求最小公约数方法
        Math.gcd = (a, b) => {
            let min = Math.min(a, b);
            let max = Math.max(a, b);
            let result = 1;

            if (a === 0 || b === 0) {
                return max;
            }

            for (let i = min; i >= 1; i--) {
                if (min % i === 0 && max % i === 0) {
                    result = i;
                    break;
                }
            }
            return result;
        };
        //使用clone元素对象拷贝仍然会造成浪费，但是使用权重数组对应关系更省内存
        let weight_arr = new Array();
        for (let i = 0; i < _arr.length; i++) {
            let wgt = _arr[i].weight;
            if (typeof wgt == "number") {
                if (this.isInteger(wgt)) {
                    per = Math.floor(wgt);
                } else {
                    per = Math.floor(wgt * 100);
                    perMode = true;
                }
            } else {
                per = 0;
            }
            weight_arr[i] = per;
            maxNum = Math.gcd(maxNum, per);
        }
        //数字比模式，3:5:7，其组成[0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
        //百分比模式，元素所占百分比为15%，25%，35%
        let index = new Array();
        let total = 0;
        let len = 0;
        if (perMode) {
            for (let i = 0; i < _arr.length; i++) {
                //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度
                len = weight_arr[i];
                for (j = 0; j < len; j++) {
                    //超过100%跳出，后面的舍弃
                    if (total >= 100) {
                        break;
                    }
                    index.push(i);
                    total++;
                }
            }

            //使用最后一个元素补齐100%
            while (total < 100) {
                index.push(_arr.length - 1);
                total++;
            }
        } else {
            for (let i = 0; i < _arr.length; i++) {
                //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度
                len = weight_arr[i] / maxNum;
                for (let j = 0; j < len; j++) {
                    index.push(i);
                }
                total += len;
            }
        }

        //随机数值，其值为0-11的整数，数据块根据权重分块
        var rand = Math.floor(Math.random() * total);
        return index[rand];
    },
    UNIT_BASE: ["", "", "M", "B", "T"],
    UNIT_CHAT: [
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"],
    /**
     * 将大数字转换为带单位的6位长度数字
     * @public
     * @see https://github.com/MikeMcl/decimal.js/
     * @param {Decimal} _val 
     * @returns {String}
     */
    decimal2string(_val,_fix) {
        if (!(_val instanceof Decimal)) {
            _val = new Decimal(_val);
        }
        let neg = _val.isNeg();
        if (neg) _val = _val.abs();
        let n = _val;
        let e = n.e;
        let m = e / 3;
        if (e % 3 != 0) {
            m = Math.floor((e - 1) / 3);
            e = m * 3;
            if (e < 0) e = 0;
        }
        if (m < 0) m = 0;
        let str = "";
        let unit = "";
        if (e < 15) {
            unit = this.UNIT_BASE[m];
        } else {
            let n = Math.floor((e - 15) / 3);
            unit = "";
            if (n < 26) {
                unit = this.UNIT_CHAT[0] + this.UNIT_CHAT[n];
            } else {
                while (n > 0) {
                    let r = n % 26;
                    n = Math.floor(n / 26);
                    unit = this.UNIT_CHAT[r] + unit;
                }
            }
        }
        if (n.lt(1000)) {
            str = n.toFixed(3).toString();
            if (str.indexOf(".") != -1) {
                while (str.charAt(str.length - 1) == "0") {
                    str = str.slice(0, str.length - 1);
                }
            }
            if (str.charAt(str.length - 1) == ".") {
                str = str.slice(0, str.length - 1);
            }
        } else if (n.lt(1000000)) {
            str = n.toDP(0).toString();
            let ins = str.length - 3;
            str = str.slice(0, ins) + "," + str.slice(ins);
        } else {
            let n0 = n.div(Decimal.pow(1000, m)).toFixed(3);
            str = n0.toString();
            if (str.indexOf(".") != -1) {
                while (str.charAt(str.length - 1) == "0") {
                    str = str.slice(0, str.length - 1);
                }
            }
            if (str.charAt(str.length - 1) == ".") {
                str = str.slice(0, str.length - 1);
            }
        }
        return (neg ? "-" : "") + str + unit;
    },
    /**
     * 将字符串转为大数字, 格式为 10, "10", "10|T"
     * @public
     * @see https://github.com/MikeMcl/decimal.js/
     * @param {Number||String} _val 
     * @returns {Decimal}
     */
    string2decimal(_str) {
        let num;
        if (_str instanceof Decimal) {
            return _str;
        }
        _str = "" + _str;
        if (typeof _str == 'number') {
            num = new Decimal(_str);
            // debug( "NumberUtils.string2decimal: number->" + num.toString() );
            return num;
        }
        if (_str.indexOf("|") == -1) {
            num = new Decimal(_str);
            // debug( "NumberUtils.string2decimal: string->" + num.toString() );
            return num;
        }

        let str = _str.split("|");
        let m = 0;
        let x = parseFloat(str[0]);
        if (this._units == null) {
            this._units = new Map();
            let cfgs = C.all("GameUnit");
            for (let cfg of cfgs) {
                this._units.set(cfg[1].unit, cfg[0]);
            }
        }
        if (this._units.has(str[1])) {
            m = this._units.get(str[1]);
        }
        num = Decimal.pow(10, m).times(x);
        // debug( "NumberUtils.string2decimal: -->" + num.toString() );
        return num;
    },
    // 获取网路js
	loadjs( _url ){
		var dom_head = document.getElementsByTagName( "head" ).item(0);
		var spt_el = document.createElement('script');
		spt_el.src = _url;
		spt_el.type = 'text/javascript'; 
		spt_el.defer = true;             
		dom_head.appendChild( spt_el );
    },
    /**
     * @param {Long} _time ms
     * @returns [sec,min,hour]
     */
    time2cdarr( _time ){
        let s = parseInt( ( _time + 900 ) / 1000 ); // 将倒计时延后900ms的数值
        let m = parseInt( s / 60 );
        let h = parseInt( m / 60 );
        s = s % 60;
        m = m % 60;

        if( s < 0 ) s = 0;
        return [s,m,h];
    },
    /**
     * 倒计时格式化
     * @param {Long} _time ms
     * @param {*} _format "hh:mm:ss"
     */
    time2cd( _time, _format ){
        let str = "";
        let cd = this.time2cdarr( _time );
        let s = cd[0]; 
        let m = cd[1];
        let h = cd[2];
        if( s < 10 ) s = "0" + s;
        if( m < 10 ) m = "0" + m;
        if( h < 10 ) h = "0" + h;
        if( _format ){
            str = _format.replace( "hh", h ).replace( "mm", m ).replace( "ss", s );
        }else{
            str = h + ":" + m + ":" + s;
        }
        return str;
    },
};;
///<jscompress sourcefile="jees-md5.js" />
jees.md5 = function (_txt) {
	let data = _txt;
	// for test/debug
	function fflog(msg) {
		try {
			log(msg);
		} catch (e) { }
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
	_objs: new Map(),
	init() {
		if (this._inited) return;
		this._inited = true;
		this._local = jees.platform.localStorage();
	},
	regist( _obj, _new ){
		this._objs.set( _obj, _new );
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
			_obj = this.json2data(JSON.parse(data), _obj);
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
		// 如果不存在存储空间问题，可以考虑不删除属性，直接保存，由加载时移除
		let prv = new Map();
		for (var p in _obj) {
			if (p.startsWith("_")) {
				let o = _obj[p];
				prv.set( p, o );
				delete _obj[p];
			}
		}
		this.set(_key, JSON.stringify(_obj));

		for( let p of prv.keys() ){
			_obj[p] = prv.get( p );
		}
	},
	/**
	 * 移除本地数据
	 * @param {String} _key 
	 */
	del(_key) {
		return this._local.removeItem(_key);
	},
	// 将jsonobj转换成js对象
	json2data(_data, _obj) {
		for (var p in _obj) {
			// 仅处理最新的数据结构，旧的历史数据将被移除
			if (_data.hasOwnProperty(p)) {
				// 属性转换部分
				// _obj[p] = data[p];
				if (_obj[p] instanceof Date) {
					_obj[p] = new Date(_data[p]);
				} else {
					let tmp = null;
					if( _obj[p] instanceof Object ) {
						for( let o of this._objs ){
							if( _obj[p] instanceof o[0] ){
								tmp = o[1].build();
								break;
							}
						}
					}
					if( tmp ){
						_obj[p] = this.json2data( _data[p], tmp );
					} else {
						// 不转换_开头属性，便于本地处理数据
						if (!p.startsWith("_")) {
							_obj[p] = _data[p];
						}
					}
				}
			} else {
				// log( "移除属性: " + p );
			}
		}
		return _obj;
	},
	//加载的时候转换，适合array类型数据
	eachLoad(_key, _func) {
		let tmp = jees.data.get(_key);
		if (!tmp) return [];
		let arr = JSON.parse(jees.data.get(_key));
		let len = arr.length;
		for (let i = 0; i < len; i++) {
			let d = arr[i];
			if (_func) {
				arr[i] = _func(d);
			}
		}
		return arr;
	},
	// TODO 数据集合操作 //////
	/**
     * 查看本地存储容量 KB
     * @public
     * @returns {Float}
     */
    getCapacity(){
        let size = 0;
        for( var item in this._local ) {
            if( this._local.hasOwnProperty( item ) ) {
                let data = this._local.getItem( item );
                size += data ? data.length : 0;
            }
        }
        log( "已使用存储：", ( ( size / 1024 ).toFixed(2) ) + "KB" );
    },
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
		if (!evt_coms) {
			return;
		}
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
window.notify = function (_evt, _p0, _p1, _p2, _p3, _p4) {
	jees.notifire.notify(_evt, _p0, _p1, _p2, _p3, _p4);
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
///<jscompress sourcefile="jees-audio.js" />
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-audio.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 声音引擎处理类
 * @example
 * @see jees.platform
 */
jees.audio = {
    _datakey: "data:audio",
    _audio: null,
    _option: {
        sound:{
            volume: 1,
            mute: false,
        },
        music:{
            volume: 1,
            mute: false,
        },
    },
	init( _opt ) {
		if (this._inited) return;
		this._inited = true;
        this._audio = jees.platform.audio();
        
        if( _opt ){
			for (var p in _opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = _opt[p];
				}
			}	
        }
        this.load();
        this.setSoundVolume();
        this.setMusicVolume();
        this.setSoundMute();
        this.setMusicMute();
    },
    save(){
        jees.data.set( this._datakey, this._option );
    },
    load(){
        let opt = jees.data.get( this._datakey );
        if( !opt ){
            this.save();
        }else{
            for (var p in opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = opt[p];
				}
			}	
        }
    },
    playSound( _res, _func ){
        let sound = cc.audioEngine.playEffect( _res, false );
        if( _func ){
            this._audio.setFinishCallback( sound, ()=>{
                _func && _func();
            } );
        }
        return sound;
    },
    playMusic( _res, _loop, _func ){
        this._audio.stopMusic();
        let music = this._audio.playMusic( _res, _loop );
        if( _func ){
            this._audio.setFinishCallback( sound, ()=>{
                _func && _func();
            } );
        }
        return music;
    },
    stopSound(){
        this._audio.stopAllEffects();
    },
    stopMusic(){
        this._audio.stopMusic();
    },
    setSoundMute( _mute ){
        this._audio.setEffectsVolume( _mute ? 0 : this._option.sound.volume );
        this._option.sound.mute = _mute || false;

        this.save();
    },
    setMusicMute( _mute ){
        this._audio.setMusicVolume( _mute ? 0 : this._option.music.volume );
        this._option.music.mute = _mute || false;

        this.save();
    },
    setSoundVolume( _val ){
        let val = _val || this._option.sound.volume;
        if( val > 1 ) val = 1;
        if( val < 0 ) val = 0;
        this._audio.setEffectsVolume( val );
        this._option.sound.volume = val;

        this.save();
    },
    setMusicVolume( _val ){
        let val = _val || this._option.music.volume;
        if( val > 1 ) val = 1;
        if( val < 0 ) val = 0;
        this._audio.setMusicVolume( val );
        this._option.music.volume = val;

        this.save();
    },
    isSoundMute(){
        return this._option.sound.mute;
    },
    isMusicMute( _type ){
        return this._option.music.mute;
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
///<jscompress sourcefile="jees-wechat.js" />
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
	files(_path, _func, _errh) {
		cc.loader.loadResDir(_path, (_err, _files) => {
			if (_err) {
				err("加载文件发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_files);
		});
	},
	filesBy(_path, _type, _func, _errh) {
		cc.loader.loadResDir(_path, _type, (_err, _files, _urls) => {
			if (_err) {
				err("加载文件发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_files,_urls);
		});
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
	_fires: ["Start", "Update", "Game"],
	// _fires: ["Start", "Update", "Loading", "Game"], // 多一个预加载界面
	_fireIdx: 0,
	_frame: [],
	_ticks: [],
	_time: 0,
	_option: {
		// 设定场景从Start开始，与场景文件名称相同
		fires: ["Start", "Update", "Game"],
	},
	// 初始化
	init(_opt) {
		if (this._inited) return;
		this._inited = true;
		// 部分功能组件需要初始化, 部分有依赖顺序
		if( _opt ){
			for (var p in _opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = _opt[p];
				}
			}	
		}
		
		this._time = jees.util.timestamp();

		jees.data.init(); // 数据处理组件
		jees.http.init(); // 网络组件
		jees.socket.init(); // Socket组件
	},
	// 调用即代表流程进入下一阶段
	enter() {
		//必走的流程
		let opt = this._option;
		let fire = opt.fires[this._fireIdx];
		if (this._fireIdx >= opt.length) return;
		this._fireIdx++;
		log("切换界面: ", fire);
		cc.director.loadScene(fire);
	},
	// TODO 离开当前流程界面，应返回上一个流程界面
	leave() { },
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
	 * 在ticks中加入一个回调方法，每帧调用，需要手动移除
	 * @param {Function} _func 
	 */
	tick(_func, _time){
		if( _time ) _func.time = _time;
		this._ticks.push(_func);
	},
	// 移除一个tick
	removeTick(_tick){
		let len = this._ticks.length;
		for( let i = 0; i < len; i ++ ){
			let tick = this._ticks[i];
			if(tick === _tick){
				this._ticks.splice(i, 1);
				_tick = null;
				break;
			}
		}
	},
	/**
	 * 帧函数，由脚本代码主动调用
	 * @param {Float} _tick 距离上一帧所用时间，秒。
	 * @example
	 */
	update(_t) {
		let frame = this._frame.shift();
		frame && frame(_t);
		let len = this._ticks.length;
		for( let i = 0; i < len; i ++ ){
			let tick = this._ticks[i];
			if( !tick ) continue;
			if( tick.time ){
				if( !tick._ttime ) tick._ttime = 0;
				tick._ttime += _t;
				if( tick._ttime > tick.time ){
					tick( tick._ttime );
					tick._ttime = 0;
				}
			}else tick(_t);
		}
	},
	/**
	 * 游戏时间戳，如果存在服务器时间，则不取本地时间
	 */
	time(){
		return this._time == 0 ? jees.util.timestamp() : this._time;
	},
	/**
	 * 游戏时间增加1秒
	 */
	timeplus(){
		if( this._time != 0 ) this._time += 1000;
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
 * 核心脚本，生命周期方法请使用继承方法，请参考示例代码
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
		this.unbind();
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
		nodeHead: cc.Node,
		nodeBody: cc.Node,
		viewBody: cc.Prefab,
		nodeWind: cc.Node,
	},
	// 重载onload事件，用于初始化jees.game、jees.view相关内容
	onLoad() {
		jees.view.init(this);
		// 通过在编辑器绑定根节点预制体(Body)
		if (!!this.nodeBody && !!this.viewBody) {
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

		jees.file.load("views/window/" + _name, (_file) => {
			let comp = cc.instantiate(_file);
			let wind = comp.getComponent(jees.view.Window);
			wind.setParams(_p0, _p1, _p2, _p3, _p4);
			this.nodeWind.addChild(comp);
		});
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
 * @see jees.platform
 * @see jees.data
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
	check(_rm) {
		if (_rm) this._remote_manifest = _rm;
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
