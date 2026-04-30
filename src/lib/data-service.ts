import useSWR from 'swr';
import { Product, Category } from "@/types";

// This is where your Google Sheet CSV Link will go
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRVUuM8JphrpAOtu0GZrChKUxCXQr3vbMZdeA8_OWAhVvgxHu0nzA0aPgPmJWe_kX8Qh9fzSDD7vsQO/pub?output=csv"; 

/**
 * Robust CSV Parser that handles quoted strings, commas, and multi-line cells
 */
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentCell.trim());
      if (currentRow.length > 0 && currentRow.some(cell => cell !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Generate a stable ID based on product properties if ID is missing
 */
function generateStableId(name: string, price: string, index: number): string {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanName}-${price}-${index}`;
}

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'text/csv' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.text();
};

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(GOOGLE_SHEET_CSV_URL, fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000, // Auto refresh every 30 seconds
  });

  const products = data ? parseProductsFromCSV(data) : [];

  return {
    products,
    error,
    isLoading,
    refresh: mutate
  };
}

function parseProductsFromCSV(csvData: string): Product[] {
  const allRows = parseCSV(csvData);
  if (allRows.length < 2) return [];
  
  const dataRows = allRows.slice(1);
  return dataRows.map((columns, index) => {
    try {
      const name = columns[1] || "Unnamed Product";
      const rawPrice = columns[2]?.replace(/[^0-9.]/g, "") || "0";
      const category = columns[3]?.toLowerCase() || "frocks";
      const id = columns[0] || generateStableId(name, rawPrice, category);

      return {
        id,
        name,
        price: parseFloat(rawPrice),
        category: category as Category,
        description: columns[4] || "",
        icon: columns[5] || "",
        rating: parseFloat(columns[6] || "5"),
        isPair: columns[7]?.toUpperCase() === "TRUE",
        stockStatus: (columns[8]?.toLowerCase() || "in-stock") as 'in-stock' | 'low-stock' | 'out-of-stock',
      };
    } catch (e) {
      console.error("Error parsing product row:", e);
      return null;
    }
  }).filter((p): p is Product => p !== null && !!p.id);
}
