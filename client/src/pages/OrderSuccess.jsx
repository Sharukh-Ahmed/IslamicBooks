import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 text-white p-6">
      <div className="max-w-md w-full text-center bg-zinc-950 p-8 rounded-2xl shadow-xl border border-zinc-700">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-zinc-300 mb-6">
          Your order has been successfully placed. May Allah bless your knowledge journey!
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
