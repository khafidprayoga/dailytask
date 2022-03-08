## About

Dailytask adalah RESTful API yang dibuat menggunakan **Express.js** dan **PostgreSQL**.
Aplikasi ini memiliki tujuan untuk mencatat task yang perlu anda kerjakan hari ini.
Dipagi hari anda menambahkan data task, kemudian setelah dirasa cukup dan terstruktur,
silahkan retrieve data task dan mulai bekerja! agar lebih produktif.

Catatan: ini adalah aplikasi untuk pembelajaran yang bertujuan untuk mengimplementasikan proposal dari "_/specs/dailytask.yaml_".

## Structure

file yang berada di root "/" merupakan file config untuk pembuatan aplikasi, yang perlu dikerjakan berada di file "**src/**".
Berikut ini merupakan fungsi masing-masing domains didalam directory **"src/"**.

```txt
/__test__: helpers untuk testing case jest
/bin: file binary yang diperlukan untuk menjalankan server
/controllers: berisi handler dari *routes*
/exceptions: terdapat jenis error sesuai konteks
/migrations: berisi file migrasi database untuk operasi database
/routes: daftar path endpoint
/services: terdapat services yang akan dikonsumsi oleh controllers dan routes
/validations: validasi schema data untuk HTTP body-request
app.js: berisi entrypoint dan domains yang akan didaftarkan ke Express.js
```

## Copyright

Dibawah lisensi MIT copyright (C) 2022
