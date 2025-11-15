// ═══════════════════════════════════════════════════════════════════════════
// DemandGenius Media - Complete Site-Wide Script
// Navigation, Search, Scroll-to-Top, and Search Results Handling
// Updated: 2025-11-15 19:29:45 UTC
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  
  // ═══════════════════════════════════════════════════════════════════════
  // ELEMENT SELECTORS (may not exist on every page)
  // ═══════════════════════════════════════════════════════════════════════
  
  const menuToggleButton = document.getElementById('menu-toggle-btn');
  const navLinks = document.getElementById('nav-links');
  const searchButtons = Array.from(document.querySelectorAll('.search-icon-btn'));
  const searchDropdown = document.getElementById('search-dropdown');
  const searchInput = document.getElementById('search-input');
  const searchForms = document.querySelectorAll('.search-form-full');
  const headerSearchForm = document.getElementById('header-search-form');
  const headerSearchInput = document.getElementById('search-input');

  // ═══════════════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════

  function isMobileViewport() {
    return window.innerWidth <= 992;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // NAVIGATION: Open / Close Helpers
  // ═══════════════════════════════════════════════════════════════════════

  function openNav() {
    if (!navLinks || !menuToggleButton) return;
    navLinks.classList.add('open');
    menuToggleButton.innerHTML = '✕';
    menuToggleButton.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    if (!navLinks || !menuToggleButton) return;
    navLinks.classList.remove('open');
    menuToggleButton.innerHTML = '☰';
    menuToggleButton.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    if (!navLinks || !menuToggleButton) return;
    const opening = !navLinks.classList.contains('open');
    if (opening) openNav(); else closeNav();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // NAVIGATION: Setup Menu Toggle
  // ═══════════════════════════════════════════════════════════════════════

  if (menuToggleButton && navLinks) {
    menuToggleButton.setAttribute('type', 'button');
    if (!menuToggleButton.hasAttribute('aria-expanded')) {
      menuToggleButton.setAttribute('aria-expanded', 'false');
    }
    menuToggleButton.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });
  }

  // Close nav when a nav link is clicked (on mobile)
  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      const target = e.target;
      if (target && target.tagName === 'A' && isMobileViewport()) {
        closeNav();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SEARCH: Open / Close Helpers
  // ═══════════════════════════════════════════════════════════════════════

  function openSearch() {
    if (!searchDropdown) return;
    searchDropdown.classList.add('open');
    searchDropdown.setAttribute('aria-hidden', 'false');
    if (searchInput) {
      // small timeout to ensure element is visible before focusing
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (!searchDropdown) return;
    searchDropdown.classList.remove('open');
    searchDropdown.setAttribute('aria-hidden', 'true');
  }

  function toggleSearch() {
    if (!searchDropdown) return;
    if (searchDropdown.classList.contains('open')) closeSearch(); else openSearch();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SEARCH: Setup Search Buttons
  // ═══════════════════════════════════════════════════════════════════════

  if (searchButtons.length) {
    searchButtons.forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleSearch();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SEARCH FORM: Handle Submissions
  // ═══════════════════════════════════════════════════════════════════════

  // Handle search form submissions (all .search-form-full elements)
  if (searchForms.length) {
    searchForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchInputField = form.querySelector('.search-input');
        if (searchInputField) {
          const query = searchInputField.value.trim();
          if (query) {
            // Close search dropdown before redirecting
            closeSearch();
            // Redirect to search results page with query parameter
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
          }
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CLICK OUTSIDE: Close Overlays (Nav & Search)
  // ═══════════════════════════════════════════════════════════════════════

  document.addEventListener('click', function (e) {
    const target = e.target;

    // Close search if clicked outside and it exists
    if (searchDropdown && searchDropdown.classList.contains('open')) {
      const clickedSearchToggle = searchButtons.some(b => b === target || b.contains(target));
      if (!searchDropdown.contains(target) && !clickedSearchToggle) {
        closeSearch();
      }
    }

    // Close mobile nav if clicked outside
    if (navLinks && navLinks.classList.contains('open') && isMobileViewport()) {
      if (menuToggleButton !== target && !navLinks.contains(target)) {
        closeNav();
      }
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // KEYBOARD: Escape Key Closes Overlays
  // ═══════════════════════════════════════════════════════════════════════

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeSearch();
      closeNav();
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // WINDOW RESIZE: Close Mobile Nav on Desktop
  // ═══════════════════════════════════════════════════════════════════════

  window.addEventListener('resize', function () {
    if (window.innerWidth > 992) {
      closeNav();
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // SCROLL-TO-TOP BUTTON FUNCTIONALITY
  // ═══════════════════════════════════════════════════════════════════════

  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top-btn';
  document.body.appendChild(scrollToTopBtn);

  // Show/hide button on scroll
  window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on button click
  scrollToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // ACCESSIBILITY: Focus Management
  // ═══════════════════════════════════════════════════════════════════════

  // Trap focus within search dropdown when open
  if (searchDropdown) {
    searchDropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && searchDropdown.classList.contains('open')) {
        const focusableElements = searchDropdown.querySelectorAll('input, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }

});

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH RESULTS PAGE - Search Logic
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  
  // Only run this on search results page
  if (!document.getElementById('main-search-form')) {
    return;
  }

  // Get URL parameters to find search query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q') || '';

  // Elements
  const mainSearchForm = document.getElementById('main-search-form');
  const mainSearchInput = document.getElementById('main-search-input');
  const resultsContainer = document.getElementById('results-container');
  const noResultsDiv = document.getElementById('no-results');
  const resultCountSpan = document.getElementById('result-count');
  const searchQueryDisplay = document.getElementById('search-query-display');

  // Populate search input if there's a query
  if (searchQuery) {
    mainSearchInput.value = searchQuery;
    performSearch(searchQuery);
  }

  // Main search form submission
  if (mainSearchForm) {
    mainSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = mainSearchInput.value.trim();
      if (query) {
        // Update URL with search query
        window.history.pushState({}, '', `search-results.html?q=${encodeURIComponent(query)}`);
        performSearch(query);
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PERFORM SEARCH FUNCTION
  // ═══════════════════════════════════════════════════════════════════════

  function performSearch(query) {
    if (!query) {
      resultsContainer.innerHTML = '';
      noResultsDiv.style.display = 'block';
      resultCountSpan.textContent = '0';
      return;
    }

    // Update display
    searchQueryDisplay.textContent = query;

    // Normalize search query (lowercase, trim spaces)
    const normalizedQuery = query.toLowerCase().trim();

    // Check if search database exists
    if (typeof searchDatabase === 'undefined') {
      console.error('Search database not loaded. Make sure search-data.js is included.');
      noResultsDiv.style.display = 'block';
      return;
    }

    // Search through database
    const results = searchDatabase.filter(article => {
      const searchableText = `
        ${article.title.toLowerCase()} 
        ${article.category.toLowerCase()} 
        ${article.excerpt.toLowerCase()} 
        ${article.description.toLowerCase()} 
        ${article.tags.join(' ').toLowerCase()} 
        ${article.searchKeywords.join(' ').toLowerCase()}
      `;

      // Split query into words and check if any match
      const queryWords = normalizedQuery.split(/\s+/);
      return queryWords.some(word => searchableText.includes(word));
    });

    // Display results
    displayResults(results, query);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DISPLAY RESULTS FUNCTION
  // ═══════════════════════════════════════════════════════════════════════

  function displayResults(results, query) {
    resultCountSpan.textContent = results.length;

    if (results.length === 0) {
      resultsContainer.innerHTML = '';
      noResultsDiv.style.display = 'block';
      return;
    }

    noResultsDiv.style.display = 'none';
    resultsContainer.innerHTML = '';

    results.forEach((article, index) => {
      // Highlight matching text in title
      const highlightedTitle = highlightText(article.title, query);
      
      const resultCard = document.createElement('a');
      resultCard.href = article.url;
      resultCard.className = 'search-result-card';
      resultCard.style.textDecoration = 'none';
      resultCard.style.color = 'inherit';

      resultCard.innerHTML = `
        <div class="result-image">
          <img src="${article.image}" alt="${article.title}" loading="lazy">
        </div>
        <div class="result-content">
          <span class="result-category">${article.categoryEmoji} ${article.category}</span>
          <h3 class="result-title">${highlightedTitle}</h3>
          <p class="result-excerpt">${article.excerpt}</p>
          <div class="result-meta">
            <span class="result-date">📅 ${article.date}</span>
            <span class="result-link">Read More →</span>
          </div>
        </div>
      `;

      resultsContainer.appendChild(resultCard);
    });

    // Add animation to results
    const resultCards = resultsContainer.querySelectorAll('.search-result-card');
    resultCards.forEach((card, index) => {
      card.style.animation = `slideInUp 0.5s ease-out ${index * 0.1}s backwards`;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // HIGHLIGHT TEXT FUNCTION
  // ═══════════════════════════════════════════════════════════════════════

  function highlightText(text, query) {
    const words = query.split(/\s+/);
    let highlighted = text;

    words.forEach(word => {
      if (word) {
        const regex = new RegExp(`(${word})`, 'gi');
        highlighted = highlighted.replace(regex, '<strong style="color: var(--accent-color);">$1</strong>');
      }
    });

    return highlighted;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CLEAR SEARCH FUNCTION (Optional - for UI improvements)
  // ═══════════════════════════════════════════════════════════════════════

  window.clearSearch = function() {
    if (mainSearchInput) {
      mainSearchInput.value = '';
    }
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
    if (noResultsDiv) {
      noResultsDiv.style.display = 'block';
    }
    if (resultCountSpan) {
      resultCountSpan.textContent = '0';
    }
    if (mainSearchInput) {
      mainSearchInput.focus();
    }
  };

});

// ═══════════════════════════════════════════════════════════════════════════
// SHARE FUNCTIONALITY FOR ARTICLE PAGES
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  
  // Only run on article pages
  const linkedinShareBtn = document.getElementById('linkedin-share');
  const twitterShareBtn = document.getElementById('twitter-share');
  const copyLinkBtn = document.getElementById('copy-link-btn');

  if (linkedinShareBtn || twitterShareBtn || copyLinkBtn) {
    const articleUrl = window.location.href;
    const articleTitle = document.querySelector('h1')?.textContent || 'Check out this article';

    // LinkedIn Share
    if (linkedinShareBtn) {
      linkedinShareBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    }

    // Twitter Share
    if (twitterShareBtn) {
      twitterShareBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}&via=DemandGeniusMedia`;
    }

    // Copy Link to Clipboard
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(articleUrl).then(() => {
          const originalText = copyLinkBtn.textContent;
          copyLinkBtn.textContent = '✓ Copied!';
          copyLinkBtn.style.background = 'var(--success-color)';
          
          setTimeout(() => {
            copyLinkBtn.textContent = originalText;
            copyLinkBtn.style.background = '';
          }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = articleUrl;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          copyLinkBtn.textContent = '✓ Copied!';
          setTimeout(() => {
            copyLinkBtn.textContent = '📋 Copy';
          }, 2000);
        });
      });
    }
  }

});

// ═══════════════════════════════════════════════════════════════════════════
// END OF SCRIPT.JS
// ═══════════════════════════════════════════════════════════════════════════