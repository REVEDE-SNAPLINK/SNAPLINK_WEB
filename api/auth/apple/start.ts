import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const clientId = process.env.APPLE_CLIENT_ID;

    if (!clientId) {
        return res.status(500).json({ message: "Apple 클라이언트 ID가 설정되지 않았습니다." });
    }

    const host = req.headers.host || "";
    // Apple Sign In requires HTTPS — localhost is not supported by Apple
    const redirectUri = host.includes("localhost")
        ? "https://support.snaplink.run/api/auth/apple/callback"
        : `https://${host}/api/auth/apple/callback`;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code id_token",
        response_mode: "form_post",
        scope: "name email",
    });

    return res.redirect(`https://appleid.apple.com/auth/authorize?${params.toString()}`);
}
