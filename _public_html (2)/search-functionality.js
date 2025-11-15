// ═══════════════════════════════════════════════════════════════════════
// SEARCH FUNCTIONALITY - Client-Side Search Engine
// ═══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  
  // Get URL parameters to find search query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q') || '';

  // Elements
  const mainSearchForm = document.getElementById('main-search-form');
  const mainSearchInput = document.getElementById('main-search-input');
  const headerSearchForm = document.getElementById('header-search-form');
  const headerSearchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  const noResultsDiv = document.getElementById('no-results');
  const resultCountSpan = document.getElementById('result-count');
  const searchQueryDisplay = document.getElementById('search-query-display');

  // Populate search input if there's a query
  if (searchQuery) {
    mainSearchInput.value = searchQuery;
    headerSearchInput.value = searchQuery;
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
      }
    });
  }

  // Header search form submission
  if (headerSearchForm) {
    headerSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = headerSearchInput.value.trim();
      if (query) {
        // Navigate to search results page
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // PERFORM SEARCH FUNCTION
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

  // DISPLAY RESULTS FUNCTION
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
          <img src="${article.image}" alt="${article.title}">
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
  }

  // HIGHLIGHT TEXT FUNCTION
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

  // CLEAR SEARCH FUNCTION (Optional - for UI improvements)
  window.clearSearch = function() {
    mainSearchInput.value = '';
    resultsContainer.innerHTML = '';
    noResultsDiv.style.display = 'block';
    resultCountSpan.textContent = '0';
    mainSearchInput.focus();
  };

});