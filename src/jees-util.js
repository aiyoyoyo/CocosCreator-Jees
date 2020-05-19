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
};