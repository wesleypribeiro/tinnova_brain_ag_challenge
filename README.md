# Resolução do meu teste para a Tinnova
Esse reposório contém o back end para criação, edição, deletar e visualizar dados do banco de dados brain_ag, como pedido no desafio da Tinnova

## Instruções para uso
Assim que clonado o repositório para sua maquina, o arquivo *db.ts* deve ser editado e inserido os dados do usuario do postgresql nas seguintes linhas abaixo:

![image](https://github.com/wesleypribeiro/tinnova_brain_ag_challenge/assets/60102340/e17950de-a284-46e9-b24f-cd615729bb9c)

Em seguida, é necessário executar o comando `npm install` para instalar as dependencias, seguido de `npm start` para iniciar a API.
**Quando iniciado pela primeira vez, ele criará a tabela, o banco de dados e os dados mockados para primeira utilização.**

# API de Produtores Rurais

Esta API gerencia informações de produtores rurais, permitindo a criação, edição e exclusão de registros. Além disso, oferece endpoints para fornecer dados essenciais para um dashboard.

## Endpoints

### Cadastrar Produtor Rural

**Endpoint:**
***POST /produtores***

**Descrição:**
Cadastra um novo produtor rural no sistema.

**Parâmetros:**
- `cpf` (opcional, se não fornecido, é obrigatório fornecer `cnpj`)
- `cnpj` (opcional, se não fornecido, é obrigatório fornecer `cpf`)
- `nome_produtor`
- `nome_fazenda`
- `cidade`
- `estado`
- `area_total_hectares`
- `area_agricultavel_hectares`
- `area_vegetacao_hectares`
- `culturas_plantadas`

### Editar Produtor Rural

**Endpoint:**
***PUT /produtores/:id***

**Descrição:**
Edita as informações de um produtor rural existente.

**Parâmetros:**
- `id` (identificador único do produtor)
- Qualquer combinação de campos que deseja editar (ex: `nome_produtor`, `nome_fazenda`, etc.)

### Excluir Produtor Rural

**Endpoint:**
***DELETE /produtores/:id***

**Descrição:**
Remove um produtor rural do sistema.

**Parâmetros:**
- `id` (identificador único do produtor)

### Dashboard

**Endpoint:**
***GET /produtores/estatisticas***

**Descrição:**
Retorna dados essenciais para um dashboard, incluindo:
- Total de fazendas em quantidade
- Total de fazendas em hectares (área total)
- Gráfico de pizza por estado
- Gráfico de pizza por cultura
- Gráfico de pizza por uso de solo (área agricultável e vegetação)

## Como Usar

1. Clone este repositório.
2. Instale as dependências utilizando `npm install`.
3. Configure o banco de dados PostgreSQL.
4. Execute o servidor usando `npm start`.
5. Acesse os endpoints conforme documentado acima.




