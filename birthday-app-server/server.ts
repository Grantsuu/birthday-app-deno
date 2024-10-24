import {
    addBirthday,
    deleteBirthday,
    editBirthday,
    getBirthdays,
} from "../controllers.ts";

const PORT = 8080;

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path.startsWith("/api/birthday/") && req.method === "GET") {
        // Get all birthdays for user
        return await getBirthdays("");
    } else if (path.startsWith("/api/birthday/") && req.method === "POST") {
        // Add birthday for user
        return await addBirthday("", {});
    } else if (path.startsWith("/api/birthday/") && req.method === "PATCH") {
        // Edit birthday for user
        return await editBirthday("", {});
    } else if (path.startsWith("/api/birthday/") && req.method === "DELETE") {
        // Delete birthday for user
        return await deleteBirthday("", "");
    }

    return new Response("Not found", {
        status: 404,
    });
}

console.log(`API running on port: ${PORT}`);
Deno.serve({ port: PORT }, handler);
