# Grana — Planilha Financeira

Web app simples para organizar o dinheiro do dia a dia. Sem cadastro, sem instalação, sem servidor: abre e usa.

## Como usar

O app inteiro está num arquivo só: `index.html`. Baixe e abra no navegador (se baixou o ZIP, extraia antes), ou publique no GitHub Pages / Netlify / Vercel.

- **+** adiciona um gasto ou uma entrada. Digite o valor como no app do banco (`1234` → `R$ 12,34`), escolha a categoria e salve.
- Toque numa movimentação para **editar** ou **excluir** (com opção de desfazer).
- **‹ ›** troca o mês; tocar no nome do mês volta para o mês atual.
- **Editar** no cartão de saldo define um limite de gastos mensal; a barra fica amarela acima de 80% e vermelha quando passa do limite.
- **⋯** exporta o mês em CSV (abre no Excel / Google Planilhas), faz backup e restaura os dados.
- **◐** alterna entre tema claro e escuro.
- Atalhos no teclado: `N` nova movimentação, `←` `→` troca o mês, `Esc` fecha.

## Dados

Tudo fica salvo no `localStorage` do navegador. Faça backup pelo menu de vez em quando, já que limpar os dados do navegador apaga as movimentações.

## Estrutura

Tudo fica em `index.html`: o visual (CSS, com tema claro e escuro) está no `<style>` e a lógica (estado, cálculos, exportação) está no `<script>`.
