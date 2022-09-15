// ==UserScript==
// @name         figma前端助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为figma增加一系列的在前端开发领域的功能。1.0版本为增加px转换为rpx显示
// @author       xxcanghai
// @match        https://www.figma.com/file/*
// @exclude
// @icon         https://www.google.com/s2/favicons?sz=64&domain=figma.com
// @grant        none
// ==/UserScript==

// 上线时：@require 删除
// 本地开发时：@require     file:///Users/bytedance/WebSite/xxcanghai/userscript/figmaHelper/figmaHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = false;
    // jquery库
    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    // 实际插件代码地址
    const figmaSrc = "https://raw.githubusercontent.com/xxcanghai/userscript/master/figmaHelper/figmaHelper.js";
    // 安装脚本地址
    const figmaUserScript= "https://raw.githubusercontent.com/xxcanghai/userscript/master/figmaHelper/figmaHelper.user.js";
    const t = new Date().getTime();

    if (typeof window["jQuery"] == "undefined") {
        loadScript(jquerySrc, loadFigma);
    } else {
        loadFigma();
    }
    //解决figma屏蔽了prompt函数的问题
    window['figmaHepler_prompt']= prompt;

    function log(...args) {
        console.log.apply(console, ['%c[FigmaHepler]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }
    function loadScript(src, onload) {
        fetch(src).then(resp => resp.text()).then(code => {
            var exportResut = eval(code);
            onload(exportResut);
        });
    }
    function loadFigma() {
        log("jquery 载入成功!", $, jQuery);
        var $ = window.jQuery;
        if (isDev == false) {
            loadScript(figmaSrc, function (e) {
                log("figma助手脚本载入成功");
            })
        } else {
            if (typeof window.figmaHelper == "function") {
                window.figmaHelper();
            }
        }
    }
})();