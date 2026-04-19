import { Product, Category } from "@/types";

// This is where your Google Sheet CSV Link will go
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRVUuM8JphrpAOtu0GZrChKUxCXQr3vbMZdeA8_OWAhVvgxHu0nzA0aPgPmJWe_kX8Qh9fzSDD7vsQO/pub?output=csv"; 

/**
 * Robust CSV Parser that handles quoted strings with commas
 */
function parseCSVLine(line: string): string[] {
  const result = [];
  let cur = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

export async function getProductsFromSheet(): Promise<Product[]> {
  if (!GOOGLE_SHEET_CSV_URL) {
    const { initialProducts } = await import("@/data/products");
    return initialProducts;
  }

  try {
    // Adding a timestamp to bypass any intermediate caching
    const urlWithCacheBuster = `${GOOGLE_SHEET_CSV_URL}&t=${Date.now()}`;
    
    const response = await fetch(urlWithCacheBuster, {
      next: { revalidate: 60 } // Revalidate every 60 seconds instead of 300
    });
    
    if (!response.ok) throw new Error("Failed to fetch sheet data");
    
    const csvData = await response.text();
    const lines = csvData.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) return []; // Only header or empty
    
    const rows = lines.slice(1); // Skip header row
    
    return rows.map((line) => {
      const columns = parseCSVLine(line);
      return {
        id: columns[0] || "",
        name: columns[1] || "Unnamed Product",
        price: parseFloat(columns[2]?.replace(/[^0-9.]/g, "") || "0"),
        category: (columns[3] || "frocks") as Category,
        description: columns[4] || "",
        icon: columns[5] || "",
        rating: parseFloat(columns[6] || "5"),
        isPair: columns[7]?.toUpperCase() === "TRUE",
        stockStatus: (columns[8] || "in-stock") as any,
      };
    }).filter(p => p.id);
    
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    try {
      const { initialProducts } = await import("@/data/products");
      return initialProducts;
    } catch {
      return [];
    }
  }
}
