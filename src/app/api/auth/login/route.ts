export async function POST(request: Request) {
    const res = await request.json();

    return Response.json(null, {
        status: 200,
        headers: {
            "Set-Cookie": `${`accessToken=${res?.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`}`,
        },
    });
} 