(function(n,y,M,l){var a=function(b,d){b=b.getElementsByTagName("script");for(var g=0;g<b.length;g++)if(!b[g].getAttribute("data-parsed")&&b[g].src&&0<b[g].src.indexOf(d)){var a={},h=!1;b[g].src.replace(/([^?=;]+)(=([^;]*))?/g,function(b,d,e,c){h||(h=d);a[d]=c});a.url=h;b[g].setAttribute("data-parsed",!0);delete a[h];return a}return{}}(y,"DoubleSideBar_guj.js"),G=(a.compoundSeqNo?a.bn+"#"+a.compoundSeqNo:a.bn)||n.ADFafbanID,f=n.location.hostname,m=n.top||n,b=m.document,H=b.body,N=a.sticky||1,I=a.ratio||
1,O=a.fit||1,J=a.scale||1.5,p=a.hide||200,K=a.top||0,L=a.distance||960,q=!1,h=0,r=0;-1<f.indexOf("chefkoch.de")&&l.push(["resizeInFIF",!1]);-1<f.indexOf("csprojects.adform.zone")&&l.push(["resizeInFIF",!1]);-1<f.indexOf("spiegel.de")&&l.push(["resizeInFIF",!1]);-1<f.indexOf("n-tv.de.de")&&l.push(["resizeInFIF",!1]);"undefined"!==typeof GujAd&&GujAd.getClient().getContentWidth()&&(q=!0,h=GujAd.getClient().getContentWidth(),r=GujAd.$("body").width()?(GujAd.$("body").width()-h)/2:(n.top.innerWidth-h)/2,L=h);l=n._adform=
n._adform||[];l.push([G+"#2.on.init",function(a){var d=M.lib,g=m.Adform.adRegister[G+"#1"];if(g){a=function(){setTimeout(F,200)};var l=function(b,c,a){cssId="undefined"!==typeof c?c:"adform-custom";a="undefined"!==typeof a?a:y;d.byId(cssId,a)?(style=d.byId(cssId,a),style.innerHTML=b):(style=a.createElement("style"),style.type="text/css",style.id=cssId,style.styleSheet?style.styleSheet.cssText=b:style.appendChild(a.createTextNode(b)),a.getElementsByTagName("head")[0].appendChild(style))},E=function(){if(N){if(-1<
f.indexOf("moviepilot.de")||-1<f.indexOf("gamespilot.de"))K=b.getElementsByClassName("navigation--wrapper")[0].offsetHeight;css=".sidebar-fixed {position:fixed; top:"+K+"px !important; margin-left:0 !important;}";w=k&&k.getBoundingClientRect();u=e.getBoundingClientRect();A=c.getBoundingClientRect();xPosOne=k?+w.left+k.offsetWidth:u.left;xPosTwo=k?+w.left-c.offsetWidth:A.left;if(1==q||"true"==q)xPosOne=r+h,xPosTwo=r-c.offsetWidth;yPos=m.pageYOffset;yPos>=B?(d.addClass(e,"sidebar-fixed"),d.addClass(c,
"sidebar-fixed"),e.style.left=xPosOne+"px",css+=".sidebar-fixed.sidebar-two {left:"+xPosTwo+"px !important;}"):(d.removeClass(e,"sidebar-fixed"),d.removeClass(c,"sidebar-fixed"),e.style.left=0,c.style.top=B+"px");l(css,"adform-double-sidebar",b)}},F=function(){sidebarScale=J?J:0;var a=m.innerHeight-B,z=g.settings.html.width/sidebarScale,t=g.settings.html.height/sidebarScale,f=v.settings.html.height/sidebarScale;var y=".sidebar-one {margin:0;} .hidebar {display:none !important;}"+(1==I?".sidebar-one {min-width:"+
g.settings.html.width/sidebarScale+"px; min-height:"+t+"px; .sidebar-two {min-width:"+v.settings.html.width/sidebarScale+"px; min-height:"+v.settings.html.height/sidebarScale+"px;} @media screen and (max-width: 1420px) { #SIMAD_wrapper_skyscraper {max-width: "+g.settings.html.width/sidebarScale+"px;} }":"");y+=O?".sidebar-one, .sidebar-two {max-height:"+a+"px;}":"";C&&(e.style.marginLeft=-C+"px");xPosOne=k?+w.left+k.offsetWidth:u.left;xPosTwo=k?+w.left-c.offsetWidth:A.left;distance=k?k.offsetWidth:
L;widthOne=H.clientWidth-xPosOne;if(1==q||"true"==q)r="undefined"!==typeof GujAd&&GujAd.$("body").width()?(GujAd.$("body").width()-h)/2:(n.top.innerWidth-h)/2,xPosOne=r+h,xPosTwo=r-c.offsetWidth,widthOne=H.clientWidth-xPosOne,distance=h;widthTwo=xPosOne-distance;newWidthTwo=p&&widthTwo<=p?p:widthTwo;0!=I?(a/widthOne<D&&a>=t?(e.style.height=a+"px",e.style.width=a/D+"px"):(e.style.width=widthOne<=z||a<=t?z+"px":widthOne+"px",e.style.height=widthOne<=z||a<=t?t+"px":widthOne*D+"px"),a/widthTwo<x&&a>=
f?(c.style.height=a+"px",c.style.width=a/x+"px",newWidthTwo=a/x):(c.style.height=widthTwo<=p||a<=f?f+"px":widthTwo*x+"px",c.style.width=widthTwo<=p||a<=f?f/x+"px":newWidthTwo+"px",newWidthTwo=a<=f?f/x:newWidthTwo)):(e.style.width=widthOne<=z?z+"px":widthOne+"px",e.style.height=a<=t?t+"px":a+"px",c.style.width=newWidthTwo+"px",c.style.height=a<=f?f+"px":a+"px");widthTwo<=p?d.addClass(c,"hidebar"):d.removeClass(c,"hidebar");d.hasClass(e,"sidebar-fixed")&&(e.style.left=xPosOne+"px");c.style.marginLeft=
-(+distance+newWidthTwo)+"px";l(y,"adform-double-sidebar-size",b);E()},v=this,e=g.adBox.get("element").parentNode,c=v.adBox.get("element").parentNode,k=function(a){var c=f,e=d.byId("holder",b)||d.byId("contentContainer",b)||d.byId("page",b)||d.byId("main",b)||d.byId("mainHeader",b)||d.byId("wrapper_content",b)||b.getElementsByClassName("centeredDiv")[1]||d.byId("ads-outer",b)||d.byId("header",b)||d.byId("content",b)||b.getElementsByClassName("s1-main-content")[0]||b.getElementsByClassName("s1-content-container")[0]||
b.getElementsByClassName("sp-opener-list")[0]||d.byId("wrapper",b);c=c.substring(c.lastIndexOf(".",c.lastIndexOf(".")-1)+1);if(refElem=a[c])prefix=refElem.charAt(0),idClass=refElem.substr(1),e="#"==prefix?d.byId(idClass,b):b.getElementsByClassName(idClass)[0];return e}({"csprojects.adform.zone":".main-wrapper","chefkoch.de":"#page-wrapper","brigitte.de":"#wrapper","arcor.de":".pContent","seniorbook.de":".wrapper"}),w=k&&k.getBoundingClientRect();e.style.display="block";c.style.display="block";var u=e.getBoundingClientRect(),
A=c.getBoundingClientRect();-1<f.indexOf("csprojects.adform.zone")&&(u={top:0,left:e.getBoundingClientRect().left},A={top:0,left:c.getBoundingClientRect().left});var B=+u.top+m.pageYOffset,C=k?u.left-(+w.left+k.offsetWidth):0;if(1==q||"true"==q)C=u.left-(+r+h);var D=g.settings.html.height/g.settings.html.width,x=v.settings.html.height/v.settings.html.width;d.addClass(e,"sidebar-one");d.addClass(c,"sidebar-two");-1===f.indexOf("verivox.de")&&(p=160);d.addEvent(m,"resize",F);d.addEvent(m,"resize",a);d.addEvent(m,
"scroll",E);d.addEvent(m,"scroll",a);a()}}])})(window,document,Adform=window.Adform||{});
