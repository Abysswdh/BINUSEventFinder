# Tabel Input-Proses-Output (IPO)
## BINUS Event Finder

---

## 6.1.1 Lihat Daftar Acara (Seminar / Kompetisi / Pengabdian Masyarakat)

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Halaman kategori acara yang dipilih (Seminar, Kompetisi, atau Pengabdian Masyarakat) | 1. Mengambil data acara dari Google Sheets API melalui endpoint `opensheet.elk.sh` menggunakan ID sheet dan nama sheet. <br> 2. Menampilkan animasi loading selama proses pengambilan data. <br> 3. Mem-parsing dan menormalisasi respons JSON (menangani nama field yang tidak case-sensitive seperti "Title", "title", "nama kegiatan"). <br> 4. Menginisialisasi sistem filter dengan data yang telah dimuat. <br> 5. Merender kartu acara ke halaman. | - Daftar acara yang tersedia ditampilkan dalam bentuk kartu berisi judul, tanggal, lokasi, dan tombol aksi. <br> - Jumlah hasil ditampilkan (contoh: "12 hasil"). <br> - Pesan error ditampilkan jika pengambilan data gagal ("Gagal memuat acara"). |

---

## 6.1.2 Filter Acara

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Kata kunci pencarian (input teks), Pilihan topik (dropdown), Checkbox lokasi (pilihan jamak), Slider timeline (rentang tanggal atau bulan), Pilihan urutan (Terbaru/Terlama) | 1. Mengambil nilai dari semua kontrol filter. <br> 2. Menerapkan filter pencarian: mencocokkan kata kunci di semua field teks dalam data acara. <br> 3. Menerapkan filter topik: mencocokkan konten acara dengan kata kunci yang telah ditentukan (contoh: "Technology" cocok dengan "coding", "data", "ai"). <br> 4. Menerapkan filter lokasi: memeriksa apakah lokasi acara sesuai dengan kampus yang dipilih (dilewati jika semua lokasi dipilih). <br> 5. Menerapkan filter timeline: mem-parsing tanggal acara dan membandingkan dengan rentang slider (berbasis hari untuk seminar, berbasis bulan untuk kompetisi). <br> 6. Mengurutkan hasil yang difilter berdasarkan tanggal (ascending atau descending). <br> 7. Merender ulang daftar acara yang telah difilter ke halaman. | - Daftar acara yang difilter sesuai semua kriteria yang dipilih. <br> - Jumlah hasil diperbarui (contoh: "5 hasil"). <br> - Pesan "Tidak ada acara yang ditemukan sesuai kriteria" jika tidak ada kecocokan. |

---

## 6.1.3 Reset Filter

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik tombol "Reset Filters" | 1. Mengosongkan field input pencarian (set ke string kosong). <br> 2. Mengatur ulang dropdown topik ke nilai default ("Semua Topik"). <br> 3. Mencentang semua checkbox lokasi. <br> 4. Mengatur ulang slider tanggal/bulan ke nilai default (30 hari untuk seminar, 3 bulan untuk kompetisi). <br> 5. Mengatur ulang dropdown urutan ke "Terbaru ke Terlama". <br> 6. Memperbarui teks tampilan slider. <br> 7. Menerapkan ulang filter dan merender ulang daftar acara lengkap. | - Semua kontrol filter dikembalikan ke kondisi default. <br> - Daftar acara lengkap tanpa filter ditampilkan. <br> - Jumlah hasil menampilkan total jumlah acara. |

---

## 6.1.4 Tambah Acara ke Kalender (Outlook)

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik tombol "Add to Outlook" pada kartu acara seminar | 1. Mengekstrak detail acara: judul, tanggal, waktu, lokasi, dan link pendaftaran dari data acara. <br> 2. Meng-encode semua parameter teks untuk keamanan URL menggunakan `encodeURIComponent()`. <br> 3. Membuat URL deep link kalender Outlook Live dengan parameter (subject, body, location). <br> 4. Membuka URL yang dibuat di tab browser baru. | - Tab browser baru terbuka dengan halaman compose kalender Outlook Live. <br> - Detail acara sudah terisi otomatis (judul sebagai subject, lokasi, dan link pendaftaran di body). |

---

## 6.1.5 Daftar / Lihat Detail Acara

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik tombol "Register / Detail" atau "View Details" pada kartu acara | 1. Mengambil link pendaftaran/detail dari data acara. <br> 2. Membuka link di tab browser baru menggunakan `target="_blank"`. | - Halaman pendaftaran eksternal atau halaman detail acara terbuka di tab baru. |

---

## 6.1.6 Ganti Bahasa (EN / ID)

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik tombol bahasa "EN" atau "ID" di header | 1. Mengatur variabel `currentLang` ke bahasa yang dipilih. <br> 2. Iterasi melalui semua elemen dengan atribut `data-i18n`. <br> 3. Mengganti konten teks atau placeholder dengan terjemahan yang sesuai dari objek translations. <br> 4. Memperbarui status aktif tombol bahasa (menambah/menghapus class `active`). | - Semua teks UI diperbarui ke bahasa yang dipilih (navigasi, judul, tombol, label, placeholder). <br> - Tombol bahasa aktif ditandai dengan highlight. |

---

## 6.1.7 Buka Item FAQ

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik pertanyaan FAQ (elemen summary) | 1. Toggle status buka/tutup elemen `<details>` (perilaku native HTML5). <br> 2. Menerapkan transisi CSS untuk efek expand/collapse yang halus. | - Teks jawaban ditampilkan/disembunyikan di bawah pertanyaan. |

---

## 6.1.8 Toggle Panel Filter (Collapse/Expand)

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik tombol toggle di header filter | 1. Toggle class `collapsed` pada container `#filter-content`. <br> 2. Memperbarui teks ikon toggle (+/−). | - Panel filter mengembang atau menciut. <br> - Ikon berubah untuk mencerminkan status saat ini (− saat terbuka, + saat tertutup). |

---

## 6.1.9 Hubungi Pengembang (WhatsApp/Email/LinkedIn)

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik ikon kontak di header hitam (WhatsApp, Email, atau LinkedIn) | 1. Membuat URL yang sesuai (link wa.me, link mailto, atau profil LinkedIn). <br> 2. Membuka URL di tab baru (WhatsApp/LinkedIn) atau klien email default (Email). | - WhatsApp: Membuka chat WhatsApp dengan nomor pengembang. <br> - Email: Membuka compose email dengan alamat email pengembang. <br> - LinkedIn: Membuka profil LinkedIn pengembang. |

---

## 6.1.10 Navigasi Antar Halaman

| **INPUT** | **PROSES** | **OUTPUT** |
|-----------|------------|------------|
| Klik item menu navigasi (Home, Seminar, Competitions, Community Service) | 1. Browser menavigasi ke halaman HTML yang sesuai. <br> 2. Halaman dimuat dan menginisialisasi data serta filter yang relevan. <br> 3. Item navigasi aktif ditandai dengan class CSS `active`. | - Halaman baru ditampilkan dengan konten yang sesuai. <br> - Item menu aktif ditandai secara visual dengan highlight. |

---

*Dokumen ini dibuat untuk keperluan dokumentasi Program Design Method - BINUS Event Finder*
