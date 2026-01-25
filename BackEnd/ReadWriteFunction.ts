import fs from 'fs';
import path from 'path';

// Correct path to your database file
const dbPath = path.join(process.cwd(), 'database', 'data.json');

export const ReadDb = (): string => {
  try {
    console.log('Reading DB from:', dbPath);
    
    // Check if file exists
    if (!fs.existsSync(dbPath)) {
      console.log('DB file not found at:', dbPath);
      // Return empty but valid structure
      return JSON.stringify({
        schedule: [],
        blog: [],
        events: [],
        locations: [],
        info: [],
        messages: []
      });
    }
    
    const content = fs.readFileSync(dbPath, 'utf8').trim();
    console.log('DB file content length:', content.length);
    
    // Validate JSON
    JSON.parse(content); // This will throw if invalid JSON
    
    return content;
  } catch (error) {
    console.error('Error reading DB:', error);
    // Return empty but valid JSON structure
    return JSON.stringify({
      schedule: [],
      blog: [],
      events: [],
      locations: [],
      info: [],
      messages: []
    });
  }
};

export const WriteDb = (data: any): void => {
  try {
    // Make sure the database directory exists
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log('DB written successfully to:', dbPath);
  } catch (error) {
    console.error('Error writing DB:', error);
  }
};

