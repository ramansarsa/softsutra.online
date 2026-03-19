# SoftSutra.online

SoftSutra.online is a static website for SoftSutra with a minimal home page focused only on the company name, punchline, app features, and direct platform download buttons.

## Pages

- `index.html` for the public app download home page
- `developer.html` for founder and long-term vision information
- `404.html` for missing routes

## Direct Download Setup

Download buttons are handled in `assets/js/app.js`.

- Each app is listed in the `APPS` array.
- Each platform button points to its direct release asset URL.
- Buttons use a hidden iframe so the current page stays open while the browser starts the file download.

## Updating Apps

1. Open `assets/js/app.js`.
2. Add or update an app inside the `APPS` array.
3. Add the platform URL under `platforms`.
4. Add or remove platform buttons by changing that `platforms` list.

## Deployment

1. Push the repository to `main`.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Confirm the custom domain is `softsutra.online`.
