import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const restApiKey = process.env.KAKAO_REST_API_KEY;

    if (!restApiKey) {
        return res.status(500).json({ message: "카카오 API 키가 설정되지 않았습니다." });
    }

    const host = req.headers.host || "";
    const redirectUri = host.includes("localhost")
        ? "http://localhost:5173/auth/kakao/callback"
        : `https://${host}/auth/kakao/callback`;

    const params = new URLSearchParams({
        client_id: restApiKey,
        redirect_uri: redirectUri,
        response_type: "code",
    });

    return res.redirect(`https://kauth.kakao.com/oauth/authorize?${params.toString()}`);
}
