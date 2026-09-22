# 🌸 ONG FLORECER — Plataforma Web Responsiva & Acessível

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Acessibilidade](https://img.shields.io/badge/Accessibility-WCAG_2.1-green?style=for-the-badge)

Projeto web desenvolvido como atividade acadêmica para a **ONG FLORECER**, focada em inclusão social, projetos educacionais e captação de voluntários. A aplicação foi construída do zero priorizando **Design Responsivo**, **Acessibilidade (WCAG)**, **Comunicação Visual Interativa** e **Validação Robusta de Formulários em Tempo Real**.

---

## 🚀 Funcionalidades & Destaques Técnicos

### 📱 1. Navegação Responsiva & Menu Dropdown
- **Menu Hamburguer Mobile:** Navegação otimizada para telas pequenas com acionamento dinâmico e controle de estados via ARIA.
- **Submenu Dropdown no Desktop:** Construído com CSS avançado (`width: max-content;`, `white-space: nowrap;`), garantindo que os itens do submenu fiquem alinhados e sem quebras de linha indesejadas.
- **Contexto de Empilhamento (*Stacking Context*):** Ajuste fino de `z-index` no cabeçalho para evitar sobreposição de banners ou elementos de conteúdo.

### 🎨 2. Interatividade Visual & Design System
- **Arquitetura CSS Modular:** Uso de variáveis CSS (`:root`) para padronização de cores, espaçamentos, sombras e tipografia.
- **Micro-interações:** Feedback imediato em botões (`:hover`, `:focus`, `:active`) simulando elevação com `transform: translateY(-2px);` e sombras suaves.
- **Feedback Semântico:** Indicadores de estado visuais para foco e navegação por teclado.

### 🛡️ 3. Formulário de Cadastro com Validação Dinâmica & Máscaras
- **Máscara Inteligente em Tempo Real:** 
  - **CPF:** Formatação automática (`000.000.000-00`) com bloqueio instantâneo de letras e prevencão de caracteres/pontos duplicados.
  - **Telefone/WhatsApp:** Formatação dinâmica flexível para fixo `(00) 0000-0000` e celular `(00) 00000-0000`.
- **Validação Específica por Campo:**
  - **Nome:** Exige nome e sobrenome, bloqueando números e caracteres especiais.
  - **E-mail:** Validação via Expressão Regular (Regex).
  - **CPF & Telefone:** Verificação estrita de contagem de dígitos e bloqueio de padrões repetidos.
- **Caixas de Alerta Inline:** Avisos visuais em vermelho abaixo do campo afetado assim que uma regra é violada.
- **Trava Estrita de Envio (Submit):** O envio do formulário e o disparo do modal de confirmação são **bloqueados** enquanto houver qualquer pendência nos campos, aplicando o foco automático (`focus()`) no primeiro campo com erro.
- **Sistema Dinâmico de Modal:** Confirmação visual estilizada em JavaScript puro ao concluir a inscrição com sucesso.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação orientada à acessibilidade (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, atributos `aria-*`).
- **CSS3 Moderno:** Flexbox, CSS Grid, Mídias Queries (`@media`), Variáveis CSS e Transições de UI.
- **JavaScript (Vanilla JS):** Manipulação de DOM, tratamento de eventos (`input`, `blur`, `submit`), Regex e lógica de validação sem dependência de bibliotecas externas.

---

## 📝 Relatório de Conformidade e Acessibilidade (WCAG 2.1 AA)

- **Landmarks Semânticos:** Implementação integral de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`.
- **Navegação por Teclado:** Inclusão de *Skip Link* para salto direto ao conteúdo principal (`#main-content`) e indicadores `:focus-visible` de alto contraste em todos os elementos interativos.
- **Leitores de Ecrã:** Atributos `aria-label`, `aria-expanded` e `aria-current="page"` aplicados nos controlos de menu e hiperligações do sistema.
- **Otimização:** Ativo em ambiente de produção com carregamento contínuo via GitHub.

## 📁 Estrutura de Pastas do Projeto

```text
├── css/
│   └── style.css        # Estilos globais, variáveis, componentes e media queries
├── js/
│   └── script.js        # Lógica do menu, máscaras, validação de formulário e modal
├── assets/              # Imagens, ícones SVG e recursos visuais
├── index.html           # Página principal da aplicação
└── README.md            # Documentação do projeto
