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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routers
app.use("/api/blogs", blogsRouter )

app.use("/api/events", eventsRouter)

app.use("/api/infos", infosRouter)

app.use("/api/schedules", schedulesRouter)

app.use("/api/messages", messagesRouter)

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is running on port ", port))