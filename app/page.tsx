import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Academic Suite</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Platform cerdas bertenaga AI untuk membantu edukator menyusun Modul Ajar dan membantu peneliti melakukan analisis data kualitatif.
      </p>
      <Link 
        href="/dashboard" 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Masuk ke Dashboard
      </Link>
    </div>
  );
}