"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle, Download, Code, Zap } from "lucide-react";

// Create a wrapper component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDownload = async () => {
    try {
      const response = await fetch(product.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = product.name || "product-file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Purchase Complete!</h1>
          <p className="opacity-90 font-light">Your developer assets are ready</p>
        </div>

        <div className="p-8">
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8 border border-gray-600/30">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Your Digital Product
            </h2>
            <p className="text-white text-lg font-semibold">{product?.name || "Loading..."}</p>
            <p className="text-sm text-gray-400">{product?.description || ""}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all border border-gray-600"
            >
              <Code size={18} />
              Developer Dashboard
            </button>

            {product?.fileUrl && (
              <a
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer"
              >
                <Download size={18} />
                Download Product
              </a>
            )}
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg border border-dashed border-gray-600/50">
            <h3 className="text-sm font-semibold text-white mb-2">License Information</h3>
            <p className="text-xs text-gray-400">
              These products are licensed under CodeKitHub's Developer License.
              You may use them in unlimited projects.
              <a href="#" className="text-indigo-400 hover:underline ml-1">View details</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}

// Main export with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessContent />
    </Suspense>
  );
}