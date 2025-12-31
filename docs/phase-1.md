# Dokumentasi Teknis Fase 1: KucingKita.id 

Dokumen ini adalah "Master Log" untuk pengerjaan Fase 1. Gunakan file ini sebagai konteks utama saat melanjutkan ke Fase 2 untuk menjaga konsistensi desain, struktur folder, dan stabilitas navigasi.

---

## 1. Daftar File & Perubahan Utama

### Layout Components (`/components/layout`)
- **`site-header.tsx`**: 
  - Navigasi responsif dengan implementasi **Mega Menu** (Desktop) dan **Collapsible Menu** (Mobile).
  - Menggunakan logic `asChild` pada `NavigationMenuLink` untuk mencegah error rendering.
- **`site-footer.tsx`**: 
  - Layout 4-kolom simetris.
  - Penyesuaian teks kutipan kucing (Cat Fact) menggunakan HTML entities untuk menghindari error build.

---

## 2. Implementasi Mega Menu & Responsivitas

Ini adalah fitur inti yang harus dipertahankan konsistensinya:

### A. Desktop Mega Menu (Anabul Care)
- **Komponen**: Menggunakan `NavigationMenu` dari Shadcn UI.
- **Layout**: Grid 2-kolom di dalam dropdown.
  - **Kiri (Highlight)**: Area promosi dengan background `slate-50` (light) / `slate-900/50` (dark) dan radius `rounded-l-[1.9rem]`.
  - **Kanan (Links)**: Daftar sub-menu (Nutrisi, Kesehatan, Wellness, Perilaku) dengan hover effect `bg-primary/5`.
- **Desain**: Menggunakan `shadow-2xl` dan `border-none` untuk tampilan *seamless* dan modern.

### B. Mobile Mega Menu (Collapsible)
- **Komponen**: Menggunakan `Sheet` (Drawer) dan `Collapsible`.
- **Konsistensi**: Sub-menu yang ada di desktop dipindahkan ke dalam `CollapsibleContent` agar user HP mendapatkan akses informasi yang sama.
- **UX**: Teks menu utama dibuat besar (`text-3xl font-black`) untuk kemudahan navigasi jempol.

---

##  3. Masalah Teknis & Solusi Teruji

| Fitur | Masalah | Solusi |
| :--- | :--- | :--- |
| **Mega Menu Desktop** | Muncul error `<a> inside <a>`. | Menggunakan properti `asChild` pada komponen Radix UI. |
| **Mega Menu Mobile** | Layout hancur jika pakai `NavigationMenu` desktop. | Diganti menggunakan `Collapsible` manual di dalam `Sheet` agar fleksibel. |
| **Dark Mode Toggle** | Hilang saat tampilan dikecilkan (mobile). | Dipindahkan ke luar div `hidden lg:flex` agar selalu *visible* di samping Hamburger menu. |
| **Collapsible Module** | Error `Cannot find module`. | Instalasi manual via CLI: `npx shadcn@latest add collapsible`. |

---

##  4. Aturan Desain (Untuk Fase 2)
1. **Mega Menu**: Jika menambah kategori baru di navigasi, wajib mengikuti struktur 2-kolom (Bento-style) seperti pada menu "Anabul Care".
2. **Typography**: Gunakan `font-black` dan `tracking-tighter` untuk heading/branding.
3. **Radius**: Gunakan radius ekstrem (`rounded-2xl` sampai `rounded-[2.5rem]`) untuk semua kontainer besar.
4. **Spacing**: Gunakan tinggi header `h-20` di desktop untuk menjaga kelegaan visual.

---
*Status: Fase 1 Selesai & Stabil. Siap lanjut ke Fase 2 (Data & Routing).*