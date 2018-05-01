/**
 * Created by ZhouTing on 2018/5/1.
 *
 * 工具类
 */

exports.formatNum = function formatNum(num) {
    if (num > 1000000000) {
        return '' + (num / 1000000).toFixed(1) + 'G';
    } else if (num > 1000000) {
        return '' + (num / 1000000).toFixed(1) + 'M';
    } else if (num > 1000) {
        return '' + (num / 1000).toFixed(1) + 'K';
    } else {
        return '' + num;
    }
};

exports.stripscript = function stripscript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
};


exports.formatField = function formatField(fd) {
    return fd === undefined ? '' : fd;
};

exports.setTblRowColor = function setTblRowColor(tblId) {
    let len = $('#' + tblId + ' tr').length;
    let len1 = 0;
    for (let ii = 0; ii < len; ii++) {

        if (ii % 2 === 1) {
            //$('#'+tblId+' tr:eq(' + ii + ')').css({"color":"#3333ff"});  //设置偶数行字体的颜色

        } else {
            $('#' + tblId + ' tr:eq(' + ii + ')').css({"background": "#F8F8FF"}); //设置奇数行的背景色
        }
    }
};


exports.calYearOfDays = function calYearOfDays(days) {
    let y = Math.floor(days / 365);
    let d = (days % 365);
    return '' + (y > 0 ? '' + y + '年' : '') + d + '天';
};

//by函数接受一个成员名字符串和一个可选的次要比较函数做为参数
//并返回一个可以用来包含该成员的对象数组进行排序的比较函数
//当o[age]和 p[age] 相等时，次要比较函数被用来决出高下
exports.orderby = function orderby(name, minor) {
    return function (o, p) {
        let a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }

            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }

            return typeof a < typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }

};

exports.getToday = function getToday() {
    let time;
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    time = year + "-" + month + "-" + day;
    return time;
};

exports.getTodayShrtFmt = function getTodayShrtFmt() {
    let time;
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    time = year + "" + month + "" + day;
    return time;
};

exports.timeformat = function timeformat(date, format) {
    let time;
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (format === "hour" || format === time) {
        time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else if (format === "shortdate") {
        time = year + "" + month + "" + day;
    } else {
        time = year + "-" + month + "-" + day;
    }

    return time;
};
/**
 * 格式化整数
 * @param number:number 要格式化的整数
 * @param fmt:string 整数格式
 */
function formatNumber(number, fmt) {
    number = number + '';
    if (fmt.length > number.length) {
        return fmt.substring(number.length) + number;
    }
    return number;
};
/**
 * 格式化日期为字符串表示
 * @param datetime:Date 要格式化的日期对象
 * @param format:String 日期格式
 */
exports.formatDate = function formatDate(datetime, format) {
    let cfg = {
            MMM: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            MMMM: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
        },
        values = {
            y: datetime.getFullYear(),
            M: datetime.getMonth(),
            d: datetime.getDate(),
            H: datetime.getHours(),
            m: datetime.getMinutes(),
            s: datetime.getSeconds(),
            S: datetime.getMilliseconds()
        };
    /*用正则表达式拆分日期格式各个元素*/
    let elems = format.match(/y+|M+|d+|H+|m+|s+|S+|[^yMdHmsS]/g);
//将日期元素替换为实际的值
    for (let i = 0; i < elems.length; i++) {
        if (cfg[elems[i]]) {
            elems[i] = cfg[elems[i]][values[elems[i].charAt(0)]];
        } else if (values[elems[i].charAt(0)]) {
            elems[i] = formatNumber(values[elems[i].charAt(0)], elems[i].replace(/./g, '0'));
        }
    }
    return elems.join('');
};

exports.getStdTime = function getStdTime(ts) {
    let newDate = new Date();
    newDate.setTime(ts * 1000);

    return this.formatDate(newDate, 'yyyy-MM-dd HH:mm:ss');
};
