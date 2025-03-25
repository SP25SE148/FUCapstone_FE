import { DecodedToken } from "@/types/types";
import { jwtDecode } from "jwt-decode";

export async function POST(request: Request) {
    const res = await request.json();
    const accessToken = res.accessToken;


    if (!accessToken) {
        return Response.json({ accessToken });
    }

    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return Response.json({ res }, {
        status: 200,
        headers: {
            "Set-Cookie": `${`accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`}, ${`role=${role}; HttpOnly; Secure; SameSite=Strict; Path=/;`}`,
        },
    });

    // return Response.json({res});
} 