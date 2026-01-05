import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { name, time, email, contact, message } = req.body;

        await resend.emails.send({
            from: "Snaplink <no-reply@snaplink.run>",
            to: ["snapbridge05@gmail.com"], // 👈 여기 너가 받을 이메일
            subject: `[제휴 문의] ${name}`,
            html: `
        <h2>새 제휴 문의</h2>
        <p><b>이름:</b> ${name}</p>
        <p><b>연락 가능 시간:</b> ${time}</p>
        <p><b>이메일:</b> ${email}</p>
        <p><b>연락처:</b> ${contact}</p>
        <hr />
        <p>${message}</p>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false });
    }
}