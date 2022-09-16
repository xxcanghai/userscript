window.figmaHelper = function () {
    if (window.figmaHelper.isInit === true) return;
    window.figmaHelper.isInit = true;
    log("welcome figmaHelper @github.com/xxcanghai", decodeURIComponent(location.href));
    const prompt = createPrompt();
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
            width: 417rpx;
            display: inline-block;
            height: 20px;
            background-color: #0d99ff;
            color: white;
            padding: 3px 10px;
            line-height: 20px;
            border-radius: 5px;
        }
        .figmaHelper_configUnit:hover{
            opacity: 0.9;
            cursor: pointer;
        }
        .figmaHelper_configUnit:active{
            opacity: 0.8;
        }

        /* 新增植入css代码面板 */
        .figmaHelper_cssCodeContent{
            background-color: rgba(0,0,0,0.02);
            border-top: 1px solid #ddd;
            padding-top: 10px;
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
        addCssCodePanel();

        function domChange(element?, option?) {
            // log('domChange',element,option);
            // 解除监听
            observer.disconnect();

            var $panelList = $('[class*=raw_components--panel][class*=inspect_panels--inspectionPanel]');
            $panelList.find('.inspect_panels--_propertyValue--MMDhq').each((index, span) => {
                const clsPrefix = 'figmaHelper_newUnit'
                var $span = $(span);
                var unitText = $span.text();
                if ($span.hasClass(clsPrefix)) return;
                var newUnitText = unitTextConvert(unitText);
                if (newUnitText.length == 0) return;
                var $newSpan: JQuery;
                if ($span.next(`.${clsPrefix}`).length == 0) {
                    $newSpan = $span.clone().addClass(clsPrefix);
                    $newSpan.click(onNewUnitClick);
                    $span.after($newSpan);
                } else {
                    $newSpan = $span.next(`.${clsPrefix}`);
                }
                $newSpan.text(newUnitText);
                log(unitText, newUnitText);
            });
            // 植入新复制代码按钮
            addCopyBtn();
            // 植入转换单位后的css代码面板
            addCssCodePanel();

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

    /** 将字符串单位转换为新字符串单位 */
    // "-10.3px" -> "-1.03rpx" 只接受以px为结尾的字符串
    function unitTextConvert(text: string): string {
        if (!text.endsWith('px')) return '';
        var num = parseFloat(text); // -10.3px -> -10.3
        num = evalFormat(num); // 根据转换公式计算转换后的数值
        num = Number(num.toFixed(2));//解决无限小数问题+移除末尾0
        var result = `${num}rpx`;
        return result;
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
            log('转换公式不合法，请检查公式！', '当前公式：', code);
        }
        return result;
    }

    /** 插入新的复制属性按钮 */
    function addCopyBtn() {
        const cssMap = {
            'Width': 'width',
            'Height': 'height',
            'Top': 'top',
            'Left': 'left',
            'Radius': 'border-radius',
            'Opacity': 'opacity',
        } as const;
        var clsPrefix = 'figmaHelper_newCopyBtn';
        var $copyBtnList = $('[class*=inspect_panels--copyButton]');
        if ($copyBtnList.length == 0) {
            return;
        };
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
                var oldValue = $line.find('[class*=inspect_panels--propertyValue]').text();
                var newvalue = $line.find('[class*=figmaHelper_newUnit]').text();
                key = cssMap[key] || key.toLowerCase();
                result += `${key}: ${newvalue || oldValue};\n`;
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

        function onConfigUnitClick(e: JQueryMouseEventObject) {
            e.stopPropagation();
            var format = getUnitFormat();
            var newFormat = prompt('请输入单位转换公式：\n{n}为具体数值变量', format);
            setUnitFormat(newFormat);
        }
    }

    /** 插入新css代码面板 */
    function addCssCodePanel() {
        const clsPrefix = 'figmaHelper_cssCodeContent';
        //移除上一次添加的css面板
        $(`.${clsPrefix}`).remove();
        var $cssPanel = $("[class*=css_code_panel--cssCodeContent]");
        var $newCssPanel = $cssPanel.eq(0).clone().addClass(clsPrefix);
        $cssPanel.after($newCssPanel)
        $newCssPanel.find('*').each((index, ele) => {
            var $ele = $(ele);
            if ($ele.children().length > 0) return;
            var text = $ele.text().replace(/-?\d+(?:\.\d+)?px/g, (match, index, all) => {
                // match为提取出来的px字符串，如 "50%-60px/2" 当中的 "60px"
                return unitTextConvert(match);
            })
            $ele.text(text);
        })
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


    //========Tools============


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

    /** 解决figma改写了原生prompt函数的问题 */
    function createPrompt(): typeof window['prompt'] {
        try {
            const clsPrefix = 'figmaHelper_promptIframe';
            var $iframe = $('<iframe>').addClass(clsPrefix).css({ display: 'none', position: 'absolute', width: 0, height: 0 });
            $('body').append($iframe);
            return ($iframe.get(0) as HTMLIFrameElement).contentWindow.prompt;
        } catch (ex) {
            return function () {
                alert('功能异常，请联系开发者');
            } as any;
        }
    }
}

if ("jQuery" in window && typeof window.figmaHelper == "function") {
    window["figmaHelper"]();
}


//--------------------类型定义---------------------------

interface Window {
    figmaHelper: figmaHelper;
}
interface figmaHelper {
    (): void;
    isInit?: boolean;
}