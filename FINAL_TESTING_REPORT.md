# Final Testing Report

## 1. Project overview

Qazaq Heritage is a static, six-page educational website that presents Kazakhstan's cultural, historical, and natural heritage. It includes a local profile demonstration, an interactive Leaflet map, a gallery, a music player, and front-end forms.

## 2. Project objectives

- Present cultural and natural heritage information in an accessible format.
- Provide search, filtering, language, and theme controls.
- Demonstrate JavaScript form validation and localStorage usage.
- Integrate an interactive map and optional Wikipedia summaries.
- Prepare a clean static project for GitHub Pages.

## 3. Technologies used

HTML5, CSS3, JavaScript ES6+, Bootstrap 5, jQuery, Leaflet/OpenStreetMap, the Wikipedia REST API, browser localStorage, and HTML audio.

## 4. Page descriptions

1. **index.html** — Home, featured cards, FAQ, site/repository links, and music player.
2. **heritage.html** — heritage content, category filtering, search, FAQ, and newsletter demonstration.
3. **gallery.html** — featured slider, interactive image controls, photograph grid, location-photo collection, and modal subscription.
4. **map.html** — 20 heritage locations, Leaflet markers, search, category filtering, local details, and Wikipedia enrichment.
5. **contact.html** — JavaScript-validated contact form and newsletter demonstrations.
6. **profile.html** — local demo registration, login, profile display, edit-name control, and logout.

## 5. Main JavaScript functionality

The project provides live search, FAQ highlighting and accordions, sliders, image lazy loading, theme and language persistence, clock controls, audio controls, modal controls, contact validation, newsletter behavior, and map filtering.

## 6. Registration and login

The profile form uses `novalidate`. Registration validates name, email, password length, and password letter/number content with inline errors. Login rejects empty fields and incorrect credentials, and redirects to the profile page after a correct login. Logout removes the browser session state.

## 7. localStorage usage

The profile stores `qazaqHeritageUser` and `qazaqHeritageCurrentUser`; the project also uses localStorage for theme, language, sound preference, subscriptions, and demo session state.

This is not secure production authentication. Credentials are stored only in the browser for an educational front-end simulation.

## 8. External API integration

The map uses Wikipedia REST `fetch()` requests for optional summaries. It shows loading, HTTP/network failure, missing-article, and neutral fallback states while preserving local place information. Article links are displayed only for valid Wikipedia article URLs.

## 9. Interactive map

The map uses Leaflet and OpenStreetMap. It contains 20 location records with approximate coordinates, categories, descriptions, significance, facts, local photographs, and reference links. Markers and cards update the selected-location detail panel.

## 10. Responsive design

Bootstrap responsive layout classes and project CSS were used. Browser measurements found no horizontal overflow at 1440 px, 1280 px, 768 px, 390 px, or 360 px across the six pages.

## 11. Light/dark mode

Theme selection is controlled by JavaScript and persisted in localStorage across pages. Browser testing confirmed the theme state and responsive layouts.

## 12. Multilingual functionality

The project includes an English/Kazakh/Russian interface dictionary and persists the selected language in localStorage. Browser testing confirmed the interface assets and language-control implementation; complete visual translation coverage was not programmatically rechecked for every text node.

## 13. Testing performed

- Local HTTP server testing in a browser.
- Home page link and navigation inspection.
- 20 map markers rendered and location/card/marker selection checked.
- Map search, category filter, empty state, and reset checked.
- A successful Wikipedia summary and a missing-article fallback were observed.
- Registration validation, valid registration, incorrect login, successful login, profile display, and logout checked.
- Contact validation and success feedback checked.
- Gallery carousel and 20 location photographs checked.
- Horizontal overflow measured at all requested widths.
- Local asset reference existence checked.

The following were NOT VERIFIED: publication on GitHub Pages, live external-CDN availability in every browser/network, audio playback for every track, final real-device testing, and compatibility with every browser version.

## 14. GitHub repository

https://github.com/Absultanov-N/Qazaq_Heritage

## 15. GitHub Pages

NOT VERIFIED. No deployed URL was opened and confirmed in this environment. The Home page uses the expected Pages address only as the intended public address and does not claim it is live.

## 16. Known limitations

- Authentication and contact/newsletter submissions are front-end demonstrations only.
- Map coordinates are approximate educational locations.
- Wikipedia content depends on network access and article availability.
- Leaflet tiles and CDN resources require network access.
- The project does not include a backend or real account security.
