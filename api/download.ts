import type { VercelRequest, VercelResponse } from "@vercel/node";

// TODO: Apple App Store ID를 실제 값으로 교체해주세요
const APP_STORE_URL = "https://apps.apple.com/app/id6756947156";
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.revede.snaplink";
const FALLBACK_URL = "https://snaplink.run";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    let redirectUrl: string;

    if (/iphone|ipad|ipod/i.test(ua)) {
        redirectUrl = APP_STORE_URL;
    } else if (/android/i.test(ua)) {
        redirectUrl = PLAY_STORE_URL;
    } else {
        redirectUrl = FALLBACK_URL;
    }

    res.writeHead(302, { Location: redirectUrl });
    res.end();
}
