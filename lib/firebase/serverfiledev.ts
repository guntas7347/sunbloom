"use server";

import fs from "fs";
import path from "path";

const directory = "services";
const filePath = path.join(process.cwd(), "services", "data.json");

export const serverFileSave = async (json: any) => {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log(`JSON data saved to ${filePath}`);
  } catch (error) {
    console.error("Error saving JSON data:", error);
  }
};
