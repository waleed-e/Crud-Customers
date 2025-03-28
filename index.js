const mongoose = require('mongoose');
const express = require('express');
const morgan = require("morgan");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const UserRoute = require('./routes/userRoutes')

app.use(express.json());


app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.use(express.static('public'))

// auto refresh 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use((req, res, next) => {
  res.on("finish", () => {
      console.log(`${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});

// ✅ التقاط الأخطاء غير المعالجة قبل تشغيل السيرفر
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection: ${err.name} | ${err.message}`);
  process.exit(1);
});

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("✅ Database connected successfully");

        // ✅ تحميل الـ Routes بعد نجاح الاتصال
        const UserRoute = require('./routes/userRoutes');
        app.use('/', UserRoute);

        // ✅ تشغيل السيرفر بعد الاتصال بقاعدة البيانات
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed", err);
        process.exit(1); // إذا فشل الاتصال، ننهي التطبيق
    });
    








app.get('/user/search.html', (req, res) => {
  res.render('user/search');
});




