"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Receipt, Calendar, Package, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchPurchases = async () => {
      const q = query(collection(db, "payments"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPurchases(data);
    };

    fetchPurchases();
  }, [user]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">🛒 Your Purchases</h2>

        {purchases.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl text-center text-gray-400">
            <p className="text-lg">No purchases yet.</p>
            <p className="text-sm">Start exploring products and your purchases will show up here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {purchases.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Package className="text-indigo-400" size={24} />
                    <h3 className="text-lg font-semibold text-white">Product: {p.productId}</h3>
                  </div>
                  <span className="text-xs text-gray-400">
                    <Calendar size={14} className="inline mr-1" />
                    {new Date(p.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-700/40 rounded-lg p-3 flex items-center gap-2">
                    <Receipt size={16} className="text-green-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Order ID</p>
                      <p className="text-white font-mono text-sm break-all">{p.orderId}</p>
                    </div>
                  </div>

                  <div className="bg-gray-700/40 rounded-lg p-3 flex items-center gap-2">
                    <CreditCard size={16} className="text-yellow-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Payment ID</p>
                      <p className="text-white font-mono text-sm break-all">{p.paymentId}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <a
                    href={`/api/invoice/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
                  >
                    Download Invoice
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
