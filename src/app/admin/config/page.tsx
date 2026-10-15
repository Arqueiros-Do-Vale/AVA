'use client';
import { useState } from 'react';

export default function ConfigAdminPage() {
  const [novoNome, setNovoNome] = useState('');
  const [novoPin, setNovoPin] = useState('1234');
  const [instrutores, setInstrutores] = useState([
    { id: '1', nome: 'Alexandre Borrego', pin: '****', status: 'ativo' },
    { id: '2', nome: 'Ana Paula Borrego', pin: '****', status: 'ativo' }
  ]);

  const handleSalvarInstrutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome || novoPin.length !== 4) {
      alert('Insira o nome completo e um PIN válido de 4 dígitos.');
      return;
    }
    setInstrutores([...instrutores, { id: Date.now().toString(), nome: novoNome, pin: '****', status: 'ativo' }]);
    setNovoNome('');
    setNovoPin('1234');
    alert('Instrutor cadastrado com sucesso!');
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-full">
          CT AVA — Administração
        </span>
        <h1 className="text-xl font-black text-slate-900 mt-2">Configurações & Instrutores</h1>
      </div>

      <form onSubmit={handleSalvarInstrutor} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">➕ Cadastrar Novo Instrutor</h3>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo:</label>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Nome do instrutor"
            className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">PIN de Acesso (4 dígitos):</label>
          <input
            type="password"
            maxLength={4}
            value={novoPin}
            onChange={(e) => setNovoPin(e.target.value.replace(/\D/g, ''))}
            className="w-full p-2.5 text-center tracking-widest text-lg font-mono border border-slate-300 rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow"
        >
          💾 Salvar Instrutor
        </button>
      </form>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">📋 Instrutores Cadastrados</h3>
        <div className="space-y-2">
          {instrutores.map((ins) => (
            <div key={ins.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-xs text-slate-900">{ins.nome}</p>
                <p className="text-[10px] text-slate-500">PIN: {ins.pin} | Estado: 🟢 Ativo</p>
              </div>
              <button
                type="button"
                onClick={() => alert(`A editar PIN de ${ins.nome}`)}
                className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg"
              >
                Editar PIN
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
