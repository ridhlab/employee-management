## Employee Management
### Proses instalasi
1. Clone repository ini dengan command 
   ```
   git clone git@github.com:ridhlab/employee-management.git
   ```
2. Buat file `.env` di folder `backend` , dan copy isi dari `.env.example` dan paste ke dalam file `.env`.
3. Sesuaikan nama database, username, serta password di file `.env` tersebut.
4. Di folder `backend` jalankan command 
   ```
   composer install
   ```
5. Jalankan command 
   ```
   php artisan storage:link
   ```
6. Jalankan server backend. Pastikan berada di folder `backend`, lalu jalankan command
   ```
   php artisan serve
   ```
7. Di folder `frontend` jalankan command
   ```
   yarn install
   ```
8. Pastikan berada di folder `fronend`, lalu build dengan command
   ```
   yarn build 
   ```
9. Setelah proses build selesai, run dengan menggunakan command
    ```
    yarn start
    ```