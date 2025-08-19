import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { productId, paymentId, orderId, signature } = req.body;

  try {
    await addDoc(collection(db, "payments"), {
      productId,
      paymentId,
      orderId,
      signature,
      createdAt: new Date(),
    });
    res.status(200).json({ message: "Payment recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save payment" });
  }
}
