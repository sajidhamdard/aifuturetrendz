(function () {
  const SITE_NAME = "AIFutureTrendz";
  const SITE_URL = "https://aifuturetrendz.com";
  const DEFAULT_DESCRIPTION = "Discover the latest AI breakthroughs, product shifts, and strategic trends shaping the future of artificial intelligence.";
  const DEFAULT_KEYWORDS = "AI, Artificial Intelligence, LLM, ChatGPT, Gemini, AI Research, Technology Blog";
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=630&q=75";
  const DEFAULT_PUBLISHER_LOGO = SITE_URL + "/logo.png";

  const PAGE_CONFIG = {
    "index.html": {
      type: "website",
      title: "AI Future Trends and Insights",
      description: DEFAULT_DESCRIPTION,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=630&q=75"
    },
    "articles.html": {
      type: "website",
      title: "AI Articles and Deep Dives",
      description: "Read in-depth AI articles, explainers, and strategy analysis covering LLMs, GenAI products, and emerging technology trends.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=630&q=75"
    },
    "why-chatgpt-exploded-popularity.html": {
      type: "article",
      title: "Why ChatGPT Exploded in Popularity",
      description: "Understand how ChatGPT achieved massive adoption through product simplicity, launch timing, and rapid iteration ahead of incumbents."
    },
    "why-it-service-giants-dont-build-frontier-llms.html": {
      type: "article",
      title: "Why IT Service Giants Still Do Not Build Frontier LLMs",
      description: "A clear breakdown of why large IT service firms rarely build frontier LLMs, including economics, research talent, and platform strategy."
    }
  };

  function currentFileName() {
    const path = location.pathname.replace(/\/+$/, "");
    const file = path.split("/").pop();
    return file || "index.html";
  }

  function pageUrl(file) {
    return SITE_URL + "/" + file;
  }

  function firstText(selectors, fallback) {
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent && el.textContent.trim()) {
        return el.textContent.trim();
      }
    }
    return fallback;
  }

  function getOrCreateMeta(attr, key) {
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    return tag;
  }

  function setMeta(attr, key, value) {
    const tag = getOrCreateMeta(attr, key);
    tag.setAttribute("content", value);
  }

  function getOrCreateLink(rel) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    return link;
  }

  function setCanonical(url) {
    const canonical = getOrCreateLink("canonical");
    canonical.setAttribute("href", url);
  }

  function ensureJsonLd(id) {
    let script = document.head.querySelector(`script[type="application/ld+json"]#${id}`);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    return script;
  }

  const file = currentFileName();
  const page = PAGE_CONFIG[file] || {};
  const isArticle = page.type === "article" || /^why-|^article-/.test(file);
  const canonicalUrl = pageUrl(file);
  const title = page.title || firstText([".article-title", "h1"], document.title.replace(/\s*\|\s*AIFutureTrendz\s*$/, "") || SITE_NAME);
  const description = page.description || document.querySelector('meta[name="description"]')?.getAttribute("content") || firstText([".article-subtitle", "main p", "p"], DEFAULT_DESCRIPTION);
  const firstHero = document.querySelector(".article-hero-image, .hero img, main img");
  const imageUrl = page.image || firstHero?.getAttribute("src") || DEFAULT_IMAGE;
  const schemaType = isArticle ? "Article" : "WebPage";
  const finalTitle = title.endsWith("| " + SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  document.title = finalTitle;
  setCanonical(canonicalUrl);

  setMeta("name", "description", description);
  setMeta("name", "keywords", DEFAULT_KEYWORDS);
  setMeta("name", "author", SITE_NAME);

  setMeta("property", "og:type", isArticle ? "article" : "website");
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:image", imageUrl);
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", imageUrl);

  getOrCreateLink("icon").setAttribute("href", "/favicon.png");
  getOrCreateLink("apple-touch-icon").setAttribute("href", "/apple-touch-icon.png");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: SITE_NAME
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_PUBLISHER_LOGO
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  ensureJsonLd("aft-seo-schema").textContent = JSON.stringify(jsonLd);
})();
