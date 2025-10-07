import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const apiResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [2],
        updateEnabled: true,
      }),
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) throw new Error(data.message || "Failed to subscribe");

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Brevo API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
