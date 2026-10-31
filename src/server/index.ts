import Elysia from "elysia";
import { authRoutes } from "./routes/auth";
import { genresRoutes } from "./routes/genres";
import { gameRoutes } from "./routes/games";
import { rawgRoutes } from "./routes/rawg";

const app = new Elysia()

app.use(authRoutes)
app.use(genresRoutes)
app.use(gameRoutes)
app.use(rawgRoutes)

const PORT = process.env.PORT || 4200

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})