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
  pin_acesso?: string;
  cpf?: string;
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
