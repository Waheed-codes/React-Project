import express from "express"
import dotenv from "dotenv"
dotenv.config()
import "./config/connectDB.js"
import publicRegister from "./controllers/public/register.js"
import publicLogin from "./controllers/public/login.js"
import authMiddleware from "./middleware/auth.js"
import privateTodo from "./controllers/private/todo.js"
import cors from "cors"
import path from "path"

const app = express()
app.use(cors({
    origin: ["http://localhost:5173",
        "https://mdwaheed.dev",
        "https://www.mdwaheed.dev"
    ]
}))

const port = process.env.PORT || 5000
app.use(express.json())
app.get("/health", async (req, res) => {
    res.status(200).json({ msg: "This APi is running" })
})



app.use("/user", publicRegister)
app.use("/user", publicLogin)
app.use("/todo", authMiddleware, privateTodo)

const buildPath = path.join(import.meta.dirname, "dist")
app.use(express.static(buildPath))
app.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
})

app.listen(port, () => {
    console.log(`The server is running at http://localhost/:${port}`)
})