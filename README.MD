## About

Dailytask adalah RESTful API yang dibuat menggunakan **Express.js** dan **PostgreSQL**.
Aplikasi ini memiliki tujuan untuk mencatat task yang perlu anda kerjakan hari ini.
Dipagi hari anda menambahkan data task, kemudian setelah dirasa cukup dan terstruktur,
silahkan retrieve data task dan mulai bekerja! agar lebih produktif.

Catatan: ini adalah aplikasi untuk pembelajaran yang bertujuan untuk mengimplementasikan proposal dari "_/specs/dailytask.yaml_".

## Machine Information

Development Server

```
Linux kernel: 5.15.21-1-MANJARO
Node version: v16.13.1
Postgres: 13.4
Yarn: 1.22.17
```

## Structure

file yang berada di root "/" merupakan file config untuk pembuatan aplikasi, yang perlu dikerjakan berada di file "**src/**".
Berikut ini merupakan fungsi masing-masing domains didalam directory **"src/"**.

```txt
/__test__: helpers untuk testing case jest, misalnya melakukan operations ke DB
/bin: file binary yang diperlukan untuk menjalankan HTTP Server
/controllers: berisi handler dari *routes*
/exceptions: terdapat jenis instance error yang dimungkinkan
/middlewares: terdapat middleware local, yang terpisah dari routes.
/migrations: berisi file migrasi database untuk operasi database, dengan dependency `node-pg-migrate` and `pg`
/routes: daftar services endpoint yang dihandle oleh `serverRouter`
/services: terdapat services yang akan dikonsumsi oleh `controllers` dan `routes`
/utils: terdapat plugins yang dapat menambahkan fungsionalitas `services`
/validations: validasi schema data untuk HTTP body-request
app.js: berisi entrypoint dan domains yang akan didaftarkan ke Express.js
```

## Copyright

Dibawah lisensi MIT copyright (c) 2022
