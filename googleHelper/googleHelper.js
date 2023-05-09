window.googleHelper = function () {
    if (window.googleHelper.isInit === true)
        return;
    window.googleHelper.isInit = true;
    log("welcome googleHelper @github.com/xxcanghai", decodeURIComponent(location.href));
    var storageKey = 'googleHelper_convertFormat';
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ['%c[googleHelper]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }
    (function () {
        insertStyle("\n        /* \u8C37\u6B4C\u641C\u7D22\u4E2D\u56FD\u533A\u6309\u94AE */\n        .googleHelper_searchBtn {\n            margin-left:-13px;\n        }\n        .googleHelper_searchBtn div{\n            border-radius: 5px;\n            display: flex;\n            flex-wrap: wrap;\n            align-content: center;\n            justify-content: center;\n            align-items: center;\n            padding: 0 2px;\n        }\n        .googleHelper_searchBtn span{\n            cursor: pointer;\n            height: 20px;\n            line-height: 20px;\n        }\n        .googleHelper_searchBtn:hover div,\n        .googleHelper_searchBtn.hover div{\n            background-color: #4285f4;\n        }\n        .googleHelper_searchBtn:hover span,\n        .googleHelper_searchBtn.hover span{\n            color: white;\n        }\n        .googleHelper_searchBtn.hover:hover div{\n            background-color: inherit;\n        }\n        .googleHelper_searchBtn.hover:hover span{\n            color: inherit;\n        }\n    ");
    }());
    /** 插入在中国区搜索按钮 */
    function addCnSearchBtn() {
        var $searchBtn = $('form#tsf [type="submit"]');
        var crReg = /\bcr=([^&]+?)\b/;
        var crCnReg = /\bcr=countryCN\b/;
        // console.log($searchBtn)
        var cls = 'googleHelper_searchBtn';
        var $newBtn = $searchBtn.clone();
        // 删除svg图像 
        $newBtn.find('svg').replaceWith('CN');
        // 
        $newBtn
            .addClass(cls)
            .click(onCnSearchBtnClick)
            .appendTo($searchBtn.parent());
        if (location.search.match(crCnReg) == null) {
            $newBtn.attr('title', '在中国地区搜索');
        }
        else {
            $newBtn.addClass('hover').attr('title', '恢复默认地区搜索');
        }
        function onCnSearchBtnClick(e) {
            console.log('click');
            e.preventDefault();
            var search = location.search;
            if (search.match(crReg) == null) {
                // 没有区域设置（走chrome默认设置的区域）。点击在url尾部追加中国区
                search = search.replace(/&?$/, '&cr=countryCN');
            }
            else if (search.match(crCnReg) == null) {
                // 有区域设置，但不是中国。点击替换cr配置为中国区
                search = search.replace(crReg, 'cr=countryCN');
            }
            else {
                // 有区域设置且是中国区域。点击取消中国区设置
                search = search.replace(crReg, '');
            }
            location.search = search;
        }
    }
    function init() {
        addCnSearchBtn();
    }
    init();
    // var checkReadyTimer = 0;
    // function checkReady() {
    //     log('check')
    //     if ($("[class*=code_inspection_panels--codePanelContainer]").length > 0) {
    //         clearInterval(checkReadyTimer);
    //         // log('ready!')
    //         unitConvert();
    //     }
    // }
    // checkReadyTimer = setInterval(checkReady, 1000);
    //========Tools============
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
    function copyToBoard(text) {
        // try {
        //     const input = document.createElement('textarea')
        //     input.value = text
        //     document.body.appendChild(input)
        //     input.focus()
        //     input.select()
        //     document.execCommand('copy')
        //     document.body.removeChild(input)
        // } catch (err) {
        //     // ignore
        // }
        try {
            navigator.clipboard.writeText(text);
        }
        catch (ex) {
            console.error('复制失败', ex);
        }
    }
};
if ("jQuery" in window && typeof window.googleHelper == "function") {
    window["googleHelper"]();
}
