// Location records are kept locally so the map stays useful if Wikipedia is offline.
// Coordinates are representative points and should not be used for navigation.
const heritagePlaces = [
  {
    id: 1, name: 'Mausoleum of Khoja Ahmed Yasawi', region: 'Turkistan Region',
    category: 'mausoleum', label: 'Mausoleum',
    description: 'A major Timurid-era architectural monument in the historic city of Turkistan.',
    significance: 'The mausoleum is an outstanding work of Timurid architecture and influenced later Islamic religious buildings.',
    fact: 'Construction began in 1389 and remained unfinished when Timur died in 1405.',
    image: 'images/map/yasawi-mausoleum.jpg', lat: 43.2977, lng: 68.2711,
    wikiTitle: 'Mausoleum of Khoja Ahmed Yasawi', sourceUrl: 'https://whc.unesco.org/en/list/1103/'
  },
  {
    id: 2, name: 'Ancient City of Otrar', region: 'Turkistan Region',
    category: 'historical', label: 'Historical site',
    description: 'Archaeological remains of a medieval city on a major branch of the Silk Road.',
    significance: 'Otrar was a major centre of trade, crafts, agriculture, and learning in medieval southern Kazakhstan.',
    fact: 'The historic city is also known in Arabic sources as Farab.',
    image: 'images/map/ancient-otrar.avif', lat: 42.8505, lng: 68.30233,
    wikiTitle: 'Otrar', sourceUrl: 'https://kazakhstan.travel/en/attractions/368'
  },
  {
    id: 3, name: 'Arystan Bab Mausoleum', region: 'Turkistan Region',
    category: 'mausoleum', label: 'Mausoleum',
    description: 'A revered mausoleum associated with the spiritual history of the Otrar oasis.',
    significance: 'Arystan Bab is remembered in local religious tradition as the spiritual mentor of Khoja Ahmed Yasawi.',
    fact: 'A pilgrimage visit to Arystan Bab is traditionally linked with a later visit to Yasawi’s mausoleum.',
    image: 'images/map/arystan-bab-mausoleum.jpeg', lat: 42.85142, lng: 68.26884,
    wikiTitle: 'Arystan Bab Mausoleum', sourceUrl: 'https://kazakhstan.travel/en/attractions/369'
  },
  {
    id: 4, name: 'Aisha Bibi Mausoleum', region: 'Zhambyl Region',
    category: 'mausoleum', label: 'Mausoleum',
    description: 'A medieval mausoleum near Taraz, noted for its decorated terracotta exterior.',
    significance: 'The monument is an important example of medieval architectural art in Kazakhstan.',
    fact: 'Its exterior is covered with carved terracotta tiles bearing geometric and floral designs.',
    image: 'images/map/aisha-bibi-mausoleum.jpg', lat: 42.8406, lng: 71.2106,
    wikiTitle: 'Aisha Bibi Mausoleum', sourceUrl: 'https://kazakhstan.travel/en/attractions/196'
  },
  {
    id: 5, name: 'Akyrtas Archaeological Complex', region: 'Zhambyl Region',
    category: 'historical', label: 'Archaeological site',
    description: 'A remarkable stone complex near Taraz whose origins and purpose continue to be studied.',
    significance: 'The ruins provide evidence of medieval building activity and settlement in the Taraz region.',
    fact: 'The early-13th-century traveller Chang Chun recorded seeing a large red-stone structure in this area.',
    image: 'images/map/akyrtas-complex.jpg', lat: 42.90047, lng: 71.42934,
    wikiTitle: 'Akyrtas', sourceUrl: 'https://oq.gov.kz/en/abai/aqyrtas'
  },
  {
    id: 6, name: 'Berel Burial Mounds', region: 'East Kazakhstan Region',
    category: 'historical', label: 'Archaeological site',
    description: 'An Altai burial landscape associated with the early nomadic cultures of the region.',
    significance: 'The mounds are important evidence for the Scythian-Saka world and its burial practices.',
    fact: 'Permafrost in some graves helped preserve organic materials, including wood, clothing, and horse remains.',
    image: 'images/map/berel-burial-mounds.jpg', lat: 49.3354, lng: 86.3506,
    wikiTitle: 'Berel kurgans', sourceUrl: 'https://kazakhstan.travel/en/attractions/174'
  },
  {
    id: 7, name: 'Lake Markakol', region: 'East Kazakhstan Region',
    category: 'nature', label: 'Natural heritage',
    description: 'A high-altitude lake in the Southern Altai, surrounded by mountain landscapes.',
    significance: 'The lake and its surroundings form part of the protected Markakol State Nature Reserve.',
    fact: 'The lake is a habitat of the endemic uskuch fish.',
    image: 'images/map/lake-markakol.jpg', lat: 48.74, lng: 85.76,
    wikiTitle: 'Lake Markakol', sourceUrl: 'https://kazakhstan.travel/en/attractions/161'
  },
  {
    id: 8, name: 'Kiin-Kerish', region: 'East Kazakhstan Region',
    category: 'nature', label: 'Natural landmark',
    description: 'A striking landscape of brightly coloured clay and rock formations near Lake Zaisan.',
    significance: 'Its exposed geological formations make the tract a distinctive natural landmark of East Kazakhstan.',
    fact: 'Local tourism material also calls the area the “Valley of Stone Spirits” or “Burning Cliffs.”',
    image: 'images/map/kiin-kerish.jpg', lat: 47.35, lng: 83.5,
    wikiTitle: 'Kiin-Kerish', sourceUrl: 'https://kazakhstan.travel/en/attractions/166'
  },
  {
    id: 9, name: 'Ulytau Historical Region', region: 'Ulytau Region',
    category: 'historical', label: 'Historical region',
    description: 'A central Kazakhstan landscape associated with Kazakh history and steppe heritage.',
    significance: 'The Ulytau area brings together historical sites and landscapes that hold cultural meaning in Kazakhstan.',
    fact: 'The nearby Aulietau summit is regarded as sacred in local folklore.',
    image: 'images/map/ulytau-region.jpg', lat: 48.64614, lng: 66.93903,
    wikiTitle: 'Ulytau', sourceUrl: 'https://kazakhstan.travel/en/attractions/391'
  },
  {
    id: 10, name: 'Alasha Khan Mausoleum', region: 'Ulytau Region',
    category: 'mausoleum', label: 'Mausoleum',
    description: 'A medieval mausoleum in the Ulytau area, on the right bank of the Karakengir River.',
    significance: 'The monument is one of the notable historic structures of the Ulytau region.',
    fact: 'It stands on a hill and is distinguished by its rectangular plan and large scale.',
    image: 'images/map/alasha-khan-mausoleum.jpg', lat: 48.36748, lng: 67.84281,
    wikiTitle: 'Alasha Khan Mausoleum', sourceUrl: 'https://kazakhstan.travel/en/attractions/389'
  },
  {
    id: 11, name: 'Tamgaly Petroglyphs', region: 'Zhetysu Region',
    category: 'historical', label: 'Rock art',
    description: 'A UNESCO-listed archaeological landscape with rock carvings and associated sites.',
    significance: 'The landscape documents the lives and beliefs of pastoral communities across many centuries.',
    fact: 'UNESCO records more than 5,000 images distributed across 48 complexes.',
    image: 'images/map/tamgaly-petroglyphs.jpg', lat: 43.8033, lng: 75.5358,
    wikiTitle: 'Tamgaly', sourceUrl: 'https://whc.unesco.org/en/list/1145/'
  },
  {
    id: 12, name: 'Karkaraly National Park', region: 'Karaganda Region',
    category: 'nature', label: 'Natural heritage',
    description: 'A protected landscape of granite mountains, forest, and steppe in central Kazakhstan.',
    significance: 'The park conserves the Karkaraly and Kent mountain landscapes and their local wildlife.',
    fact: 'The national park was established in 1998.',
    image: 'images/map/karkaraly-national-park.jpg', lat: 49.41667, lng: 75.41667,
    wikiTitle: 'Karkaraly National Park', sourceUrl: 'https://unff.kz/page.php?lang=1&page_id=8'
  },
  {
    id: 13, name: 'Beket Ata Underground Mosque', region: 'Mangystau Region',
    category: 'mausoleum', label: 'Sacred site',
    description: 'An underground mosque and pilgrimage site carved into the chalk landscape of Mangystau.',
    significance: 'The mosque is a major sacred site connected with Beket Myrzagululy and Mangystau’s religious heritage.',
    fact: 'The site is carved into a chalk cliff in the Oglandy area of the Ustyurt Plateau.',
    image: 'images/map/beket-ata-mosque.jpg', lat: 43.59508, lng: 54.08348,
    wikiTitle: 'Beket-Ata', sourceUrl: 'https://kazakhstan.travel/en/attractions/299'
  },
  {
    id: 14, name: 'Bozzhyra Valley', region: 'Mangystau Region',
    category: 'nature', label: 'Natural landmark',
    description: 'A dramatic landscape of chalk cliffs and rock formations on the Ustyurt Plateau.',
    significance: 'Bozzhyra is a distinctive geological landscape and a regionally recognised sacred place.',
    fact: 'Some of the white rock formations rise to about 250 metres above the surrounding plain.',
    image: 'images/map/bozzhyra-valley.jpg', lat: 43.41397, lng: 54.07343,
    wikiTitle: 'Bozzhyra', sourceUrl: 'https://kazakhstan.travel/en/attractions/326'
  },
  {
    id: 15, name: 'Mount Sherkala', region: 'Mangystau Region',
    category: 'nature', label: 'Natural landmark',
    description: 'An isolated chalk mountain with a distinctive silhouette in the Mangystau region.',
    significance: 'Sherkala is a prominent natural landmark among the region’s distinctive rock formations.',
    fact: 'The mountain is about 308 metres high; stone concretions are also found nearby.',
    image: 'images/map/mount-sherkala.jpg', lat: 44.25504, lng: 52.00728,
    wikiTitle: 'Sherkala Mountain', sourceUrl: 'https://kazakhstan.travel/en/attractions/313'
  },
  {
    id: 16, name: 'Burabay National Park', region: 'Akmola Region',
    category: 'nature', label: 'Natural heritage',
    description: 'A northern Kazakhstan landscape of lakes, pine forests, and granite hills.',
    significance: 'The park protects a mountain-and-lake landscape with well-known natural landmarks.',
    fact: 'The park’s landmarks include Lake Burabay, the Zhumbaktas rock, and Mount Okzhetpes.',
    image: 'images/map/burabay-national-park.jpg', lat: 53.08832, lng: 70.28814,
    wikiTitle: 'Burabay National Park', sourceUrl: 'https://kazakhstan.travel/en/parks/burabay'
  },
  {
    id: 17, name: 'Botai Archaeological Settlement', region: 'North Kazakhstan Region',
    category: 'historical', label: 'Archaeological site',
    description: 'An Eneolithic settlement important to research on early horse domestication.',
    significance: 'Research at Botai has shaped understanding of early horse-human relationships on the steppe.',
    fact: 'The settlement is dated to the fourth millennium BCE.',
    image: 'images/map/botai-settlement.jpg', lat: 53.22501, lng: 67.52975,
    wikiTitle: 'Botai culture', sourceUrl: 'https://kazakhstan.travel/en/attractions/353'
  },
  {
    id: 18, name: 'Charyn Canyon', region: 'Almaty Region',
    category: 'nature', label: 'Natural heritage',
    description: 'A major canyon system in southeastern Kazakhstan, known for its sculpted rock formations.',
    significance: 'The canyon is a key natural feature of Charyn National Park and a focus of its visitor routes.',
    fact: 'The park’s Valley of Castles route is one of the named visitor highlights.',
    image: 'images/map/charyn-canyon.jpg', lat: 43.35038, lng: 79.08133,
    wikiTitle: 'Charyn Canyon', sourceUrl: 'https://kazakhstan.travel/en/parks/charyn'
  },
  {
    id: 19, name: 'Kolsai Lakes', region: 'Almaty Region',
    category: 'nature', label: 'Natural heritage',
    description: 'A chain of mountain lakes in the Northern Tien Shan, surrounded by forested slopes.',
    significance: 'The lakes are a central natural attraction of Kolsai Lakes National Park.',
    fact: 'The lower lake, Kolsai-1, is the most accessible of the three lakes.',
    image: 'images/map/kolsai-lakes.jpg', lat: 42.99024, lng: 78.32647,
    wikiTitle: 'Kolsai Lakes', sourceUrl: 'https://kazakhstan.travel/en/attractions/89'
  },
  {
    id: 20, name: 'Singing Dune — Altyn-Emel', region: 'Zhetysu Region',
    category: 'nature', label: 'Natural landmark',
    description: 'A large sand dune in Altyn-Emel National Park, known for a low rumbling sound in certain conditions.',
    significance: 'The dune is a nationally significant natural monument within Altyn-Emel National Park.',
    fact: 'It is about 3 kilometres long and 150 metres high; dry, moving sand can produce a deep rumble.',
    image: 'images/map/singing-dune-altyn-emel.jpg', lat: 43.87553, lng: 78.56061,
    wikiTitle: 'Singing Dune', sourceUrl: 'https://kazakhstan.travel/en/attractions/780'
  }
];

const mapElement = document.getElementById('heritageMap');
const placeList = document.getElementById('mapPlaceList');
const searchInput = document.getElementById('mapSearch');
const categorySelect = document.getElementById('mapCategory');
const map = L.map(mapElement, { scrollWheelZoom: false }).setView([48.2, 67.5], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

const markers = new Map();
let selectedPlaceId = 1;
let wikiRequestController = null;
const wikiSummaryCache = new Map();

function getFilteredPlaces() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const category = categorySelect.value;

  return heritagePlaces.filter(place => {
    const searchable = [
      place.name, place.region, place.description, place.significance,
      QH.t(place.name), QH.t(place.region)
    ].join(' ').toLocaleLowerCase();
    return searchable.includes(query) && (category === 'all' || place.category === category);
  });
}

function showPlace(place) {
  if (!place) return;

  selectedPlaceId = place.id;
  document.getElementById('mapPlaceImage').src = place.image;
  document.getElementById('mapPlaceImage').alt = QH.t(place.name);
  document.getElementById('mapPlaceCategory').textContent = QH.t(place.label);
  document.getElementById('mapPlaceName').textContent = QH.t(place.name);
  document.getElementById('mapPlaceRegion').textContent = QH.t(place.region);
  document.getElementById('mapPlaceDescription').textContent = QH.t(place.description);
  document.getElementById('mapPlaceSignificance').textContent = QH.t(place.significance);
  document.getElementById('mapPlaceFact').textContent = QH.t(place.fact);
  document.getElementById('mapPlaceCoordinates').textContent =
    place.lat.toFixed(5) + ', ' + place.lng.toFixed(5);

  const sourceLink = document.getElementById('mapPlaceSourceLink');
  sourceLink.href = place.sourceUrl;
  sourceLink.textContent = QH.t('Open reference source');

  document.getElementById('mapStatus').textContent = QH.t('Selected:') + ' ' + QH.t(place.name);
  markers.forEach((marker, id) => marker.getElement()?.classList.toggle('is-selected', id === place.id));
  renderPlaceCards(getFilteredPlaces());
  loadWikiSummary(place);
}

function createMarker(place) {
  const icon = L.divIcon({
    className: 'qh-map-marker',
    html: '<span class=\"qh-marker-dot\" aria-hidden=\"true\"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
  const marker = L.marker([place.lat, place.lng], {
    title: QH.t(place.name),
    alt: QH.t(place.name),
    icon,
    keyboard: true
  }).addTo(map);

  marker.bindTooltip(QH.t(place.name), { direction: 'top', offset: [0, -8] });
  marker.on('click', () => showPlace(place));
  markers.set(place.id, marker);
}

function renderPlaceCards(places) {
  placeList.replaceChildren();
  document.getElementById('mapCount').textContent =
    places.length + ' ' + QH.t('locations displayed');
  document.getElementById('mapListCount').textContent = places.length + ' / ' + heritagePlaces.length;

  if (!places.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'text-muted';
    emptyMessage.textContent = QH.t('No places match your search.');
    placeList.appendChild(emptyMessage);
    return;
  }

  places.forEach(place => {
    const column = document.createElement('div');
    column.className = 'col';
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card map-place-card text-start border-0 shadow-sm h-100 w-100 p-0' +
      (place.id === selectedPlaceId ? ' is-selected' : '');
    card.setAttribute('aria-pressed', String(place.id === selectedPlaceId));
    card.innerHTML = '<img src=\"' + place.image + '\" alt=\"' + QH.t(place.name) +
      '\" loading=\"lazy\" class=\"map-place-card-image\"><span class=\"d-flex flex-column p-3\">' +
      '<span class=\"fw-bold\">' + QH.t(place.name) + '</span><span class=\"small text-muted mt-1\">' +
      QH.t(place.label) + ' · ' + QH.t(place.region) + '</span></span>';
    card.addEventListener('click', () => {
      showPlace(place);
      map.setView([place.lat, place.lng], Math.max(map.getZoom(), 6));
    });
    column.appendChild(card);
    placeList.appendChild(column);
  });
}

function updateMap() {
  const filtered = getFilteredPlaces();
  const visibleIds = new Set(filtered.map(place => place.id));

  markers.forEach((marker, id) => {
    if (visibleIds.has(id)) marker.addTo(map);
    else map.removeLayer(marker);
  });

  renderPlaceCards(filtered);
  if (!visibleIds.has(selectedPlaceId) && filtered.length) {
    showPlace(filtered[0]);
  } else if (!filtered.length) {
    document.getElementById('mapStatus').textContent = QH.t('No matching places found.');
  } else {
    markers.forEach((marker, id) => marker.getElement()?.classList.toggle('is-selected', id === selectedPlaceId));
  }
}

function getArticleUrl(data, language) {
  const value = data.content_urls?.desktop?.page;
  if (typeof value !== 'string') return '';

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === language + '.wikipedia.org' &&
      url.pathname.startsWith('/wiki/') ? url.href : '';
  } catch {
    return '';
  }
}

function showWikiFallback(message) {
  document.getElementById('wikiSummary').textContent = '';
  const link = document.getElementById('wikiLink');
  link.hidden = true;
  link.removeAttribute('href');
  document.getElementById('wikiStatus').textContent = QH.t(message);
}

async function loadWikiSummary(place) {
  const status = document.getElementById('wikiStatus');
  const summary = document.getElementById('wikiSummary');
  const link = document.getElementById('wikiLink');

  if (wikiRequestController) wikiRequestController.abort();
  if (wikiSummaryCache.has(place.id)) {
    const cached = wikiSummaryCache.get(place.id);
    summary.textContent = cached.extract;
    link.hidden = !cached.url;
    if (cached.url) link.href = cached.url;
    else link.removeAttribute('href');
    status.textContent = QH.t('Additional information loaded from the local page cache.');
    return;
  }

  wikiRequestController = new AbortController();
  const controller = wikiRequestController;
  const preferredLanguage = ['kk', 'ru'].includes(QH.language) ? QH.language : 'en';
  const localizedTitle = QH.t(place.name);
  const candidates = [{ language: preferredLanguage, title: localizedTitle }];
  if (preferredLanguage !== 'en' && place.wikiTitle !== localizedTitle) {
    candidates.push({ language: 'en', title: place.wikiTitle });
  }

  status.textContent = QH.t('Loading additional information…');
  summary.textContent = '';
  link.hidden = true;
  link.removeAttribute('href');

  try {
    let result = null;
    for (const candidate of candidates) {
      const endpoint = 'https://' + candidate.language +
        '.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(candidate.title);
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });

      if (response.status === 404) continue;
      if (!response.ok) throw new Error('Wikipedia returned HTTP ' + response.status);

      const data = await response.json();
      if (selectedPlaceId !== place.id) return;
      if (typeof data.extract !== 'string' || !data.extract.trim()) continue;

      result = {
        extract: data.extract.trim(),
        url: getArticleUrl(data, candidate.language),
        language: candidate.language
      };
      break;
    }

    if (selectedPlaceId !== place.id) return;
    if (!result) {
      showWikiFallback('No matching article was found. The local place information remains available.');
      return;
    }

    wikiSummaryCache.set(place.id, result);
    summary.textContent = result.extract;
    link.hidden = !result.url;
    if (result.url) link.href = result.url;
    else link.removeAttribute('href');

    status.textContent = QH.t(result.url
      ? 'Additional information loaded from Wikipedia.'
      : 'A summary was returned, but no valid article link was provided.');
  } catch (error) {
    if (error.name !== 'AbortError' && selectedPlaceId === place.id) {
      showWikiFallback('Online background is unavailable right now. The local place information remains available.');
    }
  }
}

heritagePlaces.forEach(createMarker);
searchInput.addEventListener('input', updateMap);
categorySelect.addEventListener('change', updateMap);
document.getElementById('mapReset').addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  updateMap();
  showPlace(heritagePlaces[0]);
  map.setView([48.2, 67.5], 5);
});

showPlace(heritagePlaces[0]);
document.addEventListener('qh:languagechange', () => {
  wikiSummaryCache.clear();
  markers.forEach((marker, id) => {
    const place = heritagePlaces.find(item => item.id === id);
    marker.setTooltipContent(QH.t(place.name));
  });
  showPlace(heritagePlaces.find(place => place.id === selectedPlaceId));
  updateMap();
});
