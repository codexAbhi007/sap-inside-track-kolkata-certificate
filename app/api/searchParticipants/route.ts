import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const filePath = path.join(process.cwd(), "csv/participants.csv");
  const csv = fs.readFileSync(filePath, "utf-8");

  const { data } = Papa.parse(csv, { header: true });

  // Normalize each row
  const normalized = (data as any[]).map((p) => ({
    Name: p.Name || p.name || "",
    Organization:
      p.Organization || p.organisation || p.Organisation || p.Org || p.org || "" ,
  }));

  const results = normalized
    .filter((p) => p.Name.toLowerCase().includes(q))
    .slice(0, 10);

  return Response.json(results);
}
