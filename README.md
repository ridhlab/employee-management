## Employee Management
### Proses instalasi
1. Clone repository ini dengan command 
   ```
   git clone git@github.com:ridhlab/employee-management.git
   ```
2. Buat file `.env` di folder `backend` , dan copy isi dari `.env.example` dan paste ke dalam file `.env`.
3. Sesuaikan nama database, username, serta password di file `.env` tersebut.
4. Jalankan command 
   ```
   php artisan storage:link
   ```
5. Jalankan server backend. Pastikan beradara di folder `backend`, lalu jalankan command
   ```
   php artisan serve
   ```
6. Jalankan server frontend.  Pastikan beradara di folder `fronend`, lalu jalankan command
   ```
   yarn dev
   ```