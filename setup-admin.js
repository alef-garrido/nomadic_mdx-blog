import fs from "fs";
import path from "path";
import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

async function setup() {
  try {
    // Create data directory
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Check if admin already exists
    if (fs.existsSync(ADMIN_FILE)) {
      console.log("✓ Admin file already exists");
      return;
    }

    // Create default admin
    const email = process.env.ADMIN_EMAIL || "admin@nomadic.com";
    const password = process.env.ADMIN_PASSWORD || "ChangeMeInProduction123!";
    const salt = await bcryptjs.genSalt(12);
    const passwordHash = await bcryptjs.hash(password, salt);

    const admin = {
      id: randomUUID(),
      email,
      passwordHash,
      name: "Admin",
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(ADMIN_FILE, JSON.stringify([admin], null, 2));
    console.log("✓ Admin user created successfully");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
  } catch (error) {
    console.error("✗ Error setting up admin:", error.message);
    process.exit(1);
  }
}

setup();
