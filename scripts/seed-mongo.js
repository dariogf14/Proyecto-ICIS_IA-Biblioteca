const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const logSchema = new mongoose.Schema({
  action: String,
  entity: String,
  detail: String,
  createdAt: { type: Date, default: Date.now }
});

async function main() {
  // funcion para cargar MongoDB
  const logs = JSON.parse(fs.readFileSync("scripts/logs.json", "utf8"));
  await mongoose.connect(process.env.MONGODB_URI);
  const Log = mongoose.models.Log || mongoose.model("Log", logSchema);
  await Log.deleteMany({});
  await Log.insertMany(logs);
  await mongoose.disconnect();
  console.log("MongoDB cargado correctamente");
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
