# Pseudocode - Homepage (index.html)
## BINUS Event Finder

---

## Deskripsi
Halaman utama (Homepage) BINUS Event Finder yang menampilkan hero section, kategori acara (Seminar, Competition, Community Service), dan FAQ section.

---

## PSEUDOCODE

```
PROGRAM BINUS_Event_Finder_Homepage

// ============================================
// BAGIAN 1: INISIALISASI HALAMAN
// ============================================

BEGIN Page_Load
    
    // Load dependencies
    LOAD Google_Fonts ("Inter", "Manrope")
    LOAD stylesheet ("style.css")
    LOAD script ("script.js")
    
    // Set default language
    SET currentLanguage = "EN"
    
    // Initialize page components
    CALL Render_Header()
    CALL Render_Hero_Section()
    CALL Render_Category_Cards()
    CALL Render_FAQ_Section()
    CALL Render_Footer()
    
    // Update language buttons state
    CALL Update_Language_Buttons(currentLanguage)
    
END Page_Load


// ============================================
// BAGIAN 2: RENDER HEADER
// ============================================

PROCEDURE Render_Header()

    // Black Header (Top Bar)
    DISPLAY "Prototype by Group 1 Program Design Method LB-20 | BINUS @Malang"
    
    // Contact Icons
    DISPLAY WhatsApp_Icon WITH link TO "wa.me/62811385598"
    DISPLAY Email_Icon WITH link TO "mailto:putraabyasawedha@binus.ac.id"
    DISPLAY LinkedIn_Icon WITH link TO "linkedin.com/in/abyasa-wedha"
    
    // Language Switcher
    DISPLAY Button_EN WITH data-lang = "en"
    DISPLAY Button_ID WITH data-lang = "id"
    
    // Main Header
    DISPLAY BINUS_Ribbon_Image
    DISPLAY BINUS_Logo_Image
    
    // Navigation Menu
    DISPLAY Nav_Link "Home" WITH href = "index.html" SET class = "active"
    DISPLAY Nav_Link "Seminar" WITH href = "sat-point.html"
    DISPLAY Nav_Link "Competitions" WITH href = "competition.html"
    DISPLAY Nav_Link "Community Service" WITH href = "community-service.html"
    
END PROCEDURE


// ============================================
// BAGIAN 3: RENDER HERO SECTION
// ============================================

PROCEDURE Render_Hero_Section()

    DISPLAY Heading_1 "Welcome to BINUS Event Finder" WITH data-i18n = "hero.title"
    DISPLAY Paragraph "Your one-stop hub for discovering seminars, competitions, and community service opportunities at BINUS University." WITH data-i18n = "hero.desc"
    DISPLAY Button "Explore All Events" WITH href = "sat-point.html" AND data-i18n = "hero.btn"
    
END PROCEDURE


// ============================================
// BAGIAN 4: RENDER KATEGORI CARDS
// ============================================

PROCEDURE Render_Category_Cards()

    // Card 1: Seminar & SAT
    BEGIN Card_Seminar
        DISPLAY Icon "🎓"
        DISPLAY Heading_2 "Seminar & SAT" WITH data-i18n = "cat.seminar.title"
        DISPLAY Paragraph "Earn SAT points by attending seminars, workshops, and academic events." WITH data-i18n = "cat.seminar.desc"
        DISPLAY Button "View Seminars" WITH href = "sat-point.html" AND data-i18n = "cat.seminar.btn"
    END Card_Seminar
    
    // Card 2: Competitions
    BEGIN Card_Competitions
        DISPLAY Icon "🏆"
        DISPLAY Heading_2 "Competitions" WITH data-i18n = "cat.comp.title"
        DISPLAY Paragraph "Challenge yourself and win prizes in national and international competitions." WITH data-i18n = "cat.comp.desc"
        DISPLAY Button "View Competitions" WITH href = "competition.html" AND data-i18n = "cat.comp.btn"
    END Card_Competitions
    
    // Card 3: Community Service
    BEGIN Card_Community_Service
        DISPLAY Icon "🤝"
        DISPLAY Heading_2 "Community Service" WITH data-i18n = "cat.comserv.title"
        DISPLAY Paragraph "Give back to the community and join volunteer programs like Teach For Indonesia." WITH data-i18n = "cat.comserv.desc"
        DISPLAY Button "View Activities" WITH href = "community-service.html" AND data-i18n = "cat.comserv.btn"
    END Card_Community_Service
    
END PROCEDURE


// ============================================
// BAGIAN 5: RENDER FAQ SECTION
// ============================================

PROCEDURE Render_FAQ_Section()

    DISPLAY Section_Title "Frequently Asked Questions" WITH data-i18n = "faq.title"
    
    // FAQ Item 1
    BEGIN FAQ_Item_1
        DISPLAY Question "How do I register for an event?" WITH data-i18n = "faq.q1"
        DISPLAY Answer "Click on the 'Detail' or 'Register' button on any event card. This will take you to the official registration page or provide further instructions." WITH data-i18n = "faq.a1"
        SET state = "collapsed"
    END FAQ_Item_1
    
    // FAQ Item 2
    BEGIN FAQ_Item_2
        DISPLAY Question "What are SAT points?" WITH data-i18n = "faq.q2"
        DISPLAY Answer "Student Activity Transcript (SAT) points are required for graduation. You can earn them by attending seminars, workshops, and participating in student organizations." WITH data-i18n = "faq.a2"
        SET state = "collapsed"
    END FAQ_Item_2
    
    // FAQ Item 3
    BEGIN FAQ_Item_3
        DISPLAY Question "How can I submit my own event?" WITH data-i18n = "faq.q3"
        DISPLAY Answer "Currently, event submissions are managed by the student council and university administration. Please contact the Student Affairs department for more info." WITH data-i18n = "faq.a3"
        SET state = "collapsed"
    END FAQ_Item_3
    
    // FAQ Item 4
    BEGIN FAQ_Item_4
        DISPLAY Question "Are these events open to the public?" WITH data-i18n = "faq.q4"
        DISPLAY Answer "Most events are exclusive to BINUS students, but some seminars and competitions may be open to the public. Check the specific event details for eligibility." WITH data-i18n = "faq.a4"
        SET state = "collapsed"
    END FAQ_Item_4
    
END PROCEDURE


// ============================================
// BAGIAN 6: RENDER FOOTER
// ============================================

PROCEDURE Render_Footer()
    
    DISPLAY "© 2025 BINUS @Malang | BINUS Higher Education"
    
END PROCEDURE


// ============================================
// BAGIAN 7: EVENT HANDLERS
// ============================================

// Language Switch Handler
PROCEDURE On_Language_Button_Click(selectedLanguage)
    
    INPUT: selectedLanguage (string: "en" atau "id")
    
    // Set current language
    SET currentLanguage = selectedLanguage
    
    // Get all elements with data-i18n attribute
    SET elements = GET_ALL_ELEMENTS WITH attribute "data-i18n"
    
    // Loop through each element and update text
    FOR EACH element IN elements DO
        SET translationKey = element.getAttribute("data-i18n")
        SET translatedText = translations[currentLanguage][translationKey]
        
        IF element IS input WITH placeholder THEN
            SET element.placeholder = translatedText
        ELSE
            SET element.innerText = translatedText
        ENDIF
    END FOR
    
    // Update language button states
    CALL Update_Language_Buttons(currentLanguage)
    
END PROCEDURE


// Update Language Buttons State
PROCEDURE Update_Language_Buttons(activeLanguage)
    
    INPUT: activeLanguage (string: "en" atau "id")
    
    SET allLanguageButtons = GET_ALL_ELEMENTS WITH class "lang-btn"
    
    FOR EACH button IN allLanguageButtons DO
        IF button.data-lang == activeLanguage THEN
            ADD class "active" TO button
        ELSE
            REMOVE class "active" FROM button
        ENDIF
    END FOR
    
END PROCEDURE


// FAQ Toggle Handler
PROCEDURE On_FAQ_Question_Click(faqItem)
    
    INPUT: faqItem (elemen details yang diklik)
    
    IF faqItem.state == "collapsed" THEN
        SET faqItem.state = "expanded"
        DISPLAY faqItem.answer
    ELSE
        SET faqItem.state = "collapsed"
        HIDE faqItem.answer
    ENDIF
    
END PROCEDURE


// Navigation Link Click Handler
PROCEDURE On_Nav_Link_Click(targetPage)
    
    INPUT: targetPage (string: nama file HTML target)
    
    NAVIGATE TO targetPage
    
END PROCEDURE


// Category Card Button Click Handler
PROCEDURE On_Category_Button_Click(categoryPage)
    
    INPUT: categoryPage (string: URL halaman kategori)
    
    NAVIGATE TO categoryPage
    
END PROCEDURE


// Contact Icon Click Handler
PROCEDURE On_Contact_Icon_Click(contactType, contactInfo)
    
    INPUT: contactType (string: "whatsapp", "email", "linkedin")
    INPUT: contactInfo (string: nomor/email/username)
    
    IF contactType == "whatsapp" THEN
        OPEN NEW_TAB "https://wa.me/" + contactInfo
    ELSE IF contactType == "email" THEN
        OPEN "mailto:" + contactInfo
    ELSE IF contactType == "linkedin" THEN
        OPEN NEW_TAB "https://linkedin.com/in/" + contactInfo
    ENDIF
    
END PROCEDURE


// ============================================
// BAGIAN 8: TRANSLATIONS DATA
// ============================================

CONSTANT translations = {
    "en": {
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
        "faq.a1": "Click on the 'Detail' or 'Register' button on any event card...",
        "faq.q2": "What are SAT points?",
        "faq.a2": "Student Activity Transcript (SAT) points are required for graduation...",
        "faq.q3": "How can I submit my own event?",
        "faq.a3": "Currently, event submissions are managed by the student council...",
        "faq.q4": "Are these events open to the public?",
        "faq.a4": "Most events are exclusive to BINUS students..."
    },
    "id": {
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
        "cat.comserv.desc": "Berkontribusi pada masyarakat dan bergabunglah dengan program sukarelawan.",
        "cat.comserv.btn": "Lihat Kegiatan",
        "faq.title": "Pertanyaan yang Sering Diajukan",
        "faq.q1": "Bagaimana cara mendaftar acara?",
        "faq.a1": "Klik tombol 'Detail' atau 'Register' pada kartu acara...",
        "faq.q2": "Apa itu poin SAT?",
        "faq.a2": "Poin Student Activity Transcript (SAT) diperlukan untuk kelulusan...",
        "faq.q3": "Bagaimana cara mengajukan acara sendiri?",
        "faq.a3": "Saat ini, pengajuan acara dikelola oleh organisasi kemahasiswaan...",
        "faq.q4": "Apakah acara ini terbuka untuk umum?",
        "faq.a4": "Sebagian besar acara khusus untuk mahasiswa BINUS..."
    }
}

END PROGRAM
```

---

## Ringkasan Alur Program

1. **Page Load** → Inisialisasi halaman, load dependencies, render semua komponen
2. **User Interaction** → Handle klik pada navigation, language switch, FAQ, dan category buttons
3. **Language Switch** → Update semua teks UI berdasarkan bahasa yang dipilih
4. **Navigation** → Redirect ke halaman yang sesuai saat link diklik

---

*Dokumen ini dibuat untuk keperluan dokumentasi Program Design Method - BINUS Event Finder*
