import axios from "axios";
import "dotenv/config";
import mime from "mime-types";
import fs from "node:fs";

const endpointUrl = "https://api.topview.ai/";
const headers = {
  Authorization: `Bearer ${process.env.TOPVIEW_API_KEY}`,
  "Topview-Uid": process.env.TOPVIEW_UID,
};

const filePath = "./example-images/1.jpg";

console.log("🚀 Dosya yükleme işlemi başlatılıyor...");
console.log(`📁 Yüklenecek dosya: ${filePath}`);

// get file size and content type
const { size } = fs.statSync(filePath);
const contentType = mime.lookup(filePath) || "application/octet-stream";

console.log(`📊 Dosya boyutu: ${size} bytes`);
console.log(`🔤 Content-Type: ${contentType}`);

// get upload credentials
console.log("🔑 Upload credentials alınıyor...");
const uploadCredential = await axios.get(
  `${endpointUrl}/v1/upload/credential?format=jpg`,
  { headers }
);

console.log("✅ Upload credentials alındı");
console.log(`📤 Upload URL: ${uploadCredential.data.result.uploadUrl}`);
console.log(`🆔 File ID: ${uploadCredential.data.result.fileId}`);

// upload file
console.log("📤 Dosya yükleniyor...");
await axios.put(
  uploadCredential.data.result.uploadUrl,
  fs.createReadStream(filePath),
  {
    headers: {
      "Content-Length": size,
      "Content-Type": contentType,
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  }
);

console.log("✅ Dosya başarıyla yüklendi");

// check upload file
console.log("🔍 Upload durumu kontrol ediliyor...");
const checkUpload = await axios.get(
  `${endpointUrl}/v1/upload/check?fileId=${uploadCredential.data.result.fileId}`,
  { headers }
);

console.log("📋 Upload durumu:");
console.log(checkUpload.data);
console.log("🎉 İşlem tamamlandı!");
