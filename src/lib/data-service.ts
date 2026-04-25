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
  const sheetUrl = GOOGLE_SHEET_CSV_URL;

  if (!sheetUrl) {
    console.warn("GOOGLE_SHEET_CSV_URL is not defined");
    return [];
  }

  try {
    // Edge-compatible fetch with cache busting
    const urlWithCacheBuster = `${sheetUrl}&t=${Date.now()}`;
    
    console.log("Fetching products from:", urlWithCacheBuster);
    
    const response = await fetch(urlWithCacheBuster, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
      },
      cache: 'no-store', // Cloudflare Edge compatible
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status}`);
    }
    
    const csvData = await response.text();
    const lines = csvData.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) {
      return [];
    }
    
    const rows = lines.slice(1); // Skip header row
    
    return rows.map((line, index) => {
      try {
        const columns = parseCSVLine(line);
        return {
          id: columns[0] || `row-${index}`,
          name: columns[1] || "Unnamed Product",
          price: parseFloat(columns[2]?.replace(/[^0-9.]/g, "") || "0"),
          category: (columns[3]?.toLowerCase() || "frocks") as Category,
          description: columns[4] || "",
          icon: columns[5] || "",
          rating: parseFloat(columns[6] || "5"),
          isPair: columns[7]?.toUpperCase() === "TRUE",
          stockStatus: (columns[8]?.toLowerCase() || "in-stock") as any,
        };
      } catch (e) {
        console.error("Error parsing CSV line:", e);
        return null;
      }
    }).filter((p): p is Product => p !== null && !!p.id);
    
  } catch (error) {
    console.error("Cloudflare Edge Fetch Error:", error);
    // Return empty array or fallback to static data
    return [];
  }
}
