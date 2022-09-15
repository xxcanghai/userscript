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
// @require      file:///Users/bytedance/WebSite/xxcanghai/userscript/figmaHelper/figmaHelper.js
// ==/UserScript==


// @require     /Users/bytedance/WebSite/xxcanghai/userscript/figmaHelper/figmaHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = true;

    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    // var jquerySrc = "https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
    const figmaSrc = "https://xxcanghai.github.io/userscript/figmaHelper/figmaHelper.js";
    const t = new Date().getTime();

    if (typeof window["jQuery"] == "undefined") {
        loadScript(jquerySrc, loadElephantEmoji);
    } else {
        loadElephantEmoji();
    }

    function appendScript(src, onload) {
        if (typeof src != "string" || src.length == 0) return null;
        if (typeof onload != "function") {
            onload = function () {};
        }
        var script = document.createElement("script");
        script.onload = onload;
        script.src = src + "?_=" + t;
        document.getElementsByTagName("body")[0].appendChild(script);
        return script;
    }
    function loadScript(src, onload) {
        fetch(jquerySrc).then(resp=>resp.text()).then(src=>{
            eval(src);
            onload();
        });
    }

    function loadElephantEmoji() {
        console.info("jquery 载入成功!", $, jQuery);
        var $ = window.jQuery;
        if (isDev == false) {
            appendScript(figmaSrc, function (e) {
                console.log("大象助手脚本载入成功");
            })
        } else {
            if (typeof window.figmaHelper == "function") {
                window.figmaHelper();
            }
        }
    }
})();