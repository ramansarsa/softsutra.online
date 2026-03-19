const APPS = [
  {
    name: "SoftSutra PDF Reader and Converter",
    features: [
      "Focused PDF reading experience for desktop use.",
      "Reader and converter workflows from one clean Windows app.",
      "Simple MSI installer for quick setup on Windows."
    ],
    platforms: [
      {
        os: "windows",
        label: "Download for Windows",
        url: "https://github.com/ramansarsa/softsutra.online/releases/download/Pdf-Reader-and-Converter-v1.0/SoftSutra.PDF.Converter.Reader.1.0.0.msi"
      }
    ]
  },
  {
    name: "Vaidic Mala Jap",
    features: [
      "Built for calm and repeated jap sessions.",
      "Lightweight Android APK for direct installation.",
      "Simple flow that keeps attention on the spiritual routine."
    ],
    platforms: [
      {
        os: "android",
        label: "Download for Android",
        url: "https://github.com/ramansarsa/softsutra.online/releases/download/v1.0/app-release.apk"
      }
    ]
  }
];

const PLATFORM_ICONS = {
  windows:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 4.75L11 3v8H3zm9 6.25h9V2l-9 1.5zM3 13h8v8.25L3 20zm9 0v8.75L21 23v-10z"/></svg>',
  android:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.35 5.2L6.8 2.52a.7.7 0 111.21-.7L9.6 4.5a7.8 7.8 0 014.8 0l1.59-2.68a.7.7 0 111.21.7L15.65 5.2a6.65 6.65 0 012.67 2.8H5.68A6.65 6.65 0 018.35 5.2zM7 9.4A1.15 1.15 0 118.15 10.55 1.15 1.15 0 017 9.4zm8.85 1.15A1.15 1.15 0 1117 9.4a1.15 1.15 0 01-1.15 1.15zM6 9.6h12v7.7a1.7 1.7 0 01-1.7 1.7H15v2.3a1 1 0 11-2 0V19h-2v2.3a1 1 0 11-2 0V19H7.7A1.7 1.7 0 016 17.3z"/></svg>',
  ios:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.75 12.3c.03 2.83 2.48 3.77 2.51 3.79-.02.06-.39 1.34-1.27 2.66-.76 1.14-1.55 2.28-2.79 2.31-1.22.02-1.61-.72-3.01-.72s-1.84.7-2.99.74c-1.2.04-2.11-1.2-2.88-2.33-1.57-2.27-2.77-6.41-1.16-9.19.8-1.38 2.24-2.25 3.8-2.28 1.19-.02 2.31.8 3.01.8.69 0 1.98-.98 3.33-.84.57.02 2.16.23 3.19 1.73-.08.05-1.91 1.12-1.88 3.33zM13.85 5.4c.64-.77 1.08-1.84.97-2.9-.92.04-2.02.61-2.68 1.38-.6.69-1.12 1.79-.98 2.84 1.02.08 2.05-.51 2.69-1.32z"/></svg>'
};

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealNodes.length > 0 && !reduceMotionQuery.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const appList = document.querySelector("#app-list");
const downloadFrame = document.querySelector("#download-frame");
const downloadStatus = document.querySelector("#download-status");

const renderApps = () => {
  if (!appList) {
    return;
  }

  appList.innerHTML = APPS.map((app) => {
    const buttons = app.platforms
      .map((platform) => {
        const variantClass = `download-button--${platform.os}`;
        return `
          <button
            class="download-button ${variantClass}"
            type="button"
            data-download-url="${platform.url}"
            data-app-name="${app.name}"
            data-platform-label="${platform.label}"
          >
            ${PLATFORM_ICONS[platform.os] ?? ""}
            <span>${platform.label}</span>
          </button>
        `;
      })
      .join("");

    return `
      <article class="app-card">
        <div class="app-card__header">
          <h2 class="app-card__title">${app.name}</h2>
          <div class="download-row">${buttons}</div>
        </div>
        <ul class="feature-list">
          ${app.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </article>
    `;
  }).join("");
};

const startDirectDownload = (url, appName, platformLabel) => {
  if (!downloadFrame) {
    return;
  }

  if (downloadStatus) {
    downloadStatus.textContent = `Starting ${appName} ${platformLabel}.`;
  }

  downloadFrame.src = "about:blank";

  window.setTimeout(() => {
    downloadFrame.src = url;
  }, 50);
};

renderApps();

appList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-url]");

  if (!button) {
    return;
  }

  startDirectDownload(
    button.dataset.downloadUrl,
    button.dataset.appName,
    button.dataset.platformLabel
  );
});
