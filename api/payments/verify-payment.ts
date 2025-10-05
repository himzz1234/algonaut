import crypto from "crypto";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({
      error: "RAZORPAY_KEY_SECRET is not set in environment variables",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const valid = expectedSignature === razorpay_signature;
  res.status(200).json({ valid });
}
