'use strict';
console.info("welcome legoHelper @xxcanghai#github", location.href);
/**
 * 是否为装配中心页面
 */
var isPageEdit = location.href.match(/http:\/\/lego\.waimai\.sankuai\.com\/(\?edit=\d+)?($|#)/g) != null;
/**
 * 是否为组件管理页面
 */
var isPageComponent = location.href.match(/http:\/\/lego\.waimai\.sankuai\.com\/components/g) != null;
/**
 * 是否为预览页面
 */
var isPageReview = location.href.match(/http:\/\/lego\.waimai\.sankuai\.com\/preview($|#)/g) != null;
//乐高-装配中心页面
(function () {
    if (!isPageEdit)
        return;
    console.log("乐高-装配中心页面");
    var $lastTreeItem = $();
    function insertPageStyle() {
        var css = "\n        #propsBody,#modules{\n            moz-user-select: -moz-none;\n            -moz-user-select: none;\n            -o-user-select:none;\n            -khtml-user-select:none;\n            -webkit-user-select:none;\n            -ms-user-select:none;\n            user-select:none;\n        }\n\n        .form-group{\n            //position: relative;\n        }\n\n        .form-group:hover .form-group-resize {\n            display:inline-block;\n        }\n\n        .form-group .form-group-resize {\n            width: 0;\n            height: 0;\n            position: relative;\n            border: 12px solid rgba(200,200,200,1);\n            content: \" \";\n            border-left-color: transparent;\n            border-top: none;\n            border-right: none;\n            // right: 0;\n            cursor: e-resize;\n            // bottom: 0px;\n            display:none;\n            transform: translateY(-12px);\n            float: right;\n        }\n        ";
        insertStyle(css);
    }
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
    /**
     * 各类事件绑定
     */
    function bind() {
        var $prop = $("#propsBody");
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
            .delegate("#jstree > ul", "keydown", function (e) {
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
        })
            .delegate(".form-group", "mouseenter", function (e) {
            // console.log("mouseenter");
            var $form = $(this);
            var $resize = $form.find(".form-group-resize");
            if ($resize.length > 0)
                return;
            //添加拖拽调节按钮
            $resize = $("<div>").addClass("form-group-resize").appendTo($form);
            //设定当前宽度
            $form.css("width", $form.width());
        })
            .delegate(".form-group .form-group-resize", "mousedown", function (e) {
            // console.log(e);
            var $form = $(this).closest(".form-group");
            $prop.data({ "ismousedown": true, "screenx": e.screenX, "formwidth": $form.width(), "current": $form });
        })
            .delegate(".form-group .form-group-resize,#propsBody", "mouseup", function (e) {
            // console.log(e);
            $prop.data("ismousedown", false);
        })
            .delegate("#propsBody", "mousemove", function (e) {
            var ismousedown = $prop.data("ismousedown");
            if (ismousedown != true)
                return;
            var screenX = $prop.data("screenx");
            var formwidth = $prop.data("formwidth");
            var $form = $prop.data("current");
            var offsetX = e.screenX - screenX;
            var dstWidth = formwidth + offsetX;
            $form.css("width", dstWidth);
        })
            .delegate("#propsBody", "mouseleave", function (e) {
            $prop.data("ismousedown", false);
        })
            .delegate(".jstree-contextmenu li a", "click", function (e) {
            var $a = $(this);
            if ($.trim($a.text()) != "添加")
                return;
            setTimeout(addComponent, 100);
            /**
             * 延迟弹框弹出后，执行弹窗内组件操作
             *
             * @returns
             */
            function addComponent() {
                var $input = $("#msearchInput").focus().val("");
                if ($input.data("isbindinput") == true)
                    return;
                $input.bind("input", function (e) {
                    searchModulesComponent($input.val());
                });
                // $(document).delegate("#msearchInput", "keydown keyup keypress", function (e: JQueryKeyEventObject) {
                //     if (e.keyCode == keyCodeEnum.enter) {
                //         e.preventDefault();
                //         e.stopImmediatePropagation();
                //         e.stopPropagation();
                //         return false;
                //     }
                // });
                $input.data("isbindinput", true);
            }
            /**
             * 搜索添加组件弹框中的组件
             *
             * @param {string} text
             */
            function searchModulesComponent(text) {
                var $labels = $("#modules .badge");
                var $unMatchLabels = $labels.filter(function (i, label) { return $(label).text().toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) == -1; });
                $labels.show();
                $unMatchLabels.hide();
                checkTitleHide();
            }
            /**
             * 将那些过滤完成后没有组件的group，隐藏其标题
             */
            function checkTitleHide() {
                var $titles = $("#modules h4");
                $titles.each(function (i, title) {
                    var $title = $(title);
                    var $compBox = $title.next("div");
                    if ($compBox.find(".badge:visible").length == 0) {
                        $title.hide();
                    }
                    else {
                        $title.show();
                    }
                });
            }
        })
            .delegate("#modules .badge", "dblclick", function (e) {
            var $label = $(this);
            $label.click();
            $("#modules .modal-footer .btn-primary").click();
        })
            .delegate("#openView", "click", function (e) {
            var $a = $(this);
            setTimeout(addView, 100);
            /**
             * 延迟弹框弹出后，执行弹窗内组件操作
             *
             * @returns
             */
            function addView() {
                var $input = $("#vsearchInput").focus().val("");
                if ($input.data("isbindinput") == true)
                    return;
                $input.bind("input", function (e) {
                    searchView($input.val());
                });
                $input.data("isbindinput", true);
            }
            /**
             * 搜索打开页面弹框中的页面
             *
             * @param {string} text
             */
            function searchView(text) {
                var $labels = $("#views .thumbnail");
                var $unMatchLabels = $labels.filter(function (i, label) {
                    return $(label).attr("title").toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) == -1;
                });
                $labels.parent("li").show();
                $unMatchLabels.parent("li").hide();
            }
        })
            .delegate("#views .thumbnail", "dblclick", function (e) {
            var $label = $(this);
            $label.click();
            $("#views .modal-footer .btn-primary").click();
        });
    }
    function init() {
        //默认展开组件属性面板
        $(".panel-collapse-flag").click();
        insertPageStyle();
        bind();
    }
    //-----
    init();
})();
//乐高-组件管理页面
(function () {
    if (!isPageComponent)
        return;
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
})();
//乐高-装配中心、组件管理 均运行
(function () {
    if (!isPageEdit && !isPageComponent)
        return;
    var $jstree = $("#jstree");
    var lastSearchText = "";
    var lastSearchResultIndex = 0;
    function insertPageStyle() {
        var css = "\n        #jstree-menu{\n            position: fixed; \n            margin-top: -22px; \n            z-index: 99;\n        }\n\n        #expandAll{\n\n        }\n\n        #collapseAll{\n\n        }   \n\n        #searchComponent{\n            width: 100px;\n            text-align: left;\n            cursor: text;\n            overflow: hidden;\n        }     \n\n        .searchHighlight{\n            color:red;\n        }\n        ";
        insertStyle(css);
    }
    /**
     * 创建左侧组件树状菜单项的顶部按钮组
     */
    function createTreeMenu() {
        var $menu = $("\n            <div id=\"jstree-menu\" class=\"btn-group btn-group-xs btn-group-justifie\" role=\"group\" >\n            </div>\n        ");
        $menu
            .append($("<a href=\"#\" id=\"expandAll\" class=\"btn btn-default\" role=\"button\">\u5168\u90E8\u5C55\u5F00</a>")).append($("<a href=\"#\" id=\"collapseAll\" class=\"btn btn-default\" role=\"button\">\u5168\u90E8\u6298\u53E0</a>")).append($("<a href=\"#\" id=\"searchComponent\" class=\"btn btn-default\" role=\"button\" contenteditable=\"\" default=\"\u641C\u7D22\u7EC4\u4EF6...\"></a>").text("搜索组件..."));
        $jstree.css("padding-top", "22px")
            .delegate("#jstree-menu #expandAll", "click", expandAll)
            .delegate("#jstree-menu #collapseAll", "click", collapseAll)
            .delegate("#jstree-menu #searchComponent", "blur focus", searchBarOnBlurFlocus)
            .delegate("#jstree-menu #searchComponent", "keydown", searchBarOnKeyDown)
            .delegate("#jstree-menu #searchComponent", "keyup", searchBarOnKeyUp);
        //轮训等待组件列表载入完成后植入工具栏
        var timerId = setInterval(function () {
            if ($jstree.find("#jstree-menu").length > 0) {
                return;
            }
            if ($.trim($jstree.html()).length == 0) {
                return;
            }
            else {
                setTimeout(function () {
                    $jstree.prepend($menu);
                }, 100);
            }
        }, 500);
    }
    /**
     * 在搜索栏中按下键盘
     *
     * @param {JQueryKeyEventObject} e
     * @returns
     */
    function searchBarOnKeyDown(e) {
        // console.log(e);
        var $text = $(this);
        var searchText = $text.text();
        //按回车搜索组件
        if (e.keyCode == keyCodeEnum.enter) {
            searchComponent(searchText);
            e.preventDefault();
            return;
        }
        //按ESC清空输入内容
        if (e.keyCode == keyCodeEnum.escape) {
            $text.text("");
            e.preventDefault();
            resetSearch();
            return;
        }
    }
    /**
     * 在搜索栏中抬起键盘
     *
     * @param {JQueryKeyEventObject} e
     * @returns
     */
    function searchBarOnKeyUp(e) {
        var $text = $(this);
        var searchText = $text.text();
        if (e.keyCode == keyCodeEnum.enter || e.keyCode == keyCodeEnum.escape) {
            e.preventDefault();
            return;
        }
        searchComponent(searchText);
    }
    /**
     * 在搜索栏中失去焦点与置入焦点
     *
     * @param {JQueryEventObject} e
     */
    function searchBarOnBlurFlocus(e) {
        // console.log(e);
        var $text = $(this);
        var searchText = $.trim($text.text());
        //直接按下组件开头相关的文字会导致触发blur事件
        // console.log(e.relatedTarget);
        if (e.relatedTarget != null && $(e.relatedTarget).hasClass("jstree-anchor")) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if ((e.type == "focus" || e.type == "focusin") && searchText == $text.attr("default")) {
            // console.log("清空文字");
            $text.text("");
        }
        if ((e.type == "blur" || e.type == "focusout") && $text.text().length == 0) {
            // console.log(e);
            $text.text($text.attr("default"));
        }
    }
    /**
     * 在左侧树状列表中搜索组件
     *
     * @param {string} name 要搜索的组件名称
     * @returns {boolean} 返回是否成功搜索到组件
     */
    function searchComponent(name) {
        // console.log(name);
        resetSearch();
        if (name.length == 0)
            return;
        name = name.toLowerCase(); //.replace(/(\(|\)|\{|\}|\.|\^|\$|\||\\)/g, "\$1");
        var $items = $jstree.find(">ul .jstree-anchor");
        var indexArr = getIndex();
        var $resultItems = [];
        var $resultItem = $();
        $.each(indexArr, function (i, resultIndex) {
            var $item = $items.eq(resultIndex);
            var itemHtml = $item.html();
            var iHtml = itemHtml.match(/^<i[^\>]*?>\s*<\/i>/)[0]; //匹配节点前的i元素
            var textHtml = itemHtml.replace(iHtml, "");
            textHtml = textHtml.replace(new RegExp("(" + name + ")", "gi"), "<b class='searchHighlight'>$1</b>");
            $item.html(iHtml + textHtml);
            $resultItems.push($item);
        });
        if (indexArr.length > 0) {
            $resultItem = $resultItems[lastSearchResultIndex];
            if ($resultItem == undefined || lastSearchText != name) {
                lastSearchResultIndex = 0;
                $resultItem = $resultItems[lastSearchResultIndex];
            }
            var firstTop = $resultItem.get(0).getBoundingClientRect().top;
            var jstreeTop = $jstree.get(0).getBoundingClientRect().top;
            var jstreeScrollTop = $jstree.get(0).scrollTop;
            var jstreePaddingTop = parseInt($jstree.css("padding-top").replace(/[^\d]/g, ""));
            $resultItem.find(".searchHighlight").css("border", "2px solid red");
            $jstree.scrollTop(firstTop - jstreeTop - jstreePaddingTop + jstreeScrollTop - 40);
            lastSearchResultIndex++;
        }
        else {
            lastSearchResultIndex = 0;
        }
        lastSearchText = name;
        return indexArr.length > 0;
        /**
         * 获取指定组件名称在组件列表中的所有index
         *
         * @returns {number}
         */
        function getIndex() {
            var result = [];
            var names = $.makeArray($items.map(function (i, o) { return $(o).text().toLowerCase(); })); //.replace(/\([^\)]*?\)/g, "")
            $.each(names, function (i) {
                if (names[i].indexOf(name) >= 0) {
                    result.push(i);
                }
            });
            return result;
        }
    }
    /**
     * 还原搜索痕迹，去除高亮搜索结果
     */
    function resetSearch() {
        $jstree.find(".searchHighlight").each(function (i, hl) {
            var $hl = $(hl);
            $hl.get(0).outerHTML = $hl.get(0).innerHTML;
        });
    }
    /**
     * 展开左侧所有树状菜单项
     *
     * @returns
     */
    function expandAll() {
        var $closed = $(".jstree-closed").find(">i.jstree-ocl");
        if ($closed.length == 0)
            return;
        $closed.click();
        if (isPageEdit) {
            expandAll();
        }
    }
    /**
     * 收缩左侧左右树状菜单项
     *
     * @returns
     */
    function collapseAll() {
        var $closed = $(".jstree-open").find(">i.jstree-ocl");
        if ($closed.length == 0)
            return;
        $closed.click();
        collapseAll();
    }
    function init() {
        insertPageStyle();
        createTreeMenu();
    }
    //-----
    init();
})();
/**
 * 在页面中植入样式
 *
 * @param {string} str css代码
 */
function insertStyle(str) {
    var $style = $("<style>").html(str);
    $("head").eq(0).append($style);
    return $style;
}
/**
 * 键盘KeyCode码枚举
 *
 * @enum {number}
 */
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
