import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const snap = await getDoc(doc(db, "payments", id));
    if (!snap.exists()) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const payment = snap.data();

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

    page.drawText("Invoice", { x: 50, y: height - 50, size: 24, font, color: rgb(0, 0, 0) });
    page.drawText(`Order ID: ${payment.orderId}`, { x: 50, y: height - 100, size: 12, font });
    page.drawText(`Payment ID: ${payment.paymentId}`, { x: 50, y: height - 120, size: 12, font });
    page.drawText(`Product: ${payment.productId}`, { x: 50, y: height - 140, size: 12, font });
    page.drawText(`Amount: ${payment.amount || "100"} ${payment.currency || "INR"}`, { x: 50, y: height - 160, size: 12, font });
    page.drawText(`Date: ${payment.createdAt.toDate().toLocaleString()}`, { x: 50, y: height - 180, size: 12, font });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${id}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
}
