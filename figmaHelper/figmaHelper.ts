window.figmaHelper = function () {
    if (window.figmaHelper.isInit === true) return;
    window.figmaHelper.isInit = true;
    console.info("welcome figmaHelper @github.com/xxcanghai", location.href);

    // 取消显示水印
    (function () {
        insertStyle(`
            /* 群聊列表，个人名片 */
            .bubblelist,.ctn-content {
                background-image: none !important;
            }
        `);
    }());


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