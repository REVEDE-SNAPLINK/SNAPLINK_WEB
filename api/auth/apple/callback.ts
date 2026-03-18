import type { VercelRequest, VercelResponse } from "@vercel/node";

// Apple Sign In 후 브라우저가 최종적으로 착지할 SPA 도메인.
// Apple의 form_post는 등록된 어떤 도메인이든 받을 수 있지만,
// 클라이언트 라우트(/auth/apple/callback)는 이 도메인에만 존재한다.
const SPA_BASE_URL = "https://www.snaplink.run";

/**
 * Apple Sign In callback — Apple POSTs here via form_post response_mode.
 * Extracts the id_token and redirects the browser to the client-side callback page.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    // @vercel/node v5 auto-parses application/x-www-form-urlencoded,
    // but guard against null body just in case.
    const body = (req.body ?? {}) as Record<string, string | undefined>;
    const { id_token, error } = body;

    if (error) {
        console.error("[Apple callback] Apple auth error:", error);
        return res.redirect(
            `${SPA_BASE_URL}/auth/apple/return?error=${encodeURIComponent(error)}`,
        );
    }

    if (!id_token) {
        console.error("[Apple callback] id_token missing from Apple form_post body");
        return res.redirect(
            `${SPA_BASE_URL}/auth/apple/return?error=missing_token`,
        );
    }

    return res.redirect(
        `${SPA_BASE_URL}/auth/apple/return?token=${encodeURIComponent(id_token)}`,
    );
}
