var count = [];//参与运算的数值

var nega = 0;//是否允许为负数                   0：不允许   1：允许
var tuiwei = 1;//是否允许减法退位-------------- 0:不允许    1：允许

var zheng10 = 0;//是否允许强制随机整十位--------0:不允许    1：允许
var zheng100 = 0;//是否允许强制随机整百位-------0:不允许    1：允许
var zheng1000 = 0;//是否允许强制随机整千位------0:不允许    1：允许
var siglenum = 0;//是否允许强制随机个位数 0-9---0：不允许   1：允许

var zhengmini = 0;//是否强制小数取整-----------0:不允许    1：允许

var miniNum = 0;//是否强制为小数 -------------- 0:不允许    1：允许              
var roundNum = 0;//四舍五入保留位数 ----------- 0:不处理    1：保留1位 . 2：保留2位 3：保留3位


//【随机加减乘除】 输出符号字符串
function RandomSign(a, b, c, d) {
    var signarr = [a, b, c, d];//加减乘除 0,1,2,3
    for (let i = 0; i < signarr.length; i++) {
        if (signarr[i] == null || typeof (signarr[i]) == "undefined") {
            signarr.splice(i, 1);
            i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
        }
    }
    // console.log("signarr:");
    // console.log(signarr);
    var ran = signarr[Math.floor(Math.random() * signarr.length)];
    // console.log("ran:");
    // console.log(ran);
    var sign;
    switch (ran) {
        case 0:
            sign = "+";
            break;
        case 1:
            sign = "-";
            break;
        case 2:
            sign = "×";
            break;
        case 3:
            sign = "÷";
            break;
        default:
            break;

    }
    return sign;
};

function DSi(count, i) {//数组倒数索引
    return count[count.length + i];
}

function AMC(sign) {//加减互换
    if (sign == "+") {
        sign = "-"
    } else if (sign == "-") {
        sign = "+"
    }
    return sign;
}

function CheckKuoHao4(count, sign) { //4位运算
    var print = DSi(count, -4) + DSi(sign, -3) + DSi(count, -3) + AMC(DSi(sign, -2)) + DSi(count, -2) + DSi(sign, -1) + DSi(count, -1) + "=";
    if (DSi(sign, -1) == "×" || DSi(sign, -1) == "÷") {//最后一个运算符是 x ÷
        if (DSi(sign, -2) == "+" || DSi(sign, -2) == "-") {//倒数第二个运算符 是 + -  
            // if (DSi(sign, -3) == "×" || DSi(sign, -3) == "÷" ) {//倒数第三个运算符 是 x ÷
            print = "(" + DSi(count, -4) + DSi(sign, -3) + DSi(count, -3) + DSi(sign, -2) + DSi(count, -2) + ")" + DSi(sign, -1) + DSi(count, -1) + "="
            // } else if (DSi(sign, -3) == "-" || DSi(sign, -3) == "+") {//倒数第三个运算符 是 +-
            //     print = "(" + DSi(count, -4) + DSi(sign, -3) + DSi(count, -3) + DSi(sign, -2) + DSi(count, -2) + ")" + DSi(sign, -1) + DSi(count, -1) + "="
            // }
        } else {//倒数第二个运算符 是 x ÷
            if (DSi(sign, -3) == "-" || DSi(sign, -3) == "+") {
                print = "(" + DSi(count, -4) + DSi(sign, -3) + DSi(count, -3) + ")" + DSi(sign, -2) + DSi(count, -2) + DSi(sign, -1) + DSi(count, -1) + "="
            }
        }
    } else {//最后一个运算符是 + -
        if (DSi(sign, -2) == "×" || DSi(sign, -2) == "÷") {//倒数第一个运算符是 +-  倒数第二个运算符 是 x ÷  
            if (DSi(sign, -3) == "+" || DSi(sign, -3) == "-") {//倒数第三个运算符 是 + -
                print = "(" + DSi(count, -4) + DSi(sign, -3) + DSi(count, -3) + ")" + DSi(sign, -2) + DSi(count, -2) + DSi(sign, -1) + DSi(count, -1) + "="
            }
        } else if (DSi(sign, -2) == "-" || DSi(sign, -2) == "+") {//倒数第一个运算符是 +-    倒数第二个运算符是 -
            if (DSi(sign, -3) == "-") {//倒数第三个运算符是 -
                print = DSi(count, -4) + DSi(sign, -3) + "(" + DSi(count, -3) + AMC(DSi(sign, -2)) + DSi(count, -2) + AMC(DSi(sign, -1)) + DSi(count, -1) + ")" + "="
            }
        }
    }
    // console.log(print);
    return print;
}

function CheckKuoHao3(count, sign) { //3位运算
    var print = DSi(count, -3) + AMC(DSi(sign, -2)) + DSi(count, -2) + DSi(sign, -1) + DSi(count, -1) + "=";
    if (DSi(sign, -1) == "×" || DSi(sign, -1) == "÷") {//最后一个运算符是 x ÷
        if (DSi(sign, -2) == "+" || DSi(sign, -2) == "-") {//倒数第二个运算符 是 + -  
            print = "(" + DSi(count, -3) + DSi(sign, -2) + DSi(count, -2) + ")" + DSi(sign, -1) + DSi(count, -1) + "="
        }
    } else {//最后一个运算符是 + -
        if (DSi(sign, -2) == "-") {//倒数第一个运算符是 +-    倒数第二个运算符是 -
            print = DSi(count, -3) + DSi(sign, -2) + "(" + DSi(count, -2) + AMC(DSi(sign, -1)) + DSi(count, -1) + ")" + "="
        }
    }
    // console.log(print)
    return print;
}

function CheckKuoHao2(count, sign) { //2位运算
    var print = DSi(count, -2) + DSi(sign, -1) + DSi(count, -1) + "=";
    // console.log(print)
    return print;
}

//【列出计算】
function PrintCount(l, min, max, a, b, c, d, callback) {//长度，范围，加，减，乘，除
    var count = [];//初始化数值数组
    var sign = [];//算式数组
    var print = "";//每一步要打印的算式
    var all;//每一步的计算结果

    for (let i = 0; i < l; i++) {

        if (i == 0) {//获得首位数
            count[i] = RanNum(min, max);
            sign[0] = RandomSign(a, b, c, d);//随机符号
            if (sign[0] == "÷") {//

            }
            all = count[i];
            // print += all;
            continue;
        }
        let n = sign.indexOf("÷");
        if (n > -1) {
            sign[i - 1] = RandomSign(a, b, c);//随机符号 排除除法
        } else {
            sign[i - 1] = RandomSign(a, b, c, d);//随机符号
        }

        count[i] = RanNum(min, max);
        if (zhengmini == 1) {//小数加减整数
            count[i] = Math.floor(count[i]);
        }
        switch (sign[i - 1]) {//检查运算符号
            case "+":
                if (siglenum == 1) {
                    count[i] = RanNum(1, 9);
                }
                all += count[i];
                break;
            case "-":
                if (nega == 0) {//不能为负数
                    if (siglenum == 1) {//强制个位数
                        count[i] = RanNum(1, 9);//1-9
                    }
                    if (all < count[i]) {
                        // console.log("all 小于 count[i]---------------");
                        // console.log("all:" + all);
                        // console.log("count[i]:" + count[i])
                        // console.log("--------------------------------");
                        if (tuiwei == 0) {//不退位
                            count[i] = RanNum(0, all % 10)
                        } else {
                            count[i] = RanNum(0, all);
                        }
                    }
                }
                // console.log("减法最终count[i]: " + count[i])
                all -= count[i];
                break;
            case "×":
                if (siglenum == 1) {//强制个位数
                    count[i] = RanNum(1, 9);//1-9
                }
                all *= count[i];
                break;
            case "÷":
                count[i] = Div(all);
                all /= count[i];
                // console.log("除法最终count[i]:" + count[i]);
                break;
            default:
                break;
        }

        if (i == l - 1) {
            switch (l) {
                case 2:
                    print = CheckKuoHao2(count, sign);
                    break;
                case 3:
                    print = CheckKuoHao3(count, sign);
                    break;
                case 4:
                    print = CheckKuoHao4(count, sign);
                    break;
                default:
                    break;
            }
        }
    }

    switch (roundNum) {
        case 1:
            all = Math.round(all * 10) / 10;
            break;
        case 2:
            all = Math.round(all * 100) / 100;
            break;
        case 3:
            all = Math.round(all * 1000) / 1000;
            break;
        case 4:
            all = Math.round(all * 10000) / 10000;
            break;
        default:
            break;
    }
    console.log(all);
    console.log(print);
    callback(print, all)
    // return print;
};

//【除法】
function Division(min, max, callback) {
    if (siglenum == 1) {
        var b = RanNum(1, 9);
    } else {
        var b = RanNum(min + 1, max);
    }

    var c = RanNum(min, max);//结果
    var a = b * c;

    var print = "" + a + "÷" + b + "=" + c;
    // console.log(print);
    // console.log(c);
    callback(print, c)
};

//已知被除数，随机一个整除数与商  a/b =c 已知 a , c是整数  求b
function Div(c) {
    var a = 0;
    var arr = [];
    for (let i = 0; i < c; i++) {
        a += 1;
        if (i == c - 1 || i == 0) {
            continue;
        }
        if (c % a == 0) {
            arr.push(a);
        }

    }
    // console.log(c + "-------------------")
    // console.log(arr)
    var b = arr[RanNum(0, arr.length - 1)];
    if (b == null || b == undefined) {
        b = 1;
        // console.log("b:" + b)
    }
    return b;
};

//【随机数】 [a,b-a+1]    num =[]; [num[0],num[1]]   需要 a,b  输入  [a,b-a+1]
function RanNum(min, max) {//传入原始数值 ， 随机类型 num
    max = max - min + 1;


    var num = Math.floor(Math.random() * max + min);

    var type;
    if (zheng10 == 1) {
        type = 3;
    };
    if (zheng100 == 1) {
        type = 4;
    };
    if (zheng1000 == 1) {
        type = 5;
    };
    switch (type) {
        case 0://随机输出 num[0]-num[1] 1-9  1-【9-1+1】 
            break;
        case 3://随机整10位 num[0]-num[1]  10-【99-10+1】
            num = num - num % 10;
            break;
        case 4://随机整 百 位 10 - 99
            num = num - num % 100;
            break;
        case 5://随机整 千 位
            num = num - num % 1000;
            break;
        default:
            break;
    }
    // console.log("随机数 num:" + num);
    if (miniNum == 1) {
        var numString = num.toString();
        console.log(numString)
        switch (numString.length) {
            case 1:
                numString = "00" + numString;
                break;
            case 2:
                numString = "0" + numString;
                break;
            default:
                break;
        }
        numString = numString.slice(0, -2) + '.' + numString.slice(-2);
        num = Number(numString);
        console.log("随机到的小数 num:" + num)
    }
    return num;
};

//小数   
//2位小数
//尾数 为0 省略
//
function ShowMinNum(min, max) {//随机2位尾数小数
    var num = RanNum(min, max);
    var numString = num.toString();
    console.log(numString)
    switch (numString.length) {
        case 1:
            numString = "00" + numString;
            break;
        case 2:
            numString = "0" + numString;
            break;
        default:
            break;
    }
    numString = numString.slice(0, -2) + '.' + numString.slice(-2);
    num = Number(numString);
    console.log(num)
    return num;
};

//分数
function FenNum() {

};

//批量生成
function LoadBatch(num, index, callback) {
    var grade = "";//1a,1b,2a,2b,3a,3b,4a,4b,5a,5b,6a,6b
    var testname = "";
    var tips = "";
    var math = [];
    var answer = [];
    for (let i = 0; i < num; i++) {
        switch (index) {
            //一年级上册 =========================================================
            case 1: //  10 以内 2位 加减法  减法无退位
                grade = "1a";
                testname = "10 以内加减法";
                tips = "";
                tuiwei = 0;//不允许退位
                // console.log("10 以内 2位 加减法  减法无退位");
                PrintCount(2, 0, 10, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })//长度，最小值，最大值，加，减，乘，除
                tuiwei = 1;
                break;
            case 2: //    10 以内 3位连续 加减法  减法无退位
                grade = "1a";
                testname = "10 以内3个数加减法";
                // console.log("10 以内 3位 加减法  减法无退位");
                tuiwei = 0;
                PrintCount(3, 0, 10, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                tuiwei = 1;
                break;
            case 3://      20 以内 2位 加减法  减法无退位
                grade = "1a";
                testname = "20 以内加减法";
                // console.log("20 以内 2位 加减法  减法无退位");
                tuiwei = 0;
                PrintCount(2, 0, 20, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                tuiwei = 1;
                break;
            case 4://      20 以内 3位连续 加减法  减法无退位
                grade = "1a";
                testname = "20 以内3个数加减法";
                // console.log("20 以内 3位 加减法  减法无退位");
                tuiwei = 0;
                PrintCount(3, 0, 20, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                tuiwei = 1;
                break;
            //一年级下册 =========================================================
            //【100以内的加减法一】
            //整十位数 加减1位数
            //【略】整十数加减整十数
            //【略】两位数加减1位数 或 整十位数
            //20 以内 4位连续 加减法 连加连减，混合加减
            //100 以内加减法 2位加减整十数 
            //100 以内加减法  2位加减1位数
            case 5://    
                grade = "1b";
                testname = "整10位数加减1位数";
                // console.log("整十位数 加减1位数");
                zheng10 = 1;
                siglenum = 1;
                PrintCount(2, 10, 99, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                siglenum = 0;
                zheng10 = 0;
                break;
            case 6:
                grade = "1b";
                testname = "20以内4个数加减法";
                // console.log("20 以内 4位 加减法  减法无退位");
                tuiwei = 0;
                PrintCount(4, 0, 20, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                tuiwei = 1;
                break;
            case 7:
                grade = "1b";
                testname = "100以内2位数加减整10数";
                // console.log("100 以内 2位加减整十数");
                zheng10 = 1;
                PrintCount(2, 10, 99, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                zheng10 = 0;
                break;
            case 8:
                grade = "1b";
                testname = "100以内2位数加减1位数";
                // console.log("100 以内加减法  2位加减1位数");
                siglenum = 1;
                PrintCount(2, 10, 99, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                siglenum = 0;
                break;
            //二年级上册 =========================================================
            //【表内乘法一】
            //【100以内的加减法一】
            //2位加减2位
            //连加连减，混合加减
            //乘法 1位
            case 21:
                grade = "2a";
                testname = "100以内2位加减2位数";
                // console.log("100 2位加减2位 ");
                PrintCount(2, 10, 99, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 22:
                grade = "2a";
                testname = "100以内4个数加减法";
                // console.log("100 以内 4位 加减法 ");
                PrintCount(4, 0, 99, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 23:
                grade = "2a";
                testname = "1位乘法运算";
                // console.log("1位乘法运算");
                PrintCount(2, 0, 9, null, null, 2, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            //二年级下册 =========================================================
            //【表内除法一】
            //【表内乘法二】
            //【认识万以内的加减法】
            case 24://除法 1位 
                grade = "2b";
                testname = "1位除法运算";
                // console.log("1位除法运算");
                Division(0, 9, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 25://整百位加减
                grade = "2b";
                testname = "整百位加减运算";
                // console.log("整百位加减运算");
                zheng100 = 1;
                PrintCount(2, 100, 999, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                zheng100 = 0;
                break;
            case 26://整千位加减
                grade = "2b";
                testname = "整千位加减运算";
                // console.log("整千位加减运算");
                zheng1000 = 1;
                PrintCount(2, 1000, 9999, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                zheng1000 = 0;
                break;
            //三年级上册 =========================================================
            //【有余数的除法】

            case 31://万位以内 3位数加减3位数
                grade = "3a";
                testname = "千位以内3位数加减3位数";
                // console.log("万位 3位数加减3位数");
                PrintCount(2, 100, 999, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 32://乘法 多位乘1位
                grade = "3a";
                testname = "2位数乘1位数运算";
                // console.log("乘法 多位数乘1位数运算");
                siglenum = 1;
                PrintCount(2, 10, 99, null, null, 2, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                siglenum = 0;
                break;
            case 33://分数计算   同分母加减  1减几分之几

                break;
            //三年级下册 =========================================================
            //约等于 ≈
            //小数 简单小数加减法 1位 2位小数
            case 34://乘法 2位数乘2位数
                grade = "3b";
                testname = "2位数乘2位数运算";
                // console.log("乘法 2位数乘2位数");
                PrintCount(2, 10, 99, null, null, 2, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 35://

                break;
            //四年级上册=========================================================
            case 41://乘法 3位乘2位
                grade = "4a";
                testname = "3位数乘2位数运算";
                // console.log("乘法 3位数乘2位数");
                PrintCount(2, 10, 999, null, null, 2, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 42://除法 除数1位 商1-2位 ----------------------------------------------------------------
                grade = "4a";
                testname = "多位数除1位数运算";
                // console.log("除法 除数1位 商1-2位");
                siglenum = 1;
                Division(1, 99, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                siglenum = 0;
                break;
            case 43://除法 除数2位数 商2位
                grade = "4a";
                testname = "多位数除2位数运算";
                // console.log("多位数除2位数运算");
                Division(10, 99, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            //四年级下册=========================================================
            //四则运算 加减混合 和 乘除混合 加减乘除混合  有括号的混合  关于0的运算
            case 44://四则运算
                grade = "4b";
                testname = "四则运算 有括号的加减乘除混合 ";
                // console.log("四则运算 加减混合 和 乘除混合 加减乘除混合  有括号的混合");
                PrintCount(4, 10, 99, 0, 1, 2, 3, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                break;
            case 45://小数  小数的加减法  整数减小数
                grade = "4b";
                testname = "小数的加减法 ";
                // console.log("小数的加减法  整数减小数");
                miniNum = 1;
                roundNum = 2;
                zhengmini = 1;
                PrintCount(2, 100, 999, 0, 1, null, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                miniNum = 0;
                roundNum = 0;
                zhengmini = 0;
                break;
            //五年级上册=========================================================
            case 51://小数  小数的加减法  整数减小数
                grade = "5a";
                testname = "小数和整数的加减法 ";
                // console.log("小数的加减法  整数减小数");
                miniNum = 1;
                roundNum = 4;
                PrintCount(2, 100, 999, null, null, 2, null, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                miniNum = 0;
                roundNum = 0;
                break;
            //五年级下册=========================================================
            //六年级上册=========================================================
            case 61://四则混合运算 含负数
                // console.log("四则混合运算 含负数");
                grade = "6a";
                testname = "含负数的四则混合运算";
                nega = 1;
                PrintCount(4, 1, 99, 0, 1, 2, 3, (count, all) => {
                    math.push(count);
                    answer.push(all);
                })
                nega = 0;
                break;
            //六年级下册=========================================================
            default:
                break;
        }
    }
    callback(math, answer, testname);
};
