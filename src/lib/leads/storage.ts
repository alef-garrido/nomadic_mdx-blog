import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Lead, LeadInput } from "./validation";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

// Read all leads
async function readLeads(): Promise<Lead[]> {
  await ensureDataDir();
  try {
    const content = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    // File doesn't exist yet
    return [];
  }
}

// Write leads to file
async function writeLeads(leads: Lead[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Create a new lead
export async function createLead(data: LeadInput): Promise<Lead> {
  const leads = await readLeads();

  // Check for duplicate email
  if (leads.some((lead) => lead.email === data.email)) {
    throw new Error("Email already exists");
  }

  const now = new Date().toISOString();
  const newLead: Lead = {
    id: randomUUID(),
    ...data,
    createdAt: now,
    updatedAt: now,
    status: "new",
  };

  leads.push(newLead);
  await writeLeads(leads);
  return newLead;
}

// Get all leads
export async function getAllLeads(): Promise<Lead[]> {
  return readLeads();
}

// Get lead by ID
export async function getLead(id: string): Promise<Lead | null> {
  const leads = await readLeads();
  return leads.find((lead) => lead.id === id) || null;
}

// Update lead
export async function updateLead(
  id: string,
  updates: Partial<Omit<Lead, "id" | "createdAt">>
): Promise<Lead | null> {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeLeads(leads);
  return leads[index];
}

// Delete lead
export async function deleteLead(id: string): Promise<boolean> {
  const leads = await readLeads();
  const filtered = leads.filter((lead) => lead.id !== id);

  if (filtered.length === leads.length) return false;

  await writeLeads(filtered);
  return true;
}
