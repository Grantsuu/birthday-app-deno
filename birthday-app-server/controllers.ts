import type { Client } from "https://deno.land/x/postgres/mod.ts";
import type { Birthday } from "../birthday-app-server/interfaces.ts";

export async function getBirthdays(
    id: string,
    client: Client,
): Promise<Response> {
    try {
        await client.connect();
        const result = await client.queryObject(
            `
            SELECT * FROM birthdays
            WHERE "userId" = ${id};
            `,
        );

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
    }
}

export async function addBirthday(
    id: string,
    birthday: Birthday,
    client: Client,
): Promise<Response> {
    try {
        await client.connect();

        const result = await client.queryObject(
            `
            INSERT INTO birthdays ("userId", name, date)
            VALUES(
                ${id},
                ${birthday.name},
                ${birthday.date}
            )
            RETURNING id;
            `,
        );

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
    }
}

export async function editBirthday(
    id: string,
    birthday: Birthday,
): Promise<Response> {
    try {
        console.log(id, birthday);
        return new Response(
            JSON.stringify({
                message: `Edit Birthday for ${id}, ${JSON.stringify(birthday)}`,
            }),
            {
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}

export async function deleteBirthday(
    id: string,
    birthdayId: string,
): Promise<Response> {
    try {
        console.log(id, birthdayId);
        return new Response(
            JSON.stringify({ message: `Delete Birthday for ${id}` }),
            {
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
