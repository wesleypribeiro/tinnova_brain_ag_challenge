import { Pool } from 'pg';
import { CREATE_DATABASE, CREATE_MOCK_DATA, CREATE_TABLE } from './queries';

const pool: Pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'brain_ag',
  port: 5432
})

const client: Pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432
});

export const initData = async () => {
  try {
    // Cria o BD caso não exista
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'brain_ag'`);
    
    if (res.rowCount === 0) {
        console.log(`Banco de dados brain_ag não encontrado, sendo criado...`);
        await client.query(CREATE_DATABASE);
        console.log(`Criado o banco de dados brain_ag.`);
    } else {
        console.log(`Banco já existente. Nenhum BD criado.`);
    }
    
    await client.end();

    // Cria a tabela caso não exista
    await pool.query(CREATE_TABLE);

    // Verifica se a tabela já possui dados
    const result = await pool.query('SELECT COUNT(*) FROM produtores');
    const rowCount = parseInt(result.rows[0].count, 10);

    if (rowCount === 0) {
      // Insere os dados mockados
      pool.query(CREATE_MOCK_DATA);

      console.log('Dados mockados inseridos com sucesso!');
    } else {
      console.log('A tabela já possui dados. Nenhum dado mockado inserido.');
    }
  } catch (error) {
    console.error('Erro ao inserir dados mockados:', error);
  }
}

export default pool;