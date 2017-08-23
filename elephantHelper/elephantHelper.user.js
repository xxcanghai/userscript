// ==UserScript==
// @name         大象助手 elephantHelper
// @namespace    
// @version      0.1
// @description  为大象新增各种辅助功能
// @author       xxcanghai
// @include      *x.sankuai.com/*
// @exclude      
// @grant        none
// ==/UserScript==


// @require      file:///Users/jicanghai/WebSite/userscript/elephantHelper/elephantHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = false;

    var jquerySrc = "https://code.jquery.com/jquery-1.12.4.js";
    var elephantSrc = "https://xxcanghai.github.io/userscript/elephantHelper/elephantHelper.js";
    var t = new Date().getTime();

    if (typeof window["jQuery"] == "undefined") {
        appendScript(jquerySrc, loadElephantEmoji);
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

    function loadElephantEmoji() {
        console.info("jquery 载入成功!", $, jQuery);
        var $ = window.jQuery;
        if (isDev == false) {
            appendScript(elephantSrc, function (e) {
                console.log("大象助手脚本载入成功");
            })
        } else {
            if (typeof window.elephantHelper == "function") {
                window.elephantHelper();
            }
        }
    }
})();