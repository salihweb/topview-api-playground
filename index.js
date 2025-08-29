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

// get file size and content type
const { size } = fs.statSync(filePath);
const contentType = mime.lookup(filePath) || "application/octet-stream";

// get upload credentials
const uploadCredential = await axios.get(
  `${endpointUrl}/v1/upload/credential?format=jpg`,
  { headers }
);

// upload file
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

// check upload file
const checkUpload = await axios.get(
  `${endpointUrl}/v1/upload/check?fileId=${uploadCredential.data.result.fileId}`,
  { headers }
);

console.log(checkUpload.data);
