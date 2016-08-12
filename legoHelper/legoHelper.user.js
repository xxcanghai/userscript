// ==UserScript==
// @name         乐高助手 legoHelper
// @namespace    http://lego.waimai.sankuai.com/
// @version      0.1
// @description  为乐高项目增加辅助功能支持等
// @author       xxcanghai
// @include      http://lego.waimai.sankuai.com/*
// @exclude      http://lego.waimai.sankuai.com/preview
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.js
// ==/UserScript==

(function () {
    'use strict';
    var src = "http://rawgit.com/xxcanghai/userscript/master/legoHelper/legoHelper.js";

    // var script = document.createElement("script");
    // script.onload = onload;
    // script.src = src;
    // var head = document.getElementsByTagName("body")[0];
    // head.appendChild(script);

    // function onload(e) {
    //     // console.log("legoHelper loaded!");
    // }

    var t = new Date().getTime();

    $("body").append($("<script>").attr("src", src + "?_=" + t));

})();