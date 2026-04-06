import fs from "fs";
import path from "path";

import { books } from "../src/data/readings";

const COVERS_DIR = path.join(process.cwd(), "public/books");
const OPEN_LIBRARY_URL = "https://covers.openlibrary.org/b/isbn";

async function fetchCover(isbn: string, outputPath: string): Promise<boolean> {
  const url = `${OPEN_LIBRARY_URL}/${isbn}-L.jpg`;
  const response = await fetch(url);

  if (!response.ok) {
    return false;
  }

  const buffer = await response.arrayBuffer();

  // Open Library returns a tiny 1x1 placeholder when no cover exists
  if (buffer.byteLength < 1000) {
    return false;
  }

  fs.writeFileSync(outputPath, Buffer.from(buffer));
  return true;
}

async function main() {
  if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const book of books) {
    const coverPath = path.join(COVERS_DIR, `${book.slug}.jpg`);

    if (fs.existsSync(coverPath)) {
      console.log(`✓ ${book.title} — already exists`);
      skipped++;
      continue;
    }

    console.log(`↓ ${book.title} — fetching cover (ISBN: ${book.isbn})...`);
    const success = await fetchCover(book.isbn, coverPath);

    if (success) {
      console.log(`  ✓ saved to ${coverPath}`);
      downloaded++;
    } else {
      console.log(`  ✗ no cover found on Open Library`);
      failed++;
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`);
}

main();
