import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "인증 코드가 필요합니다." });
        }

        const clientSecret = process.env.KAKAO_CLIENT_SECRET;
        const restApiKey = process.env.KAKAO_REST_API_KEY;

        if (!clientSecret || !restApiKey) {
            return res.status(500).json({ message: "카카오 API 설정이 올바르지 않습니다." });
        }

        // 현재 요청 호스트를 기반으로 리다이렉트 URI 결정
        const host = req.headers.host || '';
        const protocol = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
        
        let redirectUri: string;
        if (host.includes('localhost')) {
            redirectUri = 'http://localhost:5173/auth/kakao/callback';
        } else if (host.includes('vercel.app')) {
            redirectUri = `https://${host}/auth/kakao/callback`;
        } else {
            redirectUri = 'https://support.snaplink.run/auth/kakao/callback';
        }

        // 1. 인가 코드로 토큰 받기
        const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: restApiKey,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            let errorData: { error?: string; error_description?: string } = {};
            try {
                errorData = JSON.parse(errorText);
            } catch {
                // JSON 파싱 실패 시 무시
            }
            console.error("Token error:", {
                status: tokenResponse.status,
                statusText: tokenResponse.statusText,
                error: errorData,
                redirectUri,
                host: req.headers.host,
            });
            return res.status(400).json({ 
                message: errorData.error_description || errorData.error || "토큰 발급에 실패했습니다.",
                error: errorData,
            });
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. 사용자 정보 가져오기
        const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!userResponse.ok) {
            return res.status(400).json({ message: "사용자 정보를 가져오는데 실패했습니다." });
        }

        const userData = await userResponse.json();

        // TODO: 여기서 사용자 정보를 데이터베이스에 저장하거나 세션을 생성하는 로직 추가
        // 예시:
        // - userData.id: 카카오 사용자 ID
        // - userData.kakao_account.email: 이메일 (동의한 경우)
        // - userData.kakao_account.profile.nickname: 닉네임

        // 3. 성공 응답 (실제로는 세션 생성 후 리다이렉트 URL 반환)
        return res.status(200).json({
            success: true,
            user: {
                id: userData.id,
                nickname: userData.kakao_account?.profile?.nickname || "사용자",
                email: userData.kakao_account?.email || null,
            },
            accessToken: accessToken, // 보안을 위해 실제로는 서버에서 세션으로 관리해야 합니다
            redirectUrl: "/", // 로그인 후 이동할 URL
        });
    } catch (error) {
        console.error("Kakao login error:", error);
        return res.status(500).json({ 
            message: "로그인 처리 중 오류가 발생했습니다.",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
