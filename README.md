API de Gerenciamento de Pedidos

Este projeto foi desenvolvido como parte de um desafio técnico. O objetivo principal é receber dados de pedidos, realizar um mapeamento  e salva-los em um banco de dados estruturado.

O que a API faz?

A aplicação funciona recebe dados de pedidos e salva no banco de dados.

Além disso, ela gerencia o relacionamento entre o Pedido e seus Itens e os salva no bancos de dados.

Tecnologias Utilizadas

    Node.js: Ambiente de execução.
    
    Express: Framework para criação das rotas e do servidor.
    
    Sequelize (ORM): Intermediador da comunicação com o banco de dados.
    
    SQLite: Banco de dados relacional.

Como testar no seu computador

    Instalação:
    Certifique-se de ter o Node.js instalado e rode:
    Bash
    
    npm install
    
    Execução:
    Inicie o servidor com o comando:
    Bash
    
    node app.js
    
    A API estará rodando em http://localhost:3000.
    
    Criando um Pedido (Exemplo de cURL):
    Bash
    
    curl --location 'http://localhost:3000/order' \
    --header 'Content-Type: application/json' \
    --data '{
      "numeroPedido": "v10089015vdb-01", 
      "valorTotal": 10000,
      "dataCriacao": "2023-07-19T12:24:11.529Z",
      "items": [
          {
            "idItem": "2434",
            "quantidadeItem": 1,
            "valorItem": 1000
          }
      ]
    }'
    
    Consultando:
    Você pode listar todos os pedidos acessando http://localhost:3000/order/list no seu navegador.

Desenvolvido por:

Guilherme da Silva Lima

    LinkedIn: guilherme-lima-554b90144
    Telefone/WhatsApp: (31) 99487-5020
    Cidade: Nova Era, MG
    Email: guilherme_bsl@hotmail.com
    github:github.com/glima96