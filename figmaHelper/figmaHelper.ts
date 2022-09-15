window.figmaHelper = function () {
    if (window.figmaHelper.isInit === true) return;
    window.figmaHelper.isInit = true;
    log("welcome figmaHelper @github.com/xxcanghai", decodeURIComponent(location.href));
    const prompt = window.figmaHepler_prompt;
    const storageKey = 'figmaHelper_convertFormat';

    function log(...args) {
        console.log.apply(console, ['%c[FigmaHepler]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }

    (function () {
        insertStyle(`
        /* 增加转换单位样式 */
        .figmaHelper_newUnit {
            color: #1664FF;
        }
        .figmaHelper_newUnit:hover {
            background-color: #1664FF;
            color: white;
        }
        .figmaHelper_newUnit:active {
            background-color: #1664ff94;
            color: white;
        }

        /* 植入的复制按钮 */
        .figmaHelper_newCopyBtn{
        }
        .figmaHelper_newCopyBtn span{
            fill: #1664FF;
        }

        /* 植入配置单位转换公式 */
        .figmaHelper_configUnit{
            margin: 18px;
            color: #1664FF;
        }
        .figmaHelper_configUnit:hover{
            color: red;
            cursor: pointer;
        }
    `);
    }());

    // 增加：点击元素在右侧属性面板处将px重写为rpx单位
    function unitConvert() {
        var observer = new MutationObserver(domChange);
        var stylePanel = $("[class*=code_inspection_panels--codePanelContainer]").get(0);
        var options = {
            'childList': true,
            'arrtibutes': true,
            'subtree': true,
            'characterData': true,
        };

        observer.observe(stylePanel, options);
        //初始化执行一次
        domChange();
        addCopyBtn();
        addConfigUnitDom();

        function domChange(element?, option?) {
            // log('domChange',element,option);
            // 解除监听
            observer.disconnect();

            var $panelList = $('[class*=raw_components--panel][class*=inspect_panels--inspectionPanel]');
            $panelList.find('.inspect_panels--_propertyValue--MMDhq').each((index, span) => {
                const clsPrefix = 'figmaHelper_newUnit'
                var $span = $(span);
                var text = $span.text().replace(/->.*$/g, '');
                if ($span.hasClass(clsPrefix)) return;
                if (!text.endsWith('px')) return;
                var num = parseFloat(text); // -10.3px -> -10.3
                num = evalFormat(num); // 根据转换公式计算转换后的数值
                num = Number(num.toFixed(2));//解决无限小数问题+移除末尾0
                var distStr = `${num}rpx`;
                // $span.text(text + '->' + distStr);
                var $newSpan: JQuery;
                if ($span.next(`.${clsPrefix}`).length == 0) {
                    $newSpan = $span.clone().addClass(clsPrefix);
                    $newSpan.click(onNewUnitClick);
                    $span.after($newSpan);
                } else {
                    $newSpan = $span.next(`.${clsPrefix}`);
                }
                $newSpan.text(distStr);
                log(text, distStr);
            });
            // 植入新复制代码按钮
            addCopyBtn();

            function onNewUnitClick(e: JQueryMouseEventObject) {
                e.stopPropagation();
                var $unit = $(this)
                var copyText = $unit.text();
                copyToBoard(copyText);
                log('已复制到剪贴板:', copyText);
            }

            // 恢复监听
            observer.observe(stylePanel, options);
        }
    }

    /** 根据转换公式计算转换后的数值 */
    function evalFormat(num: number): number {
        var format = getUnitFormat();
        var code = format.replace(/\{n\}/g, String(num));
        var result: number = 0;
        try {
            result = eval(code);
        } catch (ex) {
            // localstorage中的字符串非法
            result = num;
        }
        return result;
    }

    function addCopyBtn() {
        const cssMap = {
            'Width': 'width',
            'Height': 'height',
            'Top': 'top',
            'Left': 'left',
            'Radius': 'border-radius',
            'Opacity': 'opacity',
        }
        var clsPrefix = 'figmaHelper_newCopyBtn';
        var $copyBtnList = $('[class*=inspect_panels--copyButton]');
        if ($copyBtnList.length == 0) {
            return;
        };
        $copyBtnList = $copyBtnList;
        $copyBtnList.each((index, btn) => {
            var $btn = $(btn);
            if ($btn.hasClass(clsPrefix)) {
                return;
            };
            var $newBtn = $btn.clone().addClass(clsPrefix);
            if ($btn.next(`.${clsPrefix}`).length == 0) {
                $btn.after($newBtn);
                $newBtn.click(onNewCopyBtnClick)
            }
        })

        function onNewCopyBtnClick(e: JQueryMouseEventObject) {
            e.stopPropagation();
            var $btn = $(this);
            var $box = $btn.parents('[class*=raw_components--panel]');
            var result = '';
            $box.find('[class*=inspect_panels--highlightRow]').each((index, line) => {
                var $line = $(line);
                var key = $line.find('[class*=inspect_panels--propertyName]').text();
                var orgValue = $line.find('[class*=inspect_panels--propertyValue]').text();
                var value = $line.find('[class*=figmaHelper_newUnit]').text();
                key = cssMap[key] || key.toLowerCase();
                result += `${key}: ${value || orgValue};\n`;
            });
            log('已复制到剪贴板:', result);
            copyToBoard(result);
        }
    }

    function addConfigUnitDom() {
        var clsPrefix = 'figmaHelper_configUnit';
        var $link = $('<div>')
            .addClass(clsPrefix)
            .text('>配置css单位转换公式')
            .click(onConfigUnitClick);
        $('[class*=code_inspection_panels--codePanelContainer]').after($link);

        function onConfigUnitClick(e: JQueryMouseEventObject) {
            e.stopPropagation();
            var format = getUnitFormat();
            var newFormat = prompt('请输入单位转换公式：\n{n}为具体数值变量', format);
            setUnitFormat(newFormat);
        }
    }

    function getUnitFormat() {
        var format = localStorage.getItem(storageKey);
        if (typeof format !== 'string' || format.length == 0) {
            var defaultFormat = '{n}/10';
            setUnitFormat(defaultFormat)
            return defaultFormat;
        } else {
            return format;
        }
    }

    function setUnitFormat(format) {
        if (typeof format !== 'string' || format.length == 0) return;
        localStorage.setItem(storageKey, format);
    }

    var checkReadyTimer = 0;
    function checkReady() {
        // log('check')
        if ($("[class*=code_inspection_panels--codePanelContainer]").length > 0) {
            clearInterval(checkReadyTimer);
            // log('ready!')
            unitConvert();
        }
    }
    checkReadyTimer = setInterval(checkReady, 1000);



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
        } catch (ex) {
            console.error('复制失败', ex);
        }
    }
}

if ("jQuery" in window && typeof window.figmaHelper == "function") {
    window["figmaHelper"]();
}


//--------------------类型定义---------------------------

interface Window {
    figmaHelper: figmaHelper;
    figmaHepler_prompt: typeof prompt;
}
interface figmaHelper {
    (): void;
    isInit?: boolean;
}