// ==UserScript==
// @name         AmazonImageGetter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.info("welcome amazon image getter!");
    var jqueryUrl="https://code.jquery.com/jquery-1.12.4.min.js";
    
    addScript(jqueryUrl,function(){
        var arr=getAllLink();
        var loadNum=0;
        arr.forEach(function($link,index){
            $.get($link.attr("href"),function(res){
                //console.log(index,"responeLength",res.length);
                var match=res.match(/id="(?:landingImage|ebooksImgBlkFront|imgBlkFront)".*?data-a-dynamic-image="(.*?)"/);
                if(match==null){
                    console.error(index,"ERROR!");
                    return true;
                }
                var imgUrl= match[1];
                imgUrl=imgUrl.replace(/^.*?&quot;(.*?)&quot;.*$/,"$1").replace(/\._.*?_\./,".");
                $link.before($("<a>").css("color","red").text("大图 ").attr("href",imgUrl).attr("target","_blank"));
                console.log(index,imgUrl);
                loadNum++;
                if(loadNum==arr.length){
                    console.info("全部加载完成");
                }
            });
        });
    });
    
    function getAllLink(){
        var arr=[];
        $("ul#s-results-list-atf li div.a-spacing-mini a.s-access-detail-page").each(function(i){
            var $link=$(this);
            arr.push($link);
        });
        console.log("总数量：",arr.length);
        return arr;
    }
    
    function addScript(url,onload){
        var script=document.createElement("script");
        script.onload=function(){
            onload();
        };
        script.src=url;
        var head=document.getElementsByTagName("head")[0];
        head.appendChild(script);
    }
    
})();
