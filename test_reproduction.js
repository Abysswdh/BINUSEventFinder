
// Mock Data from API
const mockData = [{"bidang umum":"media","nama lomba":"audithink 2025","cabang":"infografis","bulan pelaksanaan":"januari","level":"nasional","status pendaftaran":"open","lokasi":"online","link":"https://staner.id/audithink2025"},{"bidang umum":"keagamaan","nama lomba":"quran festival 2026 is coming","cabang":"microblog islami","bulan pelaksanaan":"januari","level":"nasional","status pendaftaran":"open","lokasi":"online","link":"https://www.instagram.com/p/dqbzokbj7eb"}];

// Mock DOM elements
const mockSlider = { value: "6" }; // Default value in HTML
const mockSearch = { value: "" };
const mockTopic = { value: "" };
const mockSort = { value: "latest" };
const mockCheckboxes = [
  { value: "Online", checked: true },
  { value: "Hybrid", checked: true },
  { value: "Syahdan", checked: true },
  { value: "Malang", checked: true }
]; // Just a subset, assuming all checked

// Utils
function getField(item, ...fieldNames) {
  for (const field of fieldNames) {
    if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
      return String(item[field]).trim();
    }
    const lowerField = field.toLowerCase();
    if (item[lowerField] !== undefined && item[lowerField] !== null && item[lowerField] !== '') {
      return String(item[lowerField]).trim();
    }
    const titleField = field.charAt(0).toUpperCase() + field.slice(1).toLowerCase();
    if (item[titleField] !== undefined && item[titleField] !== null && item[titleField] !== '') {
      return String(item[titleField]).trim();
    }
  }
  return '';
}

const MONTH_MAP = {
  'januari': 0, 'january': 0, 'jan': 0,
  'februari': 1, 'february': 1, 'feb': 1,
  'maret': 2, 'march': 2, 'mar': 2,
  'april': 3, 'apr': 3,
  'mei': 4, 'may': 4,
  'juni': 5, 'june': 5, 'jun': 5,
  'juli': 6, 'july': 6, 'jul': 6,
  'agustus': 7, 'august': 7, 'aug': 7,
  'september': 8, 'sep': 8, 'sept': 8,
  'oktober': 9, 'october': 9, 'oct': 9,
  'november': 10, 'nov': 10,
  'desember': 11, 'december': 11, 'dec': 11
};

function parseAnyDate(dateStr) {
  if (!dateStr) return null;
  const str = String(dateStr).toLowerCase().trim();
  
  const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    return new Date(parseInt(dmyMatch[3]), parseInt(dmyMatch[2]) - 1, parseInt(dmyMatch[1]));
  }
  
  const monthYearMatch = str.match(/^([a-z]+)\s*(\d{4})$/i);
  if (monthYearMatch) {
    const monthIndex = MONTH_MAP[monthYearMatch[1].toLowerCase()];
    if (monthIndex !== undefined) {
      return new Date(parseInt(monthYearMatch[2]), monthIndex, 1);
    }
  }
  
  const monthOnlyMatch = str.match(/^([a-z]+)$/i);
  if (monthOnlyMatch) {
    const monthIndex = MONTH_MAP[monthOnlyMatch[1].toLowerCase()];
    if (monthIndex !== undefined) {
      const now = new Date(); // Will use current system time
      let year = now.getFullYear();
      if (monthIndex < now.getMonth() - 1) {
        year++;
      }
      return new Date(year, monthIndex, 1);
    }
  }
  return null;
}

function getItemDate(item, pageType) {
  if (pageType === 'competitions') {
    const bulan = getField(item, 'bulan pelaksanaan', 'Bulan Pelaksanaan', 'bulan', 'Bulan');
    if (bulan) {
      return parseAnyDate(bulan);
    }
  }
  return null;
}

// Logic Simulation
function applyFilters() {
  const searchTerm = mockSearch.value.toLowerCase().trim();
  const selectedTopic = mockTopic.value;
  
  const allLocations = mockCheckboxes;
  const checkedLocations = allLocations.filter(cb => cb.checked);
  const selectedLocations = checkedLocations.map(cb => cb.value.toLowerCase());
  
  const filterByLocation = allLocations.length > 0 && 
                           checkedLocations.length > 0 && 
                           checkedLocations.length < allLocations.length;
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  console.log("Current Date:", now.toString());
  
  let results = mockData.filter(item => {
    // Search
    if (searchTerm) return false;
    // Topic
    if (selectedTopic) return false;
    // Location
    if (filterByLocation) return false;
    
    // Timeline
    const itemDate = getItemDate(item, 'competitions');
    console.log(`Item: ${item['nama lomba']}, RawMonth: ${item['bulan pelaksanaan']}, ParsedDate: ${itemDate}`);
    
    if (itemDate) {
       // Month Slider Logic
       const monthsToAdd = parseInt(mockSlider.value);
       const limitDate = new Date(now);
       limitDate.setMonth(limitDate.getMonth() + monthsToAdd + 1);
       limitDate.setDate(0);
       
       const pastLimit = new Date(now);
       pastLimit.setMonth(now.getMonth() - 1);
       
       console.log(`Range: ${pastLimit.toDateString()} to ${limitDate.toDateString()}`);
       
       if (itemDate < pastLimit || itemDate > limitDate) {
         console.log("-> HIDDEN (Out of range)");
         return false;
       }
    }
    return true;
  });
  
  console.log("Total Results:", results.length);
}

applyFilters();
