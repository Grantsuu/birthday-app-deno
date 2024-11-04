import type { Client } from "https://deno.land/x/postgres/mod.ts";
import type { Birthday } from "./interfaces.ts";
import { buildPatchSqlQuery } from "./helpers.ts";

export async function getBirthdays(
  id: string,
  client: Client,
): Promise<Response> {
  try {
    await client.connect();
    const result = await client.queryObject`
      SELECT *
      FROM birthdays
      WHERE "userId" = ${id};
    `;

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);

    // Return the result as JSON
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  } finally {
    client.end();
  }
}

export async function getBirthday(
    id: string,
    client: Client,
): Promise<Response> {
  try {
    await client.connect();
    const result = await client.queryObject`
      SELECT *
      FROM birthdays
      WHERE "id" = ${id};
    `;

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);

    // Return the result as JSON
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
        JSON.stringify({ error: (error as Error).message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
    );
  } finally {
    client.end();
  }
}

export async function addBirthday(
  id: string,
  birthday: Birthday,
  client: Client,
): Promise<Response> {
  try {
    await client.connect();

    const result = await client.queryObject`
      INSERT INTO birthdays ("userId", name, date)
      VALUES (${id},
              ${birthday.name},
              ${birthday.date}) RETURNING id;
    `;

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);

    // Return the result as JSON
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  } finally {
    client.end();
  }
}

export async function editBirthday(
  id: string,
  birthday: Birthday,
  client: Client,
): Promise<Response> {
  try {
    await client.connect();

    const query = buildPatchSqlQuery(
      "birthdays",
      birthday,
      { id: id },
      ["id", "name", "date"],
    );

    const result = await client.queryObject(query);

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);

    // Return the result as JSON
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  } finally {
    client.end();
  }
}

export async function deleteBirthday(
  id: string,
  client: Client,
): Promise<Response> {
  try {
    await client.connect();

    const result = await client.queryObject`
        DELETE
        FROM birthdays
        WHERE id = ${id} RETURNING id;
    `;
    // AND id = ${birthdayId}

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);

    // Return the result as JSON
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  } finally {
    client.end();
  }
}
