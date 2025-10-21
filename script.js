// === CONFIG ===
const SHEET_ID = "1SB6DbErUBuBScXJSsnO1RFTq5-PqdADIqZ-5zCdpyq8";
const SHEET_NAME = "Sheet1";
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

// === FETCH & DISPLAY ===
async function loadEvents() {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error("Failed to fetch sheet");
    const data = await res.json();
    displayEvents(data);
  } catch (err) {
    console.error(err);
    document.getElementById("event-list").innerHTML =
      `<p style="text-align:center;color:#999;">Failed to load events.</p>`;
  }
}

function outlookLink(ev) {
  const base = "https://outlook.office.com/calendar/0/deeplink/compose?";
  const params = new URLSearchParams({
    subject: ev.title || "BINUS Event",
    body: ev.description || "Event dari BINUS Event Finder",
    startdt: ev.start || "",
    enddt: ev.end || "",
    location: ev.location || "BINUS University"
  });
  return base + params.toString();
}

function displayEvents(events) {
  const list = document.getElementById("event-list");
  list.innerHTML = "";

  events.forEach(ev => {
    const li = document.createElement("li");
    li.className = "post";
    li.innerHTML = `
      <article class="wrapper">
        <div class="image-box">
          <img src="${ev.image || '/assets/logo.png'}" alt="${ev.title}">
        </div>
        <div class="info-box">
          <h2 class="post-title">${ev.title}</h2>
          <p>${ev.date || ""} • ${ev.location || "BINUS University"}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <a href="${ev.link}" target="_blank" class="btn">Detail</a>
            <a href="${outlookLink(ev)}" target="_blank" class="btn">🗓 Add to Outlook</a>
          </div>
        </div>
      </article>
    `;
    list.appendChild(li);
  });
}

loadEvents();
