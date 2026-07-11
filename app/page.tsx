import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-black text-slate-950 mb-4 tracking-tight">
          GTC <br/> <span className="text-2xl text-blue-600">Guardian Training Center</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bienvenido a la plataforma de inscripción de GTC. Judo y Jiu-Jitsu para todas las edades.
        </p>
        <Link href="/inscripcion" className="block w-full bg-blue-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-800 transition-colors text-center">
          Inscribirme Ahora
        </Link>
      </div>
    </main>
  );
}
