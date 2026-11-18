# Qazaq Heritage — Cultural Heritage Explorer

Qazaq Heritage is a six-page educational website for exploring Kazakhstan’s cultural, historical, and natural heritage. It was built as a Web Technologies 1 final project using static HTML, CSS, and JavaScript.

## Pages

- **Home** (index.html) — introduction, featured content, search, and links to the repository and current site address.
- **Heritage Explorer** (heritage.html) — browsable heritage cards, category filtering, and FAQs.
- **Gallery** (gallery.html) — cultural photographs, image controls, and a local audio player.
- **Interactive Map** (map.html) — 20 locations with Leaflet markers, search, category filters, local descriptions, approximate coordinates, and reference links.
- **Contact** (contact.html) — client-side form validation and a newsletter demonstration.
- **Profile** (profile.html) — local demo registration, sign-in, profile editing, and sign-out.

## Technologies

- HTML5, CSS3, and JavaScript ES6+
- Bootstrap 5
- jQuery for existing course interactions
- Leaflet with OpenStreetMap tiles
- Browser localStorage for theme, language, subscriptions, and the demo profile
- Wikipedia REST API for optional place summaries

## Folder structure

~~~text
Qazaq_Heritage_Final/
├── index.html
├── heritage.html
├── gallery.html
├── map.html
├── contact.html
├── profile.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── i18n.js
│   ├── map.js
│   ├── profile.js
│   ├── contact.js
│   └── clock.js
├── images/
├── audio/
├── README.md
├── FINAL_TESTING_REPORT.md
└── RUBRIC_COMPLIANCE_CHECKLIST.md
~~~

## External services and sources

- Leaflet loads OpenStreetMap tiles from tile.openstreetmap.org. Map locations are approximate educational markers, not navigation directions.
- The map requests optional summaries from the Wikipedia REST API in the selected interface language when available. A local description and reference source are shown independently, so an API failure does not remove place information. An article link is shown only when the API response includes a valid Wikipedia URL.
- The selected-location details include references for the historical, cultural, or geographical notes shown there.

## Run locally

The Wikipedia request needs a local web server; opening the HTML files directly with a file URL may block fetch().

From this folder, run:

~~~powershell
python -m http.server 8000
~~~

Then open the server address shown in the terminal or `http://127.0.0.1:8000/` for a local test. Stop the server with Ctrl+C.

## Demo limitations

- Profile registration and sign-in are client-side demonstrations. The demo stores the account name, email, and password in localStorage as required by the course simulation; it is not secure authentication. Do not use a real password.
- Newsletter addresses are saved only in this browser for demonstration purposes. No email is sent.
- The Contact form validates the fields in the browser and does not send a message to a server.
- The map’s Wikipedia enrichment needs an internet connection. Local place descriptions and references remain available without it.

## Repository

[View the Qazaq Heritage GitHub repository](https://github.com/Absultanov-N/Qazaq_Heritage)

The project is uploaded to the `main` branch at the repository above. GitHub Pages was not enabled/verified, so this README does not present a Pages URL as live.
