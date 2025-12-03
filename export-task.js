
import axios from "axios";
import "dotenv/config";

const endpointUrl = "https://api.topview.ai/";
const headers = {
  Authorization: `Bearer ${process.env.TOPVIEW_API_KEY}`,
  "Topview-Uid": process.env.TOPVIEW_UID,
  "Content-Type": "application/json",
};

console.log("📤 Avatar Marketing Video Export API");
console.log("=================================");

// CLI usage: node export-task.js <taskId> [scriptId] [noticeUrl]
const [, , cliTaskId, cliScriptId, cliNoticeUrl] = process.argv;

const payload = {
  taskId: cliTaskId || process.env.TOPVIEW_TASK_ID || "",
  // scriptId number olmalı; sağlanmazsa undefined gönderme (API default'u kullanır)
  ...(cliScriptId ? { scriptId: Number(cliScriptId) } : {}),
  ...(cliNoticeUrl ? { noticeUrl: cliNoticeUrl } : {}),
};

if (!payload.taskId) {
  console.error("❌ taskId gerekli. Kullanım: node export-task.js <taskId> [scriptId] [noticeUrl]");
  process.exit(1);
}

console.log("📦 Export isteği payload:");
console.log(JSON.stringify(payload, null, 2));

async function exportVideo() {
  try {
    console.log("\n🚀 Export isteği gönderiliyor...");
    const response = await axios.post(
      `${endpointUrl}/v1/m2v/export`,
      payload,
      { headers }
    );

    console.log("✅ Export isteği kabul edildi!");
    console.log("📊 Response:");
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data?.result?.taskId) {
      console.log(`\n🆔 Task ID: ${response.data.result.taskId}`);
      console.log(`📈 Status: ${response.data.result.status}`);
      if (response.data.result.errorMsg) {
        console.log(`❗ errorMsg: ${response.data.result.errorMsg}`);
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
    process.exit(1);
  }
}

exportVideo();
