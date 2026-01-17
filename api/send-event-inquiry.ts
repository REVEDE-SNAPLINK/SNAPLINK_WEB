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
        const { name, time, email, contact, purpose, reference, eventDate, eventLocation } = req.body;

        await resend.emails.send({
            from: "Snaplink <no-reply@snaplink.run>",
            to: ["snapbridge05@gmail.com"],
            subject: `[행사 촬영 문의] ${name}`,
            html: `
        <h2>새 행사 촬영 문의</h2>
        <p><b>이름(기업/단체):</b> ${name}</p>
        <p><b>연락 가능 시간:</b> ${time}</p>
        <p><b>이메일:</b> ${email}</p>
        <p><b>연락처:</b> ${contact}</p>
        <p><b>행사 날짜:</b> ${eventDate.split("T")[0]}</p>
        <p><b>행사 장소:</b> ${eventLocation}</p>
        <hr />
        <h3>촬영 목적</h3>
        <p style="white-space: pre-wrap;">${purpose}</p>
        <h3>레퍼런스</h3>
        <p style="white-space: pre-wrap;">${reference}</p>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false });
    }
}
