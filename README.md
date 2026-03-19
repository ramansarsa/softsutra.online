# SoftSutra.online

SoftSutra.online is a secure static website for SoftSutra, founded by Raman Sharma (Aazad), built for GitHub Pages with a glassmorphism design system and GitHub Releases based software delivery.

## Stack

- HTML, CSS, and JavaScript only
- GitHub Pages for hosting
- GitHub Releases for `.apk`, `.msi`, and `.exe` distribution
- Custom domain through `CNAME`

## Project Structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- deploy-pages.yml
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- img/
|   |   `-- favicon.svg
|   `-- js/
|       `-- app.js
|-- .gitignore
|-- .nojekyll
|-- 404.html
|-- CNAME
|-- index.html
|-- robots.txt
|-- site.webmanifest
`-- sitemap.xml
```

## Deployment

1. Push the repository to `main`.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Confirm the custom domain is `softsutra.online`.
5. In your DNS provider, point `softsutra.online` to GitHub Pages.

## Release Workflow

The website currently uses stable GitHub release-page links instead of hardcoded asset URLs. That means the site works immediately, even before the first release is uploaded.

When you publish releases:

- Upload Windows `.msi` and `.exe` assets to the release
- Upload Android `.apk` assets to the release
- Keep release notes clear so users can verify what changed before downloading

If you later want one-click direct downloads from the site, use consistent asset filenames across releases and then update the links in `index.html`.
