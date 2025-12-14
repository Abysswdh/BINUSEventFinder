# Activity Diagram - Program System Logic
## BINUS Event Finder

---

## Deskripsi
Diagram ini menggambarkan alur logika internal program (System Perspective) yang terjadi di dalam `script.js` saat aplikasi berjalan, mulai dari inisialisasi hingga penanganan event pengguna.

## Activity Diagram (Program Logic Flow)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PROGRAM LOGIC FLOW (script.js)                                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│                                              ● Start                                                │
│                                              │                                                      │
│                                              ▼                                                      │
│                                   ┌────────────────────┐                                            │
│                                   │ Inisialisasi       │                                            │
│                                   │ Variabel Global    │(allEvents, allCompetitions...)             │
│                                   │ & Konstanta        │                                            │
│                                   └──────────┬─────────┘                                            │
│                                              │                                                      │
│                                              ▼                                                      │
│                                   ┌────────────────────┐                                            │
│                                   │ Event Listener:    │                                            │
│                                   │ DOMContentLoaded   │                                            │
│                                   └──────────┬─────────┘                                            │
│                                              │                                                      │
│                  ┌───────────────────────────┼───────────────────────────┐                          │
│                  ▼                           ▼                           ▼                          │
│        ┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐            │
│        │ Panggil           │       │ Panggil           │       │ Panggil           │            │
│        │ loadEvents()      │       │ loadCompetitions()│       │ loadComserv()     │            │
│        │ (SAT Points)      │       │ (Lomba)           │       │ (Community Srv)   │            │
│        └─────────┬─────────┘       └─────────┬─────────┘       └─────────┬─────────┘            │
│                  │                           │                           │                          │
│                  ▼                           ▼                           ▼                          │
│        ┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐            │
│        │ Fetch API         │       │ Fetch API         │       │ Fetch API         │            │
│        │ (Google Sheets)   │       │ (Google Sheets)   │       │ (Google Sheets)   │            │
│        └─────────┬─────────┘       └─────────┬─────────┘       └─────────┬─────────┘            │
│                  │                           │                           │                          │
│                  ▼                           ▼                           ▼                          │
│          ◇ Fetch Sukses?             ◇ Fetch Sukses?             ◇ Fetch Sukses?                │
│         /        \                  /        \                  /        \                      │
│       Yes        No               Yes        No               Yes        No                     │
│        │          │                │          │                │          │                     │
│        ▼          ▼                ▼          ▼                ▼          ▼                     │
│  ┌──────────┐ ┌────────┐      ┌──────────┐ ┌────────┐      ┌──────────┐ ┌────────┐              │
│  │Parse JSON│ │Display │      │Parse JSON│ │Display │      │Parse JSON│ │Display │              │
│  │& Store   │ │Error   │      │& Store   │ │Error   │      │& Store   │ │Error   │              │
│  └────┬─────┘ └────────┘      └────┬─────┘ └────────┘      └────┬─────┘ └────────┘              │
│       │                            │                            │                               │
│       ▼                            ▼                            ▼                               │
│  ┌──────────┐                 ┌──────────┐                 ┌──────────┐                         │
│  │Init      │                 │Init      │                 │Init      │                         │
│  │Filters   │                 │Filters   │                 │Filters   │                         │
│  └────┬─────┘                 └────┬─────┘                 └────┬─────┘                         │
│       │                            │                            │                               │
│       ▼                            ▼                            ▼                               │
│  ┌──────────┐                 ┌──────────┐                 ┌──────────┐                         │
│  │Display   │                 │Display   │                 │Display   │                         │
│  │Events    │                 │Events    │                 │Events    │                         │
│  └────┬─────┘                 └────┬─────┘                 └────┬─────┘                         │
│       │                            │                            │                               │
│       └──────────────┬─────────────┴─────────────┬──────────────┘                               │
│                      │                           │                                              │
│                      ▼                           ▼                                              │
│            ┌───────────────────┐       ┌───────────────────┐                                    │
│            │ Update UI Bahasa  │       │ Attach Event      │                                    │
│            │ (Default: EN)     │       │ Listeners (Input) │                                    │
│            └─────────┬─────────┘       └─────────┬─────────┘                                    │
│                      │                           │                                              │
│                      └─────────────┬─────────────┘                                              │
│                                    │                                                            │
│                                    ▼                                                            │
│                           ═══════════════════                                                   │
│                           ║   IDLE STATE    ║ (Menunggu Input User)                                 │
│                           ═══════════════════                                                   │
│                                    │                                                            │
│          ┌─────────────────────────┼─────────────────────────┌──────────────────────┐           │
│          ▼                         ▼                         ▼                      ▼           │
│  ┌────────────────┐        ┌────────────────┐        ┌────────────────┐    ┌────────────────┐   │
│  │ Event:         │        │ Event:         │        │ Event:         │    │ Event:         │   │
│  │ Filter Input   │        │ Reset Filter   │        │ Lang Switch    │    │ URL Click      │   │
│  │ (Search/Sort)  │        │ Click          │        │ Click          │    │ (Nav/Ext)      │   │
│  └───────┬────────┘        └───────┬────────┘        └───────┬────────┘    └───────┬────────┘   │
│          │                         │                         │                     │            │
│          ▼                         ▼                         ▼                     ▼            │
│  ┌────────────────┐        ┌────────────────┐        ┌────────────────┐    ┌────────────────┐   │
│  │ applyFilters() │        │ resetFilters() │        │ setLanguage()  │    │ Browser Action │   │
│  │                │        │                │        │                │    │                │   │
│  └───────┬────────┘        └───────┬────────┘        └───────┬────────┘    └───────┬────────┘   │
│          │                         │                         │                     │            │
│          ▼                         │                         ▼                     │            │
│  ┌────────────────┐                │                ┌────────────────┐             │            │
│  │ Filter Array   │◄───────────────┘                │ Iterate DOM &  │             │            │
│  │ Data           │                                 │ Update Text    │             │            │
│  └───────┬────────┘                                 └────────┬───────┘             │            │
│          │                                                   │                     │            │
│          ▼                                                   │                     │            │
│  ┌────────────────┐                                          │                     │            │
│  │ Clear & Render │                                          │                     │            │
│  │ List HTML      │                                          │                     │            │
│  └───────┬────────┘                                          │                     │            │
│          │                                                   │                     │            │
│          └─────────────────────────┬─────────────────────────┘                     │            │
│                                    │                                               │            │
│                                    ▼                                               ▼            │
│                           ═══════════════════                                     ◉ End         │
│                           ║   IDLE STATE    ║                                (Navigasi Pindah)  │
│                           ═══════════════════                                                   │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Penjelasan Alur (Logic Flow)

1. **Inisialisasi**: Saat script dimuat, variabel global (`allEvents`, array data) disiapkan.
2. **Setup**: Ketika DOM siap (`DOMContentLoaded`), aplikasi memanggil fungsi utama:
   - `loadEvents()`: Mengambil data Seminar.
   - `loadCompetitions()`: Mengambil data Lomba.
   - `loadComserv()`: Mengambil data Pengabdian Masyarakat.
   - `updateLanguageButtons()`: Mengatur tampilan tombol bahasa awal.
3. **Fetching Data (Parallel)**:
   - Aplikasi melakukan request HTTP ke Google Sheets API secara asinkron (`async/await`).
   - Jika sukses: Data JSON disimpan ke variabel global → Filter diinisialisasi → Data dirender ke HTML.
   - Jika gagal: Pesan error ditampilkan di list.
4. **Idle State**: Aplikasi menunggu interaksi pengguna.
5. **Event Handling**:
   - **Filter Input**: Saat user mengetik/memilih filter, fungsi `applyFilters()` dijalankan untuk memfilter array data dan merender ulang list.
   - **Reset Filter**: Tombol reset mengembalikan nilai input ke default dan memanggil `applyFilters()`.
   - **Language Switch**: Mengubah variabel bahasa dan mengupdate semua teks di halaman.
   - **Navigasi**: Link eksternal/internal ditangani oleh browser.

---

*Dokumen ini dibuat untuk keperluan dokumentasi Program Design Method - BINUS Event Finder*
