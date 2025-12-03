import axios from "axios";
import "dotenv/config";

const endpointUrl = "https://api.topview.ai/";
const headers = {
  Authorization: `Bearer ${process.env.TOPVIEW_API_KEY}`,
  "Topview-Uid": process.env.TOPVIEW_UID,
};

console.log("🔍 Avatar Marketing Video Task Query API");
console.log("=====================================");

// Task ID'yi buraya girin (submit-task.js'den alınan task ID)
const taskId = "58503955887a4d039c4422529435d263"; // Bu değeri değiştirin

if (taskId === "YOUR_TASK_ID_HERE") {
  console.log("❌ Lütfen önce task ID'yi girin!");
  console.log("💡 submit-task.js dosyasından alınan task ID'yi buraya yapıştırın.");
  process.exit(1);
}

async function queryTaskStatus() {
  try {
    console.log(`🔍 Task ID: ${taskId} sorgulanıyor...`);
    
    const response = await axios.get(
      ` https://api.topview.ai//v1/m2v/task/query?taskId=58503955887a4d039c4422529435d263`,
      { headers }
    );
    
    console.log("✅ Task durumu alındı!");
    console.log("📊 Response:");
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.result) {
      const result = response.data.result;
      console.log("\n📋 Task Bilgileri:");
      console.log(`🆔 Task ID: ${result.taskId || 'N/A'}`);
      console.log(`📈 Status: ${result.status || 'N/A'}`);
      console.log(`📅 Create Time: ${result.createTime || 'N/A'}`);
      console.log(`⏰ Update Time: ${result.updateTime || 'N/A'}`);
      
      if (result.errorMsg) {
        console.log(`❌ Error: ${result.errorMsg}`);
      }
      
      if (result.resultUrl) {
        console.log(`🎬 Result URL: ${result.resultUrl}`);
      }
      
      if (result.progress) {
        console.log(`📊 Progress: ${result.progress}%`);
      }
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
queryTaskStatus();
