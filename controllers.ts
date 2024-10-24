import type { Birthday } from "./interfaces.ts";

export async function getBirthdays(id: string): Promise<Response> {
    try {
        console.log(id);
        return new Response(JSON.stringify({ message: "Get Birthdays" }), {
            headers: { "Content-Type": "application/json" },
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
): Promise<Response> {
    try {
        console.log(id, birthday);
        return new Response(JSON.stringify({ message: "Add Birthday" }), {
            headers: { "Content-Type": "application/json" },
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
        return new Response(JSON.stringify({ message: "Edit Birthday" }), {
            headers: { "Content-Type": "application/json" },
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

export async function deleteBirthday(
    id: string,
    birthdayId: string,
): Promise<Response> {
    try {
        console.log(id, birthdayId);
        return new Response(JSON.stringify({ message: "Delete Birthday" }), {
            headers: { "Content-Type": "application/json" },
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
