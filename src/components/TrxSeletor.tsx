'use client';

export default function TrxSeletor({ opcaoSelecionada, onOpcaoChange }: { opcaoSelecionada: string; onOpcaoChange: (val: string) => void }) {
  return (
    <div className="bg-emerald-900 text-white p-4 rounded-xl shadow-lg border border-emerald-700">
      <h3 className="font-bold text-lg mb-2">🏋️‍♂️ Aquecimento & TRX</h3>
      <div className="mb-2">
        <label className="block text-xs text-emerald-200 mb-1">Selecione a opção da sessão:</label>
        <select
          value={opcaoSelecionada}
          onChange={(e) => onOpcaoChange(e.target.value)}
          className="w-full bg-emerald-800 text-white rounded-lg p-2.5 border border-emerald-600 font-medium text-sm"
        >
          <option value="Remada Aberta/Fechada">Remada Aberta / Remada Fechada</option>
          <option value="Rosca Direta/Crucifixo">Rosca Direta / Crucifixo</option>
        </select>
      </div>
    </div>
  );
}
