// ==UserScript==
// @name         google前端助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为google增加辅助功能。0.1版本支持在谷歌搜索栏，增加切换到“搜索中国地区”的按钮
// @author       xxcanghai
// @match        https://www.google.com/*
// @exclude
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

// 上线时：@require 删除
// 本地开发时：// @require     file:///Users/bytedance/WebSite/xxcanghai/userscript/googleHelper/googleHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = false;
    // jquery库
    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    // 实际插件代码地址
    const googleSrc = "https://raw.githubusercontent.com/xxcanghai/userscript/master/googleHelper/googleHelper.js";
    // 安装脚本地址
    const googleUserScript = "https://raw.githubusercontent.com/xxcanghai/userscript/master/googleHelper/googleHelper.user.js";

    if (typeof window["jQuery"] == "undefined") {
        loadScript(jquerySrc, loadGoogle);
    } else {
        loadGoogle();
    }

    function log(...args) {
        console.log.apply(console, ['%c[googleHelper]', 'color: #0000ff;font-weight:bold;'].concat(args));
    }
    function loadScript(src, onload) {
        var t = new Date().getTime();
        src += "?_=" + t;
        fetch(src).then(resp => resp.text()).then(code => {
            var exportResut = eval(code);
            onload(exportResut);
        });
    }
    function loadGoogle() {
        // log("jquery 载入成功!");
        // log("jquery 载入成功!", $, jQuery);
        // var $ = window.jQuery;
        if (isDev == false) {
            loadScript(googleSrc, function (e) {
                log("google助手脚本载入成功");
            })
        } else {
            log('当前为开发模式，从本地加载脚本！');
            if (typeof window.googleHelper == "function") {
                window.googleHelper();
            }
        }
    }
})();