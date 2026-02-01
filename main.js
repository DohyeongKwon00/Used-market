const products = [
  {
    id: 1,
    title: "iPhone 14 Pro 256GB Deep Purple — excellent condition",
    price: 580,
    location: "Downtown",
    time: "3 hours ago",
    image: "https://picsum.photos/seed/phone1/400/400",
    likes: 12,
    category: "electronics",
  },
  {
    id: 2,
    title: "IKEA KALLAX shelf unit, white, barely used",
    price: 45,
    location: "College Hills",
    time: "5 hours ago",
    image: "https://picsum.photos/seed/shelf1/400/400",
    likes: 8,
    category: "furniture",
  },
  {
    id: 3,
    title: "Nike Air Max 90 size 10",
    price: 55,
    location: "Lake View",
    time: "1 day ago",
    image: "https://picsum.photos/seed/shoes1/400/400",
    likes: 23,
    category: "clothing",
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 wireless headphones",
    price: 175,
    location: "Bluffs",
    time: "2 hours ago",
    image: "https://picsum.photos/seed/headphones1/400/400",
    likes: 31,
    category: "electronics",
  },
  {
    id: 5,
    title: "Camping chair, foldable, lightweight",
    price: 25,
    location: "Santa Rita",
    time: "6 hours ago",
    image: "https://picsum.photos/seed/camp1/400/400",
    likes: 5,
    category: "sports",
  },
  {
    id: 6,
    title: "Harry Potter complete box set (hardcover)",
    price: 35,
    location: "Southland",
    time: "1 day ago",
    image: "https://picsum.photos/seed/books1/400/400",
    likes: 17,
    category: "books",
  },
  {
    id: 7,
    title: "Wooden dining table, seats 4",
    price: 120,
    location: "Rio Vista",
    time: "3 days ago",
    image: "https://picsum.photos/seed/table1/400/400",
    likes: 9,
    category: "furniture",
  },
  {
    id: 8,
    title: "Bialetti Moka Express 6-cup",
    price: 28,
    location: "Fort Concho",
    time: "4 hours ago",
    image: "https://picsum.photos/seed/coffee1/400/400",
    likes: 14,
    category: "kitchen",
  },
  {
    id: 9,
    title: "Patagonia fleece jacket, size M, navy",
    price: 60,
    location: "Lake View",
    time: "2 days ago",
    image: "https://picsum.photos/seed/jacket1/400/400",
    likes: 20,
    category: "clothing",
  },
  {
    id: 10,
    title: "LEGO Technic Porsche 911 GT3 RS",
    price: 95,
    location: "College Hills",
    time: "7 hours ago",
    image: "https://picsum.photos/seed/lego1/400/400",
    likes: 42,
    category: "toys",
  },
  {
    id: 11,
    title: "Samsung Galaxy Tab S9 128GB Wi-Fi",
    price: 350,
    location: "Bluffs",
    time: "1 day ago",
    image: "https://picsum.photos/seed/tablet1/400/400",
    likes: 15,
    category: "electronics",
  },
  {
    id: 12,
    title: "Yoga mat, 6mm thick, mint green",
    price: 15,
    location: "Downtown",
    time: "5 hours ago",
    image: "https://picsum.photos/seed/yoga1/400/400",
    likes: 7,
    category: "sports",
  },
];

// State
let activeCategory = "all";
let selectedLocations = new Set(["all"]);
let searchQuery = "";
let activePopularTag = null;
const likedSet = new Set();

// DOM references
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const locationList = document.getElementById("locationList");
const locationCheckboxes = locationList.querySelectorAll('input[type="checkbox"]');
const allCheckbox = locationList.querySelector('input[value="all"]');
const categoryList = document.getElementById("categoryList");
const popularTags = document.querySelectorAll(".popular-tag");

// Format price as USD
function formatPrice(n) {
  return "$" + n.toLocaleString("en-US");
}

// Heart SVG (outline or filled)
function heartSVG(filled) {
  return filled
    ? '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>';
}

// Render product cards
function render() {
  const filtered = products.filter((p) => {
    const matchCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchLocation =
      selectedLocations.has("all") || selectedLocations.has(p.location);
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchLocation && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">No products found.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map((p) => {
      const liked = likedSet.has(p.id);
      const likeCount = p.likes + (liked ? 1 : 0);
      return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product-info">
          <p class="product-title">${p.title}</p>
          <p class="product-meta">${p.location} \u00B7 ${p.time}</p>
          <p class="product-price">${formatPrice(p.price)}</p>
          <div class="product-bottom">
            <button class="like-btn${liked ? " liked" : ""}" data-id="${p.id}" aria-label="Like">
              ${heartSVG(liked)}
              <span>${likeCount}</span>
            </button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

// Category selection (radio buttons in sidebar)
categoryList.addEventListener("change", (e) => {
  const radio = e.target;
  if (!radio.matches('input[type="radio"]')) return;
  activeCategory = radio.value;
  render();
});

// Location checklist logic
locationList.addEventListener("change", (e) => {
  const checkbox = e.target;
  if (!checkbox.matches('input[type="checkbox"]')) return;

  const value = checkbox.value;

  if (value === "all") {
    if (checkbox.checked) {
      locationCheckboxes.forEach((cb) => {
        cb.checked = cb.value === "all";
      });
      selectedLocations.clear();
      selectedLocations.add("all");
    } else {
      checkbox.checked = true;
    }
  } else {
    if (checkbox.checked) {
      allCheckbox.checked = false;
      selectedLocations.delete("all");
      selectedLocations.add(value);
    } else {
      selectedLocations.delete(value);
      if (selectedLocations.size === 0) {
        allCheckbox.checked = true;
        selectedLocations.add("all");
      }
    }
  }

  render();
});

// Popular search tags
popularTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    const query = tag.dataset.query;

    if (activePopularTag === tag) {
      // Clicking the same tag again deactivates it
      tag.classList.remove("active");
      activePopularTag = null;
      searchQuery = "";
      searchInput.value = "";
    } else {
      // Deactivate previous tag
      if (activePopularTag) activePopularTag.classList.remove("active");
      tag.classList.add("active");
      activePopularTag = tag;
      searchQuery = query;
      searchInput.value = query;
    }

    render();
  });
});

// Search input
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;

  // Clear active popular tag if user types manually
  if (activePopularTag) {
    activePopularTag.classList.remove("active");
    activePopularTag = null;
  }

  render();
});

// Search submit button
document.getElementById("searchSubmitBtn").addEventListener("click", () => {
  searchQuery = searchInput.value;
  if (activePopularTag) {
    activePopularTag.classList.remove("active");
    activePopularTag = null;
  }
  render();
});

// Like button delegation
grid.addEventListener("click", (e) => {
  const likeBtn = e.target.closest(".like-btn");
  if (!likeBtn) return;
  e.stopPropagation();
  const id = Number(likeBtn.dataset.id);
  if (likedSet.has(id)) {
    likedSet.delete(id);
  } else {
    likedSet.add(id);
  }
  render();
});

// Collapsible sidebar sections on mobile
function initMobileCollapse() {
  const sections = document.querySelectorAll(".sidebar-section");
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  sections.forEach((section) => {
    if (isMobile()) section.classList.add("collapsed");

    section.querySelector(".sidebar-title").addEventListener("click", () => {
      if (!isMobile()) return;
      section.classList.toggle("collapsed");
    });
  });

  window.matchMedia("(max-width: 767px)").addEventListener("change", (e) => {
    sections.forEach((section) => {
      if (e.matches) {
        section.classList.add("collapsed");
      } else {
        section.classList.remove("collapsed");
      }
    });
  });
}

initMobileCollapse();

// Initial render
render();
