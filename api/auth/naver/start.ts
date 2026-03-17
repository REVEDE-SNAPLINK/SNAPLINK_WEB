import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const clientId = process.env.NAVER_CLIENT_ID;

    if (!clientId) {
        return res.status(500).json({ message: "네이버 클라이언트 ID가 설정되지 않았습니다." });
    }

    const host = req.headers.host || "";
    const redirectUri = host.includes("localhost")
        ? "http://localhost:5173/auth/naver/callback"
        : `https://${host}/auth/naver/callback`;

    const state = crypto.randomBytes(16).toString("hex");

    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        state,
    });

    return res.redirect(`https://nid.naver.com/oauth2.0/authorize?${params.toString()}`);
}
