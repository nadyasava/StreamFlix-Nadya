# Cara Menjalankan Proyek di Localhost

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di localhost pada berbagai sistem operasi.

## 1. Meng-clone Repository
Untuk memulai, Anda perlu meng-clone repository ini ke komputer lokal. Buka terminal atau command prompt, kemudian jalankan perintah berikut:

```bash
git clone https://github.com/nadyasava/StreamFlix-Nadya.git
```

## 2. Masuk ke Direktori Proyek
Setelah berhasil meng-clone repository, masuk ke dalam folder proyek dengan perintah:
```bash
cd repository-name
```

## 3. Instalasi Dependencies
Sebelum menjalankan proyek, Anda perlu menginstal dependencies yang diperlukan. Jalankan perintah berikut untuk menginstal dependencies yang tercantum dalam package.json:
```bash
npm install
```

## 4. Menjalankan Proyek di Localhost
Setelah dependencies terinstal, Anda bisa menjalankan proyek di localhost dengan perintah:
```bash
npm start
```
Server akan dimulai, dan aplikasi akan dibuka di browser default Anda. Jika aplikasi tidak terbuka secara otomatis, Anda dapat membuka browser dan mengakses aplikasi dengan URL:
```bash
http://localhost:3000
```

# Langkah untuk Setiap Sistem Operasi

## Windows
### 1. Instalasi Node.js:
- Unduh dan instal Node.js dari nodejs.org.
- Pastikan untuk mencentang opsi "Add to PATH" selama instalasi agar node dan npm dapat dijalankan di terminal.
### 2. Menggunakan Command Prompt atau PowerShell:
- Buka Command Prompt atau PowerShell.
- Ikuti langkah-langkah di atas untuk meng-clone repository, menginstal dependencies, dan menjalankan aplikasi.

## MacOS
### 1. Instalasi Node.js:
- Anda dapat menginstal Node.js menggunakan Homebrew. Jika belum terpasang, instal Homebrew terlebih dahulu dengan menjalankan perintah:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- Setelah itu, instal Node.js dengan perintah:
  ```bash
  brew install node
  ```
### 2. Menjalankan Proyek:
- Buka Terminal dan jalankan langkah-langkah yang sama seperti yang ada di atas untuk meng-clone repository dan menjalankan aplikasi.

## Linux (Ubuntu)
### 1. Instalasi Node.js:
- Buka terminal dan jalankan perintah berikut untuk menginstal Node.js dan npm:
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```
- Setelah Node.js terinstal, ikuti langkah-langkah yang sama untuk meng-clone repository dan menjalankan aplikasi.
### 2. Menjalankan Proyek:
- Buka Terminal dan jalankan langkah-langkah yang sama seperti yang ada di atas untuk meng-clone repository dan menjalankan aplikasi.

Dengan mengikuti langkah-langkah di atas, proyek ini seharusnya dapat berjalan di localhost Anda pada berbagai sistem operasi. Jika Anda mengalami masalah, pastikan Node.js dan npm sudah terpasang dengan benar, dan coba ulangi proses instalasi dependencies.
