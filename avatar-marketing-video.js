import axios from "axios";
import "dotenv/config";

const endpointUrl = "https://api.topview.ai/";
const headers = {
  Authorization: `Bearer ${process.env.TOPVIEW_API_KEY}`,
  "Topview-Uid": process.env.TOPVIEW_UID,
  "Content-Type": "application/json",
};

console.log("🎬 Avatar Marketing Video Task Submit API");
console.log("======================================");

// Task submit için gerekli parametreler
const taskData = {
  // Ürün linki (string olarak, array değil)
  productLink: "https://anocin.com.tr/collections/frontpage/products/beautymix-collagen-peptides-type-i-ii-iii-for-sac-cilt-tirnak",
  
  // Ürün bilgileri (boş string yerine null)
  productName: null,
  productDescription: null,
  
  // Video ayarları
  aspectRatio: "9:16", // Video oranı
  language: "en", // Dil (tr: Türkçe, en: İngilizce)
  
  // Ses ve avatar ayarları (boş string yerine null)
  voiceId: "2r69IyOA7qyj1TKr11LiCXUGcPhsSYTW", // Ses ID'si (opsiyonel)
  captionId: null, // Altyazı ID'si (opsiyonel)
  aiavatarId: "c0e4c08a89bd48a98fe58e59d211fee3", // AI Avatar ID'si (opsiyonel)
  
  // Video uzunluğu
  videoLengthType: 1, // 1: Kısa, 2: Orta, 3: Uzun, 4: Çok Uzun (Default: 1)
  
  // Endcard ayarları (opsiyonel)
  // endcardFileId: null,
  // endcardAspectRatio: "16:9",
  // endcardBackgroundColor: "#FFFFFF",
  
  // Logo (opsiyonel)
  // logoFileId: null,
  
  // Diğer ayarlar
  preview: true, // Önizleme modu
  isDiyScript: false, // Özel script kullanımı
  diyScriptDescription: null, // Özel script açıklaması
  noticeUrl: null // Bildirim URL'i (opsiyonel)
};

console.log("📋 Task verileri:");
console.log(JSON.stringify(taskData, null, 2));

async function submitAvatarMarketingVideoTask() {
  try {
    console.log("\n🚀 Task submit ediliyor...");
    
    const response = await axios.post(
      `${endpointUrl}/v1/m2v/task/submit`,
      taskData,
      { headers }
    );
    
    console.log("✅ Task başarıyla submit edildi!");
    console.log("📊 Response:");
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.result && response.data.result.taskId) {
      console.log(`\n🆔 Task ID: ${response.data.result.taskId}`);
      console.log(`📈 Status: ${response.data.result.status}`);
      
      // Task durumunu kontrol etmek için kullanabilirsiniz
      console.log("\n💡 Task durumunu kontrol etmek için:");
      console.log(`GET ${endpointUrl}/v1/m2v/task/query?taskId=${response.data.result.taskId}`);
    }
    
  } catch (error) {
    console.error("❌ Hata oluştu:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Fonksiyonu çalıştır
submitAvatarMarketingVideoTask();
