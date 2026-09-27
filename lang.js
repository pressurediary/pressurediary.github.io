// Shows one language at a time. Order of preference:
// ?lang=tr|en in the URL, the visitor's last choice, then the browser language.
(function () {
  var supported = ['tr', 'en'];
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (supported.indexOf(q) >= 0) return q;
    try {
      var saved = localStorage.getItem('lang');
      if (supported.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    var t = document.documentElement.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
  }
  apply(pick());
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (!b) return;
    var lang = b.getAttribute('data-set-lang');
    try { localStorage.setItem('lang', lang); } catch (err) {}
    apply(lang);
  });
})();
