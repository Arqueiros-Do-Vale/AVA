'use client';
import { useState } from 'react';

export default function NovoAlunoPage() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [lateralidade, setLateralidade] = useState('RH');
  const [nivel, setNivel] = useState('Iniciação');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cpf) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
    setSalvando(true);
    setTimeout(() => {
      alert(`Aluno ${nome} cadastrado com sucesso e contrato gerado!`);
      setSalvando(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-full">
          CT AVA — Administração
        </span>
        <h1 className="text-xl font-black text-slate-900 mt-2">Cadastrar Novo Aluno</h1>
      </div>

      <form onSubmit={handleSalvar} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do arqueiro"
            className="w-full p-3 border border-slate-300 rounded-xl text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">CPF (Chave de Acesso):</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            className="w-full p-3 border border-slate-300 rounded-xl text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telemóvel:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(12) 99999-9999"
            className="w-full p-3 border border-slate-300 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Lateralidade do Arco:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLateralidade('RH')}
              className={`py-2.5 rounded-xl border text-xs font-bold ${lateralidade === 'RH' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              RH (Destro)
            </button>
            <button
              type="button"
              onClick={() => setLateralidade('LH')}
              className={`py-2.5 rounded-xl border text-xs font-bold ${lateralidade === 'LH' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              LH (Canhoto)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nível Inicial:</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl text-sm bg-white"
          >
            <option value="Iniciação">Iniciação</option>
            <option value="Básico">Básico</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Competitivo">Competitivo</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={salvando}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-base"
        >
          {salvando ? 'A processar...' : '✅ Salvar e Gerar Contrato'}
        </button>
      </form>
    </div>
  );
}
