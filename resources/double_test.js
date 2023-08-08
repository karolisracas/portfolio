(function(window, document, Adform, _adform) {
	function getQuery(doc, name) {
		var scripts = doc.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var parsed = scripts[i].getAttribute('data-parsed');
			if (!parsed && scripts[i].src && scripts[i].src.indexOf(name) > 0) {
				var obj = {},
					once = false;
				scripts[i].src.replace(/([^?=;]+)(=([^;]*))?/g, function($0, $1, $2, $3) {
					if (!once) once = $1;
					obj[$1] = $3;
				});
				obj.url = once;
				scripts[i].setAttribute('data-parsed', true);
				delete obj[once];
				return obj;
			}
		}
		return {};
	}

	var query = getQuery(document, 'DoubleSideBar_guj.js');
	var bn = (query.compoundSeqNo ? (query.bn + '#' + query.compoundSeqNo) : query.bn) || window.ADFafbanID;
	 
	var domain = window.location.hostname,
	win = window.top || window,
	pDoc = win.document,
	pBody = pDoc.body;
	
	var sticky = query.sticky || 1; //make sidebars position fixed after they reach viewport top
	var keepRatio = query.ratio || 1; //keep sidebars ratio
	var fitScreen = query.fit || 1; //avoid vertical overflow
	var matchHeight = query.match || 0; //not used yet
	var scale = query.scale || 1.5; //scale min size of sidebars
	var minWidthTwo = query.hide || 200; //hide left sidebar if left space is less than set # of pixels
	var topOffset = query.top || 0; //# of pixels from top when sidebars are in position fixed
	var defaultDistance = query.distance || 960; //set default distance between sidebars if unable to retrieve content width
    
    /* Publisher GuJ wants us to use their function for content width calculation. All needed variables are defined below */
    var publisherGuj = false;
    var gujContentWidth = 0;
    var posSiteLeft = 0;

  

    if(typeof GujAd !== 'undefined' && GujAd.getClient().getContentWidth()) {
        publisherGuj = true;
        gujContentWidth = GujAd.getClient().getContentWidth();
        if (GujAd.$('body').width()) posSiteLeft = ((GujAd.$('body').width() - gujContentWidth)/2); //replaced "window.top.innerWidth" with "GujAd.$('body').width()"
		else posSiteLeft = (window.top.innerWidth - gujContentWidth)/2; 
        defaultDistance = gujContentWidth;
    }

	var _adform = window._adform = (window._adform || []);

    if(domain.indexOf('chefkoch.de') > -1) {
        _adform.push(['resizeInFIF', false]);
    }
    if(domain.indexOf('stern.de') > -1) {
        _adform.push(['resizeInFIF', false]);
    }
    if(domain.indexOf('spiegel.de') > -1) {
        _adform.push(['resizeInFIF', false]);
    }
	if(domain.indexOf('n-tv.de.de') > -1) {
        _adform.push(['resizeInFIF', false]);
    }
  
	_adform.push([bn + '#2.' + 'on.init',
		function(settings) {
	
			var lib = Adform.lib;
			var regOne = win.Adform.adRegister[bn+'#1'];
            

			if(regOne){
				var regTwo = this;
				var referenceDiv = {
					'stern.de' : '#main-wrapper',
					'chefkoch.de' : '#page-wrapper',
					'brigitte.de' : '#wrapper',
					'arcor.de' : '.pContent',
					'seniorbook.de' : '.wrapper'
				};
				
				var getRefElement = function(refObj) {
					var hostName = domain;
					//set possible value of mainContent if domain hasn't been certified
					var mainContent = lib.byId('holder', pDoc) || lib.byId('contentContainer', pDoc) || lib.byId('page', pDoc) || lib.byId('main', pDoc) || lib.byId('mainHeader', pDoc) || lib.byId('wrapper_content', pDoc) || pDoc.getElementsByClassName('centeredDiv')[1] || lib.byId('ads-outer', pDoc) || lib.byId('header', pDoc) || lib.byId('content', pDoc) || pDoc.getElementsByClassName('s1-main-content')[0] || pDoc.getElementsByClassName('s1-content-container')[0] || pDoc.getElementsByClassName('sp-opener-list')[0] || lib.byId('wrapper', pDoc);
					hostName = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
					refElem = refObj[hostName];
					if(refElem){
						prefix = refElem.charAt(0);
						idClass = refElem.substr(1);
						mainContent = (prefix == '#') ? lib.byId(idClass, pDoc) : pDoc.getElementsByClassName(idClass)[0];
					}
					
					return mainContent;
				};

				//Set sidebar divs
				var sideBarOne = regOne.adBox.get('element').parentNode;
				var sideBarTwo = regTwo.adBox.get('element').parentNode;
				//Find content element
				var mainContent = getRefElement(referenceDiv);

				//Get initial elements position
				var posSite = mainContent && mainContent.getBoundingClientRect();
				sideBarOne.style.display = 'block';
				sideBarTwo.style.display = 'block';
				var posOne = sideBarOne.getBoundingClientRect();
				var posTwo = sideBarTwo.getBoundingClientRect();
				
				if (domain.indexOf('stern.de') > -1) {
					posOne = {top:0,left:sideBarOne.getBoundingClientRect().left};
					posTwo = {top:0,left:sideBarTwo.getBoundingClientRect().left};
				}
				
				var yPosStart = +posOne.top +win.pageYOffset; //initial sidebar Y
                
				/*Commented out parts are original ones*/
                /*var marginOne = (mainContent) ? posOne.left - (+posSite.left +mainContent.offsetWidth) : 0; //margin needed in order to correctly position sidebars on scroll*/
                var marginOne = (mainContent) ? posOne.left - (+posSite.left +mainContent.offsetWidth) : 0; //margin needed in order to correctly position sidebars on scroll
                if(publisherGuj == true || publisherGuj == "true") {
                    marginOne = posOne.left - (+posSiteLeft +gujContentWidth);
                }
                
				//Get sidebars ratio
				var ratioOne = regOne.settings.html.height/regOne.settings.html.width;
				var ratioTwo = regTwo.settings.html.height/regTwo.settings.html.width;
				//Set class to sidebars div
				lib.addClass(sideBarOne, 'sidebar-one');
				lib.addClass(sideBarTwo, 'sidebar-two');
				//Special settings
				if(domain.indexOf('verivox.de') === -1) minWidthTwo = 160;

				function adjustSize(){
					sidebarScale = (scale) ? scale : 0;
					var maxHeight = win.innerHeight - yPosStart;
					var css = '.sidebar-one {margin:0;} .hidebar {display:none !important;}'; 
					//set min size if sidebars have to keep ratio
					var minWidthOne = regOne.settings.html.width/sidebarScale;
					var minHeightOne = regOne.settings.html.height/sidebarScale;
					var minHeightTwo = regTwo.settings.html.height/sidebarScale;
					css += (keepRatio == 1) ? '.sidebar-one {min-width:'+regOne.settings.html.width/sidebarScale+'px; min-height:'+minHeightOne+'px; .sidebar-two {min-width:'+regTwo.settings.html.width/sidebarScale+'px; min-height:'+regTwo.settings.html.height/sidebarScale+'px;} @media screen and (max-width: 1420px) { #SIMAD_wrapper_skyscraper {max-width: '+regOne.settings.html.width/sidebarScale+'px;} }' : '';
					css += (fitScreen) ? '.sidebar-one, .sidebar-two {max-height:'+maxHeight+'px;}' : '';
					if(marginOne) sideBarOne.style.marginLeft = -marginOne + 'px';
                    
                    /*Commented out parts are original ones*/
					/*xPosOne = (mainContent) ? (+posSite.left +mainContent.offsetWidth) : posOne.left;
					xPosTwo = (mainContent) ? (+posSite.left -sideBarTwo.offsetWidth) : posTwo.left;
					distance = (mainContent) ? mainContent.offsetWidth : defaultDistance; //distance between sidebars
					widthOne = pBody.clientWidth - xPosOne; //calculate how many pixels are left for right sidebar*/
                    xPosOne = (mainContent) ? (+posSite.left +mainContent.offsetWidth) : posOne.left;
					xPosTwo = (mainContent) ? (+posSite.left -sideBarTwo.offsetWidth) : posTwo.left;
					distance = (mainContent) ? mainContent.offsetWidth : defaultDistance; //distance between sidebars
					widthOne = pBody.clientWidth - xPosOne; //calculate how many pixels are left for right sidebar
                    if(publisherGuj == true || publisherGuj == "true") {
                        if (typeof GujAd !== 'undefined' && GujAd.$('body').width()) posSiteLeft = ((GujAd.$('body').width() - gujContentWidth)/2); //replaced "window.top.innerWidth" with "GujAd.$('body').width()"
						else posSiteLeft = ((window.top.innerWidth - gujContentWidth)/2); 
                        xPosOne = posSiteLeft +gujContentWidth;
                        xPosTwo = posSiteLeft -sideBarTwo.offsetWidth;
                        widthOne = pBody.clientWidth - xPosOne; //calculate how many pixels are left for right sidebar
						distance = gujContentWidth;
                    }
                    
					widthTwo = xPosOne - distance; //calculate how many pixels are left for left sidebar
					newWidthTwo = (minWidthTwo && widthTwo <= minWidthTwo) ? minWidthTwo : widthTwo;
					if (keepRatio != 0) {
						//Set limits for right sidebar
						if (maxHeight/widthOne < ratioOne && maxHeight >= minHeightOne){
							sideBarOne.style.height = maxHeight + 'px';
							sideBarOne.style.width = maxHeight/ratioOne + 'px';
						} else {
							sideBarOne.style.width = (widthOne <= minWidthOne || maxHeight <= minHeightOne) ? minWidthOne+'px' : widthOne + 'px';
							sideBarOne.style.height = (widthOne <= minWidthOne || maxHeight <= minHeightOne) ? minHeightOne+'px' : widthOne*ratioOne + 'px';
						}
						//Set limits for left sidebar
						if (maxHeight/widthTwo < ratioTwo && maxHeight >= minHeightTwo){
							sideBarTwo.style.height = maxHeight + 'px';
							sideBarTwo.style.width = maxHeight/ratioTwo + 'px';
							newWidthTwo = maxHeight/ratioTwo;
						} else {
							sideBarTwo.style.height = (widthTwo <= minWidthTwo || maxHeight <= minHeightTwo) ? minHeightTwo+'px' : widthTwo*ratioTwo + 'px';
							sideBarTwo.style.width = (widthTwo <= minWidthTwo || maxHeight <= minHeightTwo) ? minHeightTwo/ratioTwo+'px' : newWidthTwo + 'px';
							newWidthTwo = (maxHeight <= minHeightTwo) ? minHeightTwo/ratioTwo : newWidthTwo;
							//console.log(newWidthTwo);
						}
					} else {
						sideBarOne.style.width = (widthOne <= minWidthOne) ? minWidthOne+'px' : widthOne + 'px';
						sideBarOne.style.height = (maxHeight <= minHeightOne) ? minHeightOne+'px' : maxHeight + 'px';
						sideBarTwo.style.width = newWidthTwo + 'px';
						sideBarTwo.style.height = (maxHeight <= minHeightTwo) ? minHeightTwo+'px' : maxHeight + 'px';
					}
					//hide left sidebar according to threshold
					(widthTwo <= minWidthTwo) ? lib.addClass(sideBarTwo, 'hidebar') : lib.removeClass(sideBarTwo, 'hidebar');
					
					if(lib.hasClass(sideBarOne, 'sidebar-fixed')){
						sideBarOne.style.left = xPosOne + 'px';
					}
					
					sideBarTwo.style.marginLeft = -(+distance +newWidthTwo) + 'px';
					//override style element
					addCSS(css, 'adform-double-sidebar-size', pDoc);
					adjustPosition();
				};

				function adjustPosition(){
					if(sticky){ //set position fixed to sidebars
						if(domain.indexOf('moviepilot.de') > -1 || domain.indexOf('gamespilot.de') > -1) topOffset = pDoc.getElementsByClassName('navigation--wrapper')[0].offsetHeight;
						
						css = '.sidebar-fixed {position:fixed; top:'+topOffset+'px !important; margin-left:0 !important;}';
						posSite = mainContent && mainContent.getBoundingClientRect();
						posOne = sideBarOne.getBoundingClientRect();
						posTwo = sideBarTwo.getBoundingClientRect();
                        
                        /*Commented out parts are original ones*/
						/*xPosOne = (mainContent) ? (+posSite.left +mainContent.offsetWidth) : posOne.left;
						xPosTwo = (mainContent) ? (+posSite.left -sideBarTwo.offsetWidth) : posTwo.left;*/
                        xPosOne = (mainContent) ? (+posSite.left +mainContent.offsetWidth) : posOne.left;
						xPosTwo = (mainContent) ? (+posSite.left -sideBarTwo.offsetWidth) : posTwo.left;
                        if(publisherGuj == true || publisherGuj == "true") {
                            xPosOne = posSiteLeft + gujContentWidth;
                            xPosTwo = posSiteLeft -sideBarTwo.offsetWidth;
                        }
                        
						yPos = win.pageYOffset;
						//console.log(posSite.left, posOne.left, xPosOne, yPos);
						if(yPos >= yPosStart){
							lib.addClass(sideBarOne, 'sidebar-fixed');
							lib.addClass(sideBarTwo, 'sidebar-fixed');
							sideBarOne.style.left = xPosOne + 'px';
							css += '.sidebar-fixed.sidebar-two {left:' + xPosTwo + 'px !important;}';
						} else {
							lib.removeClass(sideBarOne, 'sidebar-fixed');
							lib.removeClass(sideBarTwo, 'sidebar-fixed');
							sideBarOne.style.left = 0;
							sideBarTwo.style.top = yPosStart + 'px';
						}
						addCSS(css, 'adform-double-sidebar', pDoc);
					}
				};

				function addCSS (css, id, doc) {
					cssId = typeof id !== 'undefined' ? id : 'adform-custom';
					doc = typeof doc !== 'undefined' ? doc : document;
					if(lib.byId(cssId, doc)){
						style = lib.byId(cssId, doc);
						style.innerHTML = css;
					} else {
						style = doc.createElement('style');
						style.type = 'text/css';
						style.id = cssId;
						if (style.styleSheet){
							style.styleSheet.cssText = css;
						}
						else {
							style.appendChild(doc.createTextNode(css));
						}
						doc.getElementsByTagName('head')[0].appendChild(style);
					}
				}

				function recheckSize(){
					setTimeout(adjustSize, 200); //resize event fails on minimize/maximize if transition is set
				}

				lib.addEvent(win, 'resize', adjustSize);
				lib.addEvent(win, 'resize', recheckSize);
				lib.addEvent(win, 'scroll', adjustPosition);
				lib.addEvent(win, 'scroll', recheckSize);
				recheckSize();
			}

		}
	]);
	
})(window, document, (Adform = window.Adform || {}));
