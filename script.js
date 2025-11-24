// === CONFIG ===
const EVENTS_SHEET_ID = "1SB6DbErUBuBScXJSsnO1RFTq5-PqdADIqZ-5zCdpyq8";
const EVENTS_SHEET_NAME = "SAT";

// Store data globally for filtering
let allEvents = [];
let allCompetitions = [];
let allComserv = [];

// Helper to construct the API URL
function getSheetUrl(sheetId, sheetName) {
  return `https://opensheet.elk.sh/${sheetId}/${sheetName}`;
}

function createOutlookLink(title, dateStr, timeStr, location, desc) {
  // Simple helper to create an Outlook calendar link
  // Note: Parsing arbitrary date strings can be tricky. 
  // This is a basic implementation assuming a standard format or just passing strings.
  // For a robust solution, you'd need a date parsing library.
  
  const subject = encodeURIComponent(title);
  const body = encodeURIComponent(`Register here: ${desc}`);
  const loc = encodeURIComponent(location);
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${subject}&body=${body}&location=${loc}`;
}

// === FETCH & DISPLAY EVENTS (SAT Points) ===
async function loadEvents() {
  const list = document.getElementById("event-list");
  if (!list) return;

  // Show Loading
  list.innerHTML = `
    <li class="loading-state">
      <div class="spinner"></div>
      <p>Loading seminars...</p>
    </li>
  `;

  try {
    const res = await fetch(getSheetUrl(EVENTS_SHEET_ID, EVENTS_SHEET_NAME));
    if (!res.ok) throw new Error("Failed to fetch events");
    allEvents = await res.json();
    displayEvents(allEvents, list);
    setupFilters(allEvents, displayEvents, list, ['title', 'date', 'location']); 
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">Failed to load events.</p>`;
  }
}

function displayEvents(items, list) {
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">No events found matching your criteria.</p>`;
    return;
  }

  items.forEach(event => {
    // API returns lowercase keys
    const title = event['title'] || "Untitled Event";
    const date = event['date'] || "TBA";
    const time = event['start'] || "";
    const location = event['location'] || "Online/TBA";
    const link = event['link'] || "#";
    const image = event['image'] || '/assets/logo.png';

    const li = document.createElement("li");
    li.className = "post";
    li.innerHTML = `
      <div class="image-box">
        <img src="${image}" alt="${title}">
      </div>
      <div class="info-box">
        <h2 class="post-title">${title}</h2>
        <p><strong>Date:</strong> ${date} ${time}</p>
        <p><strong>Location:</strong> ${location}</p>
        <div class="flex flex-wrap gap-2 mt-2">
           <a href="${link}" target="_blank" class="btn">Register / Detail</a>
           <a href="${createOutlookLink(title, date, time, location, link)}" target="_blank" class="btn" style="background-color:#28a745;">Add to Outlook</a>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

// === FETCH & DISPLAY COMPETITIONS (New Page) ===
async function loadCompetitions() {
  const list = document.getElementById("competition-list");
  if (!list) return;

  // Show Loading
  list.innerHTML = `
    <li class="loading-state">
      <div class="spinner"></div>
      <p>Loading competitions...</p>
    </li>
  `;

  // Use the SAME sheet ID as events, but different tab name
  const url = getSheetUrl(EVENTS_SHEET_ID, "COMP");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch competitions");
    allCompetitions = await res.json();
    displayCompetitions(allCompetitions, list);
    setupFilters(allCompetitions, displayCompetitions, list, ['Nama Lomba', 'Tanggal', 'Tingkat']);
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">Failed to load competitions.</p>`;
  }
}

function displayCompetitions(items, list) {
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">No competitions found matching your criteria.</p>`;
    return;
  }

  items.forEach(item => {
    // Mapping based on the "COMP" tab columns
    const title = item['Nama Lomba'] || "Untitled Competition";
    const date = item['Tanggal'] || "TBA";
    const level = item['Tingkat'] || "Nasional";
    const link = item['Link'] || "#";
    
    const li = document.createElement("li");
    li.className = "post";
    li.innerHTML = `
      <div class="info-box">
        <h2 class="post-title">${title}</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Level:</strong> ${level}</p>
        <a href="${link}" target="_blank" class="btn">Register / Info</a>
      </div>
    `;
    list.appendChild(li);
  });
}

// === FETCH & DISPLAY COMMUNITY SERVICE (New Page) ===
async function loadCommunityService() {
  const list = document.getElementById("comserv-list");
  if (!list) return;

  // Show Loading
  list.innerHTML = `
    <li class="loading-state">
      <div class="spinner"></div>
      <p>Loading community service...</p>
    </li>
  `;

  // Use the SAME sheet ID as events, but different tab name
  const url = getSheetUrl(EVENTS_SHEET_ID, "TFI");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch community service");
    allComserv = await res.json();
    displayCommunityService(allComserv, list);
    setupFilters(allComserv, displayCommunityService, list, ['Title', 'Nama Kegiatan', 'Date', 'Tanggal', 'Location', 'Lokasi']);
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">Failed to load community service.</p>`;
  }
}

function displayCommunityService(items, list) {
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">No community service events found matching your criteria.</p>`;
    return;
  }

  items.forEach(item => {
    // Adjust these keys based on your TFI tab columns
    const title = item['Title'] || item['Nama Kegiatan'] || "Untitled Activity";
    const date = item['Date'] || item['Tanggal'] || "TBA";
    const location = item['Location'] || item['Lokasi'] || "Malang";
    const image = item['Image'] || "https://binus.ac.id/malang/wp-content/uploads/2020/10/Teach-For-Indonesia-BINUS-University-Malang-1.jpg";

    const li = document.createElement("li");
    li.className = "post";
    li.innerHTML = `
      <div class="image-box">
        <img src="${image}" alt="${title}">
      </div>
      <div class="info-box">
        <h2 class="post-title">${title}</h2>
        <p>${date} • ${location}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <a href="#" class="btn">Learn More</a>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

// === FILTER LOGIC ===
function setupFilters(data, renderFn, listElement, searchFields) {
  const searchInput = document.getElementById('search-input');
  const monthSelect = document.getElementById('month-filter');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterAndRender(data, renderFn, listElement, searchFields);
    });
  }

  if (monthSelect) {
    monthSelect.addEventListener('change', () => {
      filterAndRender(data, renderFn, listElement, searchFields);
    });
  }
}

function filterAndRender(data, renderFn, listElement, searchFields) {
  const searchInput = document.getElementById('search-input');
  const monthSelect = document.getElementById('month-filter');

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedMonth = monthSelect ? monthSelect.value : "";

  const filtered = data.filter(item => {
    // 1. Search Filter
    let matchesSearch = false;
    if (searchTerm === "") {
      matchesSearch = true;
    } else {
      // Check if any of the specified fields contain the search term
      for (const field of searchFields) {
        if (item[field] && String(item[field]).toLowerCase().includes(searchTerm)) {
          matchesSearch = true;
          break;
        }
      }
    }

    // 2. Month Filter
    let matchesMonth = false;
    if (selectedMonth === "") {
      matchesMonth = true;
    } else {
      // Try to find a date field (lowercase or uppercase)
      const dateStr = item['date'] || item['Date'] || item['Tanggal'] || "";
      if (dateStr && String(dateStr).includes(selectedMonth)) {
        matchesMonth = true;
      }
    }

    return matchesSearch && matchesMonth;
  });

  renderFn(filtered, listElement);
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  loadCompetitions();
  loadCommunityService();
});

// === LANGUAGE SWITCHER ===
let currentLang = 'en';
const translations = {
  en: {
    "nav.home": "Home",
    "nav.seminar": "Seminar",
    "nav.competitions": "Competitions",
    "nav.comserv": "Community Service",
    "hero.title": "Welcome to BINUS Event Finder",
    "hero.desc": "Your one-stop hub for discovering seminars, competitions, and community service opportunities at BINUS University.",
    "hero.btn": "Explore All Events",
    "cat.seminar.title": "Seminar & SAT",
    "cat.seminar.desc": "Earn SAT points by attending seminars, workshops, and academic events.",
    "cat.seminar.btn": "View Seminars",
    "cat.comp.title": "Competitions",
    "cat.comp.desc": "Challenge yourself and win prizes in national and international competitions.",
    "cat.comp.btn": "View Competitions",
    "cat.comserv.title": "Community Service",
    "cat.comserv.desc": "Give back to the community and join volunteer programs like Teach For Indonesia.",
    "cat.comserv.btn": "View Activities",
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How do I register for an event?",
    "faq.a1": "Click on the \"Detail\" or \"Register\" button on any event card. This will take you to the official registration page or provide further instructions.",
    "faq.q2": "What are SAT points?",
    "faq.a2": "Student Activity Transcript (SAT) points are required for graduation. You can earn them by attending seminars, workshops, and participating in student organizations.",
    "faq.q3": "How can I submit my own event?",
    "faq.a3": "Currently, event submissions are managed by the student council and university administration. Please contact the Student Affairs department for more info.",
    "faq.q4": "Are these events open to the public?",
    "faq.a4": "Most events are exclusive to BINUS students, but some seminars and competitions may be open to the public. Check the specific event details for eligibility.",
    "page.seminar.title": "Seminar & SAT Points",
    "page.seminar.desc": "Find and explore upcoming BINUS seminars and SAT point activities",
    "page.comp.title": "Informasi Lomba 2025",
    "page.comp.desc": "Daftar lomba dan kompetisi terbaru untuk mahasiswa BINUS",
    "page.comserv.title": "Community Service",
    "page.comserv.desc": "Volunteer and make an impact with BINUS Community Service programs",
    "filter.search.seminar": "Search seminars...",
    "filter.search.comp": "Search competitions...",
    "filter.search.comserv": "Search activities...",
    "filter.month.all": "All Months",
    "loading.seminar": "Loading seminars...",
    "loading.comp": "Loading competitions...",
    "loading.comserv": "Loading community service...",
    "empty.seminar": "No events found matching your criteria.",
    "empty.comp": "No competitions found matching your criteria.",
    "empty.comserv": "No community service events found matching your criteria."
  },
  id: {
    "nav.home": "Beranda",
    "nav.seminar": "Seminar",
    "nav.competitions": "Lomba",
    "nav.comserv": "Pengabdian Masyarakat",
    "hero.title": "Selamat Datang di BINUS Event Finder",
    "hero.desc": "Pusat informasi untuk menemukan seminar, lomba, dan kegiatan pengabdian masyarakat di BINUS University.",
    "hero.btn": "Jelajahi Semua Acara",
    "cat.seminar.title": "Seminar & SAT",
    "cat.seminar.desc": "Dapatkan poin SAT dengan mengikuti seminar, workshop, dan kegiatan akademik.",
    "cat.seminar.btn": "Lihat Seminar",
    "cat.comp.title": "Lomba",
    "cat.comp.desc": "Tantang dirimu dan menangkan hadiah dalam kompetisi nasional dan internasional.",
    "cat.comp.btn": "Lihat Lomba",
    "cat.comserv.title": "Pengabdian Masyarakat",
    "cat.comserv.desc": "Berkontribusi pada masyarakat dan bergabunglah dengan program sukarelawan seperti Teach For Indonesia.",
    "cat.comserv.btn": "Lihat Kegiatan",
    "faq.title": "Pertanyaan yang Sering Diajukan",
    "faq.q1": "Bagaimana cara mendaftar acara?",
    "faq.a1": "Klik tombol \"Detail\" atau \"Register\" pada kartu acara. Ini akan membawamu ke halaman pendaftaran resmi atau memberikan instruksi lebih lanjut.",
    "faq.q2": "Apa itu poin SAT?",
    "faq.a2": "Poin Student Activity Transcript (SAT) diperlukan untuk kelulusan. Kamu bisa mendapatkannya dengan mengikuti seminar, workshop, dan berpartisipasi dalam organisasi kemahasiswaan.",
    "faq.q3": "Bagaimana cara mengajukan acara sendiri?",
    "faq.a3": "Saat ini, pengajuan acara dikelola oleh organisasi kemahasiswaan dan administrasi universitas. Silakan hubungi bagian Student Affairs untuk info lebih lanjut.",
    "faq.q4": "Apakah acara ini terbuka untuk umum?",
    "faq.a4": "Sebagian besar acara khusus untuk mahasiswa BINUS, tetapi beberapa seminar dan lomba mungkin terbuka untuk umum. Cek detail acara untuk kelayakan.",
    "page.seminar.title": "Seminar & Poin SAT",
    "page.seminar.desc": "Temukan dan jelajahi seminar BINUS dan kegiatan poin SAT mendatang",
    "page.comp.title": "Informasi Lomba 2025",
    "page.comp.desc": "Daftar lomba dan kompetisi terbaru untuk mahasiswa BINUS",
    "page.comserv.title": "Pengabdian Masyarakat",
    "page.comserv.desc": "Jadilah sukarelawan dan buat dampak dengan program Pengabdian Masyarakat BINUS",
    "filter.search.seminar": "Cari seminar...",
    "filter.search.comp": "Cari lomba...",
    "filter.search.comserv": "Cari kegiatan...",
    "filter.month.all": "Semua Bulan",
    "loading.seminar": "Memuat seminar...",
    "loading.comp": "Memuat lomba...",
    "loading.comserv": "Memuat kegiatan...",
    "empty.seminar": "Tidak ada acara yang ditemukan sesuai kriteria.",
    "empty.comp": "Tidak ada lomba yang ditemukan sesuai kriteria.",
    "empty.comserv": "Tidak ada kegiatan yang ditemukan sesuai kriteria."
  }
};

function setLanguage(lang) {
  currentLang = lang;
  updateLanguage();
  updateLanguageButtons();
}

function updateLanguageButtons() {
  const enBtns = document.querySelectorAll('.lang-btn[data-lang="en"]');
  const idBtns = document.querySelectorAll('.lang-btn[data-lang="id"]');

  enBtns.forEach(btn => {
    if (currentLang === 'en') btn.classList.add('active');
    else btn.classList.remove('active');
  });

  idBtns.forEach(btn => {
    if (currentLang === 'id') btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function updateLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
        el.placeholder = translations[currentLang][key];
      } else {
        el.innerText = translations[currentLang][key];
      }
    }
  });

  // Update dynamic content messages if needed (re-render lists)
  if (allEvents.length > 0) displayEvents(allEvents, document.getElementById("event-list"));
  if (allCompetitions.length > 0) displayCompetitions(allCompetitions, document.getElementById("competition-list"));
  if (allComserv.length > 0) displayCommunityService(allComserv, document.getElementById("comserv-list"));
}

// Initialize language buttons on load
document.addEventListener("DOMContentLoaded", () => {
  updateLanguageButtons();
});
