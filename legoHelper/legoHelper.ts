
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
(() => {
    if (!isPageEdit) return;

    console.log("乐高-装配中心页面");
    var $lastTreeItem = $();

    function insertPageStyle() {
        var css = `
        #propsBody,#modules{
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select:none;
            -khtml-user-select:none;
            -webkit-user-select:none;
            -ms-user-select:none;
            user-select:none;
        }

        .form-group{
            //position: relative;
        }

        .form-group:hover .form-group-resize {
            display:inline-block;
        }

        .form-group .form-group-resize {
            width: 0;
            height: 0;
            position: relative;
            border: 12px solid rgba(200,200,200,1);
            content: " ";
            border-left-color: transparent;
            border-top: none;
            border-right: none;
            // right: 0;
            cursor: e-resize;
            // bottom: 0px;
            display:none;
            transform: translateY(-12px);
            float: right;
        }
        `;
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
            //绑定所有点击“预览”按钮事件
            .delegate(".vakata-context li a", "click", function (e: JQueryMouseEventObject) {
                if ($(e.target).closest("li").eq(0).index() != 0) {
                    return;
                }
                $lastTreeItem = $(".jstree-wholerow-clicked");
            })
            //点击组件属性面板的“保存”按钮后自动预览页面
            .delegate("#propsBody form > .btn-default", "click", function (e: JQueryMouseEventObject) {
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
            .delegate(".jstree-anchor", "dblclick", function (e: JQueryMouseEventObject) {
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
            .delegate("#jstree > ul", "keydown", function (e: JQueryKeyEventObject) {
                // console.log(e.which);
                //在组件列表树内部按退格键删除节点
                if (e.which == keyCodeEnum.delete || e.which == keyCodeEnum.backspace) {
                    var $curr = $(".jstree-wholerow-clicked");
                    if ($curr.length == 0) return;
                    $curr.contextmenu();
                    $(".vakata-context li:eq(2) a").click();
                }
            })
            //页面业务脚本保存后刷新dump页面（需要启动node服务）
            .delegate(".code div a.btn-save-editor", "click", function (e: JQueryMouseEventObject) {
                // 保存脚本 触发 -> 发布视图 按钮
                $("#saveView").click();
                setTimeout(function () {
                    $.get("http://localhost:3700/livereload", function (data) {
                        console.log(data);
                    });
                }, 300);
            })
            //页面业务脚本快捷键保存功能
            .delegate(".ace_text-input", "keydown", function (e: JQueryKeyEventObject) {
                //Command+S 保存
                if (e.metaKey && e.which == 83) {
                    save();
                }
                //Ctrl+S 保存
                if (e.ctrlKey && e.which == 83) {
                    save();
                }

                function save() {
                    // 装配中心
                    console.log("isPageEdit",isPageEdit);
                    $(".code div a.btn-save-editor").click();
                    e.preventDefault();
                }
            })
            //鼠标移入[模块属性]框可拖拽修改宽度
            .delegate(".form-group", "mouseenter", function (e: JQueryMouseEventObject) {
                // console.log("mouseenter");
                var $form: JQuery = $(this);
                var $resize: JQuery = $form.find(".form-group-resize");
                if ($resize.length > 0) return;

                //添加拖拽调节按钮
                $resize = $("<div>").addClass("form-group-resize").appendTo($form);
                //设定当前宽度
                $form.css("width", $form.width());
            })
            //鼠标按下拖拽宽度按钮
            .delegate(".form-group .form-group-resize", "mousedown", function (e: JQueryMouseEventObject) {
                // console.log(e);
                var $form: JQuery = $(this).closest(".form-group");
                $prop.data({ "ismousedown": true, "screenx": e.screenX, "formwidth": $form.width(), "current": $form });
            })
            //鼠标抬起拖拽宽度按钮
            .delegate(".form-group .form-group-resize,#propsBody", "mouseup", function (e: JQueryMouseEventObject) {
                // console.log(e);
                $prop.data("ismousedown", false);
            })
            //在组件属性框中移动拖拽按钮
            .delegate("#propsBody", "mousemove", function (e: JQueryMouseEventObject) {
                var ismousedown: boolean = $prop.data("ismousedown");
                if (ismousedown != true) return;
                var screenX: number = $prop.data("screenx");
                var formwidth: number = $prop.data("formwidth");
                var $form: JQuery = $prop.data("current");
                var offsetX: number = e.screenX - screenX;
                var dstWidth: number = formwidth + offsetX;
                $form.css("width", dstWidth);
            })
            //在组件属性框中离开光标
            .delegate("#propsBody", "mouseleave", function (e: JQueryMouseEventObject) {
                $prop.data("ismousedown", false);
            })
            //在添加组件弹出框中，实现实时组件搜索，而不用去调用接口搜索
            .delegate(".jstree-contextmenu li a", "click", function (e: JQueryMouseEventObject) {
                var $a: JQuery = $(this);
                if ($.trim($a.text()) != "添加") return;
                setTimeout(addComponent, 100);

                /**
                 * 延迟弹框弹出后，执行弹窗内组件操作
                 * 
                 * @returns
                 */
                function addComponent(): void {
                    var $input: JQuery = $("#msearchInput").focus().val("");
                    if ($input.data("isbindinput") == true) return;
                    $input.bind("input", function (e: JQueryEventObject) {
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
                function searchModulesComponent(text: string): void {
                    var $labels: JQuery = $("#modules .badge");
                    var $unMatchLabels: JQuery = $labels.filter((i: number, label: Element) => $(label).text().toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) == -1);
                    $labels.show();
                    $unMatchLabels.hide();
                    checkTitleHide();
                }

                /**
                 * 将那些过滤完成后没有组件的group，隐藏其标题
                 */
                function checkTitleHide() {
                    var $titles: JQuery = $("#modules h4");
                    $titles.each((i: number, title: Element) => {
                        var $title: JQuery = $(title);
                        var $compBox: JQuery = $title.next("div");
                        if ($compBox.find(".badge:visible").length == 0) {
                            $title.hide();
                        } else {
                            $title.show();
                        }
                    });
                }
            })
            //在添加组件弹出框中，实现双击组件直接添加，而不用再点击“确认”按钮来添加
            .delegate("#modules .badge", "dblclick", function (e: JQueryMouseEventObject) {
                var $label: JQuery = $(this);
                $label.click();
                $("#modules .modal-footer .btn-primary").click();
            })
            //在打开页面弹出框中，实现实时页面搜索，而不用去调用接口搜索
            .delegate("#openView", "click", function (e: JQueryMouseEventObject) {
                var $a: JQuery = $(this);
                setTimeout(addView, 100);

                /**
                 * 延迟弹框弹出后，执行弹窗内组件操作
                 * 
                 * @returns
                 */
                function addView(): void {
                    var $input: JQuery = $("#vsearchInput").focus().val("");
                    if ($input.data("isbindinput") == true) return;
                    $input.bind("input", function (e: JQueryEventObject) {
                        searchView($input.val());
                    });
                    $input.data("isbindinput", true);
                }

                /**
                 * 搜索打开页面弹框中的页面
                 * 
                 * @param {string} text
                 */
                function searchView(text: string): void {
                    var $labels: JQuery = $("#views .thumbnail");
                    var $unMatchLabels: JQuery = $labels.filter((i: number, label: Element) =>
                        $(label).attr("title").toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) == -1);
                    $labels.parent("li").show();
                    $unMatchLabels.parent("li").hide();
                }
            })
            //在打开页面弹出框中，实现双击页面直接打开页面，而不用再点击“确认”按钮来打开
            .delegate("#views .thumbnail", "dblclick", function (e: JQueryMouseEventObject) {
                var $label: JQuery = $(this);
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
(() => {
    if (!isPageComponent) return;

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
                $("#saveTest").click();
                e.preventDefault();
            }
        })

        //页面业务脚本保存后刷新dump页面（需要启动node服务）
        .delegate("#saveTest", "click", function (e: JQueryMouseEventObject) {
            setTimeout(function () {
                $.get("http://localhost:3700/livereload", function (data) {
                    console.log(data);
                });
            }, 300);
        });
    }

    function init() {

    }
    //----
    init();
    bind();
})();

//乐高-装配中心、组件管理 均运行
(() => {
    if (!isPageEdit && !isPageComponent) return;

    var $jstree: JQuery = $("#jstree");
    var lastSearchText: string = "";
    var lastSearchResultIndex: number = 0;


    function insertPageStyle() {
        var css = `
        #jstree-menu{
            position: fixed; 
            margin-top: -22px; 
            z-index: 99;
        }

        #expandAll{

        }

        #collapseAll{

        }   

        #searchComponent{
            width: 100px;
            text-align: left;
            cursor: text;
            overflow: hidden;
        }     

        .searchHighlight{
            color:red;
        }
        `;
        insertStyle(css);
    }

    /**
     * 创建左侧组件树状菜单项的顶部按钮组
     */
    function createTreeMenu(): void {
        var $menu = $(`
            <div id="jstree-menu" class="btn-group btn-group-xs btn-group-justifie" role="group" >
            </div>
        `);
        $menu
            .append(
            $(`<a href="#" id="expandAll" class="btn btn-default" role="button">全部展开</a>`)
            ).append(
            $(`<a href="#" id="collapseAll" class="btn btn-default" role="button">全部折叠</a>`)
            ).append(
            $(`<a href="#" id="searchComponent" class="btn btn-default" role="button" contenteditable="" default="搜索组件..."></a>`).text("搜索组件...")
            );

        $jstree.css("padding-top", "22px")
            .delegate("#jstree-menu #expandAll", "click", expandAll)
            .delegate("#jstree-menu #collapseAll", "click", collapseAll)
            .delegate("#jstree-menu #searchComponent", "blur focus", searchBarOnBlurFlocus)
            .delegate("#jstree-menu #searchComponent", "keydown", searchBarOnKeyDown)
            .delegate("#jstree-menu #searchComponent", "keyup", searchBarOnKeyUp)
            ;

        //轮训等待组件列表载入完成后植入工具栏
        var timerId = setInterval(function () {
            if ($jstree.find("#jstree-menu").length > 0) {
                return;
            }
            if ($.trim($jstree.html()).length == 0) {
                return;
            } else {
                setTimeout(function () {
                    $jstree.prepend($menu);
                }, 100);
                // clearInterval(timerId);
            }
        }, 500);
    }

    /**
     * 在搜索栏中按下键盘
     * 
     * @param {JQueryKeyEventObject} e
     * @returns
     */
    function searchBarOnKeyDown(e: JQueryKeyEventObject) {
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
    function searchBarOnKeyUp(e: JQueryKeyEventObject) {
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
    function searchBarOnBlurFlocus(e: JQueryEventObject) {
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
    function searchComponent(name: string): boolean {
        // console.log(name);
        resetSearch();
        if (name.length == 0) return;
        name = name.toLowerCase();//.replace(/(\(|\)|\{|\}|\.|\^|\$|\||\\)/g, "\$1");

        var $items: JQuery = $jstree.find("ul .jstree-anchor");
        var indexArr: number[] = getIndex();
        var $resultItems: JQuery[] = [];
        var $resultItem: JQuery = $();

        $.each(indexArr, function (i, resultIndex) {
            var $item: JQuery = $items.eq(resultIndex);
            var itemHtml: string = $item.html();
            var iHtml: string = itemHtml.match(/^<i[^\>]*?>\s*<\/i>/)[0];//匹配节点前的i元素
            var textHtml: string = itemHtml.replace(iHtml, "");
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

            var firstTop: number = $resultItem.get(0).getBoundingClientRect().top;
            var jstreeTop: number = $jstree.get(0).getBoundingClientRect().top;
            var jstreeScrollTop: number = $jstree.get(0).scrollTop;
            var jstreePaddingTop: number = parseInt($jstree.css("padding-top").replace(/[^\d]/g, ""));

            $resultItem.find(".searchHighlight").css("border", "2px solid red");
            $jstree.scrollTop(firstTop - jstreeTop - jstreePaddingTop + jstreeScrollTop - 40);
            lastSearchResultIndex++;
        } else {
            lastSearchResultIndex = 0;
        }
        lastSearchText = name;


        return indexArr.length > 0;


        /**
         * 获取指定组件名称在组件列表中的所有index
         * 
         * @returns {number}
         */
        function getIndex(): number[] {
            var result: number[] = [];
            var names: string[] = $.makeArray($items.map((i, o) => $(o).text().toLowerCase()));//.replace(/\([^\)]*?\)/g, "")
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
    function resetSearch(): void {
        $jstree.find(".searchHighlight").each(function (i: number, hl: Element) {
            var $hl: JQuery = $(hl);
            $hl.get(0).outerHTML = $hl.get(0).innerHTML;
        });
    }

    /**
     * 展开左侧所有树状菜单项
     * 
     * @returns
     */
    function expandAll(): void {
        var $closed: JQuery = $(".jstree-closed").find(">i.jstree-ocl");
        if ($closed.length == 0) return;
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
    function collapseAll(): void {
        var $closed: JQuery = $(".jstree-open").find(">i.jstree-ocl");
        if ($closed.length == 0) return;
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
function insertStyle(str: string): JQuery {
    var $style = $("<style>").html(str);
    $("head").eq(0).append($style);
    return $style;
}


/**
 * 键盘KeyCode码枚举
 * 
 * @enum {number}
 */
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
