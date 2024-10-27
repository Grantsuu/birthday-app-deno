import {
  addBirthday,
  deleteBirthday,
  editBirthday,
  getBirthdays,
} from "./controllers.ts";
import { createDatabaseClient } from "./database.ts";

const PORT = Deno.env.get("PORT");

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  const client = createDatabaseClient();

  try {
    if (path.startsWith("/api/birthday/") && req.method === "GET") {
      // Get all birthdays for user
      return await getBirthdays(path.split("/")[3], client);
    } else if (path.startsWith("/api/birthday/") && req.method === "POST") {
      // Add birthday for user
      const body = await req.json();
      return await addBirthday(path.split("/")[3], body, client);
    } else if (
      path.startsWith("/api/birthday/") && req.method === "PATCH"
    ) {
      // Edit birthday for user
      return await editBirthday(path.split("/")[3], {});
    } else if (
      path.startsWith("/api/birthday/") && req.method === "DELETE"
    ) {
      // Delete birthday for user
      return await deleteBirthday(path.split("/")[3], "");
    }
  } catch (err) {
    console.error(err);
    // If an error occurs, return a 500 response
    return new Response(
      `Internal Server Error\n\n${(err as Error).message}`,
      {
        status: 500,
      },
    );
  } finally {
    client.end();
  }

  return new Response("Not found", {
    status: 404,
  });
}

console.log(`API running on port: ${PORT}`);
Deno.serve({ port: PORT ? parseInt(PORT) : 8080 }, handler);
