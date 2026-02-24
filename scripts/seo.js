(function () {
  const SITE_NAME = "AIFutureTrendz";
  const SITE_URL = "https://aifuturetrendz.com";
  const DEFAULT_KEYWORDS = "AI, Artificial Intelligence, LLM, ChatGPT, Gemini, AI Research, Technology Blog";
  const DEFAULT_DESCRIPTION = "Practical AI explainers, product analysis, and strategy insight for teams tracking the next wave of artificial intelligence.";
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=630&q=60";
  const DEFAULT_MODIFIED = "2026-02-24";

  const PAGE_CONFIG = {
    "index.html": {
      type: "website",
      title: "AI Future Trends and Insights",
      description: "Track the latest AI breakthroughs, product launches, and business shifts with concise reporting and actionable analysis.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=630&q=60"
    },
    "articles.html": {
      type: "website",
      title: "AI Articles and Deep Dives",
      description: "Explore AI explainers, market trends, and practical playbooks to help teams evaluate tools, workflows, and adoption strategy.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=630&q=60"
    },
    "why-chatgpt-exploded-popularity.html": {
      type: "article",
      title: "Why ChatGPT Became Popular Fast | AI Guide",
      headline: "Why ChatGPT Became Popular So Fast",
      description: "Discover why ChatGPT scaled quickly through zero-friction UX, launch timing, and rapid iteration, and what these patterns reveal about the next AI winners.",
      image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&h=630&q=60",
      datePublished: "2026-05-01",
      dateModified: DEFAULT_MODIFIED,
      authorName: "AIFutureTrendz",
      related: [
        {
          href: "why-it-service-giants-dont-build-frontier-llms.html",
          text: "Why IT Giants Avoid Building Frontier LLMs"
        },
        {
          href: "articles.html",
          text: "Explore More AI Strategy Articles"
        },
        {
          href: "index.html",
          text: "Latest AI Trends and Industry Signals"
        }
      ],
      faqs: [
        {
          q: "Why did ChatGPT gain users faster than most AI tools?",
          a: "It removed friction with a simple chat interface, launched at the right moment, and improved quickly based on real user behavior."
        },
        {
          q: "Did OpenAI win only because of model quality?",
          a: "Model quality mattered, but product execution, release speed, and tight feedback loops were equally important in early adoption."
        }
      ]
    },
    "why-it-service-giants-dont-build-frontier-llms.html": {
      type: "article",
      title: "Why IT Giants Avoid Frontier LLM | AI Guide",
      headline: "Why IT Giants Avoid Frontier LLM Development",
      description: "Understand why IT services firms rarely train frontier LLMs, from capital intensity and talent concentration to product-culture constraints in AI strategy.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=630&q=60",
      datePublished: "2026-05-05",
      dateModified: DEFAULT_MODIFIED,
      authorName: "AIFutureTrendz",
      related: [
        {
          href: "why-chatgpt-exploded-popularity.html",
          text: "Why ChatGPT Became Popular So Fast"
        },
        {
          href: "articles.html",
          text: "Read More AI Explainers and Deep Dives"
        },
        {
          href: "index.html",
          text: "AI Future Trends and Insights Homepage"
        }
      ],
      faqs: [
        {
          q: "Can IT services firms still win in the AI market without frontier models?",
          a: "Yes. They can create strong value through enterprise integration, domain copilots, governance, and deployment support."
        },
        {
          q: "What is the biggest blocker to building a frontier LLM?",
          a: "The biggest blocker is sustained capital and research commitment, not basic engineering capability."
        }
      ]
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

  function getOrCreateMeta(attr, key) {
    let node = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }
    return node;
  }

  function setMeta(attr, key, value) {
    const node = getOrCreateMeta(attr, key);
    node.setAttribute("content", value);
  }

  function getOrCreateLink(rel) {
    let node = document.head.querySelector(`link[rel="${rel}"]`);
    if (!node) {
      node = document.createElement("link");
      node.setAttribute("rel", rel);
      document.head.appendChild(node);
    }
    return node;
  }

  function ensureJsonLd(id) {
    let node = document.head.querySelector(`script[type="application/ld+json"]#${id}`);
    if (!node) {
      node = document.createElement("script");
      node.type = "application/ld+json";
      node.id = id;
      document.head.appendChild(node);
    }
    return node;
  }

  function firstText(selectors, fallback) {
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent) {
        const value = el.textContent.trim();
        if (value) return value;
      }
    }
    return fallback;
  }

  function ensurePerformanceDefaults() {
    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      if (!img.hasAttribute("alt")) img.setAttribute("alt", "AI Future Trendz image");
    });

    document.querySelectorAll("script[src]").forEach((script) => {
      const src = script.getAttribute("src") || "";
      if (src.includes("theme.js")) script.setAttribute("defer", "");
    });
  }

  function ensureArticleExtras(page) {
    const articleNode = document.querySelector("main article");
    const container = document.querySelector(".article-container");
    if (!articleNode || !container) return;

    if (!container.querySelector(".related-articles") && page.related && page.related.length) {
      const section = document.createElement("section");
      section.className = "related-articles";
      section.innerHTML = '<h3>Related Articles</h3><ul></ul>';
      const ul = section.querySelector("ul");
      page.related.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.text;
        li.appendChild(a);
        ul.appendChild(li);
      });
      container.appendChild(section);
    }

    if (!container.querySelector(".author-box")) {
      const box = document.createElement("div");
      box.className = "author-box";
      box.textContent = "Written by AIFutureTrendz - A technology-focused blog explaining AI in simple language.";
      container.appendChild(box);
    }
  }

  function buildArticleSchema(data, canonicalUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.headline || data.title,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished || DEFAULT_MODIFIED,
      dateModified: data.dateModified || DEFAULT_MODIFIED,
      author: {
        "@type": "Organization",
        name: data.authorName || SITE_NAME
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: SITE_URL + "/logo.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };
  }

  function buildFaqSchema(faqItems) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a
        }
      }))
    };
  }

  const file = currentFileName();
  const config = PAGE_CONFIG[file] || {};
  const isArticle = config.type === "article";
  const canonicalUrl = pageUrl(file);
  const baseTitle = config.title || firstText([".article-title", "h1"], SITE_NAME);
  const finalTitle = baseTitle.includes("| " + SITE_NAME) ? baseTitle : `${baseTitle} | ${SITE_NAME}`;
  const description = config.description || document.querySelector('meta[name="description"]')?.getAttribute("content") || DEFAULT_DESCRIPTION;
  const imageUrl = config.image || document.querySelector(".article-hero-image")?.getAttribute("src") || DEFAULT_IMAGE;

  document.title = finalTitle;
  getOrCreateLink("canonical").setAttribute("href", canonicalUrl);

  setMeta("name", "description", description);
  setMeta("name", "keywords", DEFAULT_KEYWORDS);
  setMeta("name", "author", SITE_NAME);

  setMeta("property", "og:type", isArticle ? "article" : "website");
  setMeta("property", "og:title", config.headline || baseTitle);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:image", imageUrl);
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", config.headline || baseTitle);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", imageUrl);

  getOrCreateLink("icon").setAttribute("type", "image/svg+xml");
  getOrCreateLink("icon").setAttribute("href", "/assets/favicon.svg");
  getOrCreateLink("apple-touch-icon").setAttribute("href", "/apple-touch-icon.png");

  if (isArticle) {
    ensureJsonLd("aft-seo-schema").textContent = JSON.stringify(buildArticleSchema({
      title: baseTitle,
      headline: config.headline,
      description: description,
      image: imageUrl,
      datePublished: config.datePublished,
      dateModified: config.dateModified,
      authorName: config.authorName
    }, canonicalUrl));
    if (config.faqs && config.faqs.length) {
      ensureJsonLd("aft-faq-schema").textContent = JSON.stringify(buildFaqSchema(config.faqs));
    }
    ensureArticleExtras(config);
  } else {
    ensureJsonLd("aft-seo-schema").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline: baseTitle,
      description: description,
      image: imageUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    });
  }

  ensurePerformanceDefaults();
})();
