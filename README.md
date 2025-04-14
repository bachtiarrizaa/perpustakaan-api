# 📚Library Management API

## 📌Deskripsi
Aplikasi ini adalah RESTful API untuk manajemen perpustakaan menggunakan Node.js, Express, dan Sequelize sebagai ORM untuk MySQL. API ini memungkinkan anggota perpustakaan untuk melakukan peminjaman dan pengembalian buku yang ada di perpustakaan yang sudah di masukkan oleh petugas perpustakaan.

## 🚀Fitur
- **Anggota**:
  - Melihat daftar semua buku
  - Melihat detail buku tertentu
  - Melakukan peminjaman dan pengembalian buku
- **Petugas**:
  - Melakukan CRUD Author
  - Melakukan CRUD Publisher
  - Melakukan CRUD Book
  - Melakukan CRUD peminjaman dan pengembalian buku

## 🛠Teknologi yang Digunakan
- **Node.js** dengan **Express.js** sebagai backend
- **Sequelize ORM** untuk manajemen database
- **JWT (JSON Web Token)** untuk autentikasi
- **MySQL** sebagai database

<!-- ## 🔐Middleware
- `mustLogin`: Middleware yang memverifikasi apakah pengguna sudah login.
- `mustAdmin`: Middleware yang memastikan hanya admin yang dapat mengakses fitur tertentu. -->

## 📌API Endpoint
| Metode | Endpoint           | Akses      | Deskripsi                       |
|--------|--------------------|------------|---------------------------------|
| POST   | /api/auth/register | Publik     | Mendaftarkan pengguna baru      |
| POST   | /api/auth/login    | Publik     | Login untuk mendapatkan token   |
| POST   | /api/auth/logout   | Publik     | Logout untuk pengguna           |
| ---------------------------- Still On Going -------------------------------|
<!-- | GET    | /api/book          | User/Admin | Mendapatkan daftar buku         |
| GET    | /api/book /:id     | User/Admin | Mendapatkan detail buku         |
| POST   | /api/book          | Admin      | Menambahkan buku baru           |
| PUT    | /api/book /:id     | Admin      | Mengedit data buku              |
| DELETE | /api/book /:id     | Admin      | Menghapus buku                  | -->

## 📌Instalasi & Menjalankan Aplikasi
1. Clone repository ini:
   ```sh
   git clone https://github.com/bachtiarrizaa/perpustakaan-api.git
   cd repository
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Konfigurasi file `.env`:
   ```
   PORT=9000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=perpustakaan-api
   JWT_SECRET=your_secret_key
   ```
4. Jalankan migrasi database:
   ```sh
   npx sequelize db:migrate
   ```
5. Jalankan server:
   ```sh
   npm start
   ```

Akses API melalui Postman atau aplikasi client API lainnya.

---

Jika ada pertanyaan lebih lanjut atau ingin kontribusi, silakan buat _issue_ di repository ini. Terima kasih!