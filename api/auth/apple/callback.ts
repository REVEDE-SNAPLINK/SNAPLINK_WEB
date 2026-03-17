import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Apple Sign In callback — Apple POSTs here via form_post response_mode.
 * Extracts the id_token and redirects to the client-side callback page.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const { id_token, error } = req.body as Record<string, string | undefined>;

    if (error) {
        console.error("Apple auth error:", error);
        return res.redirect(`/auth/apple/callback?error=${encodeURIComponent(error)}`);
    }

    if (!id_token) {
        return res.redirect(`/auth/apple/callback?error=missing_token`);
    }

    return res.redirect(`/auth/apple/callback?token=${encodeURIComponent(id_token)}`);
}
