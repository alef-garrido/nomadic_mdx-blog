import { promises as fs } from "fs";
import path from "path";
import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";

export interface Admin {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin";
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

async function readAdmins(): Promise<Admin[]> {
  await ensureDataDir();
  try {
    const content = await fs.readFile(ADMIN_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeAdmins(admins: Admin[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(ADMIN_FILE, JSON.stringify(admins, null, 2));
}

// Hash password with bcryptjs
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(12);
  return bcryptjs.hash(password, salt);
}

// Validate password against hash
export async function validatePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

// Get admin by email
export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const admins = await readAdmins();
  return admins.find((admin) => admin.email === email) || null;
}

// Validate admin credentials
export async function validateAdmin(
  email: string,
  password: string
): Promise<Admin | null> {
  const admin = await getAdminByEmail(email);
  if (!admin) return null;

  const isValid = await validatePassword(password, admin.passwordHash);
  return isValid ? admin : null;
}

// Create admin user (used for initialization)
export async function createAdmin(
  email: string,
  password: string,
  name: string
): Promise<Admin> {
  const admins = await readAdmins();

  // Check if email already exists
  if (admins.some((admin) => admin.email === email)) {
    throw new Error("Admin email already exists");
  }

  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();

  const newAdmin: Admin = {
    id: randomUUID(),
    email,
    passwordHash,
    name,
    role: "admin",
    createdAt: now,
  };

  admins.push(newAdmin);
  await writeAdmins(admins);
  return newAdmin;
}

// Initialize default admin if none exists
export async function initializeDefaultAdmin(): Promise<void> {
  const admins = await readAdmins();

  // If admin already exists, don't recreate
  if (admins.length > 0) {
    return;
  }

  const email = process.env.ADMIN_EMAIL || "admin@nomadic.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMeInProduction123!";
  const name = "Admin";

  await createAdmin(email, password, name);
}
