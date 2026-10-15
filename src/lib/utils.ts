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
