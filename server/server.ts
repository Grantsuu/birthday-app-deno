import { Hono } from "hono";
import { cors } from "hono/cors";
import {
    addBirthday,
    deleteBirthday,
    editBirthday,
    getBirthday,
    getBirthdays,
} from "./controllers.ts";
import { createDatabaseClient } from "./database.ts";

const PORT = Deno.env.get("PORT");

const app = new Hono();
const client = createDatabaseClient();

app.use(
    "api/*",
    cors({
        origin: ["http://localhost:3000", "https://low-pigeon-78.deno.dev"],
    }),
);

app.get("/api/birthday/:id", async (c) => {
    const id = c.req.param("id");
    return await getBirthdays(id, client);
});

app.get("/api/birthday", async (c) => {
    const id = c.req.query("id");
    return await getBirthday(id ? id : "", client);
});

app.post("/api/birthday/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return await addBirthday(id, body, client);
});

app.patch("/api/birthday/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return await editBirthday(id, body, client);
});

app.delete("/api/birthday/:id", async (c) => {
    const id = c.req.param("id");
    return await deleteBirthday(id, client);
});

console.log(`API running on port: ${PORT}`);
Deno.serve({ port: PORT ? parseInt(PORT) : 8080 }, app.fetch);
