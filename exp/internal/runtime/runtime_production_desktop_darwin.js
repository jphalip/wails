(()=>{var h=Object.defineProperty;var f=(o,n)=>{for(var e in n)h(o,e,{get:n[e],enumerable:!0})};(function(){window.WailsInvoke=o=>{window.webkit.messageHandlers.wails.postMessage(o)}})();var w={};function E(){var o=new Uint32Array(1);return window.crypto.getRandomValues(o)[0]}function y(){return Math.random()*9007199254740991}var u;window.crypto?u=E:u=y;function l(o,n,e){e==null&&(e=0);let i=window.wails.window.ID();return new Promise(function(t,r){var s;do s=o+"-"+u();while(w[s]);var d;e>0&&(d=setTimeout(function(){r(Error("Call to "+o+" timed out. Request ID: "+s))},e)),w[s]={timeoutHandle:d,reject:r,resolve:t};try{let W={name:o,args:n,callbackID:s,windowID:i};window.WailsInvoke("C"+JSON.stringify(W))}catch(W){console.error(W)}})}window.ObfuscatedCall=(o,n,e)=>(e==null&&(e=0),new Promise(function(i,t){var r;do r=o+"-"+u();while(w[r]);var s;e>0&&(s=setTimeout(function(){t(Error("Call to method "+o+" timed out. Request ID: "+r))},e)),w[r]={timeoutHandle:s,reject:t,resolve:i};try{let d={id:o,args:n,callbackID:r,windowID:window.wails.window.ID()};window.WailsInvoke("c"+JSON.stringify(d))}catch(d){console.error(d)}}));function m(o){let n;try{n=JSON.parse(o)}catch(t){let r=`Invalid JSON passed to callback: ${t.message}. Message: ${o}`;throw runtime.LogDebug(r),new Error(r)}let e=n.callbackid,i=w[e];if(!i){let t=`Callback '${e}' not registered!!!`;throw console.error(t),new Error(t)}clearTimeout(i.timeoutHandle),delete w[e],n.error?i.reject(n.error):i.resolve(n.result)}var a={};function O(o){let n=o.name;if(a[n]){let e=a[n].slice();for(let i=0;i<a[n].length;i+=1){let t=a[n][i],r=o.data;t.Callback(r)&&e.splice(i,1)}e.length===0?b(n):a[n]=e}}function k(o){let n;try{n=JSON.parse(o)}catch{let i="Invalid JSON passed to Notify: "+o;throw new Error(i)}O(n)}function b(o){delete a[o],window.WailsInvoke("EX"+o)}window.go={};function g(o){try{o=JSON.parse(o)}catch(n){console.error(n)}window.go=window.go||{},Object.keys(o).forEach(n=>{window.go[n]=window.go[n]||{},Object.keys(o[n]).forEach(e=>{window.go[n][e]=window.go[n][e]||{},Object.keys(o[n][e]).forEach(i=>{window.go[n][e][i]=function(){let t=0;function r(){let s=[].slice.call(arguments);return l([n,e,i].join("."),s,t)}return r.setTimeout=function(s){t=s},r.getTimeout=function(){return t},r}()})})})}var p={};f(p,{WindowCenter:()=>A,WindowFullscreen:()=>H,WindowGetPosition:()=>z,WindowGetSize:()=>B,WindowHide:()=>_,WindowIsFullscreen:()=>J,WindowIsMaximised:()=>V,WindowIsMinimised:()=>Y,WindowIsNormal:()=>oo,WindowMaximise:()=>q,WindowMinimise:()=>Z,WindowReload:()=>L,WindowReloadApp:()=>D,WindowSetAlwaysOnTop:()=>P,WindowSetBackgroundColour:()=>no,WindowSetDarkTheme:()=>R,WindowSetLightTheme:()=>T,WindowSetMaxSize:()=>F,WindowSetMinSize:()=>N,WindowSetPosition:()=>j,WindowSetSize:()=>U,WindowSetSystemDefaultTheme:()=>C,WindowSetTitle:()=>M,WindowShow:()=>$,WindowToggleMaximise:()=>Q,WindowUnfullscreen:()=>G,WindowUnmaximise:()=>X,WindowUnminimise:()=>K});function L(){window.location.reload()}function D(){window.WailsInvoke("WR")}function C(){window.WailsInvoke("WASDT")}function T(){window.WailsInvoke("WALT")}function R(){window.WailsInvoke("WADT")}function A(){window.WailsInvoke("Wc")}function M(o){window.WailsInvoke("WT"+o)}function H(){window.WailsInvoke("WF")}function G(){window.WailsInvoke("Wf")}function J(){return l(":wails:WindowIsFullscreen")}function U(o,n){window.WailsInvoke("Ws:"+o+":"+n)}function B(){return l(":wails:WindowGetSize")}function F(o,n){window.WailsInvoke("WZ:"+o+":"+n)}function N(o,n){window.WailsInvoke("Wz:"+o+":"+n)}function P(o){window.WailsInvoke("WATP:"+(o?"1":"0"))}function j(o,n){window.WailsInvoke("Wp:"+o+":"+n)}function z(){return l(":wails:WindowGetPos")}function _(){window.WailsInvoke("WH")}function $(){window.WailsInvoke("WS")}function q(){window.WailsInvoke("WM")}function Q(){window.WailsInvoke("Wt")}function X(){window.WailsInvoke("WU")}function V(){return l(":wails:WindowIsMaximised")}function Z(){window.WailsInvoke("Wm")}function K(){window.WailsInvoke("Wu")}function Y(){return l(":wails:WindowIsMinimised")}function oo(){return l(":wails:WindowIsNormal")}function no(o,n,e,i){let t=JSON.stringify({r:o||0,g:n||0,b:e||0,a:i||255});window.WailsInvoke("Wr:"+t)}var x={};f(x,{ScreenGetAll:()=>eo});function eo(){return l(":wails:ScreenGetAll")}var v={};f(v,{BrowserOpenURL:()=>io});function io(o){window.WailsInvoke("BO:"+o)}var I={};f(I,{LogDebug:()=>so,LogError:()=>ao,LogFatal:()=>co,LogInfo:()=>lo,LogLevel:()=>uo,LogPrint:()=>ro,LogTrace:()=>to,LogWarning:()=>wo,SetLogLevel:()=>fo});function c(o,n){window.WailsInvoke("L"+o+n)}function to(o){c("T",o)}function ro(o){c("P",o)}function so(o){c("D",o)}function lo(o){c("I",o)}function wo(o){c("W",o)}function ao(o){c("E",o)}function co(o){c("F",o)}function fo(o){c("S",o)}var uo={TRACE:1,DEBUG:2,INFO:3,WARNING:4,ERROR:5};var S=-1;function Wo(){window.WailsInvoke("Q")}function po(){window.WailsInvoke("S")}function xo(){window.WailsInvoke("H")}window.wails={Callback:m,callbacks:w,EventsNotify:k,eventListeners:a,SetBindings:g,window:{ID:()=>S}};window.runtime={...I,...p,...v,...x,EventsOn,EventsOnce,EventsOnMultiple,EventsEmit,EventsOff,Show:po,Hide:xo,Quit:Wo};window.wails_config&&(S=window.wails_config.windowID,window.wails_config=null);console.log("Wails v3.0.0 Debug Mode Enabled");})();