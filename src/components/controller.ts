import { Request, Response } from "express"
import pool from "../db"
import { ICreateBody, IEditBody, IProducer, IProducersData } from "../interfaces"
import { validaCNPJ, validaCPF } from "../utils/validaIdentidade"
import { QUERY_POR_CULTURA, QUERY_POR_ESTADO, QUERY_POR_USO_SOLO, QUERY_TOTAL_FAZENDAS, QUERY_TOTAL_HECTARES, createProducer, deleteProducer, editProducer } from "../queries"

export const showAll = async (_: Request, res: Response): Promise<Response> => {
  try {
  const results: { rows: IProducer[] } = await pool.query('SELECT * FROM produtores');

  return res.status(200).json(results.rows)
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const create = async (req: Request, res: Response) => {
  const body: ICreateBody = req.body;

  if (!body.cnpj && !body.cpf) {
    return res.status(400).json({ error: 'CNPJ e CPF são obrigatórios' });
  }
  
  if (body.cnpj && !validaCNPJ(body.cnpj)) {
    return res.status(400).json({ error: 'CNPJ inválido' });
  }

  if (body.cpf && !validaCPF(body.cpf)) {
    return res.status(400).json({ error: 'CPF inválido' });
  }

  if (body.area_agricultavel_hectares + body.area_vegetacao_hectares > body.area_total_hectares) {
    return res.status(400).json({ error: 'A soma da área agrícola e vegetação não pode ser maior que a área total da fazenda' });
  }

  try {
    const { query, values } = createProducer(body);
    await pool.query(query, values);

    return res.status(201).json({ message: 'Produtor inserido com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar produtor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body: IEditBody = req.body;

  try {
    const { query, values } = editProducer(body, id);
    await pool.query(query, values);
    return res.status(200).json({ message: 'Produtor atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao editar produtor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const hardDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { query, values } = deleteProducer(id)
    await pool.query(query, values);
    return res.status(200).json({ message: 'Produtor excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir produtor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const getProducersData = async (_: Request, res: Response): Promise<Response> => {
  try {
    // Total de fazendas em quantidade
    const resultTotalFazendas: { rows: { count: number } } = await pool.query(QUERY_TOTAL_FAZENDAS);
    const totalFazendas = resultTotalFazendas.rows[0].count;

    // Total de fazendas em hectares (área total)
    const resultTotalHectares: { rows: { sum: number } } = await pool.query(QUERY_TOTAL_HECTARES);
    const totalHectares = resultTotalHectares.rows[0].sum;

    // Gráfico de pizza por estado
    const resultPorEstado: { rows: { estado: string; count: number }[] } = await pool.query(QUERY_POR_ESTADO);
    const dadosPorEstado = resultPorEstado.rows;

    // Gráfico de pizza por cultura
    const resultPorCultura: { rows: { cultura: string; count: number }[] } = await pool.query(QUERY_POR_CULTURA);
    const dadosPorCultura = resultPorCultura.rows;

    // Gráfico de pizza por uso de solo
    const resultPorUsoSolo: { rows: { agricultavel: number; vegetacao: number } } = await pool.query(QUERY_POR_USO_SOLO);
    const dadosPorUsoSolo = {
      agricultavel: resultPorUsoSolo.rows[0].agricultavel,
      vegetacao: resultPorUsoSolo.rows[0].vegetacao,
    };

    const data: IProducersData = {
      totalFazendas,
      totalHectares,
      dadosPorEstado,
      dadosPorCultura,
      dadosPorUsoSolo,
    };

    // Envia a resposta
    return res.json(data);
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}