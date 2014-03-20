!function(a,b,c){"use strict";b.module("ngResource",["ng"]).factory("$resource",["$http","$parse",function(a,d){function e(a){return f(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function f(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,b?"%20":"+")}function g(a,b){this.template=a+="#",this.defaults=b||{};var c=this.urlParams={};k(a.split(/\W/),function(b){b&&new RegExp("(^|[^\\\\]):"+b+"\\W").test(a)&&(c[b]=!0)}),this.template=a.replace(/\\:/g,":")}function h(d,e,f){function p(a,b){var c={};return b=l({},e,b),k(b,function(b,d){c[d]=b.charAt&&"@"==b.charAt(0)?o(a,b.substr(1)):b}),c}function q(a){m(a||{},this)}var r=new g(d);return f=l({},i,f),k(f,function(d,e){d.method=b.uppercase(d.method);var f="POST"==d.method||"PUT"==d.method||"PATCH"==d.method;q[e]=function(b,c,e,g){var h,i={},o=j,s=null;switch(arguments.length){case 4:s=g,o=e;case 3:case 2:if(!n(c)){i=b,h=c,o=e;break}if(n(b)){o=b,s=c;break}o=c,s=e;case 1:n(b)?o=b:f?h=b:i=b;break;case 0:break;default:throw"Expected between 0-4 arguments [params, data, success, error], got "+arguments.length+" arguments."}var t=this instanceof q?this:d.isArray?[]:new q(h);return a({method:d.method,url:r.url(l({},p(h,d.params||{}),i)),data:h}).then(function(a){var b=a.data;b&&(d.isArray?(t.length=0,k(b,function(a){t.push(new q(a))})):m(b,t)),(o||j)(t,a.headers)},s),t},q.prototype["$"+e]=function(a,b,d){var g,h=p(this),i=j;switch(arguments.length){case 3:h=a,i=b,g=d;break;case 2:case 1:n(a)?(i=a,g=b):(h=a,i=b||j);case 0:break;default:throw"Expected between 1-3 arguments [params, success, error], got "+arguments.length+" arguments."}var k=f?this:c;q[e].call(this,h,k,i,g)}}),q.bind=function(a){return h(d,l({},e,a),f)},q}var i={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},j=b.noop,k=b.forEach,l=b.extend,m=b.copy,n=b.isFunction,o=function(a,b){return d(b)(a)};return g.prototype={url:function(a){var c,d,g=this,h=this.template;a=a||{},k(this.urlParams,function(f,i){c=a.hasOwnProperty(i)?a[i]:g.defaults[i],b.isDefined(c)&&null!==c?(d=e(c),h=h.replace(new RegExp(":"+i+"(\\W)","g"),d+"$1")):h=h.replace(new RegExp("(/?):"+i+"(\\W)","g"),function(a,b,c){return"/"==c.charAt(0)?c:b+c})}),h=h.replace(/\/?#$/,"");var i=[];return k(a,function(a,b){g.urlParams[b]||i.push(f(b)+"="+f(a))}),i.sort(),h=h.replace(/\/*$/,""),h+(i.length?"?"+i.join("&"):"")}},h}])}(window,window.angular),function(a,b,c){"use strict";b.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(a,d){function e(){var a,e,f,i;for(a in h)k(g[a])&&d.cookies(a,c);for(a in g)e=g[a],b.isString(e)?e!==h[a]&&(d.cookies(a,e),i=!0):b.isDefined(h[a])?g[a]=h[a]:delete g[a];if(i){i=!1,f=d.cookies();for(a in g)g[a]!==f[a]&&(k(f[a])?delete g[a]:g[a]=f[a],i=!0)}}var f,g={},h={},i=!1,j=b.copy,k=b.isUndefined;return d.addPollFn(function(){var b=d.cookies();f!=b&&(f=b,j(b,h),j(b,g),i&&a.$apply())})(),i=!0,a.$watch(e),g}]).factory("$cookieStore",["$cookies",function(a){return{get:function(c){var d=a[c];return d?b.fromJson(d):d},put:function(c,d){a[c]=b.toJson(d)},remove:function(b){delete a[b]}}}])}(window,window.angular),function(a,b){"use strict";function c(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}function d(a,c){function d(a,d,g,h){if(d=b.lowercase(d),v[d])for(;q.last()&&w[q.last()];)f("",q.last());u[d]&&q.last()==d&&f("",d),h=r[d]||!!h,h||q.push(d);var i={};g.replace(k,function(a,b,c,d,f){var g=c||d||f||"";i[b]=e(g)}),c.start&&c.start(d,i,h)}function f(a,d){var e,f=0;if(d=b.lowercase(d))for(f=q.length-1;f>=0&&q[f]!=d;f--);if(f>=0){for(e=q.length-1;e>=f;e--)c.end&&c.end(q[e]);q.length=f}}var g,h,p,q=[],s=a;for(q.last=function(){return q[q.length-1]};a;){if(h=!0,q.last()&&x[q.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+q.last()+"[^>]*>","i"),function(a,b){return b=b.replace(n,"$1").replace(o,"$1"),c.chars&&c.chars(e(b)),""}),f("",q.last());else if(0===a.indexOf("<!--")?(g=a.indexOf("-->"),g>=0&&(c.comment&&c.comment(a.substring(4,g)),a=a.substring(g+3),h=!1)):m.test(a)?(p=a.match(j),p&&(a=a.substring(p[0].length),p[0].replace(j,f),h=!1)):l.test(a)&&(p=a.match(i),p&&(a=a.substring(p[0].length),p[0].replace(i,d),h=!1)),h){g=a.indexOf("<");var t=0>g?a:a.substring(0,g);a=0>g?"":a.substring(g),c.chars&&c.chars(e(t))}if(a==s)throw"Parse Error: "+a;s=a}f()}function e(a){return B.innerHTML=a.replace(/</g,"&lt;"),B.innerText||B.textContent||""}function f(a){return a.replace(/&/g,"&amp;").replace(q,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(a){var c=!1,d=b.bind(a,a.push);return{start:function(a,e,g){a=b.lowercase(a),!c&&x[a]&&(c=a),c||1!=y[a]||(d("<"),d(a),b.forEach(e,function(a,c){var e=b.lowercase(c);1!=A[e]||z[e]===!0&&!a.match(p)||(d(" "),d(c),d('="'),d(f(a)),d('"'))}),d(g?"/>":">"))},end:function(a){a=b.lowercase(a),c||1!=y[a]||(d("</"),d(a),d(">")),a==c&&(c=!1)},chars:function(a){c||d(f(a))}}}var h=function(a){var b=[];return d(a,g(b)),b.join("")},i=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,j=/^<\s*\/\s*([\w:-]+)[^>]*>/,k=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,l=/^</,m=/^<\s*\//,n=/<!--(.*?)-->/g,o=/<!\[CDATA\[(.*?)]]>/g,p=/^((ftp|https?):\/\/|mailto:|#)/i,q=/([^\#-~| |!])/g,r=c("area,br,col,hr,img,wbr"),s=c("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),t=c("rp,rt"),u=b.extend({},t,s),v=b.extend({},s,c("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),w=b.extend({},t,c("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),x=c("script,style"),y=b.extend({},r,v,w,u),z=c("background,cite,href,longdesc,src,usemap"),A=b.extend({},z,c("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")),B=document.createElement("pre");b.module("ngSanitize",[]).value("$sanitize",h),b.module("ngSanitize").directive("ngBindHtml",["$sanitize",function(a){return function(b,c,d){c.addClass("ng-binding").data("$binding",d.ngBindHtml),b.$watch(d.ngBindHtml,function(b){b=a(b),c.html(b||"")})}}]),b.module("ngSanitize").filter("linky",function(){var a=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/,b=/^mailto:/;return function(c){if(!c)return c;for(var d,e,f,h=c,i=[],j=g(i);d=h.match(a);)e=d[0],d[2]==d[3]&&(e="mailto:"+e),f=d.index,j.chars(h.substr(0,f)),j.start("a",{href:e}),j.chars(d[0].replace(b,"")),j.end("a"),h=h.substring(f+d[0].length);return j.chars(h),i.join("")}})}(window,window.angular),function(a,b,c){"use strict";b.module("ngAnimate",["ng"]).factory("$$animateReflow",["$$rAF","$document",function(a,b){var c=b[0].body;return function(b){return a(function(){c.offsetWidth+1;b()})}}]).config(["$provide","$animateProvider",function(d,e){function f(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.nodeType==l)return c}}function g(a){return b.element(f(a))}function h(a,b){return f(a)==f(b)}var i=b.noop,j=b.forEach,k=e.$$selectors,l=1,m="$$ngAnimateState",n="ng-animate",o={running:!0};d.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document",function(a,c,d,l,p,q){function r(a){if(a){var b=[],e={},f=a.substr(1).split(".");(d.transitions||d.animations)&&f.push("");for(var g=0;g<f.length;g++){var h=f[g],i=k[h];i&&!e[h]&&(b.push(c.get(i)),e[h]=!0)}return b}}function s(a,c,d){function e(a,b){var c=a[b],d=a["before"+b.charAt(0).toUpperCase()+b.substr(1)];return c||d?("leave"==b&&(d=c,c=null),v.push({event:b,fn:c}),s.push({event:b,fn:d}),!0):void 0}function f(b,c,e){function f(a){if(c){if((c[a]||i)(),++l<g.length)return;c=null}e()}var g=[];j(b,function(a){a.fn&&g.push(a)});var l=0;j(g,function(b,e){var g=function(){f(e)};switch(b.event){case"setClass":c.push(b.fn(a,h,k,g));break;case"addClass":c.push(b.fn(a,h||d,g));break;case"removeClass":c.push(b.fn(a,k||d,g));break;default:c.push(b.fn(a,g))}}),c&&0===c.length&&e()}var g=a[0];if(g){var h,k,l="setClass"==c,m=l||"addClass"==c||"removeClass"==c;b.isArray(d)&&(h=d[0],k=d[1],d=h+" "+k);var n=a.attr("class"),o=n+" "+d;if(z(o)){var p=i,q=[],s=[],t=i,u=[],v=[],w=(" "+o).replace(/\s+/g,".");return j(r(w),function(a){var b=e(a,c);!b&&l&&(e(a,"addClass"),e(a,"removeClass"))}),{node:g,event:c,className:d,isClassBased:m,isSetClassOperation:l,before:function(a){p=a,f(s,q,function(){p=i,a()})},after:function(a){t=a,f(v,u,function(){t=i,a()})},cancel:function(){q&&(j(q,function(a){(a||i)(!0)}),p(!0)),u&&(j(u,function(a){(a||i)(!0)}),t(!0))}}}}}function t(a,c,d,e,f,g,h){function i(b){var e="$animate:"+b;u&&u[e]&&u[e].length>0&&p(function(){d.triggerHandler(e,{event:a,className:c})})}function k(){i("before")}function l(){i("after")}function o(){i("close"),h&&p(function(){h()})}function q(){q.hasBeenRun||(q.hasBeenRun=!0,g())}function r(){if(!r.hasBeenRun){r.hasBeenRun=!0;var b=d.data(m);b&&(t.isClassBased?v(d,c):(p(function(){var b=d.data(m)||{};H==b.index&&v(d,c,a)}),d.data(m,b))),o()}}var t=s(d,a,c);if(!t)return q(),k(),l(),void o();c=t.className;var u=b.element._data(t.node);u=u&&u.events,e||(e=f?f.parent():d.parent());var y=d.data(m)||{},z=y.active||{},A=y.totalActive||0,B=y.last,C=t.isClassBased?y.disabled||B&&!B.isClassBased:!1;if(C||w(d,e))return q(),k(),l(),void r();var D=!1;if(A>0){var E=[];if(t.isClassBased){if("setClass"==B.event)E.push(B),v(d,c);else if(z[c]){var F=z[c];F.event==a?D=!0:(E.push(F),v(d,c))}}else if("leave"==a&&z["ng-leave"])D=!0;else{for(var G in z)E.push(z[G]),v(d,G);z={},A=0}E.length>0&&j(E,function(a){a.cancel()})}if(!t.isClassBased||t.isSetClassOperation||D||(D="addClass"==a==d.hasClass(c)),D)return k(),l(),void o();"leave"==a&&d.one("$destroy",function(){var a=b.element(this),c=a.data(m);if(c){var d=c.active["ng-leave"];d&&(d.cancel(),v(a,"ng-leave"))}}),d.addClass(n);var H=x++;A++,z[c]=t,d.data(m,{last:t,active:z,index:H,totalActive:A}),k(),t.before(function(b){var e=d.data(m);b=b||!e||!e.active[c]||t.isClassBased&&e.active[c].event!=a,q(),b===!0?r():(l(),t.after(r))})}function u(a){var c=f(a);if(c){var d=b.isFunction(c.getElementsByClassName)?c.getElementsByClassName(n):c.querySelectorAll("."+n);j(d,function(a){a=b.element(a);var c=a.data(m);c&&c.active&&j(c.active,function(a){a.cancel()})})}}function v(a,b){if(h(a,l))o.disabled||(o.running=!1,o.structural=!1);else if(b){var c=a.data(m)||{},d=b===!0;!d&&c.active&&c.active[b]&&(c.totalActive--,delete c.active[b]),(d||!c.totalActive)&&(a.removeClass(n),a.removeData(m))}}function w(a,b){if(o.disabled)return!0;if(h(a,l))return o.disabled||o.running;do{if(0===b.length)break;var c=h(b,l),d=c?o:b.data(m),e=d&&(!!d.disabled||d.running||d.totalActive>0);if(c||e)return e;if(c)return!0}while(b=b.parent());return!0}var x=0;l.data(m,o),q.$$postDigest(function(){q.$$postDigest(function(){o.running=!1})});var y=e.classNameFilter(),z=y?function(a){return y.test(a)}:function(){return!0};return{enter:function(b,c,d,e){this.enabled(!1,b),a.enter(b,c,d),q.$$postDigest(function(){b=g(b),t("enter","ng-enter",b,c,d,i,e)})},leave:function(b,c){u(b),this.enabled(!1,b),q.$$postDigest(function(){t("leave","ng-leave",g(b),null,null,function(){a.leave(b)},c)})},move:function(b,c,d,e){u(b),this.enabled(!1,b),a.move(b,c,d),q.$$postDigest(function(){b=g(b),t("move","ng-move",b,c,d,i,e)})},addClass:function(b,c,d){b=g(b),t("addClass",c,b,null,null,function(){a.addClass(b,c)},d)},removeClass:function(b,c,d){b=g(b),t("removeClass",c,b,null,null,function(){a.removeClass(b,c)},d)},setClass:function(b,c,d,e){b=g(b),t("setClass",[c,d],b,null,null,function(){a.setClass(b,c,d)},e)},enabled:function(a,b){switch(arguments.length){case 2:if(a)v(b);else{var c=b.data(m)||{};c.disabled=!0,b.data(m,c)}break;case 1:o.disabled=!a;break;default:a=!o.disabled}return!!a}}}]),e.register("",["$window","$sniffer","$timeout","$$animateReflow",function(d,e,g,h){function k(a,b){J&&J(),W.push(b),J=h(function(){j(W,function(a){a()}),W=[],J=null,U={}})}function m(a,c){var d=f(a);a=b.element(d),Z.push(a);var e=Date.now()+1e3*c;Y>=e||(g.cancel(X),Y=e,X=g(function(){n(Z),Z=[]},c,!1))}function n(a){j(a,function(a){var b=a.data(P);b&&(b.closeAnimationFn||i)()})}function o(a,b){var c=b?U[b]:null;if(!c){var e,f,g,h,i=0,k=0,m=0,n=0;j(a,function(a){if(a.nodeType==l){var b=d.getComputedStyle(a)||{};g=b[E+K],i=Math.max(p(g),i),h=b[E+L],e=b[E+M],k=Math.max(p(e),k),f=b[G+M],n=Math.max(p(f),n);var c=p(b[G+K]);c>0&&(c*=parseInt(b[G+N],10)||1),m=Math.max(c,m)}}),c={total:0,transitionPropertyStyle:h,transitionDurationStyle:g,transitionDelayStyle:e,transitionDelay:k,transitionDuration:i,animationDelayStyle:f,animationDelay:n,animationDuration:m},b&&(U[b]=c)}return c}function p(a){var c=0,d=b.isString(a)?a.split(/\s*,\s*/):[];return j(d,function(a){c=Math.max(parseFloat(a)||0,c)}),c}function q(a){var b=a.parent(),c=b.data(O);return c||(b.data(O,++V),c=V),c+"-"+f(a).className}function r(a,b,c,d){var e=q(b),f=e+" "+c,g=U[f]?++U[f].total:0,h={};if(g>0){var j=c+"-stagger",k=e+" "+j,l=!U[k];l&&b.addClass(j),h=o(b,k),l&&b.removeClass(j)}d=d||function(a){return a()},b.addClass(c);var m=b.data(P)||{},n=d(function(){return o(b,f)}),p=n.transitionDuration,r=n.animationDuration;if(0===p&&0===r)return b.removeClass(c),!1;b.data(P,{running:m.running||0,itemIndex:g,stagger:h,timings:n,closeAnimationFn:i});var s=m.running>0||"setClass"==a;return p>0&&t(b,c,s),r>0&&h.animationDelay>0&&0===h.animationDuration&&u(b),!0}function s(a){return"ng-enter"==a||"ng-move"==a||"ng-leave"==a}function t(a,b,c){s(b)||!c?f(a).style[E+L]="none":a.addClass(Q)}function u(a){f(a).style[G]="none 0s"}function v(a){var b=E+L,c=f(a);c.style[b]&&c.style[b].length>0&&(c.style[b]=""),a.removeClass(Q)}function w(a){var b=G,c=f(a);c.style[b]&&c.style[b].length>0&&(c.style[b]="")}function x(a,b,c,d){function e(){b.off(t,g),b.removeClass(k),C(b,c);var a=f(b);for(var d in v)a.style.removeProperty(v[d])}function g(a){a.stopPropagation();var b=a.originalEvent||a,c=b.$manualTimeStamp||b.timeStamp||Date.now(),e=parseFloat(b.elapsedTime.toFixed(R));Math.max(c-s,0)>=r&&e>=p&&d()}var h=f(b),i=b.data(P);if(-1==h.className.indexOf(c)||!i)return void d();var k="";j(c.split(" "),function(a,b){k+=(b>0?" ":"")+a+"-active"});var l=i.stagger,n=i.timings,o=i.itemIndex,p=Math.max(n.transitionDuration,n.animationDuration),q=Math.max(n.transitionDelay,n.animationDelay),r=q*T,s=Date.now(),t=H+" "+F,u="",v=[];if(n.transitionDuration>0){var w=n.transitionPropertyStyle;-1==w.indexOf("all")&&(u+=I+"transition-property: "+w+";",u+=I+"transition-duration: "+n.transitionDurationStyle+";",v.push(I+"transition-property"),v.push(I+"transition-duration"))}if(o>0){if(l.transitionDelay>0&&0===l.transitionDuration){var x=n.transitionDelayStyle;u+=I+"transition-delay: "+y(x,l.transitionDelay,o)+"; ",v.push(I+"transition-delay")}l.animationDelay>0&&0===l.animationDuration&&(u+=I+"animation-delay: "+y(n.animationDelayStyle,l.animationDelay,o)+"; ",v.push(I+"animation-delay"))}if(v.length>0){var z=h.getAttribute("style")||"";h.setAttribute("style",z+" "+u)}b.on(t,g),b.addClass(k),i.closeAnimationFn=function(){e(),d()};var A=o*(Math.max(l.animationDelay,l.transitionDelay)||0),B=(q+p)*S,D=(A+B)*T;return i.running++,m(b,D),e}function y(a,b,c){var d="";return j(a.split(","),function(a,e){d+=(e>0?",":"")+(c*b+parseInt(a,10))+"s"}),d}function z(a,b,c,d){return r(a,b,c,d)?function(a){a&&C(b,c)}:void 0}function A(a,b,c,d){return b.data(P)?x(a,b,c,d):(C(b,c),void d())}function B(a,b,c,d){var e=z(a,b,c);if(!e)return void d();var f=e;return k(b,function(){v(b,c),w(b),f=A(a,b,c,d)}),function(a){(f||i)(a)}}function C(a,b){a.removeClass(b);var c=a.data(P);c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData(P))}function D(a,c){var d="";return a=b.isArray(a)?a:a.split(/\s+/),j(a,function(a,b){a&&a.length>0&&(d+=(b>0?" ":"")+a+c)}),d}var E,F,G,H,I="";a.ontransitionend===c&&a.onwebkittransitionend!==c?(I="-webkit-",E="WebkitTransition",F="webkitTransitionEnd transitionend"):(E="transition",F="transitionend"),a.onanimationend===c&&a.onwebkitanimationend!==c?(I="-webkit-",G="WebkitAnimation",H="webkitAnimationEnd animationend"):(G="animation",H="animationend");var J,K="Duration",L="Property",M="Delay",N="IterationCount",O="$$ngAnimateKey",P="$$ngAnimateCSS3Data",Q="ng-animate-block-transitions",R=3,S=1.5,T=1e3,U={},V=0,W=[],X=null,Y=0,Z=[];return{enter:function(a,b){return B("enter",a,"ng-enter",b)},leave:function(a,b){return B("leave",a,"ng-leave",b)},move:function(a,b){return B("move",a,"ng-move",b)},beforeSetClass:function(a,b,c,d){var e=D(c,"-remove")+" "+D(b,"-add"),f=z("setClass",a,e,function(d){var e=a.attr("class");a.removeClass(c),a.addClass(b);var f=d();return a.attr("class",e),f});return f?(k(a,function(){v(a,e),w(a),d()}),f):void d()},beforeAddClass:function(a,b,c){var d=z("addClass",a,D(b,"-add"),function(c){a.addClass(b);var d=c();return a.removeClass(b),d});return d?(k(a,function(){v(a,b),w(a),c()}),d):void c()},setClass:function(a,b,c,d){c=D(c,"-remove"),b=D(b,"-add");var e=c+" "+b;return A("setClass",a,e,d)},addClass:function(a,b,c){return A("addClass",a,D(b,"-add"),c)},beforeRemoveClass:function(a,b,c){var d=z("removeClass",a,D(b,"-remove"),function(c){var d=a.attr("class");a.removeClass(b);var e=c();return a.attr("class",d),e});return d?(k(a,function(){v(a,b),w(a),c()}),d):void c()},removeClass:function(a,b,c){return A("removeClass",a,D(b,"-remove"),c)}}}])}])}(window,window.angular),angular.module("colorpicker.module",[]).factory("Helper",function(){return{closestSlider:function(a){var b=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector;return b.bind(a)("I")?a.parentNode:a},getOffset:function(a){for(var b=0,c=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return{top:c,left:b}},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}}]}}).factory("Color",["Helper",function(a){return{value:{h:1,s:1,b:1,a:1},rgb:function(){var a=this.toRGB();return"rgb("+a.r+","+a.g+","+a.b+")"},rgba:function(){var a=this.toRGB();return"rgba("+a.r+","+a.g+","+a.b+","+a.a+")"},hex:function(){return this.toHex()},RGBtoHSB:function(a,b,c,d){a/=255,b/=255,c/=255;var e,f,g,h;return g=Math.max(a,b,c),h=g-Math.min(a,b,c),e=0===h?null:g==a?(b-c)/h:g==b?(c-a)/h+2:(a-b)/h+4,e=(e+360)%6*60/360,f=0===h?0:h/g,{h:e||1,s:f,b:g,a:d||1}},HueToRGB:function(a,b,c){return 0>c?c+=1:c>1&&(c-=1),1>6*c?a+(b-a)*c*6:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a},setColor:function(b){b=b.toLowerCase();for(var c in a.stringParsers){{var d=a.stringParsers[c],e=d.re.exec(b),f=e&&d.parse(e);d.space||"rgba"}if(f)return this.value=this.RGBtoHSB.apply(null,f),!1}},setHue:function(a){this.value.h=1-a},setSaturation:function(a){this.value.s=a},setLightness:function(a){this.value.b=1-a},setAlpha:function(a){this.value.a=parseInt(100*(1-a),10)/100},toRGB:function(a,b,c,d){a||(a=this.value.h,b=this.value.s,c=this.value.b),a*=360;var e,f,g,h,i;return a=a%360/60,i=c*b,h=i*(1-Math.abs(a%2-1)),e=f=g=c-i,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a],{r:Math.round(255*e),g:Math.round(255*f),b:Math.round(255*g),a:d||this.value.a}},toHex:function(a,b,c,d){var e=this.toRGB(a,b,c,d);return"#"+(1<<24|parseInt(e.r,10)<<16|parseInt(e.g,10)<<8|parseInt(e.b,10)).toString(16).substr(1)}}}]).factory("Slider",["Helper",function(a){var b={maxLeft:0,maxTop:0,callLeft:null,callTop:null,knob:{top:0,left:0}},c={};return{getSlider:function(){return b},getLeftPosition:function(a){return Math.max(0,Math.min(b.maxLeft,b.left+((a.pageX||c.left)-c.left)))},getTopPosition:function(a){return Math.max(0,Math.min(b.maxTop,b.top+((a.pageY||c.top)-c.top)))},setSlider:function(d,e){var f=a.closestSlider(d.target);b.knob=f.children[0].style,b.left=d.pageX-a.getOffset(f).left,b.top=d.pageY-a.getOffset(f).top,e&&(b.left-=window.pageXOffset,b.top-=window.pageYOffset),c={left:d.pageX,top:d.pageY}},setSaturation:function(a,c){b={maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setLightness"},this.setSlider(a,c)},setHue:function(a,c){b={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setHue"},this.setSlider(a,c)},setAlpha:function(a,c){b={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setAlpha"},this.setSlider(a,c)},setKnob:function(a,c){b.knob.top=a+"px",b.knob.left=c+"px"}}}]).directive("colorpicker",["$document","$compile","Color","Slider","Helper",function(a,b,c,d,e){return{require:"?ngModel",restrict:"A",link:function(f,g,h,i){var j,k='<div class="colorpicker f-dropdown"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview><button class="tiny secondary button right">&times;</button></div>',l=angular.element(k),m=c,n=l.find("colorpicker-hue"),o=l.find("colorpicker-saturation"),p=l.find("colorpicker-preview"),q=l.find("i"),r=h.colorpicker?h.colorpicker:"hex",s=angular.isDefined(h.colorpickerFixedPosition)?h.colorpickerFixedPosition:!1,t=angular.isDefined(h.colorpickerParent)?g.parent():angular.element(document.body);b(l)(f);var u=function(){a.on("mousemove",w),a.on("mouseup",x)};"rgba"===r&&(l.addClass("alpha"),j=l.find("colorpicker-alpha"),j.on("click",function(a){d.setAlpha(a,s),w(a)}).on("mousedown",function(a){d.setAlpha(a,s),u()})),n.on("click",function(a){d.setHue(a,s),w(a)}).on("mousedown",function(a){d.setHue(a,s),u()}),o.on("click",function(a){d.setSaturation(a,s),w(a)}).on("mousedown",function(a){d.setSaturation(a,s),u()}),s&&l.addClass("colorpicker-fixed-position"),t.append(l),i&&(i.$render=function(){g.val(i.$viewValue)},f.$watch(h.ngModel,function(){y()})),g.on("$destroy",function(){l.remove()});var v=function(){try{p.css("backgroundColor",m[r]())}catch(a){p.css("backgroundColor",m.toHex())}o.css("backgroundColor",m.toHex(m.value.h,1,1,1)),"rgba"===r&&(j.css.backgroundColor=m.toHex())},w=function(a){var b=d.getLeftPosition(a),c=d.getTopPosition(a),e=d.getSlider();d.setKnob(c,b),e.callLeft&&m[e.callLeft].call(m,b/100),e.callTop&&m[e.callTop].call(m,c/100),v();var h=m[r]();return g.val(h),i&&f.$apply(i.$setViewValue(h)),!1},x=function(){a.off("mousemove",w),a.off("mouseup",x)},y=function(){m.setColor(g.val()),q.eq(0).css({left:100*m.value.s+"px",top:100-100*m.value.b+"px"}),q.eq(1).css("top",100*(1-m.value.h)+"px"),q.eq(2).css("top",100*(1-m.value.a)+"px"),v()},z=function(){var a,b=e.getOffset(g[0]);return a={top:b.top+g[0].offsetHeight,left:b.left},{top:a.top+"px",left:a.left+"px"}};g.on("click",function(){y(),l.addClass("colorpicker-visible").css(z())}),l.on("mousedown",function(a){a.stopPropagation(),a.preventDefault()});var A=function(){l.hasClass("colorpicker-visible")&&l.removeClass("colorpicker-visible")};l.find("button").on("click",function(){A()}),a.on("mousedown",function(){A()})}}}]);