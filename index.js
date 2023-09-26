// Constants and variables
const searchInput = document.getElementById('searchInput');
const resetButton = document.getElementById('resetButton');
const beerList = document.getElementById('beerList');
const pagination = document.getElementById('pagination');
const priceRangeSlider = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const srmSlider = document.getElementById('srmSlider');
const srmValue = document.getElementById('srmValue');
const phSlider = document.getElementById('phSlider');
const phValue = document.getElementById('phValue');

const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1; // Current page
let beerData = []; // Store the fetched beer data

// Default values for SRM and pH
let defaultSrmValue = 0;
let defaultPhValue = 0;

// Function to fetch and render beer data
async function fetchAndRenderBeers(page = 1) {
    const perPage = itemsPerPage;

    // Fetch the data for the current page
    const apiUrl = `https://api.punkapi.com/v2/beers?per_page=${perPage}&page=${page}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        beerData = await response.json();

        // Clear previous results
        beerList.innerHTML = '';

        // Render beer cards for the current page
        beerData.forEach((beer) => {
            const beerCard = document.createElement('div');
            beerCard.classList.add('beer-card');
            beerCard.innerHTML = `
                <img src="${beer.image_url}" alt="${beer.name}" class="beer-image">
                <h2>${beer.name}</h2>
                <p>First Brewed: ${beer.first_brewed}</p>
            `;
            beerList.appendChild(beerCard);
        });

        // Render pagination controls
        const totalItems = beerData.length;
        renderPagination(totalItems, page);

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to render pagination controls with a specific range of page numbers
function renderPagination(totalPages) {
    pagination.innerHTML = '';

    // Define the range of page numbers to display around the current page
    const pageRange = 7; // You can adjust this range as needed

    // Create "Previous" button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            fetchAndRenderBeers(currentPage);
            renderPagination(totalPages);
        });
        pagination.appendChild(prevButton);
    }

    // Create numeric page buttons
    for (let page = 1; page <= totalPages; page++) {
        if (
            page <= pageRange || // Display the first few pages
            page >= totalPages - pageRange + 1 || // Display the last few pages
            (page >= currentPage - pageRange && page <= currentPage + pageRange) // Display a range around the current page
        ) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;

            if (page === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                currentPage = page;
                fetchAndRenderBeers(currentPage);
                renderPagination(totalPages);
            });

            pagination.appendChild(pageButton);
        } else if (
            (page === pageRange + 1 && currentPage > pageRange + 1) || // Display ellipsis before the middle range
            (page === totalPages - pageRange && currentPage < totalPages - pageRange) // Display ellipsis after the middle range
        ) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }
}

// Function to filter beers based on sliders
function filterBeersBySliders(price, srm, ph) {
    return beerData.filter((beer) => {
        const beerPrice = parseFloat(beer.abv);
        const beerSrm = parseFloat(beer.srm);
        const beerPh = parseFloat(beer.ph);

        return (
            beerPrice <= price &&
            beerSrm >= srm &&
            beerPh >= ph
        );
    });
}

// Function to render beer cards
function renderBeerCards(data) {
    beerList.innerHTML = '';

    data.forEach((beer) => {
        const beerCard = document.createElement('div');
        beerCard.classList.add('beer-card');
        beerCard.innerHTML = `
            <img src="${beer.image_url}" alt="${beer.name}" class="beer-image">
            <h2>${beer.name}</h2>
            <p>First Brewed: ${beer.first_brewed}</p>
        `;
        beerList.appendChild(beerCard);
    });
}

// Event listener for search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const filteredData = beerData.filter((beer) => {
        return beer.name.toLowerCase().includes(query.toLowerCase());
    });
    renderBeerCards(filteredData);
    renderPagination(Math.ceil(filteredData.length / itemsPerPage));
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
    searchInput.value = '';
    priceRangeSlider.value = defaultSrmValue;
    srmSlider.value = defaultSrmValue;
    phSlider.value = defaultPhValue;
    priceValue.textContent = `$${defaultSrmValue.toFixed(2)}`;
    srmValue.textContent = defaultSrmValue.toFixed(1);
    phValue.textContent = defaultPhValue.toFixed(1);
    currentPage = 1; // Reset the current page to 1
    fetchAndRenderBeers(currentPage);
});

// Event listener for price range slider
priceRangeSlider.addEventListener('input', () => {
    const priceRange = parseFloat(priceRangeSlider.value);
    priceValue.textContent = `$${priceRange.toFixed(2)}`;
    const srm = parseFloat(srmSlider.value);
    const ph = parseFloat(phSlider.value);
    const filteredData = filterBeersBySliders(priceRange, srm, ph);
    renderBeerCards(filteredData);
    renderPagination(Math.ceil(filteredData.length / itemsPerPage));
});

// Event listener for SRM slider
srmSlider.addEventListener('input', () => {
    const srm = parseFloat(srmSlider.value);
    srmValue.textContent = srm.toFixed(1);
    const priceRange = parseFloat(priceRangeSlider.value);
    const ph = parseFloat(phSlider.value);
    const filteredData = filterBeersBySliders(priceRange, srm, ph);
    renderBeerCards(filteredData);
    renderPagination(Math.ceil(filteredData.length / itemsPerPage));
});

// Event listener for pH slider
phSlider.addEventListener('input', () => {
    const ph = parseFloat(phSlider.value);
    phValue.textContent = ph.toFixed(1);
    const priceRange = parseFloat(priceRangeSlider.value);
    const srm = parseFloat(srmSlider.value);
    const filteredData = filterBeersBySliders(priceRange, srm, ph);
    renderBeerCards(filteredData);
    renderPagination(Math.ceil(filteredData.length / itemsPerPage));
});

// Initial rendering of beers and pagination controls
fetchAndRenderBeers(currentPage);
