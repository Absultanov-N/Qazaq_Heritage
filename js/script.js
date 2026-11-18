/**
 * Qazaq Heritage - Assignment 6: jQuery Integration & Interactive Features
 * Team: Toleumuratova Aisamal & Absultanov Nurdaulet (Group SE-2504)
 */

$(document).ready(function () {

    const SUBSCRIPTIONS_KEY = 'qazaqHeritageSubscriptions';
    function saveSubscription(email) {
        let subscriptions = [];
        try {
            const stored = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_KEY) || '[]');
            if (Array.isArray(stored)) {
                subscriptions = stored.filter(item => typeof item === 'string');
            }
        } catch (error) {
            // Recover from malformed data instead of breaking the form submission.
        }

        if (!subscriptions.includes(email)) subscriptions.push(email);
        try {
            localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
            return true;
        } catch (error) {
            return false;
        }
    }

    // ==========================================
    // Task 0. Setup & Readiness Test
    // ==========================================
    console.log("jQuery is ready!");
    const publicSiteUrl = 'https://absultanov-n.github.io/Qazaq_Heritage/';
    const siteLinkText = document.getElementById('siteLinkText');
    if (siteLinkText) siteLinkText.textContent = publicSiteUrl;


    // ==========================================
    // Part 1. jQuery Search Features
    // ==========================================

    // Task 1: Real-time Search and Live Filter for Cards
    $('#searchInput').on('keyup', function () {
        const value = $(this).val().toLowerCase().trim();
        $('.heritage-card-item').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Task 2: Autocomplete Search Suggestions
    const searchSuggestions = [
        "Mausoleum of Khoja Ahmed Yasawi",
        "Kazakh Yurt",
        "Tamgaly Petroglyphs",
        "Charyn Canyon",
        "Burabay National Park",
        "Katon-Karagay Mountains",
        "Mangystau Landscapes",
        "Qobyz and Dombra"
    ];

    $('#searchInput').on('input', function () {
        const query = $(this).val().toLowerCase().trim();
        const $suggestionBox = $('#suggestionBox');
        $suggestionBox.empty();

        if (query.length === 0) {
            $suggestionBox.hide();
            return;
        }

        const matches = searchSuggestions.filter(item => QH.t(item).toLowerCase().includes(query));

        if (matches.length > 0) {
            matches.forEach(match => {
                $suggestionBox.append(`<li class="list-group-item suggestion-item" style="cursor:pointer;">${QH.t(match)}</li>`);
            });
            $suggestionBox.show();
        } else {
            $suggestionBox.hide();
        }
    });

    // Select suggestion on click
    $(document).on('click', '.suggestion-item', function () {
        const selectedText = $(this).text();
        $('#searchInput').val(selectedText).trigger('keyup');
        $('#suggestionBox').hide();
    });

    // Hide suggestions on click outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#searchInput, #suggestionBox').length) {
            $('#suggestionBox').hide();
        }
    });

    // Task 3: Search Highlighting in FAQ
    $('#faqSearchInput').on('input', function () {
        const keyword = $(this).val().trim();
        const $faqContainer = $('.faq-container');

        // Clear previous highlights
        $faqContainer.find('mark.highlight').each(function () {
            this.replaceWith(document.createTextNode(this.textContent));
        });
        $faqContainer.find('.faq-question, .faq-answer, .accordion-button, .accordion-body').each(function () {
            this.normalize();
        });

        if (keyword.length > 0) {
            // Escape user input so characters such as (, [, *, and \\ are treated literally.
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            $faqContainer.find('.faq-question, .faq-answer, .accordion-button, .accordion-body').each(function () {
                // Highlight only text nodes; do not rewrite HTML attributes or nested markup.
                const walker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, {
                    acceptNode(node) {
                        if (!node.nodeValue.trim() || node.parentElement.closest('mark, script, style')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                });
                const textNodes = [];
                while (walker.nextNode()) textNodes.push(walker.currentNode);

                textNodes.forEach(node => {
                    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
                    if (!regex.test(node.nodeValue)) {
                        return;
                    }
                    regex.lastIndex = 0;
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;
                    node.nodeValue.replace(regex, (match, _group, offset) => {
                        fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
                        const mark = document.createElement('mark');
                        mark.className = 'highlight bg-warning text-dark px-1 rounded';
                        mark.textContent = match;
                        fragment.appendChild(mark);
                        lastIndex = offset + match.length;
                        return match;
                    });
                    fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
                    node.parentNode.replaceChild(fragment, node);
                });
            });
        }
    });


    // ==========================================
    // Part 2. UX Engagement Elements with jQuery
    // ==========================================

    // Task 4: Scroll Progress Bar
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $('#scrollProgressBar').css('width', scrollPercent + '%');
    });
    // Set the correct value immediately (including when the browser restores scroll position).
    $(window).trigger('scroll');

    // Task 5: Animated Number Counter
    let counterStarted = false;
    $(window).on('scroll', function () {
        const $counterSection = $('#statsSection');
        if ($counterSection.length && !counterStarted) {
            const oTop = $counterSection.offset().top - window.innerHeight;
            if ($(window).scrollTop() > oTop) {
                $('.stat-number').each(function () {
                    const $this = $(this);
                    const countTo = parseInt($this.attr('data-count'), 10);
                    $({ countNum: $this.text() }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(QH.formatNumber(Math.floor(this.countNum)));
                        },
                        complete: function () {
                            $this.text(QH.formatNumber(this.countNum) + '+');
                        }
                    });
                });
                counterStarted = true;
            }
        }
    });
    $(window).trigger('scroll');

    // Newsletter form validation and demo submission. Contact form logic lives in contact.js.
    $('#subscriptionForm').on('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        const status = this.querySelector('[role="status"]');
        const submitButton = this.querySelector('button[type="submit"]');
        const email = emailInput.value.trim().toLowerCase();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        if (!validEmail) {
            status.textContent = QH.t('Enter a valid email address.');
            status.className = 'mt-2 mb-0 text-danger';
            emailInput.focus();
            return;
        }
        if (!saveSubscription(email)) {
            status.textContent = QH.t('Subscription could not be saved in this browser.');
            status.className = 'mt-2 mb-0 text-danger';
            return;
        }
        submitButton.disabled = true;
        const buttonLabel = submitButton.querySelector('.subscription-button-label');
        const spinner = submitButton.querySelector('.spinner-border');
        submitButton.dataset.originalText = buttonLabel?.textContent || submitButton.textContent;
        if (buttonLabel) buttonLabel.textContent = QH.t('Please wait…');
        if (spinner) {
            spinner.classList.remove('d-none');
            spinner.setAttribute('aria-hidden', 'false');
            spinner.setAttribute('aria-label', QH.t('Loading subscription…'));
        }
        status.textContent = QH.t('Saving subscription…');
        status.className = 'mt-2 mb-0 text-muted';
        window.setTimeout(() => {
            status.textContent = QH.t('Subscription saved for this demonstration.');
            status.className = 'mt-2 mb-0 text-success';
            submitButton.disabled = false;
            if (buttonLabel) buttonLabel.textContent = submitButton.dataset.originalText;
            if (spinner) {
                spinner.classList.add('d-none');
                spinner.setAttribute('aria-hidden', 'true');
                spinner.removeAttribute('aria-label');
            }
            this.reset();
        }, 500);
    });

    // Heritage sound button
    let heritageSound = null;
    $('#soundEffectBtn').on('click', function () {
        const $button = $(this);
        if (!heritageSound) {
            heritageSound = new Audio('audio/ki-shashu.mp3');
        }

        if (heritageSound.paused) {
            heritageSound.play()
                .then(function () {
                    $button.text(QH.t('Stop Heritage Sound')).attr('aria-pressed', 'true');
                })
                .catch(function () {
                    showToast(QH.t('Unable to play the heritage sound.'));
                });
        } else {
            heritageSound.pause();
            heritageSound.currentTime = 0;
            $button.text(QH.t('Play Heritage Sound')).attr('aria-pressed', 'false');
        }
    });

    // Gallery audio player
    const $heritageAudio = $('#heritageAudio');
    const $heritageTrackSelect = $('#heritageTrackSelect');
    const $heritageAudioStatus = $('#heritageAudioStatus');

    function setHeritageAudioSource() {
        if (!$heritageAudio.length || !$heritageTrackSelect.length) return;
        const source = $heritageTrackSelect.val();
        if ($heritageAudio.attr('src') !== source) {
            $heritageAudio.attr('src', source);
        }
    }

    $heritageTrackSelect.on('change', function () {
        setHeritageAudioSource();
        $heritageAudio[0].pause();
        $heritageAudioStatus.text(QH.t('Track selected. Press play to listen.'));
    });

    $('#heritagePlayBtn').on('click', function () {
        setHeritageAudioSource();
        $heritageAudio[0].play()
            .then(function () {
                $heritageAudioStatus.text(QH.t('Playing selected track.'));
            })
            .catch(function () {
                $heritageAudioStatus.text(QH.t('Unable to play this track.'));
            });
    });

    $('#heritagePauseBtn').on('click', function () {
        if (!$heritageAudio.length) return;
        $heritageAudio[0].pause();
        $heritageAudioStatus.text(QH.t('Playback paused.'));
    });

    $('#heritageStopBtn').on('click', function () {
        if (!$heritageAudio.length) return;
        $heritageAudio[0].pause();
        $heritageAudio[0].currentTime = 0;
        $heritageAudioStatus.text(QH.t('Playback stopped.'));
    });


    // ==========================================
    // Part 3. Web App Functionality
    // ==========================================

    // Task 7: Temporary Toast Notification System
    window.showToast = function (message) {
        let $toast = $('#customToast');
        if (!$toast.length) {
            $('body').append(`
                <div id="customToast" class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 p-3 m-3 shadow-lg" style="z-index: 1055; display:none;" role="alert">
                    <div class="d-flex">
                        <div class="toast-body fw-semibold" id="toastMessage"></div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="$('#customToast').fadeOut()"></button>
                    </div>
                </div>
            `);
            $toast = $('#customToast');
        }
        $('#toastMessage').text(message);
        $toast.stop(true, true).fadeIn(300).delay(3000).fadeOut(400);
    };

    // Task 8: Copied to Clipboard Button
    $(document).on('click', '.copy-btn', function () {
        const $btn = $(this);
        const textToCopy = $btn.siblings('.copy-text').text().trim();

        const originalText = $btn.html();
        const showCopiedState = function () {
            $btn.html('✔ Copied!').addClass('btn-success').removeClass('btn-outline-primary btn-outline-secondary');
            showToast(QH.t("Copied link to clipboard!"));
            setTimeout(function () {
                $btn.html(originalText).removeClass('btn-success');
                if (originalText.toLowerCase().includes('copy')) {
                    $btn.addClass('btn-outline-primary');
                }
            }, 2000);
        };

        const fallbackCopy = function () {
            const $temp = $('<textarea>')
                .val(textToCopy)
                .attr({ 'aria-hidden': 'true', tabindex: '-1' })
                .css({ position: 'fixed', opacity: 0, left: '-9999px', top: '0' })
                .appendTo('body');
            $temp[0].focus();
            $temp[0].select();
            let copied = false;
            try {
                copied = document.execCommand('copy');
            } catch (error) {
                copied = false;
            }
            $temp.remove();
            if (copied) {
                showCopiedState();
            } else {
                showToast(QH.t("Copy failed. Please copy the link manually."));
            }
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(showCopiedState)
                .catch(fallbackCopy);
        } else {
            fallbackCopy();
        }
    });

    // Task 9: Image Lazy Loading
    function lazyLoadImages() {
        $('img.lazy-img').each(function () {
            const $img = $(this);
            const dataSrc = $img.attr('data-src');

            if (!dataSrc) return;
            if ($img.closest('.carousel-item').length && !$img.closest('.carousel-item').hasClass('active')) return;

            const imageTop = $img.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (imageTop < windowBottom + 150) {
                $img.attr('src', dataSrc).removeAttr('data-src').hide().fadeIn(500);
            }
        });
    }

    $(window).on('scroll resize', lazyLoadImages);
    $('#heritageCarousel').on('slid.bs.carousel', lazyLoadImages);
    lazyLoadImages();

    const suppliedPlacePhotos = [
        ['yasawi-mausoleum.jpg', 'Mausoleum of Khoja Ahmed Yasawi'], ['ancient-otrar.avif', 'Ancient City of Otrar'],
        ['arystan-bab-mausoleum.jpeg', 'Arystan Bab Mausoleum'], ['aisha-bibi-mausoleum.jpg', 'Aisha Bibi Mausoleum'],
        ['akyrtas-complex.jpg', 'Akyrtas Archaeological Complex'], ['berel-burial-mounds.jpg', 'Berel Burial Mounds'],
        ['lake-markakol.jpg', 'Lake Markakol'], ['kiin-kerish.jpg', 'Kiin-Kerish'], ['ulytau-region.jpg', 'Ulytau Historical Region'],
        ['alasha-khan-mausoleum.jpg', 'Alasha Khan Mausoleum'], ['tamgaly-petroglyphs.jpg', 'Tamgaly Petroglyphs'],
        ['karkaraly-national-park.jpg', 'Karkaraly National Park'], ['beket-ata-mosque.jpg', 'Beket Ata Underground Mosque'],
        ['bozzhyra-valley.jpg', 'Bozzhyra Valley'], ['mount-sherkala.jpg', 'Mount Sherkala'],
        ['burabay-national-park.jpg', 'Burabay National Park'], ['botai-settlement.jpg', 'Botai Archaeological Settlement'],
        ['charyn-canyon.jpg', 'Charyn Canyon'], ['kolsai-lakes.jpg', 'Kolsai Lakes'],
        ['singing-dune-altyn-emel.jpg', 'Singing Dune — Altyn-Emel']
    ];
    const placePhotoCollection = document.getElementById('placesPhotoCollection');
    if (placePhotoCollection) {
        suppliedPlacePhotos.forEach(([file, title]) => {
            const column = document.createElement('div');
            column.className = 'col heritage-card-item';
            column.innerHTML = `<figure class="card h-100 shadow-sm border-0 mb-0"><img src="images/map/${file}" class="card-img-top gallery-card-image" loading="lazy" alt="${title}"><figcaption class="card-footer bg-white text-center border-0 py-2"><small class="fw-semibold text-secondary">${title}</small></figcaption></figure>`;
            placePhotoCollection.appendChild(column);
        });
    }


    // ==========================================
    // Assignment 5 Core Features & Controls
    // ==========================================

    // Night Mode Theme Switcher with persistence across pages.
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const soundToggleBtn = document.getElementById('interfaceSoundsToggleBtn');
    const savedTheme = localStorage.getItem('qazaqHeritageTheme') || 'day';
    document.body.classList.toggle('night-theme', savedTheme === 'night');
    function updatePreferenceButtons() {
        const isNight = document.body.classList.contains('night-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<span class="qh-theme-icon" aria-hidden="true">${isNight ? '☀' : '☾'}</span>`;
            themeToggleBtn.setAttribute('aria-label', QH.t(isNight ? 'Switch to light theme' : 'Switch to dark theme'));
            themeToggleBtn.title = QH.t(isNight ? 'Switch to light theme' : 'Switch to dark theme');
            themeToggleBtn.setAttribute('aria-pressed', String(isNight));
        }
        if (soundToggleBtn) {
            const enabled = localStorage.getItem('qazaqHeritageSounds') === 'on';
            soundToggleBtn.innerHTML = `<span class="qh-sound-icon" aria-hidden="true">${enabled ? '🔊' : '🔇'}</span>`;
            soundToggleBtn.setAttribute('aria-label', QH.t(enabled ? 'Turn interface sounds off' : 'Turn interface sounds on'));
            soundToggleBtn.title = QH.t(enabled ? 'Turn interface sounds off' : 'Turn interface sounds on');
            soundToggleBtn.setAttribute('aria-pressed', String(enabled));
        }
    }
    updatePreferenceButtons();
    themeToggleBtn?.addEventListener('click', () => {
        const isNight = document.body.classList.toggle('night-theme');
        localStorage.setItem('qazaqHeritageTheme', isNight ? 'night' : 'day');
        updatePreferenceButtons();
    });
    soundToggleBtn?.addEventListener('click', () => {
        const enabled = localStorage.getItem('qazaqHeritageSounds') === 'on';
        localStorage.setItem('qazaqHeritageSounds', enabled ? 'off' : 'on');
        updatePreferenceButtons();
    });

    // FAQ Accordion Transition
    $('.faq-question').on('click', function () {
        const $item = $(this).closest('.faq-item');
        const $answer = $item.find('.faq-answer');

        if ($answer.length) {
            const isOpen = $(this).attr('aria-expanded') === 'true';

            $('.faq-question').attr('aria-expanded', 'false');
            $('.faq-answer').css({ 'max-height': '0px', 'opacity': '0' }).attr('aria-hidden', 'true');

            if (!isOpen) {
                $(this).attr('aria-expanded', 'true');
                $answer.attr('aria-hidden', 'false').css({
                    'max-height': $answer[0].scrollHeight + 'px',
                    'opacity': '1'
                });
            }
        }
    });

    // Subscription Modal Controls
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('subscriptionModal');

    function openModal() {
        if (!modalOverlay) return;
        modalOverlay.style.display = 'flex';
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.style.display = 'none';
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    if (openModalBtn && modalOverlay) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalOverlay.style.display === 'flex') closeModal();
        });
    }

    // Web Audio API Interface Click Sounds
    let interfaceAudioContext = null;

    document.addEventListener('click', (event) => {
        if (localStorage.getItem('qazaqHeritageSounds') !== 'on') return;
        const interactiveElement = event.target.closest('button, a, select, summary, input[type="checkbox"], input[type="radio"]');
        if (!interactiveElement || interactiveElement.id === 'interfaceSoundsToggleBtn' ||
            interactiveElement.id === 'soundEffectBtn' || interactiveElement.closest('.heritage-audio-player')) return;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!interfaceAudioContext) interfaceAudioContext = new AudioContextClass();

        const oscillator = interfaceAudioContext.createOscillator();
        const gain = interfaceAudioContext.createGain();

        oscillator.frequency.value = 520;
        oscillator.type = 'sine';
        gain.gain.setValueAtTime(0.04, interfaceAudioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, interfaceAudioContext.currentTime + 0.06);

        oscillator.connect(gain);
        gain.connect(interfaceAudioContext.destination);

        oscillator.start();
        oscillator.stop(interfaceAudioContext.currentTime + 0.06);
    });

    // Heritage Category Filtering
    const heritageItems = [
        { title: 'Khoja Ahmed Yasawi Mausoleum', category: 'architecture', image: 'images/yasawi.jpg', description: 'A landmark of medieval architecture in Turkistan.' },
        { title: 'Kazakh Yurt', category: 'traditions', image: 'images/yurt.jpg', description: 'A portable dwelling designed for a nomadic way of life.' },
        { title: 'Tamgaly Petroglyphs', category: 'history', image: 'images/tamgaly.jpg', description: 'Rock carvings that preserve traces of ancient life.' },
        { title: 'Burabay', category: 'nature', image: 'images/burabay.jpg', description: 'A landscape known for its lakes, forests, and rock formations.' },
        { title: 'Kazakh Traditions', category: 'traditions', image: 'images/kazakh_culture.jpg', description: 'Cultural practices passed between generations.' },
        { title: 'Katon-Karagay', category: 'nature', image: 'images/extra/katon-karagay.jpg', description: 'Mountain landscapes, forests, and lakes of eastern Kazakhstan.' },
        { title: 'Charyn Canyon', category: 'nature', image: 'images/extra/sharyn-canyon.jpg', description: 'A dramatic canyon shaped by natural erosion.' }
    ];

    const heritageFilter = document.getElementById('heritageFilter');
    const heritageResults = document.getElementById('heritageResults');

    function renderHeritageItems(items) {
        if (!heritageResults) return;
        heritageResults.innerHTML = '';
        items.forEach(item => {
            const cardHtml = `
                <div class="col heritage-card-item">
                    <article class="card heritage-result-card shadow-sm border-0 h-100">
                        <img src="${item.image}" class="card-img-top object-fit-cover" alt="${item.title}" style="height:200px;">
                        <div class="card-body">
                            <p class="small text-primary text-uppercase fw-bold mb-1">${QH.t(item.category)}</p>
                            <h5 class="card-title fw-bold">${QH.t(item.title)}</h5>
                            <p class="card-text text-muted small">${QH.t(item.description)}</p>
                        </div>
                    </article>
                </div>
            `;
            heritageResults.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    if (heritageFilter && heritageResults) {
        heritageFilter.addEventListener('change', () => {
            const cat = heritageFilter.value;
            const filtered = cat === 'all' ? heritageItems : heritageItems.filter(i => i.category === cat);
            renderHeritageItems(filtered);
        });
        renderHeritageItems(heritageItems);
    }

    // Gallery Interactive Thumbnails
    $('.heritage-thumbnail').on('click', function () {
        const newImg = $(this).attr('data-image');
        const caption = $(this).attr('data-caption');

        $('#featuredHeritageImage').attr('src', newImg).attr('alt', QH.t(caption));
        $('#featuredHeritageCaption').text(QH.t(caption));
        $('#imageExplorerStatus').text(`${QH.t('Showing')} ${QH.t(caption)}.`);

        $('.heritage-thumbnail').removeClass('is-selected').attr('aria-pressed', 'false');
        $(this).addClass('is-selected').attr('aria-pressed', 'true');
    });
    document.addEventListener('qh:languagechange', function () {
        const $selected = $('.heritage-thumbnail.is-selected');
        if (!$selected.length) return;
        const caption = $selected.attr('data-caption');
        $('#featuredHeritageImage').attr('alt', QH.t(caption));
        $('#featuredHeritageCaption').text(QH.t(caption));
        $('#imageExplorerStatus').text(`${QH.t('Showing')} ${QH.t(caption)}.`);
    });
    const $initialSelected = $('.heritage-thumbnail.is-selected');
    if ($initialSelected.length) {
        const initialCaption = $initialSelected.attr('data-caption');
        $('#featuredHeritageCaption').text(QH.t(initialCaption));
        $('#featuredHeritageImage').attr('alt', QH.t(initialCaption));
        $('#imageExplorerStatus').text(`${QH.t('Showing')} ${QH.t(initialCaption)}.`);
    }


    // Newsletter subscription demo: validates and stores subscribed email locally.
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', event => {
            event.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const status = document.getElementById('newsletterStatus');
            const email = emailInput.value.trim().toLowerCase();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                status.textContent = QH.t('Please enter a valid email address.');
                status.className = 'small mt-2 mb-0 text-warning';
                emailInput.focus();
                return;
            }
            if (!saveSubscription(email)) {
                status.textContent = QH.t('Subscription could not be saved in this browser.');
                status.className = 'small mt-2 mb-0 text-danger';
                return;
            }
            status.textContent = QH.t('You are subscribed in this browser demo. Thank you!');
            status.className = 'small mt-2 mb-0 text-success';
            newsletterForm.reset();
        });
    }

    // Reveal content as it enters the viewport.
    const revealTargets = document.querySelectorAll('main section, .faq-container, .newsletter-section, .profile-auth-card');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('qh-revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealTargets.forEach(element => {
            element.classList.add('qh-reveal');
            revealObserver.observe(element);
        });
    } else {
        revealTargets.forEach(element => element.classList.add('qh-revealed'));
    }
});
