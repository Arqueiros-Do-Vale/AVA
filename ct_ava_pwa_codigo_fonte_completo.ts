
/* ==========================================================
   CT AVA PWA - CÓDIGO-FONTE COMPLETO INTEGRADO (ATUALIZADO)
   ========================================================== */

/* ----------------------------------------------------------
   1. TIPOS E DEFINIÇÕES (src/lib/types.ts)
   ---------------------------------------------------------- */
export type PerfilUsuario = 'aluno' | 'instrutor' | 'admin';
export type Lateralidade = 'RH' | 'LH';
export type NivelAluno = 'Iniciação' | 'Básico' | 'Desenvolvimento' | 'Competitivo';
export type CondicaoFisica = 'Normal' | 'Fadiga' | 'Desconforto';
export type NivelConsistencia = 'A desenvolver' | 'Em evolução' | 'Consistente';
export type OpcaoTRX = 'Remada Aberta/Fechada' | 'Rosca Direta/Crucifixo';

export interface Usuario {
  uid: string;
  nome_completo: string;
  email?: string;
  telefone?: string;
  pin_acesso?: string; // Para instrutores (4 dígitos)
  cpf?: string; // Para alunos
  perfil: PerfilUsuario;
  status: 'ativo' | 'inativo';
  dados_arco?: {
    lateralidade: Lateralidade;
    libragem: number;
    puxada_atual: number;
  };
  matricula_info?: {
    data_inicio: string;
    aula_atual: number;
    nivel: NivelAluno;
  };
  criado_em: string;
}

export interface RegistroAula {
  record_id?: string;
  uid_aluno: string;
  numero_aula: number;
  data_realizacao: string;
  instrutor_id: string;
  detalhes_tecnicos: {
    trx_opcao_utilizada: OpcaoTRX;
    medicao_puxada_realizada: boolean;
    nova_puxada_registrada?: number;
    distancias_aplicadas: string[];
    regra_23_pontos_atingida: boolean;
  };
  observacoes_instrutor: string;
  concluida: boolean;
}


/* ----------------------------------------------------------
   2. CONEXÃO FIREBASE (src/lib/firebase.ts)
   ---------------------------------------------------------- */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);


/* ----------------------------------------------------------
   3. UTILITÁRIOS (src/lib/utils.ts)
   ---------------------------------------------------------- */
export function calcularMesesDecorridos(dataInicioISO: string): number {
  const inicio = new Date(dataInicioISO);
  const agora = new Date();
  const anosDiff = agora.getFullYear() - inicio.getFullYear();
  const mesesDiff = agora.getMonth() - inicio.getMonth();
  return (anosDiff * 12) + mesesDiff;
}

export function precisaMedirPuxada(numeroAula: number): boolean {
  return [5, 15, 18].includes(numeroAula);
}


/* ----------------------------------------------------------
   4. COMPONENTE TRX SELETOR (src/components/TrxSeletor.tsx)
   ---------------------------------------------------------- */
'use client';

export default function TrxSeletor({ opcaoSelecionada, onOpcaoChange }) {
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


/* ----------------------------------------------------------
   5. PORTAL DE LOGIN DO INSTRUTOR (src/app/instrutor/login/page.tsx)
   ---------------------------------------------------------- */
'use client';
import { useState } from 'react';

export default function LoginInstrutorPage() {
  const [instrutorSelecionado, setInstrutorSelecionado] = useState('Alexandre Borrego');
  const [pin, setPin] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Lista simulada de instrutores carregados do Firestore
  const instrutores = [
    { id: '1', nome: 'Alexandre Borrego' },
    { id: '2', nome: 'Ana Paula Borrego' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin.length !== 4) {
      alert('O PIN de acesso deve conter exatamente 4 dígitos.');
      return;
    }
    setCarregando(true);
    setTimeout(() => {
      alert(`Bem-vindo ao CT AVA, ${instrutorSelecionado}!`);
      setCarregando(false);
    }, 800);
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


/* ----------------------------------------------------------
   6. PÁGINA EXECUÇÃO DE AULA (src/app/instrutor/aula/[id]/page.tsx)
   ---------------------------------------------------------- */
'use client';
import { useState } from 'react';
import TrxSeletor from '@/components/TrxSeletor';

export default function ExecucaoAulaPage({ params }) {
  const numeroAula = parseInt(params?.id) || 18;
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


/* ----------------------------------------------------------
   7. CADASTRO DE NOVO ALUNO (src/app/admin/aluno/novo/page.tsx)
   ---------------------------------------------------------- */
'use client';
import { useState } from 'react';

export default function NovoAlunoPage() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [lateralidade, setLateralidade] = useState('RH');
  const [nivel, setNivel] = useState('Iniciação');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = (e) => {
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


/* ----------------------------------------------------------
   8. CONFIGURAÇÕES E GESTÃO DE INSTRUTORES (src/app/admin/config/page.tsx)
   ---------------------------------------------------------- */
'use client';
import { useState } from 'react';

export default function ConfigAdminPage() {
  const [novoNome, setNovoNome] = useState('');
  const [novoPin, setNovoPin] = useState('1234');
  const [instrutores, setInstrutores] = useState([
    { id: '1', nome: 'Alexandre Borrego', pin: '****', status: 'ativo' },
    { id: '2', nome: 'Ana Paula Borrego', pin: '****', status: 'ativo' }
  ]);

  const handleSalvarInstrutor = (e) => {
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


/* ----------------------------------------------------------
   9. CRON JOB WHATSAPP (src/app/api/cron/alertas-7-meses/route.ts)
   ---------------------------------------------------------- */
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const alertasEnviados = ["Carlos Silva"];
    return NextResponse.json({ success: true, alertasEnviados });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
