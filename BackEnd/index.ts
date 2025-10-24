
/*
import express from "express"
import cors from "cors"
import blogsRouter from "./routes/blogs"
import eventsRouter from "./routes/events"
import infosRouter from "./routes/infos"
import messagesRouter from "./routes/messages"
import schedulesRouter from "./routes/schedules"
import path from "path"


const app = express();

// middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), '../frontend/dist')));
}

// routers
app.use("/api/blogs", blogsRouter )

app.use("/api/events", eventsRouter)

app.use("/api/infos", infosRouter)

app.use("/api/schedules", schedulesRouter)

app.use("/api/messages", messagesRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running!' });
});

// Catch-all for SPA (only in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend/dist/index.html'));
  });
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Keep alive
const keepAlive = setInterval(() => {
  console.log('Server still running...');
}, 30000);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('Server setup complete');
 */
import express from "express"
import cors from "cors"
import path from "path"
import blogsRouter from "./routes/blogs"
import eventsRouter from "./routes/events" 
import infosRouter from "./routes/infos"
import schedulesRouter from "./routes/schedules"
import messagesRouter from "./routes/messages"

const app = express();

// CORS configuration - FIXED: removed trailing slash
app.use(cors({
  origin: [
    'https://yoga-instructer-1-group-project-1.onrender.com', // No trailing slash!
    'http://localhost:5173'                    
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running!' });
});

app.get('/api/debug/blogs', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const dbPath = path.join(__dirname, 'database', 'data.json');
    
    if (fs.existsSync(dbPath)) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json({
            blogs: data.blogs,
            uploadsDir: fs.readdirSync(path.join(__dirname, 'uploads'))
        });
    } else {
        res.status(500).json({ error: 'Database file not found' });
    }
});

app.get('/api/debug/static-files', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    const uploadsPath = path.join(__dirname, 'uploads');
    const files = {
        currentDir: __dirname,
        uploadsPath: uploadsPath,
        uploadsExists: fs.existsSync(uploadsPath),
        filesInUploads: fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath) : [],
        specificFileExists: fs.existsSync(path.join(uploadsPath, 'resized_HarryPotterKid_1756500046993.jpeg'))
    };
    
    res.json(files);
});

app.get('/api/test-image', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Testing static file serving</h1>
                <p>If you see the image below, static files are working:</p>
                <img src="/uploads/resized_HarryPotterKid_1756500046993.jpeg" alt="Test" style="max-width: 300px;">
                <p>Image URL: /uploads/resized_HarryPotterKid_1756500046993.jpeg</p>
            </body>
        </html>
    `);
});


app.get('/api/debug/files', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const dbPath = path.join(process.cwd(), 'database', 'data.json');
  const files = {
    currentDir: process.cwd(),
    filesInRoot: fs.readdirSync('.'),
    databaseDirExists: fs.existsSync('database'),
    databaseFiles: fs.existsSync('database') ? fs.readdirSync('database') : [],
    dbExists: fs.existsSync(dbPath),
    dbPath: dbPath
  };
  
  res.json(files);
});

// Serve static files from frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Catch-all handler
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

app.use("/api/blogs", blogsRouter)
app.use("/api/events", eventsRouter)
app.use("/api/infos", infosRouter)
app.use("/api/schedules", schedulesRouter)
app.use("/api/messages", messagesRouter)

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('Server setup complete');