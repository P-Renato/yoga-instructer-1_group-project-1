import fs from 'fs';
import path from 'path';

// Correct path to your database file
const dbPath = path.join(process.cwd(), 'database', 'data.json');

export const ReadDb = (): string => {
  try {
    console.log('Reading DB from:', dbPath);
    
    // If file doesn't exist, create it with default data
    if (!fs.existsSync(dbPath)) {
      console.log('Creating new DB file...');
      const defaultData = {
        schedule: [],
        blog: [],
        events: [],
        locations: [],
        info: [],
        messages: []
      };
      WriteDb(defaultData);
      return JSON.stringify(defaultData);
    }
    
    const content = fs.readFileSync(dbPath, 'utf8').trim();
    console.log('DB file content length:', content.length);
    
    // If empty or invalid, return default data
    if (!content || content === '{}') {
      console.log('DB file is empty, using default data');
      const defaultData = {
        schedule: [],
        blog: [],
        events: [],
        locations: [],
        info: [],
        messages: []
      };
      WriteDb(defaultData);
      return JSON.stringify(defaultData);
    }
    
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