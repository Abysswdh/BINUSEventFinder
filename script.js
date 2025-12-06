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
    setupFilters(allEvents, displayEvents, list, ['title', 'Title', 'date', 'Date', 'location', 'Location']); 
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
    const image = event['image'] || 'assets/logo.png';

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
    // Include fields relevant for Search AND Topic filtering
    const searchFields = [
      'nama lomba', 'Nama Lomba', 
      'bidang umum', 'Bidang Umum', 
      'cabang', 'Cabang', 
      'level', 'Level',
      'lokasi', 'Lokasi'
    ];
    setupFilters(allCompetitions, displayCompetitions, list, searchFields);
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
    // Map to actual Google Sheet columns
    const title = item['nama lomba'] || item['Nama Lomba'] || "Untitled Competition";
    const field = item['bidang umum'] || item['Bidang Umum'] || "";
    const category = item['cabang'] || item['Cabang'] || "";
    const month = item['bulan pelaksanaan'] || item['Bulan Pelaksanaan'] || "TBA";
    const level = item['level'] || item['Level'] || "Nasional";
    const status = item['status pendaftaran'] || item['Status Pendaftaran'] || "";
    const location = item['lokasi'] || item['Lokasi'] || "";
    const link = item['link'] || item['Link'] || "#";
    
    // Level badge color
    let levelColor = '#004b8d';
    if (level.toLowerCase().includes('internasional') || level.toLowerCase().includes('international')) {
      levelColor = '#d4af37';
    } else if (level.toLowerCase().includes('nasional') || level.toLowerCase().includes('national')) {
      levelColor = '#0066cc';
    } else if (level.toLowerCase().includes('regional')) {
      levelColor = '#28a745';
    }
    
    // Status badge
    let statusBadge = '';
    if (status.toLowerCase().includes('buka') || status.toLowerCase().includes('open')) {
      statusBadge = '<span class="free-badge">OPEN</span>';
    } else if (status.toLowerCase().includes('tutup') || status.toLowerCase().includes('closed')) {
      statusBadge = '<span class="status-closed">CLOSED</span>';
    }
    
    const li = document.createElement("li");
    li.className = "post competition-card";
    li.innerHTML = `
      <div class="competition-content">
        <div class="competition-header">
          <h2 class="post-title">${title}</h2>
          <span class="level-badge" style="background:${levelColor}">${level}</span>
        </div>
        
        <div class="competition-details">
          ${field ? `<div class="detail-item"><span class="detail-icon">🎯</span><span>${field}</span></div>` : ''}
          ${category ? `<div class="detail-item"><span class="detail-icon">📂</span><span>${category}</span></div>` : ''}
          <div class="detail-item"><span class="detail-icon">📅</span><span>${month}</span></div>
          ${location ? `<div class="detail-item"><span class="detail-icon">📍</span><span>${location}</span></div>` : ''}
        </div>
        
        <div class="competition-actions">
          <a href="${link}" target="_blank" class="btn btn-primary">View Details</a>
          ${statusBadge}
        </div>
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
    const searchFields = [
      'Title', 'title', 
      'Nama Kegiatan', 'nama kegiatan', 
      'Location', 'location', 
      'Lokasi', 'lokasi'
    ];
    setupFilters(allComserv, displayCommunityService, list, searchFields);
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
// === FILTER LOGIC ===
const TOPIC_KEYWORDS = {
  "Technology": ["computer", "science", "tech", "coding", "data", "ai", "cyber", "software", "it", "information"],
  "Business": ["business", "management", "marketing", "finance", "accounting", "entrepreneur", "startup", "ibe"],
  "Design": ["design", "art", "creative", "fashion", "media", "visual", "dkv", "film"],
  "Engineering": ["engineering", "robotics", "civil", "industrial", "architecture", "mechanic"],
  "Communication": ["communication", "public relations", "journalism", "broadcasting"]
};

function setupFilters(data, renderFn, listElement, searchFields) {
  const searchInput = document.getElementById('search-input');
  const topicSelect = document.getElementById('topic-filter');
  const locationCheckboxes = document.querySelectorAll('#location-filters input[type="checkbox"]');
  const dateSlider = document.getElementById('date-slider');
  const monthSlider = document.getElementById('month-slider');
  const sortSelect = document.getElementById('sort-filter');
  
  // 1. Date Slider (Seminars - Next X Days)
  if (dateSlider) {
    const daysDisplay = document.getElementById('days-display');
    const rangeText = document.getElementById('date-range-text');
    
    dateSlider.addEventListener('input', (e) => {
      const days = e.target.value;
      if (daysDisplay) daysDisplay.innerText = days;
      if (rangeText) rangeText.innerText = `Next ${days} days`;
      filterAndRender(data, renderFn, listElement, searchFields);
    });
  }

  // 2. Month Slider (Competitions - Until Month Year)
  if (monthSlider) {
    const monthDisplay = document.getElementById('month-display');
    const rangeText = document.getElementById('month-range-text');
    
    const updateMonthLabel = () => {
       const monthsToAdd = parseInt(monthSlider.value);
       const d = new Date();
       d.setMonth(d.getMonth() + monthsToAdd);
       const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
       if (monthDisplay) monthDisplay.innerText = label;
       if (rangeText) rangeText.innerText = `Until ${label}`;
    };

    // Initialize label
    updateMonthLabel();

    monthSlider.addEventListener('input', () => {
      updateMonthLabel();
      filterAndRender(data, renderFn, listElement, searchFields);
    });
  }

  // Event Listeners
  if (searchInput) searchInput.addEventListener('input', () => filterAndRender(data, renderFn, listElement, searchFields));
  if (topicSelect) topicSelect.addEventListener('change', () => filterAndRender(data, renderFn, listElement, searchFields));
  if (sortSelect) sortSelect.addEventListener('change', () => filterAndRender(data, renderFn, listElement, searchFields));
  
  locationCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => filterAndRender(data, renderFn, listElement, searchFields));
  });

  // Trigger initial filter to sync UI with default slider values
  filterAndRender(data, renderFn, listElement, searchFields);
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Try parsing DD/MM/YYYY or DD-MM-YYYY manually first (common in ID)
  const dmy = dateStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    return new Date(dmy[3], dmy[2] - 1, dmy[1]);
  }

  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  return null;
}

function parseMonth(monthStr) {
  if (!monthStr) return null;
  const months = {
    'januari': 0, 'january': 0, 'jan': 0,
    'februari': 1, 'february': 1, 'feb': 1,
    'maret': 2, 'march': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'mei': 4, 'may': 4,
    'juni': 5, 'june': 5, 'jun': 5,
    'juli': 6, 'july': 6, 'jul': 6,
    'agustus': 7, 'august': 7, 'aug': 7,
    'september': 8, 'sep': 8,
    'oktober': 9, 'october': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'desember': 11, 'december': 11, 'dec': 11
  };
  
  const cleanStr = monthStr.toLowerCase().trim();
  const parts = cleanStr.split(' ');
  const monthName = parts[0];
  
  if (months.hasOwnProperty(monthName)) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthIndex = months[monthName];
    
    let d = new Date(currentYear, monthIndex, 1);
    
    if (parts.length > 1) {
       const yearPart = parseInt(parts[1]);
       if (!isNaN(yearPart)) {
          d.setFullYear(yearPart);
          return d;
       }
    }

    if (monthIndex < now.getMonth() - 2) {
       d.setFullYear(currentYear + 1);
    }
    return d;
  }
  return null;
}

function parseSeminarDate(item) {
  // 1. Try combining Tanggal and Bulan (most reliable for this dataset)
  const tanggal = item['tanggal'] || item['Tanggal'];
  const bulan = item['bulan'] || item['Bulan'] || item['bulan pelaksanaan'] || item['Bulan Pelaksanaan'];
  
  if (tanggal && bulan) {
    // Handle ranges like "12-14", take the first day
    const dayStr = String(tanggal).split('-')[0].trim();
    const day = parseInt(dayStr);
    
    const monthDate = parseMonth(bulan);
    
    if (!isNaN(day) && monthDate) {
      monthDate.setDate(day);
      return monthDate;
    }
  }

  // 2. Fallback: Try 'date' field directly
  const dateStr = item['date'] || item['Date'];
  if (dateStr) {
    return parseDate(dateStr);
  }
  
  // 3. Fallback: Try parsing 'bulan' only (for competitions without dates)
  if (bulan) {
    return parseMonth(bulan);
  }

  return null;
}

function filterAndRender(data, renderFn, listElement, searchFields) {
  const searchInput = document.getElementById('search-input');
  const topicSelect = document.getElementById('topic-filter');
  const locationCheckboxes = document.querySelectorAll('#location-filters input[type="checkbox"]');
  const dateSlider = document.getElementById('date-slider');
  const monthSlider = document.getElementById('month-slider');
  const sortSelect = document.getElementById('sort-filter');

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedTopic = topicSelect ? topicSelect.value : "";
  const sortOrder = sortSelect ? sortSelect.value : "latest";
  
  const selectedLocations = Array.from(locationCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let filtered = data.filter(item => {
    // 1. Search Filter
    let matchesSearch = false;
    if (searchTerm === "") {
      matchesSearch = true;
    } else {
      for (const field of searchFields) {
        if (item[field] && String(item[field]).toLowerCase().includes(searchTerm)) {
          matchesSearch = true;
          break;
        }
      }
    }

    // 2. Topic Filter
    let matchesTopic = false;
    if (selectedTopic === "") {
      matchesTopic = true;
    } else {
      const keywords = TOPIC_KEYWORDS[selectedTopic] || [];
      const textToCheck = searchFields.map(f => item[f] || "").join(" ").toLowerCase();
      if (keywords.some(k => textToCheck.includes(k))) {
        matchesTopic = true;
      }
    }

    // 3. Location Filter
    let matchesLocation = true;
    if (locationCheckboxes.length > 0 && selectedLocations.length > 0) {
      const itemLoc = (item['location'] || item['Location'] || item['Lokasi'] || item['lokasi'] || "").toLowerCase();
      if (itemLoc) {
        matchesLocation = selectedLocations.some(loc => itemLoc.includes(loc));
      }
    }

    // 4. Timeline Filter
    let matchesTime = true;
    const itemDate = parseSeminarDate(item);

    if (itemDate) {
      itemDate.setHours(0, 0, 0, 0);

      if (dateSlider) {
        // Seminars: Next X Days
        const maxDays = parseInt(dateSlider.value);
        const futureLimit = new Date(now);
        futureLimit.setDate(now.getDate() + maxDays);
        
        // Strict future filter: Today <= Event <= Today + X
        // Allow slightly past events (e.g. earlier today) by checking >= now - 1 day
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        
        if (itemDate < yesterday || itemDate > futureLimit) {
           matchesTime = false;
        }
      } else if (monthSlider) {
        // Competitions: Until Month Year
        const monthsToAdd = parseInt(monthSlider.value);
        const limitDate = new Date(now);
        limitDate.setMonth(limitDate.getMonth() + monthsToAdd);
        limitDate.setMonth(limitDate.getMonth() + 1);
        limitDate.setDate(0); // End of target month
        
        // Similarly, don't hide slightly past events or current month events aggressively
        const pastLimit = new Date(now);
        pastLimit.setMonth(now.getMonth() - 2); // Show recent past (2 months) to avoid empty lists

        if (itemDate < pastLimit || itemDate > limitDate) {
           matchesTime = false;
        }
      }
    } else {
      // If no date found (TBA), always show it
      matchesTime = true;
    }

    return matchesSearch && matchesTopic && matchesLocation && matchesTime;
  });

  // 5. Sorting
  filtered.sort((a, b) => {
    const dateA = parseSeminarDate(a) || new Date(0);
    const dateB = parseSeminarDate(b) || new Date(0);
    
    if (sortOrder === 'latest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  renderFn(filtered, listElement);
}

function displayCompetitions(items, list) {
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999;grid-column:1/-1;">No competitions found matching your criteria.</p>`;
    return;
  }

  items.forEach(item => {
    const title = item['nama lomba'] || item['Nama Lomba'] || "Untitled Competition";
    const field = item['bidang umum'] || item['Bidang Umum'] || "";
    const category = item['cabang'] || item['Cabang'] || "";
    const month = item['bulan pelaksanaan'] || item['Bulan Pelaksanaan'] || "TBA";
    const level = item['level'] || item['Level'] || "Nasional";
    const status = item['status pendaftaran'] || item['Status Pendaftaran'] || "";
    const location = item['lokasi'] || item['Lokasi'] || "";
    const link = item['link'] || item['Link'] || "#";
    
    const li = document.createElement("li");
    li.className = "post";
    li.innerHTML = `
      <div class="info-box">
        <h2 class="post-title">${title}</h2>
        <p><strong>Field:</strong> ${field} (${category})</p>
        <p><strong>Date:</strong> ${month}</p>
        <p><strong>Level:</strong> ${level}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Status:</strong> ${status}</p>
        <div class="flex flex-wrap gap-2 mt-2">
           <a href="${link}" target="_blank" class="btn">Register / Info</a>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

// === TOGGLE FILTERS ===
function toggleFilters() {
  const filterContent = document.getElementById('filter-content');
  const toggleIcon = document.getElementById('filter-toggle-icon');
  
  if (filterContent && toggleIcon) {
    filterContent.classList.toggle('collapsed');
    toggleIcon.textContent = filterContent.classList.contains('collapsed') ? '+' : '−';
  }
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
