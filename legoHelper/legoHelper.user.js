// ==UserScript==
// @name         乐高助手 legoHelper
// @namespace    http://lego.waimai.sankuai.com/
// @version      0.1
// @description  为乐高项目增加辅助功能支持等
// @author       xxcanghai
// @include      http://lego.waimai.sankuai.com/*
// @exclude      http://lego.waimai.sankuai.com/preview
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var legoSrc = "http://rawgit.com/xxcanghai/userscript/master/legoHelper/legoHelper.js";
    var jquerySrc = "https://code.jquery.com/jquery-1.12.4.js";

    var t = new Date().getTime();
    var $jqScript = $("<script>").attr("src", jquerySrc + "?=" + t);
    var $legoScript = $("<script>").attr("src", legoSrc + "?_=" + t);

    if (typeof window["jQuery"] == "undefined") {
        $jqScript.get(0).onload = function (e) {
            console.log("jquery loaded");
            loadLegoHelper();
        };
        $("body").append($jqScript);
    } else {
        loadLegoHelper();
    }

    function loadLegoHelper() {
        $("body").append($legoScript);
    }

})();