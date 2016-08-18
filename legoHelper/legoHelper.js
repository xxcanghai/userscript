'use strict';
console.info("welcome legoHelper @xxcanghai#github", location.href);
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
            .delegate(".vakata-context li a", "click", function (e) {
            if ($(e.target).closest("li").eq(0).index() != 0) {
                return;
            }
            $lastTreeItem = $(".jstree-wholerow-clicked");
        })
            .delegate("#propsBody form > .btn-default", "click", function (e) {
            refresh();
        })
            .delegate("#propsBody form", "change keydown", function (e) {
            if (e.type == "keydown") {
                if (e.which != keyCodeEnum.enter)
                    return;
            }
            $("#propsBody form > .btn-default").click();
        })
            .delegate(".jstree-anchor", "dblclick", function (e) {
            // console.log(e.target);
            $(e.target).click().contextmenu();
            var $link = $(".vakata-context li:eq(0) a");
            if ($link.text().trim() == "预览") {
                $link.click();
            }
            else {
                $(".vakata-context").hide();
            }
        })
            .delegate("#jstree", "keydown", function (e) {
            // console.log(e.which);
            //在组件列表树内部按退格键删除节点
            if (e.which == keyCodeEnum.delete || e.which == keyCodeEnum.backspace) {
                var $curr = $(".jstree-wholerow-clicked");
                if ($curr.length == 0)
                    return;
                $curr.contextmenu();
                $(".vakata-context li:eq(2) a").click();
            }
        })
            .delegate(".code div a.btn-save-editor", "click", function (e) {
            $("#saveView").click();
            setTimeout(function () {
                $.get("http://localhost:3700/livereload", function (data) {
                    console.log(data);
                });
            }, 300);
        })
            .delegate(".ace_text-input", "keydown", function (e) {
            //Command+S 保存
            if (e.metaKey && e.which == 83) {
                save();
            }
            //Ctrl+S 保存
            if (e.ctrlKey && e.which == 83) {
                save();
            }
            function save() {
                $(".code div a.btn-save-editor").click();
                e.preventDefault();
            }
        });
        ;
    }
    function init() {
        //默认展开组件属性面板
        $(".panel-collapse-flag").click();
    }
    //-----
    init();
    bind();
}());
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
}());
var keyCodeEnum;
(function (keyCodeEnum) {
    keyCodeEnum[keyCodeEnum["backspace"] = 8] = "backspace";
    keyCodeEnum[keyCodeEnum["tab"] = 9] = "tab";
    keyCodeEnum[keyCodeEnum["enter"] = 13] = "enter";
    keyCodeEnum[keyCodeEnum["shift"] = 16] = "shift";
    keyCodeEnum[keyCodeEnum["ctrl"] = 17] = "ctrl";
    keyCodeEnum[keyCodeEnum["alt"] = 18] = "alt";
    keyCodeEnum[keyCodeEnum["pause_break"] = 19] = "pause_break";
    keyCodeEnum[keyCodeEnum["caps_lock"] = 20] = "caps_lock";
    keyCodeEnum[keyCodeEnum["escape"] = 27] = "escape";
    keyCodeEnum[keyCodeEnum["space"] = 32] = "space";
    keyCodeEnum[keyCodeEnum["page_up"] = 33] = "page_up";
    keyCodeEnum[keyCodeEnum["page_down"] = 34] = "page_down";
    keyCodeEnum[keyCodeEnum["end"] = 35] = "end";
    keyCodeEnum[keyCodeEnum["home"] = 36] = "home";
    keyCodeEnum[keyCodeEnum["left_arrow"] = 37] = "left_arrow";
    keyCodeEnum[keyCodeEnum["up_arrow"] = 38] = "up_arrow";
    keyCodeEnum[keyCodeEnum["right_arrow"] = 39] = "right_arrow";
    keyCodeEnum[keyCodeEnum["down_arrow"] = 40] = "down_arrow";
    keyCodeEnum[keyCodeEnum["insert"] = 45] = "insert";
    keyCodeEnum[keyCodeEnum["delete"] = 46] = "delete";
    keyCodeEnum[keyCodeEnum["num_0"] = 48] = "num_0";
    keyCodeEnum[keyCodeEnum["num_1"] = 49] = "num_1";
    keyCodeEnum[keyCodeEnum["num_2"] = 50] = "num_2";
    keyCodeEnum[keyCodeEnum["num_3"] = 51] = "num_3";
    keyCodeEnum[keyCodeEnum["num_4"] = 52] = "num_4";
    keyCodeEnum[keyCodeEnum["num_5"] = 53] = "num_5";
    keyCodeEnum[keyCodeEnum["num_6"] = 54] = "num_6";
    keyCodeEnum[keyCodeEnum["num_7"] = 55] = "num_7";
    keyCodeEnum[keyCodeEnum["num_8"] = 56] = "num_8";
    keyCodeEnum[keyCodeEnum["num_9"] = 57] = "num_9";
    keyCodeEnum[keyCodeEnum["a"] = 65] = "a";
    keyCodeEnum[keyCodeEnum["b"] = 66] = "b";
    keyCodeEnum[keyCodeEnum["c"] = 67] = "c";
    keyCodeEnum[keyCodeEnum["d"] = 68] = "d";
    keyCodeEnum[keyCodeEnum["e"] = 69] = "e";
    keyCodeEnum[keyCodeEnum["f"] = 70] = "f";
    keyCodeEnum[keyCodeEnum["g"] = 71] = "g";
    keyCodeEnum[keyCodeEnum["h"] = 72] = "h";
    keyCodeEnum[keyCodeEnum["i"] = 73] = "i";
    keyCodeEnum[keyCodeEnum["j"] = 74] = "j";
    keyCodeEnum[keyCodeEnum["k"] = 75] = "k";
    keyCodeEnum[keyCodeEnum["l"] = 76] = "l";
    keyCodeEnum[keyCodeEnum["m"] = 77] = "m";
    keyCodeEnum[keyCodeEnum["n"] = 78] = "n";
    keyCodeEnum[keyCodeEnum["o"] = 79] = "o";
    keyCodeEnum[keyCodeEnum["p"] = 80] = "p";
    keyCodeEnum[keyCodeEnum["q"] = 81] = "q";
    keyCodeEnum[keyCodeEnum["r"] = 82] = "r";
    keyCodeEnum[keyCodeEnum["s"] = 83] = "s";
    keyCodeEnum[keyCodeEnum["t"] = 84] = "t";
    keyCodeEnum[keyCodeEnum["u"] = 85] = "u";
    keyCodeEnum[keyCodeEnum["v"] = 86] = "v";
    keyCodeEnum[keyCodeEnum["w"] = 87] = "w";
    keyCodeEnum[keyCodeEnum["x"] = 88] = "x";
    keyCodeEnum[keyCodeEnum["y"] = 89] = "y";
    keyCodeEnum[keyCodeEnum["z"] = 90] = "z";
    keyCodeEnum[keyCodeEnum["left_window_key"] = 91] = "left_window_key";
    keyCodeEnum[keyCodeEnum["right_window_key"] = 92] = "right_window_key";
    keyCodeEnum[keyCodeEnum["select_key"] = 93] = "select_key";
    keyCodeEnum[keyCodeEnum["numpad_0"] = 96] = "numpad_0";
    keyCodeEnum[keyCodeEnum["numpad_1"] = 97] = "numpad_1";
    keyCodeEnum[keyCodeEnum["numpad_2"] = 98] = "numpad_2";
    keyCodeEnum[keyCodeEnum["numpad_3"] = 99] = "numpad_3";
    keyCodeEnum[keyCodeEnum["numpad_4"] = 100] = "numpad_4";
    keyCodeEnum[keyCodeEnum["numpad_5"] = 101] = "numpad_5";
    keyCodeEnum[keyCodeEnum["numpad_6"] = 102] = "numpad_6";
    keyCodeEnum[keyCodeEnum["numpad_7"] = 103] = "numpad_7";
    keyCodeEnum[keyCodeEnum["numpad_8"] = 104] = "numpad_8";
    keyCodeEnum[keyCodeEnum["numpad_9"] = 105] = "numpad_9";
    keyCodeEnum[keyCodeEnum["multiply"] = 106] = "multiply";
    keyCodeEnum[keyCodeEnum["add"] = 107] = "add";
    keyCodeEnum[keyCodeEnum["subtract"] = 109] = "subtract";
    keyCodeEnum[keyCodeEnum["decimal_point"] = 110] = "decimal_point";
    keyCodeEnum[keyCodeEnum["divide"] = 111] = "divide";
    keyCodeEnum[keyCodeEnum["f1"] = 112] = "f1";
    keyCodeEnum[keyCodeEnum["f2"] = 113] = "f2";
    keyCodeEnum[keyCodeEnum["f3"] = 114] = "f3";
    keyCodeEnum[keyCodeEnum["f4"] = 115] = "f4";
    keyCodeEnum[keyCodeEnum["f5"] = 116] = "f5";
    keyCodeEnum[keyCodeEnum["f6"] = 117] = "f6";
    keyCodeEnum[keyCodeEnum["f7"] = 118] = "f7";
    keyCodeEnum[keyCodeEnum["f8"] = 119] = "f8";
    keyCodeEnum[keyCodeEnum["f9"] = 120] = "f9";
    keyCodeEnum[keyCodeEnum["f10"] = 121] = "f10";
    keyCodeEnum[keyCodeEnum["f11"] = 122] = "f11";
    keyCodeEnum[keyCodeEnum["f12"] = 123] = "f12";
    keyCodeEnum[keyCodeEnum["num_lock"] = 144] = "num_lock";
    keyCodeEnum[keyCodeEnum["scroll_lock"] = 145] = "scroll_lock";
    keyCodeEnum[keyCodeEnum["semi_colon"] = 186] = "semi_colon";
    keyCodeEnum[keyCodeEnum["equal_sign"] = 187] = "equal_sign";
    keyCodeEnum[keyCodeEnum["comma"] = 188] = "comma";
    keyCodeEnum[keyCodeEnum["dash"] = 189] = "dash";
    keyCodeEnum[keyCodeEnum["period"] = 190] = "period";
    keyCodeEnum[keyCodeEnum["forward_slash"] = 191] = "forward_slash";
    keyCodeEnum[keyCodeEnum["grave_accent"] = 192] = "grave_accent";
    keyCodeEnum[keyCodeEnum["open_bracket"] = 219] = "open_bracket";
    keyCodeEnum[keyCodeEnum["back_slash"] = 220] = "back_slash";
    keyCodeEnum[keyCodeEnum["close_braket"] = 221] = "close_braket";
    keyCodeEnum[keyCodeEnum["single_quote"] = 222] = "single_quote";
})(keyCodeEnum || (keyCodeEnum = {}));
