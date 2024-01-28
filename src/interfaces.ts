export interface IProducer {
  id: number;
  cpf?: string;
  cnpj?: string;
  nome_produtor: string;
  nome_fazenda: string;
  cidade: string;
  estado: string;
  area_total_hectares: number;
  area_agricultavel_hectares: number;
  area_vegetacao_hectares: number;
  culturas_plantadas: string[];
}

export interface IQueryCreator {
  query: string;
  values: any[];
}

export interface IProducersData {
  totalFazendas: number;
  totalHectares: number;
  dadosPorEstado: Array<{ estado: string; count: number }>;
  dadosPorCultura: Array<{ cultura: string; count: number }>;
  dadosPorUsoSolo: { agricultavel: number; vegetacao: number };
}

export interface ICreateBody extends Omit<IProducer, 'id'> {}

export interface IEditBody extends Omit<IProducer, 'id' | 'cpf' | 'cnpj'> {}