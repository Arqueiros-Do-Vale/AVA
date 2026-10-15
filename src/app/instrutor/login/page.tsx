'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginInstrutorPage() {
  const router = useRouter();
  const [instrutorSelecionado, setInstrutorSelecionado] = useState('Alexandre Borrego');
  const [pin, setPin] = useState('');
  const [carregando, setCarregando] = useState(false);

  const instrutores = [
    { id: '1', nome: 'Alexandre Borrego' },
    { id: '2', nome: 'Ana Paula Borrego' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      alert('O PIN de acesso deve conter exatamente 4 dígitos.');
      return;
    }
    setCarregando(true);
    setTimeout(() => {
      // Redireciona para a página da aula 18 após o login
      router.push('/instrutor/aula/18');
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          CT AVA — Portal do Instrutor
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2">Acesso Rápido</h1>
        <p className="text-xs text-slate-500">Linha de Tiro — Campo</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Selecione o seu Nome:</label>
          <select
            value={instrutorSelecionado}
            onChange={(e) => setInstrutorSelecionado(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-700"
          >
            {instrutores.map((ins) => (
              <option key={ins.id} value={ins.nome}>{ins.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">PIN de Acesso (4 dígitos):</label>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            className="w-full p-3 text-center tracking-widest text-2xl font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-base"
        >
          {carregando ? 'A entrar...' : '🚀 Entrar no Painel'}
        </button>
      </form>
    </div>
  );
}
