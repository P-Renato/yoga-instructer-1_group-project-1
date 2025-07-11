import express from "express"
import cors from "cors"
import blogsRouter from "./routes/blogs"


const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

// routers
app.use("/api/blogs", blogsRouter )

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is running on port ", port))