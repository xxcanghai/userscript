window.figmaHelper = function () {
    if (window.figmaHelper.isInit === true)
        return;
    window.figmaHelper.isInit = true;
    log("welcome figmaHelper @github.com/xxcanghai", decodeURIComponent(location.href));
    var prompt = createPrompt();
    var storageKey = 'figmaHelper_convertFormat';
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ['%c[figmaHelper]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }
    (function () {
        insertStyle("\n        /* \u589E\u52A0\u8F6C\u6362\u5355\u4F4D\u6837\u5F0F */\n        .figmaHelper_newUnit {\n            color: #1664FF;\n        }\n        .figmaHelper_newUnit:hover {\n            background-color: #1664FF;\n            color: white;\n        }\n        .figmaHelper_newUnit:active {\n            background-color: #1664ff94;\n            color: white;\n        }\n\n        /* \u690D\u5165\u7684\u590D\u5236\u6309\u94AE */\n        .figmaHelper_newCopyBtn{\n        }\n        .figmaHelper_newCopyBtn span{\n            fill: #1664FF;\n        }\n\n        /* \u690D\u5165\u914D\u7F6E\u5355\u4F4D\u8F6C\u6362\u516C\u5F0F */\n        .figmaHelper_configUnit{\n            margin: 18px;\n            width: 417rpx;\n            display: inline-block;\n            height: 20px;\n            background-color: #0d99ff;\n            color: white;\n            padding: 3px 10px;\n            line-height: 20px;\n            border-radius: 5px;\n        }\n        .figmaHelper_configUnit:hover{\n            opacity: 0.9;\n            cursor: pointer;\n        }\n        .figmaHelper_configUnit:active{\n            opacity: 0.8;\n        }\n\n        /* \u65B0\u589E\u690D\u5165css\u4EE3\u7801\u9762\u677F */\n        .figmaHelper_cssCodeContent{\n            background-color: rgba(0,0,0,0.02);\n            border-top: 1px solid #ddd;\n            padding-top: 10px;\n        }\n    ");
    }());
    // 增加：点击元素在右侧属性面板处将px重写为rpx单位
    function unitConvert() {
        var observer = new MutationObserver(domChange);
        var stylePanel = $("[class*=code_inspection_panels--codePanelContainer]").get(0);
        var options = {
            'childList': true,
            'arrtibutes': true,
            'subtree': true,
            'characterData': true
        };
        observer.observe(stylePanel, options);
        //初始化执行一次
        domChange();
        addCopyBtn();
        addConfigUnitDom();
        addCssCodePanel();
        function domChange(element, option) {
            // log('domChange', element, option);
            // 解除监听
            observer.disconnect();
            var $panelList = $('[class*=raw_components--panel][class*=inspect_panels--inspectionPanel]');
            $panelList.find('[class*=inspect_panels--_propertyValue--]').each(function (index, span) {
                var clsPrefix = 'figmaHelper_newUnit';
                var $span = $(span);
                var unitText = $span.text();
                if ($span.hasClass(clsPrefix))
                    return;
                // var newUnitText = unitTextConvert(unitText);
                var newUnitText = unitText.replace(/-?\d+(?:\.\d+)?px/g, function (match, index, all) {
                    // match为提取出来的px字符串，如 "50%-60px/2" 当中的 "60px"
                    return unitTextConvert(match);
                });
                // if (newUnitText.length == 0) return;
                var $newSpan;
                if ($span.next(".".concat(clsPrefix)).length == 0) {
                    $newSpan = $span.clone().addClass(clsPrefix);
                    $newSpan.click(onNewUnitClick);
                    $span.after($newSpan);
                }
                else {
                    $newSpan = $span.next(".".concat(clsPrefix));
                }
                $newSpan.text(newUnitText);
                log(unitText, newUnitText);
            });
            // 植入新复制代码按钮
            addCopyBtn();
            // 植入转换单位后的css代码面板
            addCssCodePanel();
            function onNewUnitClick(e) {
                e.stopPropagation();
                var $unit = $(this);
                var copyText = $unit.text();
                copyToBoard(copyText);
                log('已复制到剪贴板:', copyText);
            }
            // 恢复监听
            observer.observe(stylePanel, options);
        }
    }
    /** 将字符串单位转换为新字符串单位 */
    // "-10.3px" -> "-1.03rpx" 只接受以px为结尾的字符串
    function unitTextConvert(text) {
        if (!text.endsWith('px'))
            return '';
        var num = parseFloat(text); // -10.3px -> -10.3
        num = evalFormat(num); // 根据转换公式计算转换后的数值
        num = Number(num.toFixed(2)); //解决无限小数问题+移除末尾0
        var result = "".concat(num, "rpx");
        return result;
    }
    /** 根据转换公式计算转换后的数值 */
    function evalFormat(num) {
        var format = getUnitFormat();
        var code = format.replace(/\{n\}/g, String(num));
        var result = 0;
        try {
            result = eval(code);
        }
        catch (ex) {
            // localstorage中的字符串非法
            result = num;
            log('转换公式不合法，请检查公式！', '当前公式：', code);
        }
        return result;
    }
    /** 插入新的复制属性按钮 */
    function addCopyBtn() {
        var cssMap = {
            'Width': 'width',
            'Height': 'height',
            'Top': 'top',
            'Left': 'left',
            'Radius': 'border-radius',
            'Opacity': 'opacity'
        };
        var clsPrefix = 'figmaHelper_newCopyBtn';
        var $copyBtnList = $('[class*=inspect_panels--copyButton]');
        if ($copyBtnList.length == 0) {
            return;
        }
        ;
        $copyBtnList.each(function (index, btn) {
            var $btn = $(btn);
            if ($btn.hasClass(clsPrefix)) {
                return;
            }
            ;
            var $newBtn = $btn.clone().addClass(clsPrefix);
            if ($btn.next(".".concat(clsPrefix)).length == 0) {
                $btn.after($newBtn);
                $newBtn.click(onNewCopyBtnClick);
            }
        });
        function onNewCopyBtnClick(e) {
            e.stopPropagation();
            var $btn = $(this);
            var $box = $btn.parents('[class*=raw_components--panel]');
            var result = '';
            $box.find('[class*=inspect_panels--highlightRow]').each(function (index, line) {
                var $line = $(line);
                var key = $line.find('[class*=inspect_panels--propertyName]').text();
                var oldValue = $line.find('[class*=inspect_panels--propertyValue]').text();
                var newvalue = $line.find('[class*=figmaHelper_newUnit]').text();
                key = cssMap[key] || key.toLowerCase();
                result += "".concat(key, ": ").concat(newvalue || oldValue, ";\n");
            });
            log('已复制到剪贴板:\n', result);
            copyToBoard(result);
        }
    }
    /** 插入「配置转换公式」按钮 */
    function addConfigUnitDom() {
        var clsPrefix = 'figmaHelper_configUnit';
        var $link = $('<div>')
            .addClass(clsPrefix)
            .text('>配置css单位转换公式')
            .click(onConfigUnitClick);
        $('[class*=code_inspection_panels--codePanelContainer]').after($link);
        function onConfigUnitClick(e) {
            e.stopPropagation();
            var format = getUnitFormat();
            var newFormat = prompt('请输入单位转换公式：\n{n}为具体数值变量', format);
            setUnitFormat(newFormat);
        }
    }
    /** 插入新css代码面板 */
    function addCssCodePanel() {
        var clsPrefix = 'figmaHelper_cssCodeContent';
        //移除上一次添加的css面板
        $(".".concat(clsPrefix)).remove();
        var $cssPanel = $("[class*=css_code_panel--cssCodeContent]");
        var $newCssPanel = $cssPanel.eq(0).clone().addClass(clsPrefix);
        $cssPanel.after($newCssPanel);
        $newCssPanel.find('*').each(function (index, ele) {
            var $ele = $(ele);
            if ($ele.children().length > 0)
                return;
            var text = $ele.text().replace(/-?\d+(?:\.\d+)?px/g, function (match, index, all) {
                // match为提取出来的px字符串，如 "50%-60px/2" 当中的 "60px"
                return unitTextConvert(match);
            });
            $ele.text(text);
        });
    }
    function getUnitFormat() {
        var format = localStorage.getItem(storageKey);
        if (typeof format !== 'string' || format.length == 0) {
            var defaultFormat = '{n}/10';
            setUnitFormat(defaultFormat);
            return defaultFormat;
        }
        else {
            return format;
        }
    }
    function setUnitFormat(format) {
        if (typeof format !== 'string' || format.length == 0)
            return;
        localStorage.setItem(storageKey, format);
    }
    function observerInspectTab() {
        var inspectTabDom = $("div[name=propertiesPanelContainer] [class*=pages_panel--tab--]").filter(function (i, tab) {
            return $(tab).attr('data-label') === 'Inspect';
        }).get(0);
        // log('inspectTabDom:', inspectTabDom);
        var observer = new MutationObserver(inspectTabAttrChange);
        observer.observe(inspectTabDom, {
            attributes: true
        });
        function inspectTabAttrChange(mutations, observer) {
            // log('inspectTabAttrChange:', mutations, observer)   
            if (mutations.length == 0 || mutations[0].attributeName !== 'class') {
                return;
            }
            if ($(mutations[0].target).attr('class').includes('pages_panel--tabActive--')) {
                log('选中了inspectTab');
                unitConvert();
            }
            else {
                // log('取消选中了inspectTab')
            }
        }
    }
    var checkReadyTimer = 0;
    function checkReady() {
        // log('checking...')
        if ($("div[name=propertiesPanelContainer] [class*=pages_panel--tab--]").get(2) !== undefined) {
            clearInterval(checkReadyTimer);
            // log('ready!')
            observerInspectTab();
        }
    }
    checkReadyTimer = setInterval(checkReady, 1000);
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
    /** 解决figma改写了原生prompt函数的问题 */
    function createPrompt() {
        try {
            var clsPrefix = 'figmaHelper_promptIframe';
            var $iframe = $('<iframe>').addClass(clsPrefix).css({ display: 'none', position: 'absolute', width: 0, height: 0 });
            $('body').append($iframe);
            return $iframe.get(0).contentWindow.prompt;
        }
        catch (ex) {
            return function () {
                alert('功能异常，请联系开发者');
            };
        }
    }
};
if ("jQuery" in window && typeof window.figmaHelper == "function") {
    window["figmaHelper"]();
}
