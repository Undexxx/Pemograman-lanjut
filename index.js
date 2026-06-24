import express from "express";
import db from "./config/db.config.js";
import bukus from "./routes/buku.routes.js"
import mahasiswas from "./routes/mahasiswa.routes.js"
import prodis from "./routes/prodi.routes.js"
import pinjams from "./routes/pinjam.routes.js"
import detail_pinjams from "./routes/detail_pinjam.routes.js";
import cors from "cors";
import user from "./routes/user.routes.js";
const app=express();
try {
    await db.authenticate();
    console.log("database ok");

    await db.sync();
    console.log ("database tersingkronisasi");
    
} catch (error) {
    console.log("belum konek",error);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/buku',bukus);
app.use('/api/mahasiswa',mahasiswas);
app.use('/api/prodi',prodis);
app.use('/api/pinjam',pinjams);
app.use('/api/detail_pinjam',detail_pinjams);
app.use('/api/user',user);
app.listen(5000);
