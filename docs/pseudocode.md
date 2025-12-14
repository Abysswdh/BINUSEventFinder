# BINUS Event Finder - Pseudocode Documentation

## 7.1.1 Pseudocode index.html (Homepage)

```
START PROGRAM: Homepage

    // ===== INITIALIZATION =====
    DISPLAY "Loading website resources..."
    
    // Header section
    PRINT "=== BINUS EVENT FINDER ==="
    PRINT "Home | Seminar | Competitions | Community Service"
    PRINT "Language: [EN] [ID]"
    
    // Main content loop
    WHILE user_on_website DO
        DISPLAY "1. Hero Section"
        DISPLAY "2. Category Grid"
        DISPLAY "3. FAQ Section"
        DISPLAY "4. Navigate to other page"
        DISPLAY "5. Change language"
        DISPLAY "6. Contact via icons"
        DISPLAY "7. Exit"
        
        INPUT user_choice
        
        SELECT CASE user_choice
            CASE 1:  // Hero section
                PRINT "Welcome to BINUS Event Finder"
                PRINT "Your hub for seminars, competitions, community service"
                PRINT "[Explore All Events Button]"
                
            CASE 2:  // Category grid
                FOR i = 1 TO 3 DO
                    IF i = 1 THEN
                        PRINT "🎓 Seminar & SAT Points"
                        PRINT "Earn SAT points by attending events"
                        PRINT "[View Seminars Button]"
                    ELSE IF i = 2 THEN
                        PRINT "🏆 Competitions"
                        PRINT "Challenge yourself and win prizes"
                        PRINT "[View Competitions Button]"
                    ELSE
                        PRINT "🤝 Community Service"
                        PRINT "Give back to the community"
                        PRINT "[View Activities Button]"
                    END IF
                END FOR
                
            CASE 3:  // FAQ Section
                FOR each FAQ_item IN FAQ_list DO
                    PRINT "Q: " + FAQ_item.question
                    INPUT "Press Enter to see answer"
                    PRINT "A: " + FAQ_item.answer
                END FOR
                
            CASE 4:  // Navigation
                PRINT "Select page:"
                PRINT "1. Seminar Page"
                PRINT "2. Competitions Page"
                PRINT "3. Community Service Page"
                INPUT page_choice
                LOAD corresponding_html_page(page_choice)
                
            CASE 5:  // Change language
                PRINT "Select language:"
                PRINT "1. English"
                PRINT "2. Indonesian"
                INPUT lang_choice
                
                IF lang_choice = 1 THEN
                    SET current_language = "en"
                    CALL translate_page_to_english()
                ELSE
                    SET current_language = "id"
                    CALL translate_page_to_indonesian()
                END IF
                
            CASE 6:  // Contact icons
                PRINT "Select contact method:"
                PRINT "1. WhatsApp"
                PRINT "2. Email"
                PRINT "3. LinkedIn"
                INPUT contact_choice
                
                IF contact_choice = 1 THEN
                    OPEN_URL("https://wa.me/62811385598")
                ELSE IF contact_choice = 2 THEN
                    OPEN_EMAIL("putraabyasawedha@binus.ac.id")
                ELSE
                    OPEN_URL("https://linkedin.com/in/abyasa-wedha/")
                END IF
                
            CASE 7:
                EXIT PROGRAM
                
            DEFAULT:
                PRINT "Invalid choice"
        END SELECT
    END WHILE
    
    // Footer
    PRINT "© 2025 BINUS @Malang"

    // ===== HELPER FUNCTIONS =====
    FUNCTION translate_page_to_english()
        FOR each element WITH data-i18n_attribute DO
            element.text = GET_english_translation(element.data-i18n)
        END FOR
        SET language_button_active("en")
    END FUNCTION

    FUNCTION translate_page_to_indonesian()
        FOR each element WITH data-i18n_attribute DO
            element.text = GET_indonesian_translation(element.data-i18n)
        END FOR
        SET language_button_active("id")
    END FUNCTION

    FUNCTION SET_language_button_active(lang)
        FOR each lang_button IN language_buttons DO
            IF lang_button.data-lang = lang THEN
                lang_button.class = "active"
            ELSE
                lang_button.class = "inactive"
            END IF
        END FOR
    END FUNCTION

END PROGRAM
```

---

## 7.1.2 Pseudocode sat-point.html (Seminar Page)

```
START PROGRAM: Seminar_Page

    // ===== INITIALIZATION =====
    LOAD page resources:
        - HTML structure
        - CSS (style.css + Google Fonts)
        - JavaScript (script.js)
        - Images (ribbon.svg, logo.svg, icon.png)

    // ===== HEADER SECTION =====
    DISPLAY Header:
        PRINT "Prototype by Group 1 Program Design Method LB-20 | BINUS @Malang"
        DISPLAY contact icons (WhatsApp, Email, LinkedIn)
        DISPLAY language switcher buttons [EN] [ID]
        
    DISPLAY Navigation:
        PRINT "Home | Seminar | Competitions | Community Service"
        HIGHLIGHT "Seminar" as active page
        DISPLAY hamburger menu button for mobile

    // ===== MAIN CONTENT =====
    DISPLAY Page Title:
        PRINT "Seminar for SAT Points"
        PRINT "Find and explore upcoming BINUS seminars"
    
    // ===== FILTER SYSTEM =====
    DISPLAY Filter Box:
        PRINT "🔍 Filters"
        DISPLAY [Reset] button
        
        CREATE search_box WITH placeholder "Search seminars..."
        
        CREATE dropdown topic_filter WITH options:
            ["All Topics", "Technology", "Business", "Design", "Engineering", "Communication"]
        
        CREATE dropdown location_filter WITH options:
            ["All Locations", "Online", "Jakarta", "Malang", "Bandung", "Bekasi"]
        
        CREATE dropdown month_filter WITH options:
            ["All Months", "October 2025", "November 2025", ...]
        
        CREATE dropdown sort_filter WITH options:
            ["Newest First", "Oldest First"]

    // ===== EVENT LIST =====
    SHOW loading spinner
    PRINT "Loading seminars..."
    
    SET events = []
    CALL load_events()

    // ===== FUNCTIONS =====
    FUNCTION display_events(filtered_events)
        CLEAR event_list_container
        
        IF filtered_events.length = 0 THEN
            PRINT "No seminars found matching your filters"
            RETURN
        END IF
        
        FOR EACH seminar IN filtered_events DO
            DISPLAY Event Card:
                SHOW seminar.image
                PRINT seminar.title
                PRINT "Date: " + seminar.date + " " + seminar.time
                PRINT "Location: " + seminar.location
                DISPLAY [Register / Detail] button
                DISPLAY [Add to Outlook] button (green)
            END DISPLAY
        END FOR
    END FUNCTION

    FUNCTION apply_filters()
        SET search_text = GET search_box.value
        SET selected_topic = GET topic_filter.value
        SET selected_location = GET location_filter.value
        SET selected_month = GET month_filter.value
        SET sort_order = GET sort_filter.value
        
        SET filtered = events
        
        // Apply filters
        IF search_text ≠ "" THEN
            filtered = filtered WHERE title OR description contains search_text
        END IF
        
        IF selected_topic ≠ "" THEN
            filtered = filtered WHERE topic matches selected_topic keywords
        END IF
        
        IF selected_location ≠ "" THEN
            filtered = filtered WHERE location contains selected_location
        END IF
        
        IF selected_month ≠ "" THEN
            filtered = filtered WHERE date starts with selected_month
        END IF
        
        // Sort
        IF sort_order = "latest" THEN
            SORT filtered BY date DESC
        ELSE
            SORT filtered BY date ASC
        END IF
        
        CALL display_events(filtered)
    END FUNCTION

    FUNCTION reset_filters()
        SET all filter values to default
        CALL display_events(all_events)
    END FUNCTION

    // ===== FOOTER =====
    PRINT "© 2025 BINUS @Malang"

END PROGRAM
```

---

## 7.1.3 Pseudocode competition.html (Competition Page)

```
START PROGRAM: Competition_Page

    // ===== INITIALIZATION =====
    LOAD page resources:
        - HTML structure
        - CSS (style.css + competition-styles.css)
        - JavaScript (script.js)
        - Google Fonts (Plus Jakarta Sans)

    // ===== HEADER SECTION =====
    DISPLAY Header:
        PRINT "Prototype by Group 1 Program Design Method LB-20 | BINUS @Malang"
        DISPLAY contact icons (WhatsApp, Email, LinkedIn)
        DISPLAY language switcher buttons [EN] [ID]
        
    DISPLAY Navigation:
        PRINT "Home | Seminar | Competitions | Community Service"
        HIGHLIGHT "Competitions" as active page
        DISPLAY hamburger menu button for mobile

    // ===== MAIN CONTENT =====
    DISPLAY Page Title:
        PRINT "Informasi Lomba 2025"
        PRINT "Daftar lomba dan kompetisi terbaru untuk mahasiswa BINUS"

    // ===== FILTER SYSTEM =====
    DISPLAY Filter Box:
        PRINT "🏆 Find Competitions"
        DISPLAY [Reset] button
        
        CREATE search_box WITH placeholder "Search competitions..."
        
        CREATE dropdown topic_filter WITH options:
            ["All Fields", "💻 Technology", "📊 Business", "🎨 Design", 
             "⚙️ Engineering", "📢 Communication"]
        
        CREATE dropdown level_filter WITH options:
            ["All Levels", "🌍 International", "🇮🇩 National", "📍 Regional"]
        
        CREATE dropdown status_filter WITH options:
            ["All Status", "✅ Open Registration", "❌ Closed"]
        
        CREATE dropdown sort_filter WITH options:
            ["Newest First", "Oldest First"]

    // ===== COMPETITION LIST =====
    SHOW loading spinner
    PRINT "Loading competitions..."
    
    SET competitions = []
    CALL load_competitions()

    // ===== FUNCTIONS =====
    FUNCTION load_competitions()
        TRY
            FETCH data FROM Google Sheets API (COMP tab)
            SET competitions = response.data
            CALL display_competitions(competitions)
            CALL setup_filters()
        CATCH error
            PRINT "Failed to load competitions"
        END TRY
    END FUNCTION

    FUNCTION display_competitions(items)
        CLEAR competition_list_container
        
        IF items.length = 0 THEN
            PRINT "No competitions found matching your criteria"
            RETURN
        END IF
        
        FOR EACH comp IN items DO
            // Extract data from Google Sheet columns
            SET title = comp["nama lomba"]
            SET field = comp["bidang umum"]
            SET category = comp["cabang"]
            SET month = comp["bulan pelaksanaan"]
            SET level = comp["level"]
            SET status = comp["status pendaftaran"]
            SET location = comp["lokasi"]
            SET link = comp["link"]
            
            // Determine level badge color
            IF level contains "internasional" THEN
                SET levelColor = gold (#d4af37)
            ELSE IF level contains "nasional" THEN
                SET levelColor = blue (#0066cc)
            ELSE IF level contains "regional" THEN
                SET levelColor = green (#28a745)
            END IF
            
            // Determine status badge
            IF status contains "buka" OR "open" THEN
                SET statusBadge = "OPEN" (green)
            ELSE IF status contains "tutup" OR "closed" THEN
                SET statusBadge = "CLOSED" (red)
            END IF
            
            // Choose image based on field
            IF field contains "teknologi" THEN
                SET image = tech_image_url
            ELSE IF field contains "bisnis" THEN
                SET image = business_image_url
            ELSE IF field contains "desain" THEN
                SET image = design_image_url
            ELSE
                SET image = default_logo
            END IF
            
            DISPLAY Competition Card:
                SHOW image with level badge overlay
                PRINT title
                PRINT "Field: " + field
                PRINT "Category: " + category
                PRINT "Date: " + month
                PRINT "Location: " + location (if exists)
                DISPLAY [View Details] button
                DISPLAY status badge (right aligned)
            END DISPLAY
        END FOR
    END FUNCTION

    FUNCTION apply_filters()
        SET search_text = GET search_box.value
        SET selected_topic = GET topic_filter.value
        SET selected_level = GET level_filter.value
        SET selected_status = GET status_filter.value
        SET sort_order = GET sort_filter.value
        
        SET filtered = competitions
        
        // Apply search filter
        IF search_text ≠ "" THEN
            filtered = filtered WHERE title OR field contains search_text
        END IF
        
        // Apply topic/field filter
        IF selected_topic ≠ "" THEN
            filtered = filtered WHERE field matches topic keywords
        END IF
        
        // Apply level filter
        IF selected_level ≠ "" THEN
            filtered = filtered WHERE level contains selected_level
        END IF
        
        // Apply status filter
        IF selected_status = "open" THEN
            filtered = filtered WHERE status contains "buka" OR "open"
        ELSE IF selected_status = "closed" THEN
            filtered = filtered WHERE status contains "tutup" OR "closed"
        END IF
        
        // Sort
        IF sort_order = "latest" THEN
            SORT filtered BY date DESC
        ELSE
            SORT filtered BY date ASC
        END IF
        
        CALL display_competitions(filtered)
    END FUNCTION

    FUNCTION reset_filters()
        SET search_box.value = ""
        SET topic_filter.value = ""
        SET level_filter.value = ""
        SET status_filter.value = ""
        SET sort_filter.value = "latest"
        CALL display_competitions(all_competitions)
    END FUNCTION

    // ===== FOOTER =====
    PRINT "© 2025 BINUS @Malang"

END PROGRAM

// Competition data structure
STRUCT Competition {
    nama_lomba: string       // Competition name
    bidang_umum: string      // General field (Technology, Business, etc.)
    cabang: string           // Category/branch
    bulan_pelaksanaan: string // Month of event
    level: string            // Nasional, Internasional, Regional
    status_pendaftaran: string // Buka/Tutup
    lokasi: string           // Location
    link: string             // Registration link
}
```

---

## 7.1.4 Pseudocode community-service.html (Community Service Page)

```
START PROGRAM: Community_Service_Page

    // ===== INITIALIZATION =====
    LOAD page resources:
        - HTML structure
        - CSS (style.css)
        - JavaScript (script.js)
        - Default image (TFI.jpg)

    // ===== HEADER SECTION =====
    DISPLAY Header:
        PRINT "Prototype by Group 1 Program Design Method LB-20 | BINUS @Malang"
        DISPLAY contact icons (WhatsApp, Email, LinkedIn)
        DISPLAY language switcher buttons [EN] [ID]
        
    DISPLAY Navigation:
        PRINT "Home | Seminar | Competitions | Community Service"
        HIGHLIGHT "Community Service" as active page
        DISPLAY hamburger menu button for mobile

    // ===== MAIN CONTENT =====
    DISPLAY Page Title:
        PRINT "Community Service & TFI"
        PRINT "Volunteer opportunities for BINUS students"

    // ===== FILTER SYSTEM =====
    DISPLAY Filter Box:
        PRINT "🤝 Find Community Service"
        DISPLAY [Reset] button
        
        CREATE search_box WITH placeholder "Search activities..."
        
        CREATE dropdown category_filter WITH options:
            ["All Categories", "📚 Pendidikan", "🌿 Lingkungan", 
             "🤝 Sosial", "🏥 Kesehatan"]
        
        CREATE dropdown mode_filter WITH options:
            ["All Modes", "💻 Online", "📍 Offline", "🔄 Hybrid"]
        
        CREATE dropdown location_filter WITH options:
            ["All Locations", "Malang", "Jakarta", "Bandung"]
        
        CREATE dropdown sort_filter WITH options:
            ["Newest First", "Oldest First"]

    // ===== ACTIVITY LIST =====
    SHOW loading spinner
    PRINT "Loading community service..."
    
    SET activities = []
    CALL load_community_service()

    // ===== FUNCTIONS =====
    FUNCTION load_community_service()
        TRY
            FETCH data FROM Google Sheets API (TFI tab)
            SET activities = response.data
            CALL display_activities(activities)
            CALL setup_filters()
        CATCH error
            PRINT "Failed to load community service"
        END TRY
    END FUNCTION

    FUNCTION display_activities(items)
        CLEAR activity_list_container
        
        IF items.length = 0 THEN
            PRINT "No community service events found matching your criteria"
            RETURN
        END IF
        
        FOR EACH activity IN items DO
            // Extract data from TFI Google Sheet columns
            SET category = activity["kategori"]
            SET title = activity["nama event"]
            SET date = activity["tanggal"]
            SET time = activity["waktu"]
            SET location = activity["lokasi"]
            SET mode = activity["mode/tipe"]
            SET benefit = activity["benefit"]
            SET contact = activity["contact"]
            SET link = activity["link pendaftaran"]
            SET image = activity["image"] OR default_TFI_image
            
            DISPLAY Activity Card:
                SHOW image
                IF category exists THEN
                    SHOW category badge (top-left overlay)
                END IF
                PRINT title
                PRINT "Date: " + date + " " + time
                PRINT "Location: " + location
                IF mode exists THEN
                    PRINT "Mode: " + mode
                END IF
                IF benefit exists THEN
                    PRINT "Benefit: " + benefit
                END IF
                IF contact exists THEN
                    PRINT "Contact: " + contact
                END IF
                DISPLAY [Register / Detail] button
                DISPLAY [Add to Outlook] button (green)
            END DISPLAY
        END FOR
    END FUNCTION

    FUNCTION apply_filters()
        SET search_text = GET search_box.value
        SET selected_category = GET category_filter.value
        SET selected_mode = GET mode_filter.value
        SET selected_location = GET location_filter.value
        SET sort_order = GET sort_filter.value
        
        SET filtered = activities
        
        // Apply search filter
        IF search_text ≠ "" THEN
            filtered = filtered WHERE title OR category OR benefit contains search_text
        END IF
        
        // Apply category filter
        IF selected_category ≠ "" THEN
            filtered = filtered WHERE kategori contains selected_category
        END IF
        
        // Apply mode filter
        IF selected_mode ≠ "" THEN
            filtered = filtered WHERE mode/tipe contains selected_mode
        END IF
        
        // Apply location filter
        IF selected_location ≠ "" THEN
            filtered = filtered WHERE lokasi contains selected_location
        END IF
        
        // Sort
        IF sort_order = "latest" THEN
            SORT filtered BY date DESC
        ELSE
            SORT filtered BY date ASC
        END IF
        
        CALL display_activities(filtered)
    END FUNCTION

    FUNCTION create_outlook_link(title, date, time, location, link)
        // Generate Outlook calendar link
        SET outlook_url = "https://outlook.live.com/calendar/0/deeplink/compose?"
        SET outlook_url += "subject=" + encode(title)
        SET outlook_url += "&startdt=" + format_date(date, time)
        SET outlook_url += "&location=" + encode(location)
        SET outlook_url += "&body=" + encode(link)
        RETURN outlook_url
    END FUNCTION

    FUNCTION reset_filters()
        SET search_box.value = ""
        SET category_filter.value = ""
        SET mode_filter.value = ""
        SET location_filter.value = ""
        SET sort_filter.value = "latest"
        CALL display_activities(all_activities)
    END FUNCTION

    // ===== FOOTER =====
    PRINT "© 2025 BINUS @Malang"

END PROGRAM

// Community Service data structure (TFI Sheet)
STRUCT CommunityService {
    kategori: string           // Category (Pendidikan, Lingkungan, etc.)
    nama_event: string         // Event name
    tanggal: string           // Date
    waktu: string             // Time
    lokasi: string            // Location
    mode_tipe: string         // Mode (Online/Offline/Hybrid)
    benefit: string           // Benefits for participants
    contact: string           // Contact information
    link_pendaftaran: string  // Registration link
    image: string             // Image URL (optional)
}
```

---

## 7.1.5 Pseudocode script.js (Main JavaScript Logic)

```
START PROGRAM: Main_JavaScript

    // ===== GLOBAL VARIABLES =====
    DECLARE EVENTS_SHEET_ID = "Google Sheet ID"
    DECLARE allEvents = []        // Seminar data
    DECLARE allCompetitions = []  // Competition data
    DECLARE allComserv = []       // Community service data
    DECLARE currentLang = "en"    // Current language

    // ===== UTILITY FUNCTIONS =====
    FUNCTION getSheetUrl(sheetId, tabName)
        RETURN "https://opensheet.elk.sh/" + sheetId + "/" + tabName
    END FUNCTION

    FUNCTION createOutlookLink(title, date, time, location, link)
        SET baseUrl = "https://outlook.live.com/calendar/0/deeplink/compose"
        SET params = {
            subject: title,
            startdt: formatDateTime(date, time),
            location: location,
            body: "Details: " + link
        }
        RETURN baseUrl + "?" + encodeParams(params)
    END FUNCTION

    // ===== DATA LOADING FUNCTIONS =====
    FUNCTION loadEvents()
        SET listElement = GET element by id "event-list"
        IF listElement is null THEN RETURN
        
        SHOW loading spinner in listElement
        
        TRY
            SET url = getSheetUrl(EVENTS_SHEET_ID, "SAT")
            SET response = FETCH(url)
            SET allEvents = response.json()
            CALL displayEvents(allEvents, listElement)
            CALL setupFilters(allEvents, displayEvents, listElement, searchFields)
        CATCH error
            PRINT error
            SHOW "Failed to load events" in listElement
        END TRY
    END FUNCTION

    FUNCTION loadCompetitions()
        SET listElement = GET element by id "competition-list"
        IF listElement is null THEN RETURN
        
        SHOW loading spinner in listElement
        
        TRY
            SET url = getSheetUrl(EVENTS_SHEET_ID, "COMP")
            SET response = FETCH(url)
            SET allCompetitions = response.json()
            CALL displayCompetitions(allCompetitions, listElement)
            CALL setupFilters(allCompetitions, displayCompetitions, listElement, searchFields)
        CATCH error
            PRINT error
            SHOW "Failed to load competitions" in listElement
        END TRY
    END FUNCTION

    FUNCTION loadCommunityService()
        SET listElement = GET element by id "comserv-list"
        IF listElement is null THEN RETURN
        
        SHOW loading spinner in listElement
        
        TRY
            SET url = getSheetUrl(EVENTS_SHEET_ID, "TFI")
            SET response = FETCH(url)
            SET allComserv = response.json()
            CALL displayCommunityService(allComserv, listElement)
            CALL setupFilters(allComserv, displayCommunityService, listElement, searchFields)
        CATCH error
            PRINT error
            SHOW "Failed to load community service" in listElement
        END TRY
    END FUNCTION

    // ===== DISPLAY FUNCTIONS =====
    FUNCTION displayEvents(items, listElement)
        CLEAR listElement
        
        IF items.length = 0 THEN
            SHOW "No events found" message
            RETURN
        END IF
        
        FOR EACH event IN items DO
            CREATE card element
            SET card.image = event.image OR default_logo
            SET card.title = event.title
            SET card.date = event.date + " " + event.start
            SET card.location = event.location
            SET card.registerBtn = LINK to event.link
            SET card.outlookBtn = LINK to createOutlookLink(...)
            APPEND card to listElement
        END FOR
    END FUNCTION

    FUNCTION displayCompetitions(items, listElement)
        CLEAR listElement
        
        IF items.length = 0 THEN
            SHOW "No competitions found" message
            RETURN
        END IF
        
        FOR EACH comp IN items DO
            // Get level badge color
            IF comp.level contains "internasional" THEN
                SET levelColor = gold
            ELSE IF comp.level contains "nasional" THEN
                SET levelColor = blue
            ELSE
                SET levelColor = green
            END IF
            
            // Get status badge
            IF comp.status contains "buka" THEN
                SET statusBadge = "OPEN" (green)
            ELSE
                SET statusBadge = "CLOSED" (red)
            END IF
            
            // Choose image based on field
            SET image = SELECT image based on comp.field
            
            CREATE card element WITH image, level badge, details, status badge
            APPEND card to listElement
        END FOR
    END FUNCTION

    FUNCTION displayCommunityService(items, listElement)
        CLEAR listElement
        
        IF items.length = 0 THEN
            SHOW "No activities found" message
            RETURN
        END IF
        
        FOR EACH activity IN items DO
            CREATE card element
            SET card.image = activity.image OR TFI.jpg
            SET card.categoryBadge = activity.kategori (if exists)
            SET card.title = activity["nama event"]
            SET card.date = activity.tanggal + " " + activity.waktu
            SET card.location = activity.lokasi
            SET card.mode = activity["mode/tipe"]
            SET card.benefit = activity.benefit
            SET card.contact = activity.contact
            SET card.registerBtn = LINK to activity["link pendaftaran"]
            SET card.outlookBtn = LINK to createOutlookLink(...)
            APPEND card to listElement
        END FOR
    END FUNCTION

    // ===== FILTER SYSTEM =====
    FUNCTION setupFilters(data, renderFn, listElement, searchFields)
        // Get filter elements
        SET searchInput = GET element "search-input"
        SET topicSelect = GET element "topic-filter"
        SET locationFilter = GET element "location-filter"
        SET monthFilter = GET element "month-filter"
        SET sortSelect = GET element "sort-filter"
        SET levelFilter = GET element "level-filter"
        SET statusFilter = GET element "status-filter"
        SET categoryFilter = GET element "category-filter"
        SET modeFilter = GET element "mode-filter"
        
        // Attach event listeners
        IF searchInput exists THEN
            ON searchInput.input: CALL filterAndRender(...)
        END IF
        
        IF topicSelect exists THEN
            ON topicSelect.change: CALL filterAndRender(...)
        END IF
        
        // ... repeat for all filters ...
        
        // Initial render
        CALL renderFn(data, listElement)
    END FUNCTION

    FUNCTION filterAndRender(data, renderFn, listElement, searchFields)
        // Get current filter values
        SET searchTerm = searchInput.value.toLowerCase()
        SET selectedTopic = topicSelect.value
        SET selectedLocation = locationFilter.value
        SET sortOrder = sortSelect.value
        
        // Start filtering
        SET filtered = data.filter(item => {
            
            // 1. Search Filter
            SET matchesSearch = TRUE
            IF searchTerm ≠ "" THEN
                matchesSearch = FALSE
                FOR EACH field IN searchFields DO
                    IF item[field] contains searchTerm THEN
                        matchesSearch = TRUE
                        BREAK
                    END IF
                END FOR
            END IF
            
            // 2. Topic Filter
            SET matchesTopic = TRUE
            IF selectedTopic ≠ "" THEN
                SET keywords = TOPIC_KEYWORDS[selectedTopic]
                SET textToCheck = COMBINE all searchFields of item
                matchesTopic = ANY keyword IN keywords exists IN textToCheck
            END IF
            
            // 3. Location Filter
            SET matchesLocation = TRUE
            IF locationFilter exists AND has value THEN
                SET itemLocation = item.location.toLowerCase()
                IF selectedLocation = "jakarta" THEN
                    matchesLocation = itemLocation contains ANY jakarta campus
                ELSE
                    matchesLocation = itemLocation contains selectedLocation
                END IF
            END IF
            
            // 4. Month/Timeline Filter
            SET matchesTime = TRUE
            IF monthFilter exists AND has value THEN
                matchesTime = item.date starts with selectedMonth
            END IF
            
            // 5. Level Filter (Competitions)
            SET matchesLevel = TRUE
            IF levelFilter exists AND has value THEN
                matchesLevel = item.level contains selectedLevel
            END IF
            
            // 6. Status Filter (Competitions)
            SET matchesStatus = TRUE
            IF statusFilter exists AND has value THEN
                IF selectedStatus = "open" THEN
                    matchesStatus = item.status contains "buka" OR "open"
                ELSE
                    matchesStatus = item.status contains "tutup" OR "closed"
                END IF
            END IF
            
            // 7. Category Filter (Community Service)
            SET matchesCategory = TRUE
            IF categoryFilter exists AND has value THEN
                matchesCategory = item.kategori contains selectedCategory
            END IF
            
            // 8. Mode Filter (Community Service)
            SET matchesMode = TRUE
            IF modeFilter exists AND has value THEN
                matchesMode = item["mode/tipe"] contains selectedMode
            END IF
            
            // Return combined result
            RETURN matchesSearch AND matchesTopic AND matchesLocation AND 
                   matchesTime AND matchesLevel AND matchesStatus AND 
                   matchesCategory AND matchesMode
        })
        
        // Sort filtered results
        SORT filtered BY date (ASC or DESC based on sortOrder)
        
        // Render filtered results
        CALL renderFn(filtered, listElement)
    END FUNCTION

    // ===== RESET FILTERS =====
    FUNCTION resetFilters()
        // Reset all filter inputs to default
        SET searchInput.value = ""
        SET topicFilter.value = ""
        SET locationFilter.value = ""
        SET monthFilter.value = ""
        SET sortFilter.value = "latest"
        SET levelFilter.value = ""
        SET statusFilter.value = ""
        SET categoryFilter.value = ""
        SET modeFilter.value = ""
        
        // Re-render all data
        IF event-list exists THEN
            CALL displayEvents(allEvents, eventList)
        END IF
        IF competition-list exists THEN
            CALL displayCompetitions(allCompetitions, compList)
        END IF
        IF comserv-list exists THEN
            CALL displayCommunityService(allComserv, comservList)
        END IF
    END FUNCTION

    // ===== MOBILE NAVIGATION =====
    FUNCTION toggleMobileNav()
        SET nav = GET element ".main-nav"
        SET hamburger = GET element ".hamburger-btn"
        
        TOGGLE nav.class "open"
        TOGGLE hamburger.class "active"
    END FUNCTION

    FUNCTION toggleFilters()
        SET filterContent = GET element "#filter-content"
        SET toggleIcon = GET element "#filter-toggle-icon"
        
        TOGGLE filterContent.class "collapsed"
        IF filterContent has "collapsed" THEN
            SET toggleIcon.text = "+"
        ELSE
            SET toggleIcon.text = "−"
        END IF
    END FUNCTION

    // ===== LANGUAGE SYSTEM =====
    FUNCTION setLanguage(lang)
        SET currentLang = lang
        
        FOR EACH element WITH data-i18n attribute DO
            SET key = element.getAttribute("data-i18n")
            SET translation = TRANSLATIONS[lang][key]
            IF translation exists THEN
                element.textContent = translation
            END IF
        END FOR
        
        // Update language button active state
        FOR EACH button IN language buttons DO
            IF button.data-lang = lang THEN
                ADD "active" class to button
            ELSE
                REMOVE "active" class from button
            END IF
        END FOR
    END FUNCTION

    // ===== INITIALIZATION =====
    ON DOMContentLoaded:
        CALL loadEvents()
        CALL loadCompetitions()
        CALL loadCommunityService()
    END ON

END PROGRAM

// ===== DATA STRUCTURES =====
CONST TOPIC_KEYWORDS = {
    "Technology": ["computer", "tech", "coding", "data", "ai", "software"],
    "Business": ["business", "management", "marketing", "finance"],
    "Design": ["design", "art", "creative", "visual"],
    "Engineering": ["engineering", "robotics", "architecture"],
    "Communication": ["communication", "journalism", "broadcasting"]
}

CONST TRANSLATIONS = {
    "en": {
        "nav.home": "Home",
        "nav.seminar": "Seminar",
        "nav.competition": "Competitions",
        "nav.comserv": "Community Service",
        // ... more translations
    },
    "id": {
        "nav.home": "Beranda",
        "nav.seminar": "Seminar",
        "nav.competition": "Kompetisi",
        "nav.comserv": "Pengabdian Masyarakat",
        // ... more translations
    }
}
```

---

## 7.1.6 Pseudocode style.css (Styling Logic)

```
START STYLESHEET: Main_CSS

    // ===== GLOBAL STYLES =====
    STYLE body:
        SET font-family = "Plus Jakarta Sans", sans-serif
        SET background-color = white
        SET color = dark gray (#333)
        SET display = flex column
        SET min-height = 100vh
    
    // ===== HEADER STYLES =====
    STYLE .binus-header:
        SET position = sticky at top
        SET z-index = 1000
        SET box-shadow = subtle shadow
    
    STYLE .black-header:
        SET background = black
        SET color = white
        SET padding = small
        DISPLAY contact icons and language switcher
    
    STYLE .main-nav:
        SET background = BINUS blue (#004b8d)
        SET display = flex row
        FOR EACH nav-item:
            SET color = white
            ON HOVER: SET background = orange
            IF .active: SET background = darker blue
    
    // ===== MOBILE NAVIGATION =====
    @MEDIA max-width 900px:
        STYLE .hamburger-btn:
            SET display = visible
        STYLE .main-nav:
            SET display = hidden by default
            IF .open: SET display = visible as vertical menu
    
    // ===== CARD GRID =====
    STYLE .post-roll:
        SET display = grid
        SET columns = auto-fill, min 280px, max 400px
        SET gap = 2rem
    
    STYLE .post:
        SET background = white
        SET border-radius = 12px
        SET box-shadow = subtle shadow
        SET max-width = 450px
        ON HOVER:
            SET transform = translateY(-4px)
            SET box-shadow = larger shadow
    
    STYLE .image-box:
        SET position = relative
        STYLE img:
            SET width = 100%
            SET height = 200px
            SET object-fit = cover
    
    STYLE .info-box:
        SET padding = 1.2rem 1.5rem
    
    STYLE .post-title:
        SET font-size = 18px
        SET color = BINUS blue
        SET font-weight = 600
    
    // ===== BUTTONS =====
    STYLE .btn:
        SET background = BINUS blue
        SET color = white
        SET padding = 8px 14px
        SET border-radius = 6px
        ON HOVER:
            SET background = orange
            SET color = dark
    
    // ===== FILTER BOX =====
    STYLE .filter-box:
        SET background = white
        SET border = 1px solid light gray
        SET border-radius = 12px
        SET padding = 20px
        SET margin-bottom = 2rem
    
    STYLE .filter-dropdowns:
        SET display = grid
        SET columns = 4 equal columns
        SET gap = 12px
        
        @MEDIA max-width 768px:
            SET columns = 2 columns
        @MEDIA max-width 480px:
            SET columns = 1 column
    
    STYLE .btn-reset:
        SET background = light gray
        SET border = 1px solid gray
        SET padding = 6px 16px
        ON HOVER: SET background = darker gray
    
    // ===== BADGES =====
    STYLE .level-badge:
        SET display = inline-block
        SET padding = 5px 12px
        SET border-radius = 20px
        SET color = white
        SET font-size = small
        SET text-transform = uppercase
    
    STYLE .category-badge:
        SET position = absolute top-left
        SET background = BINUS blue
        SET color = white
        SET padding = 5px 12px
        SET border-radius = 20px
    
    STYLE .free-badge:
        SET background = green
        SET color = white
    
    STYLE .status-closed:
        SET background = red
        SET color = white
    
    // ===== FOOTER =====
    STYLE footer:
        SET background = dark gray
        SET color = white
        SET text-align = center
        SET padding = 50px 20px
    
    // ===== LOADING STATE =====
    STYLE .loading-state:
        SET display = flex column center
        SET animation = spin for spinner
    
    // ===== RESPONSIVE DESIGN =====
    @MEDIA max-width 768px:
        REDUCE font sizes
        ADJUST padding and margins
        STACK elements vertically
        SHOW hamburger menu
        HIDE desktop navigation

END STYLESHEET
```
