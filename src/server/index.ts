import Elysia from "elysia";
import { authRoutes } from "./routes/auth";
import { genresRoutes } from "./routes/genres";
import { gamesRoutes } from "./routes/games";

const app = new Elysia()

app.use(authRoutes)
app.use(genresRoutes)
app.use(gamesRoutes)

app.listen(4200, () => {
    console.log('Server is running on http://localhost:4200')
})