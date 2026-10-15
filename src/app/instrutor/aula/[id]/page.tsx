'use client';
import { useState } from 'react';
import TrxSeletor from '@/components/TrxSeletor';

export default function ExecucaoAulaPage({ params }: { params?: { id?: string } }) {
  const numeroAula = parseInt(params?.id || '18') || 18;
  const [opcaoTRX, setOpcaoTRX] = useState('Remada Aberta/Fechada');
  const [puxadaMedida, setPuxadaMedida] = useState(false);
  const [novaPuxada, setNovaPuxada] = useState('28.5');
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);

  const alertaPuxada = [5, 15, 18].includes(numeroAula);

  const handleSalvarAula = async () => {
    if (alertaPuxada && (!puxadaMedida || !novaPuxada)) {
      alert('Atenção: É obrigatório aferir e preencher a nova medida de puxada para esta aula!');
      return;
    }
    setSalvando(true);
    setTimeout(() => {
      alert(`Aula ${numeroAula} registrada com sucesso! Puxada atualizada para ${novaPuxada}".`);
      setSalvando(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-full">
            CT AVA — Master Curriculum
          </span>
          <span className="text-sm font-bold text-slate-500">Aula #{numeroAula} / 24</span>
        </div>
        <h1 className="text-xl font-black text-slate-900">Registro de Treino em Campo</h1>
        <p className="text-sm text-slate-600">Aluno: Carlos Silva | Arco: RH</p>
      </div>

      {alertaPuxada && (
        <div className="bg-amber-500 text-slate-900 p-4 rounded-xl shadow-md border-2 border-amber-600">
          <h4 className="font-extrabold text-sm uppercase flex items-center gap-1">
            ⚠️ Atenção Técnica Obrigatória
          </h4>
          <p className="text-xs font-medium mt-1">
            Esta aula exige a verificação e medição de puxada do arqueiro!
          </p>
          <label className="flex items-center gap-2 mt-3 bg-amber-600/30 p-2 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={puxadaMedida}
              onChange={(e) => setPuxadaMedida(e.target.checked)}
              className="w-5 h-5 accent-emerald-900"
            />
            <span className="text-xs font-bold">Confirmo que aferi a puxada</span>
          </label>

          {puxadaMedida && (
            <div className="mt-3 pt-3 border-t border-amber-600/40">
              <label className="block text-xs font-extrabold mb-1">Nova Puxada Aferida (polegadas):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={novaPuxada}
                  onChange={(e) => setNovaPuxada(e.target.value)}
                  className="w-28 p-2 bg-white rounded-lg font-bold text-center text-slate-900 border border-amber-700"
                />
                <span className="text-xs font-bold">polegadas (Atualiza Cadastro)</span>
              </div>
            </div>
          )}
        </div>
      )}

      <TrxSeletor opcaoSelecionada={opcaoTRX} onOpcaoChange={setOpcaoTRX} />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <label className="block text-sm font-bold text-slate-800 mb-2">
          Observações do Instrutor
        </label>
        <textarea
          rows={3}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Registre agrupamentos e adaptações..."
          className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
        />
      </div>

      <button
        type="button"
        onClick={handleSalvarAula}
        disabled={salvando}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-lg"
      >
        {salvando ? 'Gravando Aula...' : '✅ Concluir e Salvar Aula'}
      </button>
    </div>
  );
}
