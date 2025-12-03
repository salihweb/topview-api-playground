import axios from "axios";
import "dotenv/config";

const endpointUrl = "https://api.topview.ai/";
const headers = {
  Authorization: `Bearer ${process.env.TOPVIEW_API_KEY}`,
  "Topview-Uid": process.env.TOPVIEW_UID,
};

console.log("🧑‍🚀 AiAvatar Query");
console.log("==================");

// Simple CLI flag parser: --key value
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    const name = key.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : true;
    if (value !== true) i++;
    args[name] = value;
  }
  return args;
}

const args = parseArgs(process.argv);

// Build query params (all optional)
const queryParams = new URLSearchParams();

if (args.pageNo) queryParams.set("pageNo", String(args.pageNo));
if (args.pageSize) queryParams.set("pageSize", String(args.pageSize));
if (args.gender) queryParams.set("gender", String(args.gender)); // "male" | "female" | "other" (as per API)

// ethnicityIdList: comma-separated list → API expects repeated or joined? The doc shows a param name only.
// We'll send as comma-separated string ("id1,id2").
if (args.ethnicityIdList) queryParams.set("ethnicityIdList", String(args.ethnicityIdList));

if (args.sortField) queryParams.set("sortField", String(args.sortField)); // e.g., createTime
if (args.sortType) queryParams.set("sortType", String(args.sortType)); // asc | desc

// --isCustom can be true/false or 0/1
if (typeof args.isCustom !== "undefined") {
  const val = String(args.isCustom).toLowerCase();
  const normalized = val === "1" || val === "true" ? "true" : val === "0" || val === "false" ? "false" : String(args.isCustom);
  queryParams.set("isCustom", normalized);
}

const url = `${endpointUrl}/v1/aiavatar/query${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

async function run() {
  try {
    console.log("🔗 URL:", url);
    const response = await axios.get(url, { headers });
    const data = response.data;

    console.log("\n✅ Yanıt alındı");
    if (data?.result?.data?.length) {
      console.log(`📦 Toplam: ${data.result.total} | Sayfa: ${data.result.pageNo}/${Math.ceil((data.result.total || 0) / (data.result.pageSize || data.result.data.length || 1))}`);
      console.log("\n🧾 Kısa Liste:");
      for (const item of data.result.data) {
        const ethnicities = Array.isArray(item.ethnicities) ? item.ethnicities.map(e => e.ethnicityName).join(", ") : "";
        console.log(`- ${item.aiavatarName || "(no-name)"} | id=${item.aiavatarId} | gender=${item.gender} | ethnicities=${ethnicities}`);
      }
    } else {
      console.log("ℹ️ Liste boş.");
    }

    console.log("\n📊 Ham JSON:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Hata oluştu:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}

run();

/*
Kullanım örnekleri:

node aiavatar-query.js --pageNo 1 --pageSize 20
node aiavatar-query.js --gender female --sortField createTime --sortType desc
node aiavatar-query.js --ethnicityIdList 1001,1002 --isCustom true

API dokümantasyonu: https://s.apifox.cn/115a0d85-28a5-479d-8b8b-83d7898a7246/api-273646925
*/


