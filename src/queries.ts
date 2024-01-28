import { ICreateBody, IEditBody, IQueryCreator } from "./interfaces";

export const CREATE_DATABASE: string = 'CREATE DATABASE brain_ag';

export const CREATE_TABLE: string = `CREATE TABLE IF NOT EXISTS produtores (
  id SERIAL PRIMARY KEY,
  cpf letCHAR(11), -- Campo para armazenar CPF
  cnpj letCHAR(14), -- Campo para armazenar CNPJ
  nome_produtor letCHAR(255) NOT NULL,
  nome_fazenda letCHAR(255) NOT NULL,
  cidade letCHAR(100) NOT NULL,
  estado letCHAR(50) NOT NULL,
  area_total_hectares DECIMAL(10, 2) NOT NULL,
  area_agricultavel_hectares DECIMAL(10, 2) NOT NULL,
  area_vegetacao_hectares DECIMAL(10, 2) NOT NULL,
  culturas_plantadas letCHAR(255)[]
);`;

export const CREATE_MOCK_DATA: string = `INSERT INTO produtores (cpf, cnpj, nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas)
  VALUES
    ('12345678901', NULL, 'João Silva', 'Fazenda Feliz', 'São Paulo', 'SP', 1000.00, 800.00, 200.00, ARRAY['Soja', 'Milho']),
    (NULL, '98765432100001', 'Maria Oliveira', 'Fazenda Esperança', 'Goiânia', 'GO', 1200.50, 1000.00, 150.50, ARRAY['Café', 'CanadeAçucar']),
    (NULL, '11222333400014', 'AgroNegócios S.A.', 'Fazenda Progresso', 'Brasília', 'DF', 5000.75, 4500.25, 500.50, ARRAY['Algodão', 'Soja', 'Milho']),
    ('11122233344', NULL, 'Ana Souza', 'Fazenda Alegria', 'Porto Alegre', 'RS', 800.25, 700.75, 50.50, ARRAY['Milho', 'Café']),
    (NULL, '55566677788000', 'Ricardo Lima', 'Fazenda Vista Verde', 'Fortaleza', 'CE', 1500.50, 1200.00, 180.50, ARRAY['Algodão', 'Cana de Açúcar']),
    (NULL, '99988877700011', 'AgroTop Ltda.', 'Fazenda União', 'Curitiba', 'PR', 3000.00, 2500.25, 400.75, ARRAY['Soja', 'Milho', 'Café']),
    ('11122233344', NULL, 'Fernanda Oliveira', 'Fazenda Primavera', 'Belém', 'PA', 1200.75, 1000.25, 150.50, ARRAY['Cana de Açúcar', 'Milho']),
    (NULL, '55566677788000', 'Carlos Santos', 'Fazenda Progresso', 'Recife', 'PE', 2000.00, 1800.50, 120.50, ARRAY['Café', 'Algodão']),
    (NULL, '99988877700011', 'AgroBrasil S.A.', 'Fazenda Aurora', 'Porto Velho', 'RO', 3500.25, 3200.00, 250.25, ARRAY['Soja', 'Milho', 'Café']),
    ('12345678900', NULL, 'Lucia Pereira', 'Fazenda Felicidade', 'Campo Grande', 'MS', 1800.50, 1600.25, 120.25, ARRAY['Milho', 'Soja']),
    (NULL, '98765432100000', 'AgroTech Ltda.', 'Fazenda Inovação', 'Salvador', 'BA', 2800.00, 2400.75, 300.25, ARRAY['Algodão', 'Cana de Açúcar', 'Soja']),
    ('11122233355', NULL, 'Roberto Silva', 'Fazenda Esperança', 'Manaus', 'AM', 900.75, 800.25, 80.50, ARRAY['Café', 'Milho']),
    (NULL, '55566677700012', 'AgroFuturo S.A.', 'Fazenda Futuro', 'Florianópolis', 'SC', 4000.25, 3800.50, 150.75, ARRAY['Soja', 'Algodão']),
    (NULL, '99988877722478', 'Mariana Costa', 'Fazenda Harmonia', 'João Pessoa', 'PB', 1500.00, 1300.25, 120.75, ARRAY['Milho', 'Cana de Açúcar']),
    ('12345678900', NULL, 'AgroVida Ltda.', 'Fazenda Vida Nova', 'Vitória', 'ES', 2600.50, 2400.00, 180.50, ARRAY['Soja', 'Café']),
    (NULL, '98765432111456', 'Pedro Mendes', 'Fazenda Progresso', 'Aracaju', 'SE', 3200.25, 3000.50, 120.75, ARRAY['Algodão', 'Milho']);`;

// Entrega os dados de estatisticas para o dashboard
export const QUERY_TOTAL_FAZENDAS = "SELECT COUNT(*) FROM produtores;";
export const QUERY_TOTAL_HECTARES = 'SELECT SUM(area_total_hectares) FROM produtores;';
export const QUERY_POR_ESTADO = 'SELECT estado, COUNT(*) FROM produtores GROUP BY estado;';
export const QUERY_POR_CULTURA = 'SELECT unnest(culturas_plantadas) as cultura, COUNT(*) FROM produtores GROUP BY cultura;';
export const QUERY_POR_USO_SOLO = 'SELECT SUM(area_agricultavel_hectares) as agricultavel, SUM(area_vegetacao_hectares) as vegetacao FROM produtores;';

// Edição de produtores
export const editProducer = (body: IEditBody, id: string): IQueryCreator => {
  const { nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas } = body;

  const values = [
    nome_produtor,
    nome_fazenda,
    cidade,
    estado,
    area_total_hectares,
    area_agricultavel_hectares,
    area_vegetacao_hectares,
    culturas_plantadas,
    id
  ];

  const query = `
    UPDATE produtores 
    SET 
      nome_produtor = $1,
      nome_fazenda = $2,
      cidade = $3,
      estado = $4,
      area_total_hectares = $5,
      area_agricultavel_hectares = $6,
      area_vegetacao_hectares = $7,
      culturas_plantadas = $8
    WHERE id = $9;
  `;

  return { query, values };
}

// Criação de produtores
export const createProducer = (body: ICreateBody): IQueryCreator => {
  const {
    cpf,
    cnpj,
    nome_produtor,
    nome_fazenda,
    cidade,
    estado,
    area_total_hectares,
    area_agricultavel_hectares,
    area_vegetacao_hectares,
    culturas_plantadas,
  } = body;

  let query;
  let values;

  if (cpf) {
    query = `
      INSERT INTO produtores 
        (cpf, nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    values = [cpf, nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas];
  } else {
    query = `
      INSERT INTO produtores 
        (cnpj, nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    values = [cnpj, nome_produtor, nome_fazenda, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, culturas_plantadas];
  }

  return { query, values };
};

// Deleta um produtor
export const deleteProducer = (id: string): IQueryCreator => {
  const query = 'DELETE FROM produtores WHERE id = $1';
  const values = [id];

  return { query, values };
}
