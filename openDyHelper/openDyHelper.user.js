// ==UserScript==
// @name         抖音开放平台前端助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为抖音开放平台增加一系列的在前端开发领域的功能。1.0版本为增加px转换为rpx显示
// @author       xxcanghai
// @match        https://developer.open-douyin.com/*
// @exclude
// @icon         https://www.google.com/s2/favicons?sz=64&domain=developer.open-douyin.com
// @grant        none
// @run-at       document-start
// @require     file:///Users/bytedance/WebSite/xxcanghai/userscript/openDyHelper/openDyHelper.js
// ==/UserScript==

// 上线时：@require 删除
// 本地开发时：// @require     file:///Users/bytedance/WebSite/xxcanghai/userscript/openDyHelper/openDyHelper.js
(function () {
    /** 是否为开发环境。默认线上环境为false */
    var isDev = true;
    // jquery库
    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    // 实际插件代码地址
    const openDySrc = "https://raw.githubusercontent.com/xxcanghai/userscript/master/openDyHelper/openDyHelper.js";
    // 安装脚本地址
    const openDyUserScript = "https://raw.githubusercontent.com/xxcanghai/userscript/master/openDyHelper/openDyHelper.user.js";

    if (typeof window["jQuery"] == "undefined") {
        loadScript(jquerySrc, loadGoogle);
    } else {
        loadGoogle();
    }

    function log(...args) {
        console.log.apply(console, ['%c[openDyHelper]', 'color: #0000ff;font-weight:bold;'].concat(args));
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
            loadScript(openDySrc, function (e) {
                log("openDy助手脚本载入成功");
            })
        } else {
            log('当前为开发模式，从本地加载脚本！');
            if (typeof window.openDyHelper == "function") {
                window.openDyHelper();
            }
        }
    }
})();