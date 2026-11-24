/*
 * Consent and measurement for Elense Leatherworks.
 * Google Analytics 4 and Meta Pixel are loaded only after the visitor agrees in the cookie
 * banner; until then nothing is requested from Google or Meta. IDs come from _config.yml
 * through window.elenseTracking (see _includes/analytics.html).
 */
(function () {
  'use strict';

  var cfg = window.elenseTracking || {};
  if (!cfg.ga && !cfg.pixel) {
    return;
  }

  var STORAGE_KEY = 'elense-consent-v1';
  var events = [];          // events of this page view, replayed to a tool that loads later
  var gaLoaded = false;
  var pixelLoaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  function readChoice() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      return saved && typeof saved === 'object' ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    } catch (error) { /* private mode: the choice lasts for this page only */ }
  }

  function loadScript(src) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function loadGa() {
    if (gaLoaded || !cfg.ga) {
      return;
    }
    gaLoaded = true;
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga));
    gtag('js', new Date());
    gtag('config', cfg.ga);
    events.forEach(sendToGa);
  }

  function loadPixel() {
    if (pixelLoaded || !cfg.pixel) {
      return;
    }
    pixelLoaded = true;
    /* Meta Pixel base code */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) { return; }
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) { f._fbq = n; }
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', cfg.pixel);
    window.fbq('track', 'PageView');
    events.forEach(sendToPixel);
  }

  function applyChoice(choice) {
    gtag('consent', 'update', {
      analytics_storage: choice.analytics ? 'granted' : 'denied',
      ad_storage: choice.marketing ? 'granted' : 'denied',
      ad_user_data: choice.marketing ? 'granted' : 'denied',
      ad_personalization: choice.marketing ? 'granted' : 'denied'
    });
    if (choice.analytics) { loadGa(); }
    if (choice.marketing) { loadPixel(); }
  }

  // ---------- Events ----------

  var PIXEL_NAMES = {
    view_item: 'ViewContent',
    add_to_cart: 'AddToCart',
    begin_checkout: 'InitiateCheckout',
    purchase: 'Purchase'
  };

  function sendToGa(event) {
    if (!gaLoaded || event.sentGa) {
      return;
    }
    event.sentGa = true;
    if (event.custom) {
      gtag('event', event.name, event.custom);
      return;
    }
    var params = {
      currency: event.currency,
      value: event.value,
      items: event.items.map(function (item) {
        return { item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity };
      })
    };
    if (event.transactionId) { params.transaction_id = event.transactionId; }
    gtag('event', event.name, params);
  }

  function sendToPixel(event) {
    if (!pixelLoaded || event.sentPixel || !PIXEL_NAMES[event.name]) {
      return;
    }
    event.sentPixel = true;
    var quantity = 0;
    event.items.forEach(function (item) { quantity += item.quantity; });
    window.fbq('track', PIXEL_NAMES[event.name], {
      content_type: 'product',
      content_ids: event.items.map(function (item) { return item.id; }),
      contents: event.items.map(function (item) { return { id: item.id, quantity: item.quantity }; }),
      num_items: quantity,
      value: event.value,
      currency: event.currency
    }, event.transactionId ? { eventID: String(event.transactionId) } : undefined);
  }

  function track(event) {
    events.push(event);
    sendToGa(event);
    sendToPixel(event);
  }

  function toNumber(value) {
    var number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  }

  function cartItem(item) {
    return {
      id: String(item.id || item.uniqueId || ''),
      name: item.name || '',
      price: toNumber(item.price),
      quantity: parseInt(item.quantity, 10) || 1
    };
  }

  function cartItems(cart) {
    var list = cart && cart.items ? (cart.items.items || cart.items) : [];
    return Array.isArray(list) ? list.map(cartItem) : [];
  }

  function cartState() {
    try {
      return window.Snipcart.store.getState().cart || {};
    } catch (error) {
      return {};
    }
  }

  function currencyOf(cart) {
    return String((cart && cart.currency) || cartState().currency || '').toUpperCase();
  }

  function bindSnipcart() {
    if (!window.Snipcart || !window.Snipcart.events || bindSnipcart.done) {
      return;
    }
    bindSnipcart.done = true;

    window.Snipcart.events.on('item.added', function (item) {
      var entry = cartItem(item);
      track({ name: 'add_to_cart', currency: currencyOf(), value: entry.price * entry.quantity, items: [entry] });
    });

    window.Snipcart.events.on('theme.routechanged', function (routes) {
      var to = String((routes && routes.to) || '');
      var from = String((routes && routes.from) || '');
      if (to.indexOf('/checkout') === 0 && from.indexOf('/checkout') !== 0) {
        var cart = cartState();
        track({ name: 'begin_checkout', currency: currencyOf(cart), value: toNumber(cart.total), items: cartItems(cart) });
      }
    });

    window.Snipcart.events.on('cart.confirmed', function (confirmed) {
      var cart = confirmed || {};
      var id = cart.invoiceNumber || cart.token || '';
      try {
        if (id && window.sessionStorage.getItem('elense-purchase') === String(id)) {
          return;
        }
        window.sessionStorage.setItem('elense-purchase', String(id));
      } catch (error) { /* ignore */ }
      track({
        name: 'purchase',
        transactionId: id,
        currency: currencyOf(cart),
        value: toNumber(cart.total),
        items: cartItems(cart)
      });
    });
  }

  function trackProductView() {
    var product = document.querySelector('[data-product-id][data-product-price]');
    if (!product) {
      return;
    }
    var price = toNumber(product.getAttribute('data-product-price'));
    track({
      name: 'view_item',
      currency: product.getAttribute('data-product-currency'),
      value: price,
      items: [{ id: product.getAttribute('data-product-id'), name: product.getAttribute('data-product-name'), price: price, quantity: 1 }]
    });
  }

  // Outbound and contact clicks marked with data-analytics-event.
  document.addEventListener('click', function (clickEvent) {
    var target = clickEvent.target.closest ? clickEvent.target.closest('[data-analytics-event]') : null;
    if (!target) {
      return;
    }
    track({
      name: target.getAttribute('data-analytics-event'),
      items: [],
      custom: {
        event_category: target.getAttribute('data-analytics-category') || 'engagement',
        event_label: target.getAttribute('data-analytics-label') || target.getAttribute('href') || ''
      }
    });
  });

  // ---------- Banner ----------

  function initBanner() {
    var banner = document.getElementById('consent-banner');
    var choice = readChoice();
    if (!banner) {
      return;
    }
    var options = banner.querySelector('.consent__options');
    var saveButton = banner.querySelector('[data-consent-action="save"]');
    var settingsButton = banner.querySelector('[data-consent-action="settings"]');

    function box(name) {
      return banner.querySelector('input[data-consent="' + name + '"]');
    }

    function showSettings(show) {
      options.hidden = !show;
      saveButton.hidden = !show;
      settingsButton.hidden = show;
    }

    function open(withSettings) {
      var current = readChoice() || {};
      ['analytics', 'marketing'].forEach(function (name) {
        if (box(name)) { box(name).checked = !!current[name]; }
      });
      showSettings(!!withSettings);
      banner.hidden = false;
    }

    function decide(next) {
      var previous = readChoice() || {};
      next.time = new Date().toISOString();
      saveChoice(next);
      banner.hidden = true;
      // A tool that is already running cannot be unloaded: start clean after a withdrawal.
      if ((previous.analytics && !next.analytics) || (previous.marketing && !next.marketing)) {
        window.location.reload();
        return;
      }
      applyChoice(next);
    }

    banner.addEventListener('click', function (clickEvent) {
      var button = clickEvent.target.closest('[data-consent-action]');
      if (!button) {
        return;
      }
      var action = button.getAttribute('data-consent-action');
      if (action === 'accept') {
        decide({ analytics: !!cfg.ga, marketing: !!cfg.pixel });
      } else if (action === 'reject') {
        decide({ analytics: false, marketing: false });
      } else if (action === 'settings') {
        showSettings(true);
      } else if (action === 'save') {
        decide({
          analytics: !!(box('analytics') && box('analytics').checked),
          marketing: !!(box('marketing') && box('marketing').checked)
        });
      }
    });

    Array.prototype.slice.call(document.querySelectorAll('[data-consent-open]')).forEach(function (link) {
      link.addEventListener('click', function () { open(true); });
    });

    if (!choice) {
      open(false);
    }
  }

  var saved = readChoice();
  if (saved) {
    applyChoice(saved);
  }

  function onReady() {
    initBanner();
    trackProductView();
    bindSnipcart();
  }

  document.addEventListener('snipcart.ready', bindSnipcart);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
}());
