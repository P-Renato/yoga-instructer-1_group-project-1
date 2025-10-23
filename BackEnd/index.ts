
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

const app = express();

// Basic middleware
app.use(cors())
app.use(express.json())

// Only health check - no other routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Basic server is running!' });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Basic server running on port ${port}`);
});

console.log('Basic server setup complete');