import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const ua = req.headers["user-agent"] || "";
    const host = req.headers.host!;
    const url = new URL(req.url!, `https://${host}`);
    const path = url.pathname;

    const appLink = `snaplink://${path}`;
    const webFallback = `https://snaplink.run${path}`;

    if (/iphone|ipad|ipod|android/i.test(ua)) {
        res.writeHead(302, { Location: appLink });
    } else {
        res.writeHead(302, { Location: webFallback });
    }

    res.end();
}