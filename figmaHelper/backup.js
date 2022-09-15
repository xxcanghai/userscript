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
// @require
// ==/UserScript==


(function () {
    const jquerySrc = "//code.jquery.com/jquery-3.5.0.min.js"
    // 百度源： //apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
    // 官方源： //code.jquery.com/jquery-3.5.0.min.js
    const t = new Date().getTime();
    if (typeof window["jQuery"] == "undefined") {
        loadScript(jquerySrc, init);
    } else {
        init();
    }

    // figma有csp，无法通过script加载js
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


    function init(){
        console.log('jch figmaHelper!',$);
        setTimeout(figmaHelper,3000);
    }

    const panelQuery='[class*="raw_components--panel--3IcXg inspect_panels--inspectionPanel--3Wboz"]';
    function figmaHelper(){
        var observer = new MutationObserver(domChange);
        var stylePanel = $(panelQuery).get(0);
        var options = {
            'childList': true,
            'arrtibutes': true,
            'subtree':true,
            'characterData':true,
        };

        observer.observe(stylePanel, options);
        //初始化执行一次
        domChange();
    }

    function domChange(element, option){
        console.log('jch domChange');
        $(panelQuery).find('.inspect_panels--_propertyValue--MMDhq').each((index,span)=>{
            var text=$(span).text();
            console.log(text)
        });
    }
}());