
'use strict';
console.info("welcome legoHelper@jicanghai", location.href);

//乐高-装配中心页面
(function () {
    if (location.href.match(/http:\/\/lego\.waimai\.sankuai\.com\/(\?edit=\d+)?$/g) == null) {
        return;
    }
    console.log("乐高-装配中心页面");
    var $lastTreeItem = $();

    /**
     * 预览最后一次预览的内容
     */
    function refresh() {
        var $curr = $(".jstree-wholerow-clicked");
        $curr.removeClass("jstree-wholerow-clicked");
        $lastTreeItem.click();
        $lastTreeItem.contextmenu();
        $(".vakata-context li:eq(0) a").click();
        $curr.click();
    }

    function bind() {
        $(document)
            //绑定所有点击“预览”按钮事件
            .delegate(".vakata-context li a", "click", function (e) {
                if ($(e.target).closest("li").eq(0).index() != 0) {
                    return;
                }
                $lastTreeItem = $(".jstree-wholerow-clicked");
            })
            //点击组件属性面板的“保存”按钮后自动预览页面
            .delegate("#propsBody form > .btn-default", "click", function (e) {
                refresh();
            })
            //修改组件属性自动保存
            .delegate("#propsBody form", "change keydown", function (e) {
                if (e.type == "keydown") {
                    if (e.which != keyCodeEnum.enter) return;
                }
                $("#propsBody form > .btn-default").click();
            })
            //双击自动预览该页
            .delegate(".jstree-anchor", "dblclick", function (e) {
                // console.log(e.target);
                $(e.target).click().contextmenu();
                var $link = $(".vakata-context li:eq(0) a");
                if ($link.text().trim() == "预览") {
                    $link.click();
                } else {
                    $(".vakata-context").hide();
                }
            })
            //选中组件按删除键删除节点
            .delegate("#jstree", "keydown", function (e) {
                // console.log(e.which);
                //在组件列表树内部按退格键删除节点
                if (e.which == keyCodeEnum.delete || e.which == keyCodeEnum.backspace) {
                    var $curr = $(".jstree-wholerow-clicked");
                    if ($curr.length == 0) return;
                    $curr.contextmenu();
                    $(".vakata-context li:eq(2) a").click();
                }
            })
            ;


    }

    function init() {
        //默认展开组件属性面板
        $(".panel-collapse-flag").click();
    }

    //-----
    init();
    bind();
} ());

//乐高-组件管理页面
(function () {
    if (location.href.match(/http:\/\/lego\.waimai\.sankuai\.com\/components/g) == null) {
        return;
    }
    console.log("乐高-组件管理页面");

    function bind() {
        $(document).delegate(".ace_text-input", "keydown", function (e) {
            //Command+S 保存
            if (e.metaKey && e.which == 83) {
                save();
            }
            //Ctrl+S 保存
            if (e.ctrlKey && e.which == 83) {
                save();
            }

            function save() {
                $(".btn-save").click();
                e.preventDefault();
            }
        });
    }

    function init() {

    }
    //----
    init();
    bind();
} ());


enum keyCodeEnum {
    backspace = 8,
    tab = 9,
    enter = 13,
    shift = 16,
    ctrl = 17,
    alt = 18,
    pause_break = 19,
    caps_lock = 20,
    escape = 27,
    space = 32,
    page_up = 33,
    page_down = 34,
    end = 35,
    home = 36,
    left_arrow = 37,
    up_arrow = 38,
    right_arrow = 39,
    down_arrow = 40,
    insert = 45,
    delete = 46,
    num_0 = 48,
    num_1 = 49,
    num_2 = 50,
    num_3 = 51,
    num_4 = 52,
    num_5 = 53,
    num_6 = 54,
    num_7 = 55,
    num_8 = 56,
    num_9 = 57,
    a = 65,
    b = 66,
    c = 67,
    d = 68,
    e = 69,
    f = 70,
    g = 71,
    h = 72,
    i = 73,
    j = 74,
    k = 75,
    l = 76,
    m = 77,
    n = 78,
    o = 79,
    p = 80,
    q = 81,
    r = 82,
    s = 83,
    t = 84,
    u = 85,
    v = 86,
    w = 87,
    x = 88,
    y = 89,
    z = 90,
    left_window_key = 91,
    right_window_key = 92,
    select_key = 93,
    numpad_0 = 96,
    numpad_1 = 97,
    numpad_2 = 98,
    numpad_3 = 99,
    numpad_4 = 100,
    numpad_5 = 101,
    numpad_6 = 102,
    numpad_7 = 103,
    numpad_8 = 104,
    numpad_9 = 105,
    multiply = 106,
    add = 107,
    subtract = 109,
    decimal_point = 110,
    divide = 111,
    f1 = 112,
    f2 = 113,
    f3 = 114,
    f4 = 115,
    f5 = 116,
    f6 = 117,
    f7 = 118,
    f8 = 119,
    f9 = 120,
    f10 = 121,
    f11 = 122,
    f12 = 123,
    num_lock = 144,
    scroll_lock = 145,
    semi_colon = 186,
    equal_sign = 187,
    comma = 188,
    dash = 189,
    period = 190,
    forward_slash = 191,
    grave_accent = 192,
    open_bracket = 219,
    back_slash = 220,
    close_braket = 221,
    single_quote = 222
}

var a = {
    "data":
    [
        {
            "provinceId": 310000, "provinceName": "上海市", "provincePinYin": "shanghaishi", "cityList": [{ "cityId": 310100, "cityName": "上海市", "cityPinYin": "shanghaishi" }]
        }, { "provinceId": 530000, "provinceName": "云南省", "provincePinYin": "yunnansheng", "cityList": [{ "cityId": 530900, "cityName": "临沧市", "cityPinYin": "lincangshi" }, { "cityId": 530700, "cityName": "丽江市", "cityPinYin": "lijiangshi" }, { "cityId": 530500, "cityName": "保山市", "cityPinYin": "baoshanshi" }, { "cityId": 532900, "cityName": "大理白族自治州", "cityPinYin": "dalibaizuzizhizhou" }, { "cityId": 533100, "cityName": "德宏傣族景颇族自治州", "cityPinYin": "dehongdaizujingpozuzizhizhou" }, { "cityId": 533300, "cityName": "怒江傈僳族自治州", "cityPinYin": "nujianglisuzuzizhizhou" }, { "cityId": 532600, "cityName": "文山壮族苗族自治州", "cityPinYin": "wenshanzhuangzumiaozuzizhizhou" }, { "cityId": 530100, "cityName": "昆明市", "cityPinYin": "kunmingshi" }, { "cityId": 530600, "cityName": "昭通市", "cityPinYin": "zhaotongshi" }, { "cityId": 530800, "cityName": "普洱市", "cityPinYin": "puershi" }, { "cityId": 530300, "cityName": "曲靖市", "cityPinYin": "qujingshi" }, { "cityId": 532300, "cityName": "楚雄彝族自治州", "cityPinYin": "chuxiongyizuzizhizhou" }, { "cityId": 530400, "cityName": "玉溪市", "cityPinYin": "yuxishi" }, { "cityId": 532500, "cityName": "红河哈尼族彝族自治州", "cityPinYin": "honghehanizuyizuzizhizhou" }, { "cityId": 532800, "cityName": "西双版纳傣族自治州", "cityPinYin": "xishuangbannadaizuzizhizhou" }, { "cityId": 533400, "cityName": "迪庆藏族自治州", "cityPinYin": "diqingzangzuzizhizhou" }] }, { "provinceId": 150000, "provinceName": "内蒙古自治区", "provincePinYin": "neimengguzizhiqu", "cityList": [{ "cityId": 150900, "cityName": "乌兰察布市", "cityPinYin": "wulanchabushi" }, { "cityId": 150300, "cityName": "乌海市", "cityPinYin": "wuhaishi" }, { "cityId": 152200, "cityName": "兴安盟", "cityPinYin": "xinganmeng" }, { "cityId": 150200, "cityName": "包头市", "cityPinYin": "baotoushi" }, { "cityId": 150700, "cityName": "呼伦贝尔市", "cityPinYin": "hulunbeiershi" }, { "cityId": 150100, "cityName": "呼和浩特市", "cityPinYin": "huhehaoteshi" }, { "cityId": 150800, "cityName": "巴彦淖尔市", "cityPinYin": "bayannaoershi" }, { "cityId": 150400, "cityName": "赤峰市", "cityPinYin": "chifengshi" }, { "cityId": 150500, "cityName": "通辽市", "cityPinYin": "tongliaoshi" }, { "cityId": 150600, "cityName": "鄂尔多斯市", "cityPinYin": "eerduosishi" }, { "cityId": 152500, "cityName": "锡林郭勒盟", "cityPinYin": "xilinguolemeng" }, { "cityId": 152900, "cityName": "阿拉善盟", "cityPinYin": "alashanmeng" }] }, { "provinceId": 110000, "provinceName": "北京市", "provincePinYin": "beijingshi", "cityList": [{ "cityId": 110100, "cityName": "北京市", "cityPinYin": "beijingshi" }] }, { "provinceId": 710000, "provinceName": "台湾", "provincePinYin": "taiwan", "cityList": [{ "cityId": 711700, "cityName": "云林县", "cityPinYin": "yunlinxian" }, { "cityId": 711300, "cityName": "南投县", "cityPinYin": "nantouxian" }, { "cityId": 711000, "cityName": "台东县", "cityPinYin": "taidongxian" }, { "cityId": 710300, "cityName": "台中市", "cityPinYin": "taizhongshi" }, { "cityId": 710100, "cityName": "台北市", "cityPinYin": "taibeishi" }, { "cityId": 710400, "cityName": "台南市", "cityPinYin": "tainanshi" }, { "cityId": 712100, "cityName": "嘉义县", "cityPinYin": "jiayixian" }, { "cityId": 712000, "cityName": "嘉义市", "cityPinYin": "jiayishi" }, { "cityId": 711600, "cityName": "基隆市", "cityPinYin": "jilongshi" }, { "cityId": 711100, "cityName": "宜兰县", "cityPinYin": "yilanxian" }, { "cityId": 711400, "cityName": "屏东县", "cityPinYin": "pingdongxian" }, { "cityId": 712200, "cityName": "彰化县", "cityPinYin": "zhanghuaxian" }, { "cityId": 710200, "cityName": "新北市", "cityPinYin": "xinbeishi" }, { "cityId": 711900, "cityName": "新竹县", "cityPinYin": "xinzhuxian" }, { "cityId": 711800, "cityName": "新竹市", "cityPinYin": "xinzhushi" }, { "cityId": 710600, "cityName": "桃园市", "cityPinYin": "taoyuanshi" }, { "cityId": 712300, "cityName": "澎湖县", "cityPinYin": "penghuxian" }, { "cityId": 711200, "cityName": "花莲县", "cityPinYin": "hualianxian" }, { "cityId": 711500, "cityName": "苗栗县", "cityPinYin": "miaolixian" }, { "cityId": 713100, "cityName": "连江县", "cityPinYin": "lianjiangxian" }, { "cityId": 713000, "cityName": "金门县", "cityPinYin": "jinmenxian" }, { "cityId": 710500, "cityName": "高雄市", "cityPinYin": "gaoxiongshi" }] }, { "provinceId": 220000, "provinceName": "吉林省", "provincePinYin": "jilinsheng", "cityList": [{ "cityId": 220200, "cityName": "吉林市", "cityPinYin": "jilinshi" }, { "cityId": 220300, "cityName": "四平市", "cityPinYin": "sipingshi" }, { "cityId": 222400, "cityName": "延边朝鲜族自治州", "cityPinYin": "yanbianchaoxianzuzizhizhou" }, { "cityId": 220700, "cityName": "松原市", "cityPinYin": "songyuanshi" }, { "cityId": 220800, "cityName": "白城市", "cityPinYin": "baichengshi" }, { "cityId": 220600, "cityName": "白山市", "cityPinYin": "baishanshi" }, { "cityId": 220400, "cityName": "辽源市", "cityPinYin": "liaoyuanshi" }, { "cityId": 220500, "cityName": "通化市", "cityPinYin": "tonghuashi" }, { "cityId": 220100, "cityName": "长春市", "cityPinYin": "changchunshi" }] }, { "provinceId": 510000, "provinceName": "四川省", "provincePinYin": "sichuansheng", "cityList": [{ "cityId": 511100, "cityName": "乐山市", "cityPinYin": "leshanshi" }, { "cityId": 511000, "cityName": "内江市", "cityPinYin": "neijiangshi" }, { "cityId": 513400, "cityName": "凉山彝族自治州", "cityPinYin": "liangshanyizuzizhizhou" }, { "cityId": 511300, "cityName": "南充市", "cityPinYin": "nanchongshi" }, { "cityId": 511500, "cityName": "宜宾市", "cityPinYin": "yibinshi" }, { "cityId": 511900, "cityName": "巴中市", "cityPinYin": "bazhongshi" }, { "cityId": 510800, "cityName": "广元市", "cityPinYin": "guangyuanshi" }, { "cityId": 511600, "cityName": "广安市", "cityPinYin": "guanganshi" }, { "cityId": 510600, "cityName": "德阳市", "cityPinYin": "deyangshi" }, { "cityId": 510100, "cityName": "成都市", "cityPinYin": "chengdushi" }, { "cityId": 510400, "cityName": "攀枝花市", "cityPinYin": "panzhihuashi" }, { "cityId": 510500, "cityName": "泸州市", "cityPinYin": "luzhoushi" }, { "cityId": 513300, "cityName": "甘孜藏族自治州", "cityPinYin": "ganzizangzuzizhizhou" }, { "cityId": 511400, "cityName": "眉山市", "cityPinYin": "meishanshi" }, { "cityId": 510700, "cityName": "绵阳市", "cityPinYin": "mianyangshi" }, { "cityId": 510300, "cityName": "自贡市", "cityPinYin": "zigongshi" }, { "cityId": 512000, "cityName": "资阳市", "cityPinYin": "ziyangshi" }, { "cityId": 511700, "cityName": "达州市", "cityPinYin": "dazhoushi" }, { "cityId": 510900, "cityName": "遂宁市", "cityPinYin": "suiningshi" }, { "cityId": 513200, "cityName": "阿坝藏族羌族自治州", "cityPinYin": "abazangzuqiangzuzizhizhou" }, { "cityId": 511800, "cityName": "雅安市", "cityPinYin": "yaanshi" }] }, { "provinceId": 120000, "provinceName": "天津市", "provincePinYin": "tianjinshi", "cityList": [{ "cityId": 120100, "cityName": "天津市", "cityPinYin": "tianjinshi" }] }, { "provinceId": 640000, "provinceName": "宁夏回族自治区", "provincePinYin": "ningxiahuizuzizhiqu", "cityList": [{ "cityId": 640500, "cityName": "中卫市", "cityPinYin": "zhongweishi" }, { "cityId": 640300, "cityName": "吴忠市", "cityPinYin": "wuzhongshi" }, { "cityId": 640400, "cityName": "固原市", "cityPinYin": "guyuanshi" }, { "cityId": 640200, "cityName": "石嘴山市", "cityPinYin": "shizuishanshi" }, { "cityId": 640100, "cityName": "银川市", "cityPinYin": "yinchuanshi" }] }, { "provinceId": 340000, "provinceName": "安徽省", "provincePinYin": "anhuisheng", "cityList": [{ "cityId": 341600, "cityName": "亳州市", "cityPinYin": "bozhoushi" }, { "cityId": 341500, "cityName": "六安市", "cityPinYin": "liuanshi" }, { "cityId": 340100, "cityName": "合肥市", "cityPinYin": "hefeishi" }, { "cityId": 340800, "cityName": "安庆市", "cityPinYin": "anqingshi" }, { "cityId": 341800, "cityName": "宣城市", "cityPinYin": "xuanchengshi" }, { "cityId": 341300, "cityName": "宿州市", "cityPinYin": "suzhoushi" }, { "cityId": 341700, "cityName": "池州市", "cityPinYin": "chizhoushi" }, { "cityId": 340600, "cityName": "淮北市", "cityPinYin": "huaibeishi" }, { "cityId": 340400, "cityName": "淮南市", "cityPinYin": "huainanshi" }, { "cityId": 341100, "cityName": "滁州市", "cityPinYin": "chuzhoushi" }, { "cityId": 340200, "cityName": "芜湖市", "cityPinYin": "wuhushi" }, { "cityId": 340300, "cityName": "蚌埠市", "cityPinYin": "bangbushi" }, { "cityId": 340700, "cityName": "铜陵市", "cityPinYin": "tonglingshi" }, { "cityId": 341200, "cityName": "阜阳市", "cityPinYin": "fuyangshi" }, { "cityId": 340500, "cityName": "马鞍山市", "cityPinYin": "maanshanshi" }, { "cityId": 341000, "cityName": "黄山市", "cityPinYin": "huangshanshi" }] }, { "provinceId": 370000, "provinceName": "山东省", "provincePinYin": "shandongsheng", "cityList": [{ "cityId": 370500, "cityName": "东营市", "cityPinYin": "dongyingshi" }, { "cityId": 371300, "cityName": "临沂市", "cityPinYin": "linyishi" }, { "cityId": 371000, "cityName": "威海市", "cityPinYin": "weihaishi" }, { "cityId": 371400, "cityName": "德州市", "cityPinYin": "dezhoushi" }, { "cityId": 371100, "cityName": "日照市", "cityPinYin": "rizhaoshi" }, { "cityId": 370400, "cityName": "枣庄市", "cityPinYin": "zaozhuangshi" }, { "cityId": 370900, "cityName": "泰安市", "cityPinYin": "taianshi" }, { "cityId": 370100, "cityName": "济南市", "cityPinYin": "jinanshi" }, { "cityId": 370800, "cityName": "济宁市", "cityPinYin": "jiningshi" }, { "cityId": 370300, "cityName": "淄博市", "cityPinYin": "ziboshi" }, { "cityId": 371600, "cityName": "滨州市", "cityPinYin": "binzhoushi" }, { "cityId": 370700, "cityName": "潍坊市", "cityPinYin": "weifangshi" }, { "cityId": 370600, "cityName": "烟台市", "cityPinYin": "yantaishi" }, { "cityId": 371500, "cityName": "聊城市", "cityPinYin": "liaochengshi" }, { "cityId": 371200, "cityName": "莱芜市", "cityPinYin": "laiwushi" }, { "cityId": 371700, "cityName": "菏泽市", "cityPinYin": "hezeshi" }, { "cityId": 370200, "cityName": "青岛市", "cityPinYin": "qingdaoshi" }] }, { "provinceId": 140000, "provinceName": "山西省", "provincePinYin": "shanxisheng", "cityList": [{ "cityId": 141000, "cityName": "临汾市", "cityPinYin": "linfenshi" }, { "cityId": 141100, "cityName": "吕梁市", "cityPinYin": "lu:liangshi" }, { "cityId": 140200, "cityName": "大同市", "cityPinYin": "datongshi" }, { "cityId": 140100, "cityName": "太原市", "cityPinYin": "taiyuanshi" }, { "cityId": 140900, "cityName": "忻州市", "cityPinYin": "xinzhoushi" }, { "cityId": 140700, "cityName": "晋中市", "cityPinYin": "jinzhongshi" }, { "cityId": 140500, "cityName": "晋城市", "cityPinYin": "jinchengshi" }, { "cityId": 140600, "cityName": "朔州市", "cityPinYin": "shuozhoushi" }, { "cityId": 140800, "cityName": "运城市", "cityPinYin": "yunchengshi" }, { "cityId": 140400, "cityName": "长治市", "cityPinYin": "changzhishi" }, { "cityId": 140300, "cityName": "阳泉市", "cityPinYin": "yangquanshi" }] }, { "provinceId": 440000, "provinceName": "广东省", "provincePinYin": "guangdongsheng", "cityList": [{ "cityId": 441900, "cityName": "东莞市", "cityPinYin": "dongwanshi" }, { "cityId": 442000, "cityName": "中山市", "cityPinYin": "zhongshanshi" }, { "cityId": 445300, "cityName": "云浮市", "cityPinYin": "yunfushi" }, { "cityId": 440600, "cityName": "佛山市", "cityPinYin": "foshanshi" }, { "cityId": 440100, "cityName": "广州市", "cityPinYin": "guangzhoushi" }, { "cityId": 441300, "cityName": "惠州市", "cityPinYin": "huizhoushi" }, { "cityId": 445200, "cityName": "揭阳市", "cityPinYin": "jieyangshi" }, { "cityId": 441400, "cityName": "梅州市", "cityPinYin": "meizhoushi" }, { "cityId": 440500, "cityName": "汕头市", "cityPinYin": "shantoushi" }, { "cityId": 441500, "cityName": "汕尾市", "cityPinYin": "shanweishi" }, { "cityId": 440700, "cityName": "江门市", "cityPinYin": "jiangmenshi" }, { "cityId": 441600, "cityName": "河源市", "cityPinYin": "heyuanshi" }, { "cityId": 440300, "cityName": "深圳市", "cityPinYin": "shenzhenshi" }, { "cityId": 441800, "cityName": "清远市", "cityPinYin": "qingyuanshi" }, { "cityId": 440800, "cityName": "湛江市", "cityPinYin": "zhanjiangshi" }, { "cityId": 445100, "cityName": "潮州市", "cityPinYin": "chaozhoushi" }, { "cityId": 440400, "cityName": "珠海市", "cityPinYin": "zhuhaishi" }, { "cityId": 441200, "cityName": "肇庆市", "cityPinYin": "zhaoqingshi" }, { "cityId": 440900, "cityName": "茂名市", "cityPinYin": "maomingshi" }, { "cityId": 441700, "cityName": "阳江市", "cityPinYin": "yangjiangshi" }, { "cityId": 440200, "cityName": "韶关市", "cityPinYin": "shaoguanshi" }] }, { "provinceId": 450000, "provinceName": "广西壮族自治区", "provincePinYin": "guangxizhuangzuzizhiqu", "cityList": [{ "cityId": 450500, "cityName": "北海市", "cityPinYin": "beihaishi" }, { "cityId": 450100, "cityName": "南宁市", "cityPinYin": "nanningshi" }, { "cityId": 451400, "cityName": "崇左市", "cityPinYin": "chongzuoshi" }, { "cityId": 451300, "cityName": "来宾市", "cityPinYin": "laibinshi" }, { "cityId": 450200, "cityName": "柳州市", "cityPinYin": "liuzhoushi" }, { "cityId": 450300, "cityName": "桂林市", "cityPinYin": "guilinshi" }, { "cityId": 450400, "cityName": "梧州市", "cityPinYin": "wuzhoushi" }, { "cityId": 451200, "cityName": "河池市", "cityPinYin": "hechishi" }, { "cityId": 450900, "cityName": "玉林市", "cityPinYin": "yulinshi" }, { "cityId": 451000, "cityName": "百色市", "cityPinYin": "baiseshi" }, { "cityId": 450800, "cityName": "贵港市", "cityPinYin": "guigangshi" }, { "cityId": 451100, "cityName": "贺州市", "cityPinYin": "hezhoushi" }, { "cityId": 450700, "cityName": "钦州市", "cityPinYin": "qinzhoushi" }, { "cityId": 450600, "cityName": "防城港市", "cityPinYin": "fangchenggangshi" }] }, { "provinceId": 650000, "provinceName": "新疆维吾尔自治区", "provincePinYin": "xinjiangweiwuerzizhiqu", "cityList": [{ "cityId": 650100, "cityName": "乌鲁木齐市", "cityPinYin": "wulumuqishi" }, { "cityId": 6590041, "cityName": "五家渠市", "cityPinYin": "wujiaqushi" }, { "cityId": 654000, "cityName": "伊犁哈萨克自治州", "cityPinYin": "yilihasakezizhizhou" }, { "cityId": 653000, "cityName": "克孜勒苏柯尔克孜自治州", "cityPinYin": "kezilesukeerkezizizhizhou" }, { "cityId": 650200, "cityName": "克拉玛依市", "cityPinYin": "kelamayishi" }, { "cityId": 6590051, "cityName": "北屯市", "cityPinYin": "beitunshi" }, { "cityId": 652700, "cityName": "博尔塔拉蒙古自治州", "cityPinYin": "boertalamengguzizhizhou" }, { "cityId": 10000007, "cityName": "双河市", "cityPinYin": "shuangheshi" }, { "cityId": 652100, "cityName": "吐鲁番市", "cityPinYin": "tulufanshi" }, { "cityId": 653200, "cityName": "和田地区", "cityPinYin": "hetiandiqu" }, { "cityId": 652200, "cityName": "哈密地区", "cityPinYin": "hamidiqu" }, { "cityId": 653100, "cityName": "喀什地区", "cityPinYin": "kashidiqu" }, { "cityId": 6590031, "cityName": "图木舒克市", "cityPinYin": "tumushukeshi" }, { "cityId": 654200, "cityName": "塔城地区", "cityPinYin": "tachengdiqu" }, { "cityId": 652800, "cityName": "巴音郭楞蒙古自治州", "cityPinYin": "bayinguolengmengguzizhizhou" }, { "cityId": 652300, "cityName": "昌吉回族自治州", "cityPinYin": "changjihuizuzizhizhou" }, { "cityId": 6590011, "cityName": "石河子市", "cityPinYin": "shihezishi" }, { "cityId": 6590061, "cityName": "铁门关市", "cityPinYin": "tiemenguanshi" }, { "cityId": 652900, "cityName": "阿克苏地区", "cityPinYin": "akesudiqu" }, { "cityId": 654300, "cityName": "阿勒泰地区", "cityPinYin": "aletaidiqu" }, { "cityId": 6590021, "cityName": "阿拉尔市", "cityPinYin": "alaershi" }] }, { "provinceId": 320000, "provinceName": "江苏省", "provincePinYin": "jiangsusheng", "cityList": [{ "cityId": 320100, "cityName": "南京市", "cityPinYin": "nanjingshi" }, { "cityId": 320600, "cityName": "南通市", "cityPinYin": "nantongshi" }, { "cityId": 321300, "cityName": "宿迁市", "cityPinYin": "suqianshi" }, { "cityId": 320400, "cityName": "常州市", "cityPinYin": "changzhoushi" }, { "cityId": 320300, "cityName": "徐州市", "cityPinYin": "xuzhoushi" }, { "cityId": 321000, "cityName": "扬州市", "cityPinYin": "yangzhoushi" }, { "cityId": 320200, "cityName": "无锡市", "cityPinYin": "wuxishi" }, { "cityId": 321200, "cityName": "泰州市", "cityPinYin": "taizhoushi" }, { "cityId": 320800, "cityName": "淮安市", "cityPinYin": "huaianshi" }, { "cityId": 320900, "cityName": "盐城市", "cityPinYin": "yanchengshi" }, { "cityId": 320500, "cityName": "苏州市", "cityPinYin": "suzhoushi" }, { "cityId": 320700, "cityName": "连云港市", "cityPinYin": "lianyungangshi" }, { "cityId": 321100, "cityName": "镇江市", "cityPinYin": "zhenjiangshi" }] }, { "provinceId": 360000, "provinceName": "江西省", "provincePinYin": "jiangxisheng", "cityList": [{ "cityId": 361100, "cityName": "上饶市", "cityPinYin": "shangraoshi" }, { "cityId": 360400, "cityName": "九江市", "cityPinYin": "jiujiangshi" }, { "cityId": 360100, "cityName": "南昌市", "cityPinYin": "nanchangshi" }, { "cityId": 360800, "cityName": "吉安市", "cityPinYin": "jianshi" }, { "cityId": 360900, "cityName": "宜春市", "cityPinYin": "yichunshi" }, { "cityId": 361000, "cityName": "抚州市", "cityPinYin": "fuzhoushi" }, { "cityId": 360500, "cityName": "新余市", "cityPinYin": "xinyushi" }, { "cityId": 360200, "cityName": "景德镇市", "cityPinYin": "jingdezhenshi" }, { "cityId": 360300, "cityName": "萍乡市", "cityPinYin": "pingxiangshi" }, { "cityId": 360700, "cityName": "赣州市", "cityPinYin": "ganzhoushi" }, { "cityId": 360600, "cityName": "鹰潭市", "cityPinYin": "yingtanshi" }] }, { "provinceId": 130000, "provinceName": "河北省", "provincePinYin": "hebeisheng", "cityList": [{ "cityId": 130600, "cityName": "保定市", "cityPinYin": "baodingshi" }, { "cityId": 130200, "cityName": "唐山市", "cityPinYin": "tangshanshi" }, { "cityId": 131000, "cityName": "廊坊市", "cityPinYin": "langfangshi" }, { "cityId": 130700, "cityName": "张家口市", "cityPinYin": "zhangjiakoushi" }, { "cityId": 130800, "cityName": "承德市", "cityPinYin": "chengdeshi" }, { "cityId": 130900, "cityName": "沧州市", "cityPinYin": "cangzhoushi" }, { "cityId": 130100, "cityName": "石家庄市", "cityPinYin": "shijiazhuangshi" }, { "cityId": 130300, "cityName": "秦皇岛市", "cityPinYin": "qinhuangdaoshi" }, { "cityId": 131100, "cityName": "衡水市", "cityPinYin": "hengshuishi" }, { "cityId": 130500, "cityName": "邢台市", "cityPinYin": "xingtaishi" }, { "cityId": 130400, "cityName": "邯郸市", "cityPinYin": "handanshi" }] }, { "provinceId": 410000, "provinceName": "河南省", "provincePinYin": "henansheng", "cityList": [{ "cityId": 411200, "cityName": "三门峡市", "cityPinYin": "sanmenxiashi" }, { "cityId": 411500, "cityName": "信阳市", "cityPinYin": "xinyangshi" }, { "cityId": 411300, "cityName": "南阳市", "cityPinYin": "nanyangshi" }, { "cityId": 411600, "cityName": "周口市", "cityPinYin": "zhoukoushi" }, { "cityId": 411400, "cityName": "商丘市", "cityPinYin": "shangqiushi" }, { "cityId": 410500, "cityName": "安阳市", "cityPinYin": "anyangshi" }, { "cityId": 410400, "cityName": "平顶山市", "cityPinYin": "pingdingshanshi" }, { "cityId": 410200, "cityName": "开封市", "cityPinYin": "kaifengshi" }, { "cityId": 410700, "cityName": "新乡市", "cityPinYin": "xinxiangshi" }, { "cityId": 410300, "cityName": "洛阳市", "cityPinYin": "luoyangshi" }, { "cityId": 4190011, "cityName": "济源市", "cityPinYin": "jiyuanshi" }, { "cityId": 411100, "cityName": "漯河市", "cityPinYin": "luoheshi" }, { "cityId": 410900, "cityName": "濮阳市", "cityPinYin": "puyangshi" }, { "cityId": 410800, "cityName": "焦作市", "cityPinYin": "jiaozuoshi" }, { "cityId": 411000, "cityName": "许昌市", "cityPinYin": "xuchangshi" }, { "cityId": 410100, "cityName": "郑州市", "cityPinYin": "zhengzhoushi" }, { "cityId": 411700, "cityName": "驻马店市", "cityPinYin": "zhumadianshi" }, { "cityId": 410600, "cityName": "鹤壁市", "cityPinYin": "hebishi" }] }, { "provinceId": 330000, "provinceName": "浙江省", "provincePinYin": "zhejiangsheng", "cityList": [{ "cityId": 331100, "cityName": "丽水市", "cityPinYin": "lishuishi" }, { "cityId": 331000, "cityName": "台州市", "cityPinYin": "taizhoushi" }, { "cityId": 330400, "cityName": "嘉兴市", "cityPinYin": "jiaxingshi" }, { "cityId": 330200, "cityName": "宁波市", "cityPinYin": "ningboshi" }, { "cityId": 330100, "cityName": "杭州市", "cityPinYin": "hangzhoushi" }, { "cityId": 330300, "cityName": "温州市", "cityPinYin": "wenzhoushi" }, { "cityId": 330500, "cityName": "湖州市", "cityPinYin": "huzhoushi" }, { "cityId": 330600, "cityName": "绍兴市", "cityPinYin": "shaoxingshi" }, { "cityId": 330900, "cityName": "舟山市", "cityPinYin": "zhoushanshi" }, { "cityId": 330800, "cityName": "衢州市", "cityPinYin": "quzhoushi" }, { "cityId": 330700, "cityName": "金华市", "cityPinYin": "jinhuashi" }] }, { "provinceId": 460000, "provinceName": "海南省", "provincePinYin": "hainansheng", "cityList": [{ "cityId": 4690061, "cityName": "万宁市", "cityPinYin": "wanningshi" }, { "cityId": 460200, "cityName": "三亚市", "cityPinYin": "sanyashi" }, { "cityId": 460300, "cityName": "三沙市", "cityPinYin": "sanshashi" }, { "cityId": 4690071, "cityName": "东方市", "cityPinYin": "dongfangshi" }, { "cityId": 4690241, "cityName": "临高县", "cityPinYin": "lingaoxian" }, { "cityId": 4690271, "cityName": "乐东黎族自治县", "cityPinYin": "ledonglizuzizhixian" }, { "cityId": 4690011, "cityName": "五指山市", "cityPinYin": "wuzhishanshi" }, { "cityId": 4690291, "cityName": "保亭黎族苗族自治县", "cityPinYin": "baotinglizumiaozuzizhixian" }, { "cityId": 4690031, "cityName": "儋州市", "cityPinYin": "danzhoushi" }, { "cityId": 4690211, "cityName": "定安县", "cityPinYin": "dinganxian" }, { "cityId": 4690221, "cityName": "屯昌县", "cityPinYin": "tunchangxian" }, { "cityId": 4690051, "cityName": "文昌市", "cityPinYin": "wenchangshi" }, { "cityId": 4690261, "cityName": "昌江黎族自治县", "cityPinYin": "changjianglizuzizhixian" }, { "cityId": 460100, "cityName": "海口市", "cityPinYin": "haikoushi" }, { "cityId": 4690231, "cityName": "澄迈县", "cityPinYin": "chengmaixian" }, { "cityId": 4690301, "cityName": "琼中黎族苗族自治县", "cityPinYin": "qiongzhonglizumiaozuzizhixian" }, { "cityId": 4690021, "cityName": "琼海市", "cityPinYin": "qionghaishi" }, { "cityId": 4690251, "cityName": "白沙黎族自治县", "cityPinYin": "baishalizuzizhixian" }, { "cityId": 4690281, "cityName": "陵水黎族自治县", "cityPinYin": "lingshuilizuzizhixian" }] }, { "provinceId": 420000, "provinceName": "湖北省", "provincePinYin": "hubeisheng", "cityList": [{ "cityId": 4290041, "cityName": "仙桃市", "cityPinYin": "xiantaoshi" }, { "cityId": 420300, "cityName": "十堰市", "cityPinYin": "shiyanshi" }, { "cityId": 421200, "cityName": "咸宁市", "cityPinYin": "xianningshi" }, { "cityId": 4290061, "cityName": "天门市", "cityPinYin": "tianmenshi" }, { "cityId": 420900, "cityName": "孝感市", "cityPinYin": "xiaoganshi" }, { "cityId": 420500, "cityName": "宜昌市", "cityPinYin": "yichangshi" }, { "cityId": 422800, "cityName": "恩施土家族苗族自治州", "cityPinYin": "enshitujiazumiaozuzizhizhou" }, { "cityId": 420100, "cityName": "武汉市", "cityPinYin": "wuhanshi" }, { "cityId": 4290051, "cityName": "潜江市", "cityPinYin": "qianjiangshi" }, { "cityId": 4290211, "cityName": "神农架林区", "cityPinYin": "shennongjialinqu" }, { "cityId": 421000, "cityName": "荆州市", "cityPinYin": "jingzhoushi" }, { "cityId": 420800, "cityName": "荆门市", "cityPinYin": "jingmenshi" }, { "cityId": 420600, "cityName": "襄阳市", "cityPinYin": "xiangyangshi" }, { "cityId": 420700, "cityName": "鄂州市", "cityPinYin": "ezhoushi" }, { "cityId": 421300, "cityName": "随州市", "cityPinYin": "suizhoushi" }, { "cityId": 421100, "cityName": "黄冈市", "cityPinYin": "huanggangshi" }, { "cityId": 420200, "cityName": "黄石市", "cityPinYin": "huangshishi" }] }, { "provinceId": 430000, "provinceName": "湖南省", "provincePinYin": "hunansheng", "cityList": [{ "cityId": 431300, "cityName": "娄底市", "cityPinYin": "loudishi" }, { "cityId": 430600, "cityName": "岳阳市", "cityPinYin": "yueyangshi" }, { "cityId": 430700, "cityName": "常德市", "cityPinYin": "changdeshi" }, { "cityId": 430800, "cityName": "张家界市", "cityPinYin": "zhangjiajieshi" }, { "cityId": 431200, "cityName": "怀化市", "cityPinYin": "huaihuashi" }, { "cityId": 430200, "cityName": "株洲市", "cityPinYin": "zhuzhoushi" }, { "cityId": 431100, "cityName": "永州市", "cityPinYin": "yongzhoushi" }, { "cityId": 430300, "cityName": "湘潭市", "cityPinYin": "xiangtanshi" }, { "cityId": 433100, "cityName": "湘西土家族苗族自治州", "cityPinYin": "xiangxitujiazumiaozuzizhizhou" }, { "cityId": 430900, "cityName": "益阳市", "cityPinYin": "yiyangshi" }, { "cityId": 430400, "cityName": "衡阳市", "cityPinYin": "hengyangshi" }, { "cityId": 430500, "cityName": "邵阳市", "cityPinYin": "shaoyangshi" }, { "cityId": 431000, "cityName": "郴州市", "cityPinYin": "chenzhoushi" }, { "cityId": 430100, "cityName": "长沙市", "cityPinYin": "changshashi" }] }, { "provinceId": 820000, "provinceName": "澳门特别行政区", "provincePinYin": "aomentebiexingzhengqu", "cityList": [{ "cityId": 820001, "cityName": "澳门", "cityPinYin": "aomen" }] }, { "provinceId": 620000, "provinceName": "甘肃省", "provincePinYin": "gansusheng", "cityList": [{ "cityId": 622900, "cityName": "临夏回族自治州", "cityPinYin": "linxiahuizuzizhizhou" }, { "cityId": 620100, "cityName": "兰州市", "cityPinYin": "lanzhoushi" }, { "cityId": 620200, "cityName": "嘉峪关市", "cityPinYin": "jiayuguanshi" }, { "cityId": 620500, "cityName": "天水市", "cityPinYin": "tianshuishi" }, { "cityId": 621100, "cityName": "定西市", "cityPinYin": "dingxishi" }, { "cityId": 620800, "cityName": "平凉市", "cityPinYin": "pingliangshi" }, { "cityId": 621000, "cityName": "庆阳市", "cityPinYin": "qingyangshi" }, { "cityId": 620700, "cityName": "张掖市", "cityPinYin": "zhangyeshi" }, { "cityId": 620600, "cityName": "武威市", "cityPinYin": "wuweishi" }, { "cityId": 623000, "cityName": "甘南藏族自治州", "cityPinYin": "gannanzangzuzizhizhou" }, { "cityId": 620400, "cityName": "白银市", "cityPinYin": "baiyinshi" }, { "cityId": 620900, "cityName": "酒泉市", "cityPinYin": "jiuquanshi" }, { "cityId": 620300, "cityName": "金昌市", "cityPinYin": "jinchangshi" }, { "cityId": 621200, "cityName": "陇南市", "cityPinYin": "longnanshi" }] }, { "provinceId": 350000, "provinceName": "福建省", "provincePinYin": "fujiansheng", "cityList": [{ "cityId": 350400, "cityName": "三明市", "cityPinYin": "sanmingshi" }, { "cityId": 350700, "cityName": "南平市", "cityPinYin": "nanpingshi" }, { "cityId": 350200, "cityName": "厦门市", "cityPinYin": "shamenshi" }, { "cityId": 350900, "cityName": "宁德市", "cityPinYin": "ningdeshi" }, { "cityId": 350500, "cityName": "泉州市", "cityPinYin": "quanzhoushi" }, { "cityId": 350600, "cityName": "漳州市", "cityPinYin": "zhangzhoushi" }, { "cityId": 350100, "cityName": "福州市", "cityPinYin": "fuzhoushi" }, { "cityId": 350300, "cityName": "莆田市", "cityPinYin": "putianshi" }, { "cityId": 350800, "cityName": "龙岩市", "cityPinYin": "longyanshi" }] }, { "provinceId": 540000, "provinceName": "西藏自治区", "provincePinYin": "xizangzizhiqu", "cityList": [{ "cityId": 542200, "cityName": "山南地区", "cityPinYin": "shannandiqu" }, { "cityId": 540100, "cityName": "拉萨市", "cityPinYin": "lasashi" }, { "cityId": 542300, "cityName": "日喀则市", "cityPinYin": "rikazeshi" }, { "cityId": 542100, "cityName": "昌都地区", "cityPinYin": "changdudiqu" }, { "cityId": 542600, "cityName": "林芝市", "cityPinYin": "linzhishi" }, { "cityId": 542400, "cityName": "那曲地区", "cityPinYin": "naqudiqu" }, { "cityId": 542500, "cityName": "阿里地区", "cityPinYin": "alidiqu" }] }, { "provinceId": 520000, "provinceName": "贵州省", "provincePinYin": "guizhousheng", "cityList": [{ "cityId": 520200, "cityName": "六盘水市", "cityPinYin": "liupanshuishi" }, { "cityId": 520400, "cityName": "安顺市", "cityPinYin": "anshunshi" }, { "cityId": 520500, "cityName": "毕节市", "cityPinYin": "bijieshi" }, { "cityId": 520100, "cityName": "贵阳市", "cityPinYin": "guiyangshi" }, { "cityId": 520300, "cityName": "遵义市", "cityPinYin": "zunyishi" }, { "cityId": 520600, "cityName": "铜仁市", "cityPinYin": "tongrenshi" }, { "cityId": 522600, "cityName": "黔东南苗族侗族自治州", "cityPinYin": "qiandongnanmiaozudongzuzizhizhou" }, { "cityId": 522700, "cityName": "黔南布依族苗族自治州", "cityPinYin": "qiannanbuyizumiaozuzizhizhou" }, { "cityId": 522300, "cityName": "黔西南布依族苗族自治州", "cityPinYin": "qianxinanbuyizumiaozuzizhizhou" }] }, { "provinceId": 210000, "provinceName": "辽宁省", "provincePinYin": "liaoningsheng", "cityList": [{ "cityId": 210600, "cityName": "丹东市", "cityPinYin": "dandongshi" }, { "cityId": 210200, "cityName": "大连市", "cityPinYin": "dalianshi" }, { "cityId": 210400, "cityName": "抚顺市", "cityPinYin": "fushunshi" }, { "cityId": 211300, "cityName": "朝阳市", "cityPinYin": "chaoyangshi" }, { "cityId": 210500, "cityName": "本溪市", "cityPinYin": "benxishi" }, { "cityId": 210100, "cityName": "沈阳市", "cityPinYin": "shenyangshi" }, { "cityId": 211100, "cityName": "盘锦市", "cityPinYin": "panjinshi" }, { "cityId": 210800, "cityName": "营口市", "cityPinYin": "yingkoushi" }, { "cityId": 211400, "cityName": "葫芦岛市", "cityPinYin": "huludaoshi" }, { "cityId": 211000, "cityName": "辽阳市", "cityPinYin": "liaoyangshi" }, { "cityId": 211200, "cityName": "铁岭市", "cityPinYin": "tielingshi" }, { "cityId": 210700, "cityName": "锦州市", "cityPinYin": "jinzhoushi" }, { "cityId": 210900, "cityName": "阜新市", "cityPinYin": "fuxinshi" }, { "cityId": 210300, "cityName": "鞍山市", "cityPinYin": "anshanshi" }] }, { "provinceId": 500000, "provinceName": "重庆市", "provincePinYin": "chongqingshi", "cityList": [{ "cityId": 500100, "cityName": "重庆市", "cityPinYin": "chongqingshi" }] }, { "provinceId": 610000, "provinceName": "陕西省", "provincePinYin": "shanxisheng", "cityList": [{ "cityId": 610400, "cityName": "咸阳市", "cityPinYin": "xianyangshi" }, { "cityId": 611000, "cityName": "商洛市", "cityPinYin": "shangluoshi" }, { "cityId": 610900, "cityName": "安康市", "cityPinYin": "ankangshi" }, { "cityId": 610300, "cityName": "宝鸡市", "cityPinYin": "baojishi" }, { "cityId": 610600, "cityName": "延安市", "cityPinYin": "yananshi" }, { "cityId": 610800, "cityName": "榆林市", "cityPinYin": "yulinshi" }, { "cityId": 610700, "cityName": "汉中市", "cityPinYin": "hanzhongshi" }, { "cityId": 610500, "cityName": "渭南市", "cityPinYin": "weinanshi" }, { "cityId": 610100, "cityName": "西安市", "cityPinYin": "xianshi" }, { "cityId": 610200, "cityName": "铜川市", "cityPinYin": "tongchuanshi" }] }, { "provinceId": 630000, "provinceName": "青海省", "provincePinYin": "qinghaisheng", "cityList": [{ "cityId": 632600, "cityName": "果洛藏族自治州", "cityPinYin": "guoluozangzuzizhizhou" }, { "cityId": 632100, "cityName": "海东市", "cityPinYin": "haidongshi" }, { "cityId": 632200, "cityName": "海北藏族自治州", "cityPinYin": "haibeizangzuzizhizhou" }, { "cityId": 632500, "cityName": "海南藏族自治州", "cityPinYin": "hainanzangzuzizhizhou" }, { "cityId": 632800, "cityName": "海西蒙古族藏族自治州", "cityPinYin": "haiximengguzuzangzuzizhizhou" }, { "cityId": 632700, "cityName": "玉树藏族自治州", "cityPinYin": "yushuzangzuzizhizhou" }, { "cityId": 630100, "cityName": "西宁市", "cityPinYin": "xiningshi" }, { "cityId": 632300, "cityName": "黄南藏族自治州", "cityPinYin": "huangnanzangzuzizhizhou" }] }, { "provinceId": 810000, "provinceName": "香港特别行政区", "provincePinYin": "xianggangtebiexingzhengqu", "cityList": [{ "cityId": 810001, "cityName": "香港", "cityPinYin": "xianggang" }] }, { "provinceId": 230000, "provinceName": "黑龙江省", "provincePinYin": "heilongjiangsheng", "cityList": [{ "cityId": 230900, "cityName": "七台河市", "cityPinYin": "qitaiheshi" }, { "cityId": 230700, "cityName": "伊春市", "cityPinYin": "yichunshi" }, { "cityId": 230800, "cityName": "佳木斯市", "cityPinYin": "jiamusishi" }, { "cityId": 230500, "cityName": "双鸭山市", "cityPinYin": "shuangyashanshi" }, { "cityId": 230100, "cityName": "哈尔滨市", "cityPinYin": "haerbinshi" }, { "cityId": 232700, "cityName": "大兴安岭地区", "cityPinYin": "daxinganlingdiqu" }, { "cityId": 230600, "cityName": "大庆市", "cityPinYin": "daqingshi" }, { "cityId": 231000, "cityName": "牡丹江市", "cityPinYin": "mudanjiangshi" }, { "cityId": 231200, "cityName": "绥化市", "cityPinYin": "suihuashi" }, { "cityId": 230300, "cityName": "鸡西市", "cityPinYin": "jixishi" }, { "cityId": 230400, "cityName": "鹤岗市", "cityPinYin": "hegangshi" }, { "cityId": 231100, "cityName": "黑河市", "cityPinYin": "heiheshi" }, { "cityId": 230200, "cityName": "齐齐哈尔市", "cityPinYin": "qiqihaershi" }] }], "code": 0, "msg": null
};


var aa = { "a": { b: "3" } };