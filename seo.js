(function () {
  const canonical = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const mainUrl = `https://aifuturetrendz.com/${location.pathname.split('/').pop() || 'index.html'}`;

  if (canonical && !canonical.getAttribute('href')) canonical.setAttribute('href', mainUrl);
  if (ogUrl && !ogUrl.getAttribute('content')) ogUrl.setAttribute('content', mainUrl);
})();
