# 📚 Kitob Do'koni Boshqaruv API

Express.js va JSON fayl asosidagi ma'lumotlar bazasi yordamida yaratilgan onlayn kitob do'konini boshqarish uchun RESTful API. Foydalanuvchilar, kitoblar, kategoriyalar va buyurtmalar uchun to'liq CRUD operatsiyalari, validatsiya va xatoliklarni boshqarish tizimi mavjud.

## ✨ Asosiy Imkoniyatlar

- **Foydalanuvchilar boshqaruvi** - Rol asosidagi tizim (USER, ADMIN, SELLER, AUTHOR)
- **Kitoblar katalogi** - Kitoblarni nomi, muallif, narx, zaxira va kategoriya bilan boshqarish
- **Kategoriyalar** - Kitoblarni ierarxik kategoriyalarga ajratish
- **Buyurtmalar** - Mijozlar buyurtmalarini yaratish va boshqarish
- **Autentifikatsiya** - Email/parol asosida kirish tizimi
- **Bog'langan resurslar** - Foydalanuvchi buyurtmalari va kategoriya kitoblariga kirish
- **To'liq validatsiya** - Barcha maydonlar uchun tekshirish (email format, ma'lumot turlari)
- **Xatoliklarni boshqarish** - Markazlashtirilgan error handling
- **RESTful dizayn** - REST tamoyillariga mos HTTP metodlar va status kodlar

## 🛠 Texnologiyalar

- **Runtime:** Node.js
- **Framework:** Express.js
- **Ma'lumotlar bazasi:** JSON fayl tizimi
- **Modul tizimi:** ES Modules

## 🚀 O'rnatish
```bash
# Repozitoriyani klonlash
git clone https://github.com/username/bookstore-api.git
cd bookstore-api

# Bog'liqliklarni o'rnatish
npm install

# Database papkasini yaratish
mkdir database

# Serverni ishga tushirish
npm start
