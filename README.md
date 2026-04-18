# 🌍 Wiki Países
 
Aplicação web desenvolvida como projeto acadêmico no 4° semestre de Ciência da Computação, na disciplina de Desenvolvimento de Plataformas Web.
 
---
 
## 📋 Sobre o Projeto
 
O **Wiki Países** é uma aplicação que consome a API pública [RestCountries](https://restcountries.com/v3.1) para exibir informações detalhadas sobre países do mundo inteiro, com funcionalidades de busca, filtragem e paginação.

## 🛠️ Tecnologias Utilizadas
 
| Tecnologia | Finalidade |
|---|---|
| [React](https://react.dev/) | Biblioteca principal de UI |
| [Vite](https://vitejs.dev/) | Bundler e servidor de desenvolvimento |
| [React Router DOM](https://reactrouter.com/) | Roteamento entre páginas |
| [Axios](https://axios-http.com/) | Requisições HTTP |
| CSS Modules | Estilização com escopo por componente |
| [RestCountries API](https://restcountries.com/) | Fonte dos dados dos países |
 
---
 
## 📁 Estrutura de Pastas
 
```
src/
├── components/
│   └── CountryCard/        # Card exibido na Home
├── pages/
│   ├── Home/               # Tela principal com grid e filtros
│   └── CountryDetail/      # Tela de detalhes do país
├── service/
│   └── restcountriesapi/   # Configuração e chamadas à API
└── main.jsx                # Entrada da aplicação e rotas
```
 
---
 
## ▶️ Como Rodar o Projeto
 
### Pré-requisitos
 
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)
- npm (já vem com o Node.js)
### Passo a passo
 
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/wiki-paises.git
 
# 2. Entre na pasta do projeto
cd wiki-paises
 
# 3. Instale as dependências
npm install
 
# 4. Rode o servidor de desenvolvimento
npm run dev
```

## 🌐 API Utilizada
 
Base URL: `https://restcountries.com/v3.1`
 
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/all` | Lista todos os países |
| GET | `/region/{region}` | Filtra por continente |
| GET | `/name/{name}` | Busca por nome |
| GET | `/alpha/{code}` | Busca pelo código cca3 |
 
---
 
## 👨‍💻 Autor
 
Desenvolvido por **Erick**.
