import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * 이 엔드포인트는 더 이상 사용되지 않습니다.
 * 회원 탈퇴는 백엔드 API (/api/auth/withdraw)를 직접 호출합니다.
 * authStore에서 authFetch를 통해 처리됩니다.
 */
export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    return res.status(410).json({ 
        message: "This endpoint is deprecated. Use backend API directly via authFetch." 
    });
}
