import { Product, Category } from "@/types";

// This is where your Google Sheet CSV Link will go
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRVUuM8JphrpAOtu0GZrChKUxCXQr3vbMZdeA8_OWAhVvgxHu0nzA0aPgPmJWe_kX8Qh9fzSDD7vsQO/pub?output=csv"; 

export async function getProductsFromSheet(): Promise<Product[]> {
  if (!GOOGLE_SHEET_CSV_URL) {
    // Fallback to static data if no link is provided yet
    const { initialProducts } = await import("@/data/products");
    return initialProducts;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      next: { revalidate: 300 } // Auto-refresh data every 5 minutes
    });
    const csvData = await response.text();
    
    // Parse CSV to Product Objects
    const rows = csvData.split("\n").slice(1); // Skip header row
    return rows.map((row) => {
      const columns = row.split(",");
      return {
        id: columns[0]?.trim(),
        name: columns[1]?.trim(),
        price: parseFloat(columns[2] || "0"),
        category: columns[3]?.trim() as Category,
        description: columns[4]?.trim(),
        icon: columns[5]?.trim(),
        rating: parseFloat(columns[6] || "5"),
        isPair: columns[7]?.trim().toUpperCase() === "TRUE",
        stockStatus: columns[8]?.trim() as any || "in-stock",
      };
    }).filter(p => p.id); // Remove empty rows
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    const { initialProducts } = await import("@/data/products");
    return initialProducts;
  }
}
