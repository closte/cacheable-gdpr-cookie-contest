/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}
           
			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
//end jquery cookie plugin

//HEAD 
window["gdpr-cookie-notice-templates"] = {};

window["gdpr-cookie-notice-templates"]["bar.html"] = "<div class=\"gdpr-cookie-notice\">\n" +
    "  <p class=\"gdpr-cookie-notice-description\">{description}</p>\n" +
    "  <nav class=\"gdpr-cookie-notice-nav\">\n" +
    "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{settings}</a>\n" +
    "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{accept}</a>\n" +
    "  </nav>\n" +
    "</div>\n" +
    ""; 

window["gdpr-cookie-notice-templates"]["category.html"] = "<li class=\"gdpr-cookie-notice-modal-cookie\">\n" +
    "  <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n" +
    "    <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{title}</h3>\n" +
    "    <input type=\"checkbox\" name=\"gdpr-cookie-notice-{prefix}\" checked=\"checked\" id=\"gdpr-cookie-notice-{prefix}\" class=\"gdpr-cookie-notice-modal-cookie-input\">\n" +
    "    <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{prefix}\"></label>\n" +
    "  </div>\n" +
    "  <p class=\"gdpr-cookie-notice-modal-cookie-info\">{desc}</p>\n" +
    "</li>\n" +
    ""; 

window["gdpr-cookie-notice-templates"]["modal.html"] = "<div class=\"gdpr-cookie-notice-modal\">\n" +
    "  <div class=\"gdpr-cookie-notice-modal-content\">\n" +
    "    <div class=\"gdpr-cookie-notice-modal-header\">\n" +
    "      <h2 class=\"gdpr-cookie-notice-modal-title\">{settings}</h2>\n" +
    "      <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n" +
    "    </div>\n" +
    "    <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n" +
    "    <div class=\"gdpr-cookie-notice-modal-footer\">\n" +
    "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{statement}</a>\n" +
    "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\"><span>{save}</span></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    ""; 
// END 


// Load locales
var gdprCookieNoticeLocales = {};

function gdprCookieNotice(config) {
  var namespace = 'gdprcookienotice';
  var pluginPrefix = 'gdpr-cookie-notice';
  var templates = window[pluginPrefix+'-templates'];
  var gdprCookies = Cookies.noConflict();
  var modalLoaded = false;
  var noticeLoaded = false;
  var cookiesAccepted = false;
  var categories = ['performance', 'analytics', 'marketing'];

  // Default config options
  if(!config.locale) config.locale = 'en';
  if(!config.timeout) config.timeout = 500;
  if(!config.domain) config.domain = null;
  if(!config.expiration) config.expiration = 30;

  // Get the users current cookie selection
  var currentCookieSelection = getCookie();
  var cookiesAcceptedEvent = new CustomEvent('gdprCookiesEnabled', {detail: currentCookieSelection});

  // Show cookie bar if needed
  if(!currentCookieSelection) {
    showNotice();

    // Accept cookies on page scroll
    if(config.implicit) {
      acceptOnScroll();
    }
  } else {
    deleteCookies(currentCookieSelection);
    document.dispatchEvent(cookiesAcceptedEvent);
  }

  // Get gdpr cookie notice stored value
  function getCookie() {
    return gdprCookies.getJSON(namespace);
  }

  // Delete cookies if needed
  function deleteCookies(savedCookies) {
    var notAllEnabled = false;
    for (var i = 0; i < categories.length; i++) {
      if(config[categories[i]] && !savedCookies[categories[i]]) {
        for (var ii = 0; ii < config[categories[i]].length; ii++) {
          gdprCookies.remove(config[categories[i]][ii],{ domain: config.domain });
          notAllEnabled = true;
        }
      }
    }

    // Show the notice if not all categories are enabled
    if(notAllEnabled) {
      
      showNotice();
    } else {
      hideNotice();
    }
  }

  // Hide cookie notice bar
  function hideNotice() {
    document.documentElement.classList.remove(pluginPrefix+'-loaded');
  }

  // Write gdpr cookie notice's cookies when user accepts cookies
  function acceptCookies(save) {
    var value = {
      date: new Date(),
      necessary: true,
      performance: true,
      analytics: true,
      marketing: true
    };
    var allAccepted = true;
    // If request was coming from the modal, check for the settings
    if(save) {
       
      for (var i = 0; i < categories.length; i++) {
        value[categories[i]] = document.getElementById(pluginPrefix+'-cookie_'+categories[i]).checked;
        if(value[categories[i]] == false){
            allAccepted = false;
        }
          
         
      }
        
     
    }
    gdprCookies.set(namespace, value, { expires: config.expiration, domain: config.domain });
    deleteCookies(value);
      
       if(allAccepted == false){
              window.location.reload(true);
          }else{
              hideModal();
          }

    // Load marketing scripts that only works when cookies are accepted
    cookiesAcceptedEvent = new CustomEvent('gdprCookiesEnabled', {detail: value});
    document.dispatchEvent(cookiesAcceptedEvent);

  }

  // Show the cookie bar
  function buildNotice() {
    if(noticeLoaded) {
      return false;
    }

    var noticeHtml = localizeTemplate('bar.html');
    document.body.insertAdjacentHTML('beforeend', noticeHtml);

    // Load click functions
    setNoticeEventListeners();

    // Make sure its only loaded once
    noticeLoaded = true;
  }

  // Show the cookie notice
  function showNotice() {
    buildNotice();

    // Show the notice with a little timeout
    setTimeout(function(){
      document.documentElement.classList.add(pluginPrefix+'-loaded');
    }, config.timeout);
  }

  // Localize templates
  function localizeTemplate(template, prefix) {
    var str = templates[template];
    var data = gdprCookieNoticeLocales[config.locale];

    if(prefix) {
      prefix = prefix+'_';
    } else {
      prefix = '';
    }

    if (typeof str === 'string' && (data instanceof Object)) {
      for (var key in data) {
        return str.replace(/({([^}]+)})/g, function(i) {
          var key = i.replace(/{/, '').replace(/}/, '');

          if(key == 'prefix') {
            return prefix.slice(0, -1);
          }

          if(data[key]) {
            return data[key];
          } else if(data[prefix+key]) {
            return data[prefix+key];
          } else {
            return i;
          }
        });
      }
    } else {
      return false;
    }
  }

  // Build modal window
  function buildModal() {
    if(modalLoaded) {
      return false;
    }

    // Load modal template
    var modalHtml = localizeTemplate('modal.html');

    // Append modal into body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Get empty category list
    var categoryList = document.querySelector('.'+pluginPrefix+'-modal-cookies');

    //Load essential cookies
    categoryList.innerHTML += localizeTemplate('category.html', 'cookie_essential');
    var input = document.querySelector('.'+pluginPrefix+'-modal-cookie-input');
    var label = document.querySelector('.'+pluginPrefix+'-modal-cookie-input-switch');
    label.innerHTML = gdprCookieNoticeLocales[config.locale]['always_on'];
    label.classList.add(pluginPrefix+'-modal-cookie-state');
    label.classList.remove(pluginPrefix+'-modal-cookie-input-switch');
    input.remove();

    // Load other categories if needed
    if(config.performance) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_performance');
    if(config.analytics) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_analytics');
    if(config.marketing) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_marketing');

    // Load click functions
    setModalEventListeners();

    // Update checkboxes based on stored info(if any)
    if(currentCookieSelection) {
      document.getElementById(pluginPrefix+'-cookie_performance').checked = currentCookieSelection.performance;
      document.getElementById(pluginPrefix+'-cookie_analytics').checked = currentCookieSelection.analytics;
      document.getElementById(pluginPrefix+'-cookie_marketing').checked = currentCookieSelection.marketing;
    }

    // Make sure modal is only loaded once
    modalLoaded = true;
  }

  // Show modal window
  function showModal() {
    buildModal();
    document.documentElement.classList.add(pluginPrefix+'-show-modal');
  }

  // Hide modal window
  function hideModal() {
    document.documentElement.classList.remove(pluginPrefix+'-show-modal');
  }

  // Click functions in the notice
  function setNoticeEventListeners() {
    var settingsButton = document.querySelectorAll('.'+pluginPrefix+'-nav-item-settings')[0];
    var acceptButton = document.querySelectorAll('.'+pluginPrefix+'-nav-item-accept')[0];

    settingsButton.addEventListener('click', function(e) {
      e.preventDefault();
      showModal();
    });

    acceptButton.addEventListener('click', function(e) {
      e.preventDefault();
      acceptCookies();
    });

  }

  // Click functions in the modal
  function setModalEventListeners() {
    var closeButton = document.querySelectorAll('.'+pluginPrefix+'-modal-close')[0];
    var statementButton = document.querySelectorAll('.'+pluginPrefix+'-modal-footer-item-statement')[0];
    var categoryTitles = document.querySelectorAll('.'+pluginPrefix+'-modal-cookie-title');
    var saveButton = document.querySelectorAll('.'+pluginPrefix+'-modal-footer-item-save')[0];

    closeButton.addEventListener('click', function() {
      hideModal();
      return false;
    });

    statementButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = config.statement;
    });

    for (var i = 0; i < categoryTitles.length; i++) {
      categoryTitles[i].addEventListener('click', function() {
        this.parentNode.parentNode.classList.toggle('open');
        return false;
      });
    }

    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      saveButton.classList.add('saved');
      setTimeout(function(){
        saveButton.classList.remove('saved');
      }, 1000);
      acceptCookies(true);
    });

  }

  // Settings button on the page somewhere
  var globalSettingsButton = document.querySelectorAll('.'+pluginPrefix+'-settings-button');
  if(globalSettingsButton) {
    for (var i = 0; i < globalSettingsButton.length; i++) {
      globalSettingsButton[i].addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
      });
    }
  }


  // Get document height
  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  // Check if at least page is 25% scrolled down
  function amountScrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
    var docheight = getDocHeight();
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor(scrollTop/trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if(pctScrolled > 25 && !cookiesAccepted) {
      cookiesAccepted = true;
      return true;
    } else {
      return false;
    }
  }

  // Accept cookies on scroll
  function acceptOnScroll() {
    window.addEventListener('scroll', function _listener() {
      if(amountScrolled()) {
        acceptCookies();
        window.removeEventListener('click', _listener);
      }
    });
  }

}


gdprCookieNoticeLocales.en = {
  description: 'We use cookies to offer you a better browsing experience, personalise content and ads, to provide social media features and to analyse our traffic. Read about how we use cookies and how you can control them by clicking Cookie Settings. You consent to our cookies if you continue to use this website.',
  settings: 'Cookie settings',
  accept: 'Accept cookies',
  statement: 'Our Privacy Policy',
  save: 'Save settings',
  always_on: 'Always on',
  cookie_essential_title: 'Essential website cookies',
  cookie_essential_desc: 'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
  cookie_performance_title: 'Performance cookies',
  cookie_performance_desc: 'These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.',
  cookie_analytics_title: 'Analytics cookies',
  cookie_analytics_desc: 'We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.',
  cookie_marketing_title: 'Marketing cookies',
  cookie_marketing_desc: 'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.'
}