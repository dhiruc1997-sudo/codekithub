"use client";

import { motion } from "framer-motion";
import { XCircle, AlertTriangle, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-xl border border-gray-700"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
              <XCircle size={48} className="text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Payment Declined</h1>
          <p className="text-center opacity-90 font-light">We couldn't process your transaction</p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Error Card */}
          <div className="bg-rose-900/20 border border-rose-800/50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Transaction Failed</h3>
                <p className="text-sm text-rose-200">
                  Your payment method was declined. Please try a different payment option or check with your bank.
                </p>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="bg-gray-700 p-1 rounded-full mt-0.5">
                  <CreditCard size={14} className="text-gray-300" />
                </div>
                <span className="text-gray-300">Try a different credit/debit card</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gray-700 p-1 rounded-full mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"></path>
                    <path d="M9 10a3 3 0 0 1 6 0c0 3-3 3-3 6"></path>
                    <path d="M12 19v.01"></path>
                  </svg>
                </div>
                <span className="text-gray-300">Contact your bank for authorization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gray-700 p-1 rounded-full mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <path d="M22 6l-10 7L2 6"></path>
                  </svg>
                </div>
                <span className="text-gray-300">Email us at support@codekithub.dev</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => router.push("/checkout")}
              className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-medium transition-all"
            >
              <CreditCard size={18} />
              Try Payment Again
            </button>
            <button 
              onClick={() => router.push("/product")}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all border border-gray-600"
            >
              Browse Products
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need immediate help? <a href="#" className="text-rose-400 hover:underline">Chat with support</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}