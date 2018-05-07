# Ethereum Finchain Course - Voting Smart Contract

## Projeto NodeJS e Truffle

### Start DApp
No console, no diretório do projeto:

#### Instalando dependências
`../EthereumFinchainCourseVote$ npm install`

#### Rodando Wallet web app
`../EthereumFinchainCourseVote$ npm run dev`

Abrir o endereço http://localhost:3001 em um browser com MetaMask conectado na rede Ropsten.

A DApp utiliza os arquivos ../build/contracts, para atualizar o seu contrato modificado, basta realizar o truffle migrate na rede de preferência (lembre-se que se não especificar a rede com o parâmetro --network nome_da_rede_configurado, o truffle irá usar a configuração development do arquivo truffle.js (truffle-config.js para windows). Se a rede mostrar que já está atualizada, é porque não houve de fato mudanças no seu contrato, mas se persistir, user o parâmetro --reset no truffle migrate.

ENJOY!!!