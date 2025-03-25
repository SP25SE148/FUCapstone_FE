export async function POST(request: Request) {
    const res = await request.json();
    const accessToken = res.accessToken;


    if (!accessToken) {
        return Response.json({accessToken});
    }

    return Response.json({res}, {
        status: 200,
        headers: {
            "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
        }
    });

    // return Response.json({res});
} 