import crypto from "crypto";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { paymentId, orderId, signature, productId, userId } = req.body;

  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === signature;

  if (!isValid) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    await addDoc(collection(db, "payments"), {
      productId,
      paymentId,
      orderId,
      signature,
      userId,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Payment verified and recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save payment" });
  }
}
