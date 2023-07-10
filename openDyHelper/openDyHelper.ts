window.openDyHelper = function () {
    if (window.openDyHelper.isInit === true) return;
    window.openDyHelper.isInit = true;
    log("welcome openDyHelper @github.com/xxcanghai", decodeURIComponent(location.href));
    const storageKey = 'openDyHelper_convertFormat';

    function log(...args) {
        console.log.apply(console, ['%c[openDyHelper]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }

    (function () {
        insertStyle(`
        /* 一键调整权限 */
        .openDyHelper_permissionRow {
            margin:10px 0;
        }
        .openDyHelper_permissionRow button {
            margin-right: 10px;
        }
    `);
    }());

    function initMutationObserver() {
        var observer = new MutationObserver(domChange);
        var stylePanel = $("body").get(0);
        var options: MutationObserverInit = {
            'childList': true,
            'attributes': false,
            'subtree': false,
            'characterData': false,
        };
        observer.observe(stylePanel, options);

        function domChange(mutations: MutationRecord[], observer: MutationObserver) {
            // log('domChange:',mutations,observer)
            const $dialog = $(mutations?.[0].addedNodes?.[0]);
            if (mutations.length == 1 &&
                mutations[0].type == 'childList' &&
                $dialog.hasClass('semi-dy-open-portal') &&
                $dialog.find('.semi-dy-open-modal-title').text() === '添加成员' &&
                $dialog.find('.w-full').length > 0
            ) {
                log('检测到添加成员弹窗', $dialog);
                actionPermissionDialog($dialog);
            } else {
                return;
            }
        }
    }

    /** 对添加成员权限弹窗处理 */
    function actionPermissionDialog($dialog: JQuery) {
        let $row = $('<div>')
            .addClass('openDyHelper_permissionRow')
            .text('选择全部：')
            .append($(buttonHtml('可编辑')).click(() => selectedAll(0)))
            .append($(buttonHtml('可查看')).click(() => selectedAll(1)));
            // .append($(buttonHtml('无权限')).click(() => selectedAll(2)));
        $dialog.find('.w-full').before($row);
    }

    function buttonHtml(text: string): string {
        return `<button class="semi-dy-open-button semi-dy-open-button-primary semi-dy-open-button-light" type="button" aria-disabled="false">
            <span class="semi-dy-open-button-content" x-semi-prop="children">${text}</span>
        </button>`;
    }

    /** 全部选中弹窗中的表单指定项 */
    function selectedAll(index: 0 | 1 | 2) {
        function action() {
            $('.semi-dy-open-modal .w-full .semi-dy-open-form-field').each((i, group) => {
                const $radio=$(group).find('.semi-dy-open-form-field-main label').eq(index);
                if(!$radio.hasClass('semi-dy-open-radio-checked')){
                    $radio.click();
                }
                console.log($radio);
            })
        }
        action();
        // 如果选择0，可编辑，由于会有动态显示出的单选，需要再次执行一次全部选中
        if (index == 0) {
            action();
        }
    }
    selectedAll(0);

    function init() {
        initMutationObserver();
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

if ("jQuery" in window && typeof window.openDyHelper == "function") {
    window["openDyHelper"]();
}


//--------------------类型定义---------------------------

interface Window {
    openDyHelper: openDyHelper;
}
interface openDyHelper {
    (): void;
    isInit?: boolean;
}
