window.figmaHelper = function () {
    if (window.figmaHelper.isInit === true)
        return;
    window.figmaHelper.isInit = true;
    console.info("welcome figmaHelper @github.com/xxcanghai", location.href);

};
if ("jQuery" in window && typeof window.figmaHelper == "function") {
    window["figmaHelper"]();
}
