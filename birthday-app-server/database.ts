import { Client } from "https://deno.land/x/postgres/mod.ts";

const config = Deno.env.get("DATABASE_URL");

const client = new Client(config);

export function createDatabaseClient() {
  return client;
}
