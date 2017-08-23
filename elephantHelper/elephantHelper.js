window.elephantHelper = function () {
    if (window.elephantHelper.isInit === true)
        return;
    window.elephantHelper.isInit = true;
    console.info("welcome elephantHelper @github.com/xxcanghai", location.href);
    // 取消显示水印
    (function () {
        insertStyle("\n            /* \u7FA4\u804A\u5217\u8868\uFF0C\u4E2A\u4EBA\u540D\u7247 */\n            .bubblelist,.ctn-content {\n                background-image: none !important;\n            }\n        ");
    }());
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
};
if ("jQuery" in window && typeof window.elephantHelper == "function") {
    window["elephantHelper"]();
}
