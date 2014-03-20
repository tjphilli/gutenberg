"use strict";var app=angular.module("gutenbergApp",["ui.router","ngTouch","vr.directives.slider","ngClipboard","ngRoute","config","colorpicker.module","ngAnimate"]).config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"]}]).config(["$locationProvider","$stateProvider","$urlRouterProvider",function(a,b,c){b.state("main",{url:"/",templateUrl:"views/main.html",controller:"MainController"}).state("main.about",{url:"about",templateUrl:"views/about.html",controller:"MainController"}),a.html5Mode(!1).hashPrefix("!"),c.otherwise("/")}]);app.controller("MainController",["$scope","$document","PlaceholderTextService","DownloadService","Container","Property","Properties","$routeParams",function(a,b,c,d,e,f,g){a.controls=!1,a.live_code=!1,a.ui={edit_mode:!1,editMode:function(){console.log("edit mode activated"),this.edit_mode=!this.edit_mode}},a.toggleControls=function(){a.controls=!a.controls},a.toggleLiveCode=function(){a.live_code=!a.live_code},a.placeholder={number:2,type:"paras",source:"lorem"},a.paras="",a.content={paras:""},a.content.addHeading=function(){a.content.heading={},a.content.heading.visible=!0,a.content.heading.container=new e,a.content.heading.text="Gutenberg Heading"},a.getText=function(b,d,e){c.getLocalText(b,d,e).success(function(b){a.paras=b,console.log("called!")})},a.getText(2),a.$watchCollection("placeholder",function(){console.log("updated!"),a.getText(a.placeholder.number,a.placeholder.source,a.placeholder.type)}),a.firstLetter=function(a){return a[0]},a.restOf=function(a){return a.substr(1)},a.postTest=function(){d.getDownload({markup:a.paras,css:a.container.css()}).success(function(a){window.location="dl/"+a.file})},a.type={properties:{},backgroundStyle:function(){var b={};for(var c in a.type.properties)"background"==this.properties[c].applies&&(b[this.properties[c]["property-name"]]=this.properties[c].propertyValue());return b},dropcap:function(){var b={};if(a.type.properties.dropcap)for(var c in a.type.properties.dropcap.properties)b[this.properties.dropcap.properties[c]["property-name"]]=this.properties.dropcap.properties[c].propertyValue();return b}},a.container=new e,a.container.addProperty("leading"),a.container.addProperty("typeface"),a.container.addProperty("size"),a.container.addProperty("weight"),a.addProperty=function(b){"columns"===b?a.container.addLinkedProperty(b):a.container.addProperty(b)},a.removeProperty=function(b){"columns"===b?a.container.removeLinkedProperty(b):a.container.removeProperty(b)},a.availableProperties=function(){return g.getAvailable(a.container.currentProperties())}}]),app.directive("keypress",function(){return function(a){var b="shiftKey",c=function(a,c){return a.which===c&&a[b]};$(window).bind("keydown keypress",function(b){c(b,38)?(a.type.properties.leading.microIncrease(),a.$apply(),b.preventDefault()):c(b,40)?(a.type.properties.leading.microDecrease(),a.$apply(),b.preventDefault(),window.test=b.shiftKey):c(b,187)?(a.type.properties.size.microIncrease(),a.$apply(),b.preventDefault()):c(b,189)&&(a.type.properties.size.microDecrease(),a.$apply(),b.preventDefault(),window.test=b.shiftKey)})}}),app.directive("property",function(){return{link:function(a){console.log(a.name)}}}),app.directive("propertyNumber",["$rootScope",function(a){return{scope:{property:"=",name:"=",remove:"="},require:"^container",replace:!0,transclude:!0,templateUrl:"scripts/directives/propertyTemplate.html",link:function(b,c,d,e){a.$on("SIZE_CHANGE",function(){b.property.dependent_int=e.getSize()})}}}]),app.directive("propertySelect",["$rootScope",function(){return{scope:{property:"=",name:"=",remove:"="},replace:!0,require:"^container",transclude:!0,templateUrl:"scripts/directives/propertyTemplate_select.html",link:function(a,b,c,d,e){var f="";"Weight"===a.property.name&&e.$on("FACE_CHANGE",function(b,c){f!=c&&(f=c,a.property.options=d.getWeights(),a.property.value=a.property.options[a.property.options.length-1].value)})}}}]),app.directive("propertyColor",function(){return{scope:{property:"=",name:"=",remove:"="},replace:!0,transclude:!0,templateUrl:"scripts/directives/propertyTemplate_color.html",link:function(a,b){$(b).find(".color-preview").click(function(a){$(a.target).siblings("input").trigger("click")})}}}),app.directive("propertyShorthand",function(){return{scope:{property:"=",name:"=",remove:"="},replace:!0,transclude:!0,templateUrl:"scripts/directives/propertyTemplate_shorthand.html",link:function(){console.log(":ATEEE")}}}),app.directive("propertyCompound",function(){return{scope:{property:"=",name:"=",remove:"="},replace:!0,transclude:!0,templateUrl:"scripts/directives/propertyTemplate_compound.html",link:function(){console.log(":ATEEE")}}}),angular.module("gutenbergApp").directive("hoverhover",function(){return{link:function(){}}}),app.directive("expander",function(){return{link:function(a,b){var c=$(b).children(".expander-target:not(.expander .expander .expander-trigger)").addClass("is-collapsed");$(b).children(".expander-target").addClass("is-collapsed"),$(b).on("click",".expander-trigger:not(.expander .expander .expander-trigger)",function(b){$(b.target).closest(".expander-trigger").toggleClass("is-triggered"),c.toggleClass("is-collapsed"),a.$apply()}),$(b).on("click",".expander .expander-trigger",function(c){$(c.target).closest(".expander-trigger").toggleClass("is-triggered"),$(b).children(".expander-target").toggleClass("is-collapsed"),a.$apply()}),$(b).children(".properties-menu").on("click",function(){console.log("messsagegfdgsfd"),c.toggleClass("is-collapsed"),c.siblings(".expander-trigger").toggleClass("is-triggered")})}}}),app.directive("focusShow",function(){return{scope:{focusShow:"&"},link:function(a,b){var c=!1,d=$(b);d.on("focus",function(){console.log(a),c||(c=!c,a.focusShow(),a.$apply())}),$("body").on("click",function(b){d.is(b.target)||0!==d.has(b.target).length||c&&(c=!c,a.focusShow(),a.$apply())})}}}),app.directive("dropcap",function(){return{link:function(){}}}),app.directive("tooltip",function(){return{scope:{tooltip:"=",direction:"="},link:function(a,b,c){console.log(a.tooltip);var d=$(b),e=a.tooltip,f=$("<div id='tip' class='tooltip tip is-inactive-tooltip'>"+e+"</div>");$("body").append(f),console.log(a);var g=c.direction||"top",h=d.innerHeight(),i=d.innerWidth(),j=f.innerHeight(),k=f.innerWidth(),l=10,m={top:-j-l,left:0};switch(f.addClass(g),g){case"bottom":m.top=h+l,m.left=0;break;case"left":m.top=h/2-j/2,m.left=-k-l;break;case"right":m.top=h/2-j/2,m.left=i+l}var n=d.offset();console.log(n),f.css({top:n.top+m.top,left:n.left+m.left}),d.hover(function(){console.log("called"),f.addClass("is-active-tooltip").removeClass("is-inactive-tooltip")},function(){f.removeClass("is-active-tooltip").addClass("is-inactive-tooltip")})}}}),angular.module("ngClipboard",[]).provider("ngClip",function(){var a=this;return this.path="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.2/ZeroClipboard.swf",{setPath:function(b){a.path=b},$get:function(){return{path:a.path}}}}).run(["$document","ngClip",function(a,b){ZeroClipboard.config({moviePath:b.path,trustedDomains:["*"],allowScriptAccess:"always",forceHandCursor:!0})}]).directive("clipCopy",["$window","ngClip",function(){return{scope:{clipCopy:"&",clipClick:"&"},restrict:"A",link:function(a,b,c){var d=new ZeroClipboard(b);d.on("load",function(d){var e=function(b){b.setText(a.$eval(a.clipCopy)),angular.isDefined(c.clipClick)&&a.$apply(a.clipClick)};d.on("mousedown",e),a.$on("$destroy",function(){d.off("mousedown",e),d.unclip(b)})})}}}]),app.factory("Globals",["ENV",function(a){return{urlBase:function(){var b="";return"development"===a?b="http://localhost:3000/":"production"===a&&(b="/"),console.log("called"),b}}}]),app.factory("PlaceholderTextService",["$http","ENV",function(a,b){var c="";return console.log(b),"development"===b?(c="http://localhost:3000/",console.log("development environment")):"production"===b&&(c="/",console.log("production environment")),{getLoremIpsum:function(b){return a.jsonp("http://loripsum.net/api/"+b)},getHipsterIpsum:function(){return a.jsonp("http://hipsterjesus.com/api/")},getLocalText:function(b,d,e){return console.log(d),a.get(c+"api/"+b+"/"+d+"/"+e)}}}]),app.factory("Container",["Properties","Property",function(a,b){var c=function(){this.properties=[]};return c.prototype.style=function(){for(var a={},b=0;b<this.properties.length;b++)void 0==this.properties[b].applies&&(a[this.properties[b]["property-name"]]=this.properties[b].propertyValue());return a},c.prototype.getProperties=function(){return this.properties},c.prototype.addProperty=function(b){this.properties.unshift(a.create(b))},c.prototype.addLinkedProperty=function(c){var d=a.create(c);this.findProperty(c),this.properties.unshift(new b(d[d.linked])),this.properties.unshift(d)},c.prototype.removeProperty=function(a){for(var b=0,c=0;c<this.properties.length;c++)this.properties[c].key===a&&(b=c);this.properties.splice(b,1)},c.prototype.removeLinkedProperty=function(a){for(var b=0,c=0;c<this.properties.length;c++)this.properties[c].key===a&&(b=c);this.propertyExists(this.properties[b].linked)?this.properties.splice(b,2):this.properties.splice(b,1)},c.prototype.findProperty=function(a){for(var b=0;b<this.properties.length;b++)if(this.properties[b].key===a)return this.properties[b]},c.prototype.getPropertyIndex=function(a){for(var b=0;b<this.properties.length;b++)if(this.properties[b].key===a)return b},c.prototype.propertyExists=function(a){for(var b=0;b<this.properties.length;b++)if(this.properties[b].key===a)return!0;return!1},c.prototype.css=function(a){var b=this.style(),c="";for(var d in b)c+=d+": "+b[d]+";\n";return a&&(c=c.replace(/\n/g,"<br>")),c},c.prototype.currentProperties=function(){for(var a={},b=0;b<this.properties.length;b++)a[this.properties[b].key]=this.properties[b].name;return a},c}]),app.factory("Property",function(){var a=function(a){angular.extend(this,a)};return a.prototype.className=function(){return this.name.replace(" ","-").toLowerCase()},a.prototype.propertyValue=function(){var a="";if("shorthand"===this.type){for(var b=0;b<this.values.length;b++)a+=this.values[b].value()+" ";return a}return String(null!=this.unit?this.value+this.unit:this.value)},a.prototype.increase=function(){this.value+=this.inc},a.prototype.decrease=function(){this.value-=this.inc},a.prototype.microIncrease=function(){this.value=parseFloat((this.value+=this.micro_inc()).toFixed("Leading"===this.name?2:2))},a.prototype.microDecrease=function(){"Leading"===this.name&&(this.value=parseFloat((this.value-=this.micro_inc()).toFixed(2))),this.value=parseFloat((this.value-=this.micro_inc()).toFixed(2))},a}),app.factory("Value",function(){var a=function(a,b){this.unit="",this.init=a,this.type=b,"length"===b&&(this.unit="px"),this.slider={floor:0,ceiling:20,precision:0,step:1}};return a.prototype.value=function(){var a=String("length"===this.type?this.init+this.unit:this.init);return a},a}),app.factory("Properties",["Property","Value",function(a,b){return this.templates={leading:{key:"leading",name:"Leading","property-name":"line-height",value:"1",type:"number",inc:1,micro_inc:function(){return Math.ceil(1/this.dependent_int*100)/100},dependent_int:16,slider:{floor:0,ceiling:4,precision:2}},columns:{key:"columns",name:"Columns","property-name":"-webkit-columns",value:"1",type:"number",inc:1,micro_inc:function(){return 1},slider:{floor:1,ceiling:6,precision:1,step:1},linked:"columngap",columngap:{key:"columngap",name:"Column Gap","property-name":"-webkit-column-gap",value:"1",unit:"px",type:"number",inc:20,micro_inc:function(){return 10},slider:{floor:0,ceiling:100,precision:1,step:10}}},size:{key:"size",name:"Size","property-name":"font-size",value:"16",type:"number",unit:"px",inc:5,micro_inc:function(){return 1},slider:{floor:0,ceiling:100,precision:0,step:1}},width:{key:"width",name:"Container Width","property-name":"width",value:"600",type:"number",unit:"px",inc:50,micro_inc:function(){return 1},slider:{floor:300,ceiling:900,precision:0,step:1}},tracking:{key:"tracking",name:"Tracking","property-name":"letter-spacing",value:"0",type:"number",unit:"px",inc:5,micro_inc:function(){return 1},slider:{floor:-4,ceiling:4,precision:0,step:1}},weight:{key:"weight",name:"Weight","property-name":"font-weight",value:"bold",type:"options",options:[{name:"normal",value:"normal"},{name:"bold",value:"bold"}]},spacing:{key:"spacing",name:"Word Spacing","property-name":"word-spacing",value:"0",unit:"px",type:"number",inc:5,micro_inc:function(){return 1},slider:{floor:0,ceiling:20,precision:0,step:1}},alignment:{key:"alignment",name:"Alignment","property-name":"text-align",value:"left",type:"options",options:[{name:"left",value:"left"},{name:"right",value:"right"},{name:"center",value:"center"},{name:"justify",value:"justify"}]},decoration:{key:"decoration",name:"Decoration","property-name":"text-decoration",value:"none",type:"options",options:[{name:"none",value:"none"},{name:"underline",value:"underline"},{name:"overline",value:"overline"},{name:"line-through",value:"line-through"}]},transform:{key:"transform",name:"Case","property-name":"text-transform",value:"none",type:"options",options:[{name:"none",value:"none"},{name:"capitalize",value:"capitalize"},{name:"uppercase",value:"uppercase"},{name:"lowercase",value:"lowercase"}]},typeface:{key:"typeface",name:"Typeface","property-name":"font-family",value:"Garamond",type:"options",weights:function(){for(var a=[],b=0;b<this.options.length;b++)if(this.options[b].value===this.value)for(var c=0;c<this.options[b].weights.length;c++)a.push({value:this.options[b].weights[c]});return console.log(a),a},options:[{name:"Times New Roman",value:"Times New Roman",weights:["normal","bold"]},{name:"Helvetica Neue",value:"Helvetica Neue",weights:["100","200","400","500","600"]},{name:"Garamond",value:"Garamond",weights:["normal","bold"]},{name:"Freight Sans",value:"FreightSans",weights:["lighter","normal","bold"]},{name:"Freight Text",value:"FreightText",weights:["lighter","normal","bold"]}]},style:{key:"style",name:"Style","property-name":"font-style",value:"italic",type:"options",options:[{name:"italic",value:"italic"},{name:"oblique",value:"oblique"},{name:"none",value:"none"}]},color:{key:"color",name:"Color","property-name":"color",value:"#333",type:"color"},background:{key:"background",name:"Page Color","property-name":"background-color",value:"#333",type:"color",applies:"background"},shadow:{key:"shadow",name:"Drop Shadow","property-name":"text-shadow",value:"3px 2px 4px #479",type:"shorthand",values:[new b(2,"length"),new b(2,"length"),new b(4,"length"),new b("#478","color")]},dropcap:{key:"dropcap",name:"Drop Cap",type:"compound",properties:{},add:["size","color","style"],applies:"dropcap"}},this.compoundTemplates={},this.create=function(b){if("compound"===this.templates[b].type)for(i=0;i<this.templates[b].add.length;i++)this.templates[b].properties[String(this.templates[b].add[i])]=this.create(this.templates[b].add[i]);var c=new a(this.templates[b]);return console.log(c),c},this.getAvailable=function(a){var b={};for(var c in this.templates)c in a||(b[c]=this.templates[c].name);return b},this}]),app.factory("DownloadService",["$http","Globals",function(a,b){return{getDownload:function(c){return a.post(b.urlBase()+"dl/",c)}}}]);