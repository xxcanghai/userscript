window.elephantHelper = function () {
    if (window.elephantHelper.isInit === true) return;
    window.elephantHelper.isInit = true;
    console.info("welcome elephantHelper @github.com/xxcanghai", location.href);

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

if ("jQuery" in window && typeof window.elephantHelper == "function") {
    window["elephantHelper"]();
}


//--------------------类型定义---------------------------

interface Window {
    elephantHelper: ElephantHelper;
}
interface ElephantHelper {
    (): void;
    isInit?: boolean;
}