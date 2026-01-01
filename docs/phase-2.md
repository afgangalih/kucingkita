# Dokumentasi Teknis Fase 2: KucingKita.id

## Fokus: Authentikasi, Proteksi Rute, dan Admin Panel Scaffolding

Dokumen ini merupakan "Master Log" untuk Fase 2. Gunakan file ini sebagai konteks utama sebelum melanjutkan ke Fase 3 guna menjaga stabilitas sistem keamanan, integrasi database, dan konsistensi UI Dashboard.

---

## 1. Struktur Folder & Arsitektur Rute (Route Groups)

Telah diimplementasikan pemisahan total antara area publik dan area administratif menggunakan fitur Next.js Route Groups.

- **app/(public)/**:
  - Lokasi: Halaman yang dapat diakses pengunjung umum.
  - Layout: Menggunakan `SiteHeader` dan `SiteFooter` dari Fase 1.
  - File Utama: `page.tsx` (Landing Page).
- **app/(admin)/**:
  - Lokasi: Sistem internal dan Dashboard.
  - Layout: Menggunakan `SidebarProvider` dan navigasi khusus admin tanpa Header/Footer publik.
  - File Utama: `/login/page.tsx` dan `/admin/page.tsx`.
- **app/layout.tsx (Root)**:

  - Hanya berisi `ThemeProvider` dan konfigurasi font global untuk mencegah duplikasi elemen saat perpindahan grup rute.

  Reference: [Route Groups – Next.js Documentation](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups)

---

## 2. Daftar File Baru & Perubahan

### Konfigurasi & Utility

- **.env.local**: Penyimpanan variabel lingkungan untuk `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **lib/supabase.ts**: Inisialisasi Supabase Client menggunakan `@supabase/supabase-js` untuk interaksi data client-side.
- **proxy.ts (Root)**: Pengganti `middleware.ts` sesuai standar Next.js 16. Bertugas melakukan validasi session via cookies sebelum mengizinkan akses ke rute `/admin`.

### Komponen & Halaman Admin

- **app/(admin)/login/page.tsx**: Antarmuka login admin dengan logic sinkronisasi cookie manual.
- **app/(admin)/admin/layout.tsx**: Shell dashboard yang menyediakan struktur SidebarInset dan Breadcrumbs.
- **components/admin-sidebar.tsx**: Navigasi utama admin dengan fitur integrasi logout dan pembersihan session.

---

## 3. Log Kendala & Solusi Teknis (Incident Report)

| Masalah                   | Penyebab                                                                  | Solusi                                                                                      |
| :------------------------ | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| **Hydration Mismatch**    | ID dinamis Radix UI tidak sinkron antara Server & Client.                 | Penambahan state `mounted` pada SiteHeader untuk memastikan render terjadi hanya di Client. |
| **Export Name Error**     | Next.js 16 (Turbopack) mewajibkan penamaan fungsi sesuai nama file proxy. | Mengubah nama fungsi `middleware` menjadi `proxy` dan menggunakan `export default`.         |
| **Login Desync (Loop)**   | Proxy tidak bisa membaca session dari LocalStorage.                       | Implementasi `document.cookie` manual pada saat login untuk mengirim token ke server.       |
| **Missing Helper Export** | Versi terbaru library Supabase menghapus `createMiddlewareClient`.        | Migrasi ke standar `createClient` dengan pengecekan cookie secara eksplisit di `proxy.ts`.  |
| **404 pada Rute Baru**    | Cache Turbopack tidak mendeteksi folder grup rute baru.                   | Penghapusan folder `.next` secara manual dan restart server (`npm run dev`).                |

---

## 4. Alur Kerja Keamanan (Security Flow)

1. **Autentikasi**: Admin memasukkan kredensial -> Supabase memvalidasi -> Token JWT dihasilkan.
2. **Sinkronisasi**: Token disimpan di LocalStorage (Client) dan Cookie `sb-access-token` (Server).
3. **Proteksi Proxy**:
   - Setiap request ke `/admin/*` dicegat oleh `proxy.ts`.
   - Proxy membaca cookie, melakukan verifikasi `getUser(token)`.
   - Jika gagal, redirect ke `/login`. Jika berhasil, teruskan ke Dashboard.
4. **Logout**: Penghapusan session di Supabase dan penghapusan Cookie via `expires=Thu, 01 Jan 1970`.

---

## 5. Parameter Desain Dashboard (Fase 2)

- **Branding**: Menggunakan icon `PawPrint` dengan background `primary` dan radius `rounded-lg`.
- **Navigasi**: Sidebar mendukung mode `collapsible="icon"` untuk efisiensi layar.
- **Visual**: Card login menggunakan `rounded-[2.5rem]` dan shadow `2xl` untuk kesan modern dan premium.

---
