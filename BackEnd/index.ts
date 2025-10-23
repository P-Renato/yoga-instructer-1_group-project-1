
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

const app = express();

// middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running!' });
});


try {
  const blogsRouter = require("./routes/blogs").default;
  app.use("/api/blogs", blogsRouter);
  console.log("✅ Blogs route loaded successfully");
} catch (error: any) {
  console.log("❌ Blogs route failed:", error.message);
}


try {
  const eventsRouter = require("./routes/events").default;
  app.use("/api/events", eventsRouter);
  console.log("✅ Events route loaded successfully");
} catch (error: any) {
  console.log("❌ Events route failed:", error.message);
}

// 3. Then add infos route
// try {
//   const infosRouter = require("./routes/infos").default;
//   app.use("/api/infos", infosRouter);
//   console.log("✅ Infos route loaded successfully");
// } catch (error: any) {
//   console.log("❌ Infos route failed:", error.message);
// }

// 4. Then add schedules route
// try {
//   const schedulesRouter = require("./routes/schedules").default;
//   app.use("/api/schedules", schedulesRouter);
//   console.log("✅ Schedules route loaded successfully");
// } catch (error: any) {
//   console.log("❌ Schedules route failed:", error.message);
// }

// 5. Finally add messages route
// try {
//   const messagesRouter = require("./routes/messages").default;
//   app.use("/api/messages", messagesRouter);
//   console.log("✅ Messages route loaded successfully");
// } catch (error: any) {
//   console.log("❌ Messages route failed:", error.message);
// }

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port} with routes`);
});

console.log('Server setup with routes complete');
