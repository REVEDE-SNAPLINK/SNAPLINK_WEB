import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { code, state } = req.body;

        if (!code) {
            return res.status(400).json({ message: "인증 코드가 필요합니다." });
        }

        const clientId = process.env.NAVER_CLIENT_ID;
        const clientSecret = process.env.NAVER_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return res.status(500).json({ message: "네이버 API 설정이 올바르지 않습니다." });
        }

        const host = req.headers.host || "";
        let redirectUri: string;
        if (host.includes("localhost")) {
            redirectUri = "http://localhost:5173/auth/naver/callback";
        } else {
            redirectUri = `https://${host}/auth/naver/callback`;
        }

        // 인가 코드로 접근 토큰 발급
        const tokenResponse = await fetch("https://nid.naver.com/oauth2.0/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code,
                state: state ?? "",
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Naver token error:", errorText);
            return res.status(400).json({ message: "네이버 토큰 발급에 실패했습니다." });
        }

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error("Naver token error response:", tokenData);
            return res.status(400).json({ message: tokenData.error_description || "토큰 발급에 실패했습니다." });
        }

        return res.status(200).json({ accessToken: tokenData.access_token });
    } catch (error) {
        console.error("Naver login error:", error);
        return res.status(500).json({
            message: "로그인 처리 중 오류가 발생했습니다.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
