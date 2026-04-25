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
    
    console.log("Fetching products from:", urlWithCacheBuster);
    
    const response = await fetch(urlWithCacheBuster, {
      cache: 'no-store', // Disable browser cache
      next: { revalidate: 0 } // Disable Next.js cache
    });
    
    if (!response.ok) throw new Error(`Failed to fetch sheet data: ${response.status}`);
    
    const csvData = await response.text();
    console.log("CSV Data received, length:", csvData.length);
    
    const lines = csvData.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) {
      console.warn("Sheet is empty or only has headers");
      return [];
    }
    
    const rows = lines.slice(1); // Skip header row
    
    const parsedProducts = rows.map((line, index) => {
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
        console.error("Error parsing line:", line, e);
        return null;
      }
    }).filter((p): p is Product => p !== null && !!p.id);

    console.log(`Successfully parsed ${parsedProducts.length} products`);
    return parsedProducts;
    
  } catch (error) {
    console.error("CRITICAL: Error fetching Google Sheet data:", error);
    try {
      console.log("Falling back to initial products...");
      const { initialProducts } = await import("@/data/products");
      return initialProducts;
    } catch {
      return [];
    }
  }
}
