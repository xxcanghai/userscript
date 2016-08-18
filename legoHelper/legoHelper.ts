
'use strict';
console.info("welcome legoHelper @xxcanghai#github", location.href);

//乐高-装配中心页面
(() => {
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

    /**
     * 各类事件绑定
     */
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
            //页面业务脚本保存后刷新dump页面（需要启动node服务）
            .delegate(".code div a.btn-save-editor", "click", function (e) {
                $("#saveView").click();
                setTimeout(function () {
                    $.get("http://localhost:3700/livereload", function (data) {
                        console.log(data);
                    });
                }, 300);
            })
            //页面业务脚本快捷键保存功能
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
})();

//乐高-组件管理页面
(() => {
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
})();

//乐高-装配中心、组件管理 页面均运行
(() => {


    function createTreeMenu() {
        var menuStr = `
            <div class="btn-group btn-group-xs btn-group-justifie" role="group" aria-label="Justified button group">
                <a href="#" class="btn btn-default" role="button">全部展开</a>
                <a href="#" class="btn btn-default" role="button">全部折叠</a>
                <a href="#" class="btn btn-default" role="button" contenteditable="" style="width: 100px;text-align: left;cursor: text;">
                    搜索组件...
                </a>
            </div>
        `;
    }

    /**
     * 展开左侧所有树状菜单
     * 
     * @returns
     */
    function expandAll() {
        var $closed = $(".jstree-closed").find(">i.jstree-ocl");
        if ($closed.length == 0) return;
        $closed.click();
        expandAll();
    }

    /**
     * 收缩左侧左右树状菜单
     * 
     * @returns
     */
    function collapseAll() {
        var $closed = $(".jstree-open").find(">i.jstree-ocl");
        if ($closed.length == 0) return;
        $closed.click();
        collapseAll();
    }


    function init() {

    }

    //-----
    init();
})();



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
