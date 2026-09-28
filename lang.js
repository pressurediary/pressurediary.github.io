// Shows one language at a time. Order of preference:
// ?lang=xx in the URL, the visitor's last choice, then the browser languages.
(function () {
  var supported = ['tr', 'en', 'de', 'es', 'pt', 'fr', 'it'];
  function ok(code) { return supported.indexOf(code) >= 0 ? code : null; }
  function pick() {
    var q = ok(new URLSearchParams(location.search).get('lang'));
    if (q) return q;
    try {
      var saved = ok(localStorage.getItem('lang'));
      if (saved) return saved;
    } catch (e) {}
    var prefs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var code = ok((prefs[i] || '').toLowerCase().split('-')[0]);
      if (code) return code;
    }
    return 'en';
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    var t = document.documentElement.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    document.querySelectorAll('[data-lang-select]').forEach(function (s) { s.value = lang; });
  }
  // Set the language before first paint where possible (script is deferred, so
  // the CSS hides other languages as soon as <html lang> changes).
  apply(pick());
  document.addEventListener('change', function (e) {
    if (!e.target.matches('[data-lang-select]')) return;
    var lang = ok(e.target.value) || 'en';
    try { localStorage.setItem('lang', lang); } catch (err) {}
    apply(lang);
  });
})();
