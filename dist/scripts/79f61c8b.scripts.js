"use strict";var app=angular.module("gutenbergApp",["ngTouch","vr.directives.slider","ngClipboard","ngRoute","config","colorpicker.module"]).config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"]}]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html"}).otherwise({redirectTo:"/"}),b.html5Mode(!1).hashPrefix("!")}]);app.controller("MainController",["$scope","$document","PlaceholderTextService","DownloadService","Property","Properties",function(a,b,c,d,e,f){a.controls=!1,a.toggleControls=function(){a.controls=!a.controls},a.paras="",a.getText=function(b){c.getLocalText(b).success(function(b){a.paras=b})},a.firstLetter=function(a){return a[0]},a.restOf=function(a){return a.substr(1)},a.getText(2),a.obj={test:"hello!"},a.getDownload=function(a){d.getDownload(a).success(function(){})},a.getDl=function(a){d.getDownload(a).success(function(){})},a.type={properties:{},style:function(){var a={};for(var b in this.properties)void 0==this.properties[b].applies&&(a[this.properties[b]["property-name"]]=this.properties[b].propertyValue());return a},backgroundStyle:function(){var b={};for(var c in a.type.properties)"background"==this.properties[c].applies&&(b[this.properties[c]["property-name"]]=this.properties[c].propertyValue());return b},dropcap:function(){var b={};if(a.type.properties.dropcap)for(var c in a.type.properties.dropcap.properties)b[this.properties.dropcap.properties[c]["property-name"]]=this.properties.dropcap.properties[c].propertyValue();return b},css:function(){var a=this.style(),b="";for(var c in a)b+=c+": "+a[c]+";\n";return b},currentProperties:function(){var a={};for(var b in this.properties)a[b]=this.properties[b].name;return a}},a.type.properties.leading=f.create("leading"),a.type.properties.typeface=f.create("typeface"),a.type.properties.size=f.create("size"),a.addProperty=function(b){a.type.properties[b]=f.create(b)},a.removeProperty=function(b){console.log("called"),delete a.type.properties[b]},a.availableProperties=function(){return f.getAvailable(a.type.currentProperties())},a.testIt=function(){console.log("message")}}]),app.directive("keypress",function(){return function(a){var b="shiftKey",c=function(a,c){return a.which===c&&a[b]};$(window).bind("keydown keypress",function(b){c(b,38)?(a.type.properties.leading.microIncrease(),a.$apply(),b.preventDefault()):c(b,40)?(a.type.properties.leading.microDecrease(),a.$apply(),b.preventDefault(),window.test=b.shiftKey):c(b,187)?(a.type.properties.size.microIncrease(),a.$apply(),b.preventDefault()):c(b,189)&&(a.type.properties.size.microDecrease(),a.$apply(),b.preventDefault(),window.test=b.shiftKey)})}}),app.directive("property",function(){return{replace:!0,transclude:!0,scope:{property:"=",name:"=",remove:"="},templateUrl:"scripts/directives/propertyTemplate.html",link:function(a){console.log(a.name)}}}),angular.module("gutenbergApp").directive("hoverhover",function(){return{link:function(){}}}),app.directive("expander",function(){return{link:function(a,b){var c=$(b).children(".expander-target:not(.expander .expander .expander-trigger)").addClass("is-hiding");$(b).children(".expander-target").addClass("is-hiding"),$(b).on("click",".expander-trigger:not(.expander .expander .expander-trigger)",function(){c.toggleClass("is-hiding"),console.log("lcikc 1")}),$(b).on("click",".expander .expander-trigger",function(){$(b).children(".expander-target").toggleClass("is-hiding"),console.log("lcikc 2")})}}}),app.directive("dropcap",function(){return{link:function(){}}}),angular.module("ngClipboard",[]).provider("ngClip",function(){var a=this;return this.path="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.2/ZeroClipboard.swf",{setPath:function(b){a.path=b},$get:function(){return{path:a.path}}}}).run(["$document","ngClip",function(a,b){ZeroClipboard.config({moviePath:b.path,trustedDomains:["*"],allowScriptAccess:"always",forceHandCursor:!0})}]).directive("clipCopy",["$window","ngClip",function(){return{scope:{clipCopy:"&",clipClick:"&"},restrict:"A",link:function(a,b,c){var d=new ZeroClipboard(b);d.on("load",function(d){var e=function(b){b.setText(a.$eval(a.clipCopy)),angular.isDefined(c.clipClick)&&a.$apply(a.clipClick)};d.on("mousedown",e),a.$on("$destroy",function(){d.off("mousedown",e),d.unclip(b)})})}}}]),app.factory("PlaceholderTextService",["$http","$q","ENV",function(a,b,c){var d="";return console.log(c),"development"===c?(d="http://localhost:3000/",console.log("development environment")):"production"===c&&(d="/",console.log("production environment")),{getLoremIpsum:function(b){return a.jsonp("http://loripsum.net/api/"+b)},getHipsterIpsum:function(){return a.jsonp("http://hipsterjesus.com/api/")},getLocalText:function(b){return a.get(d+"api/"+b)}}}]),app.factory("Property",function(){var a=function(a){angular.extend(this,a)};return a.prototype.className=function(){return this.name.replace(" ","-").toLowerCase()},a.prototype.propertyValue=function(){var a="";if("shorthand"===this.type){for(var b=0;b<this.values.length;b++)a+=this.values[b].value()+" ";return a}return String(null!=this.unit?this.value+this.unit:this.value)},a.prototype.increase=function(){this.value+=this.inc},a.prototype.decrease=function(){this.value-=this.inc},a.prototype.microIncrease=function(){this.value=parseFloat((this.value+=this.micro_inc).toFixed(2))},a.prototype.microDecrease=function(){this.value=parseFloat((this.value-=this.micro_inc).toFixed(2))},a}),app.factory("Value",function(){var a=function(a,b){this.unit="",this.init=a,this.type=b,"length"===b&&(this.unit="px"),this.slider={floor:0,ceiling:20,precision:0,step:1}};return a.prototype.value=function(){var a=String("length"===this.type?this.init+this.unit:this.init);return a},a}),app.factory("Properties",["Property","Value",function(a,b){return this.templates={leading:{name:"Leading","property-name":"line-height",value:"1",type:"number",inc:1,micro_inc:.05,slider:{floor:0,ceiling:4,precision:2,step:.05}},columns:{name:"Columns","property-name":"-webkit-columns",value:"1",type:"number",inc:1,micro_inc:1,slider:{floor:1,ceiling:6,precision:1,step:1}},size:{name:"Size","property-name":"font-size",value:"16",type:"number",unit:"px",inc:5,micro_inc:1,slider:{floor:4,ceiling:72,precision:0,step:1}},width:{name:"Container Width","property-name":"width",value:"600",type:"number",unit:"px",inc:50,micro_inc:1,slider:{floor:300,ceiling:900,precision:0,step:1}},tracking:{name:"Tracking","property-name":"letter-spacing",value:"0",type:"number",unit:"px",inc:5,micro_inc:1,slider:{floor:-4,ceiling:4,precision:0,step:1}},weight:{name:"Weight","property-name":"font-weight",value:"500",type:"number",inc:100,micro_inc:100,slider:{floor:100,ceiling:900,precision:0,step:100}},spacing:{name:"Word Spacing","property-name":"word-spacing",value:"0",unit:"px",type:"number",inc:5,micro_inc:1,slider:{floor:0,ceiling:20,precision:0,step:1}},alignment:{name:"Alignment","property-name":"text-align",value:"left",type:"options",options:[{name:"left",value:"left"},{name:"right",value:"right"},{name:"center",value:"center"},{name:"justify",value:"justify"}]},decoration:{name:"Decoration","property-name":"text-decoration",value:"none",type:"options",options:[{name:"none",value:"none"},{name:"underline",value:"underline"},{name:"overline",value:"overline"},{name:"line-through",value:"line-through"}]},transform:{name:"Case","property-name":"text-transform",value:"none",type:"options",options:[{name:"none",value:"none"},{name:"capitalize",value:"capitalize"},{name:"uppercase",value:"uppercase"},{name:"lowercase",value:"lowercase"}]},typeface:{name:"Typeface","property-name":"font-family",value:"Garamond",type:"options",options:[{name:"Times New Roman",value:"Times New Roman"},{name:"Helvetica Neue",value:"Helvetica Neue"},{name:"Garamond",value:"Garamond"}]},style:{name:"Style","property-name":"font-style",value:"italic",type:"options",options:[{name:"italic",value:"italic"},{name:"oblique",value:"oblique"},{name:"none",value:"none"}]},color:{name:"Color","property-name":"color",value:"#333",type:"color"},background:{name:"Page Color","property-name":"background-color",value:"#333",type:"color",applies:"background"},shadow:{name:"Drop Shadow","property-name":"text-shadow",value:"3px 2px 4px #479",type:"shorthand",values:[new b(2,"length"),new b(2,"length"),new b(4,"length"),new b("#478","color")]},dropcap:{name:"Drop Cap",type:"compound",properties:{},add:["size","color","style"],applies:"dropcap"}},this.compoundTemplates={},this.create=function(b){if("compound"===this.templates[b].type)for(i=0;i<this.templates[b].add.length;i++)this.templates[b].properties[String(this.templates[b].add[i])]=this.create(this.templates[b].add[i]);return new a(this.templates[b])},this.getAvailable=function(a){var b={};for(var c in this.templates)c in a||(b[c]=this.templates[c].name);return b},this}]),app.factory("DownloadService",["$http","$q",function(a){return{getDownload:function(b){return a.post("http://localhost:3000/download/",b)},getDl:function(b){return a.get("http://localhost:3000/dl/"+b)}}}]);