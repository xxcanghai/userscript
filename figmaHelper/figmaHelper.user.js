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
// 本地开发时：@require     /Users/bytedance/WebSite/xxcanghai/userscript/figmaHelper/figmaHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = false;

    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    const figmaSrc = "//raw.githubusercontent.com/xxcanghai/userscript/master/figmaHelper/figmaHelper.js";
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
    function appendScript(src, onload) {
        if (typeof src != "string" || src.length == 0) return null;
        if (typeof onload != "function") {
            onload = function () { };
        }
        var script = document.createElement("script");
        script.onload = onload;
        script.src = src + "?_=" + t;
        document.getElementsByTagName("body")[0].appendChild(script);
        return script;
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
            appendScript(figmaSrc, function (e) {
                log("figma助手脚本载入成功");
            })
        } else {
            if (typeof window.figmaHelper == "function") {
                window.figmaHelper();
            }
        }
    }
})();