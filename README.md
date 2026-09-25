# Orçamento — Planilha Financeira

Web app simples para organizar o dinheiro do mês. Sem cadastro, sem instalação, sem servidor: o app inteiro está num único arquivo, `index.html`.

## Como abrir

Baixe o projeto, extraia a pasta e dê dois cliques no `index.html`. Também dá para publicar no GitHub Pages / Netlify / Vercel e usar no celular.

## Como funciona

No topo ficam os 4 números do mês:

- **Receita**: tudo o que entrou.
- **Investir**: quanto da receita você separa para investir. Em **Ajustar**, escolha a porcentagem ou digite o valor.
- **Despesas**: despesas fixas + variáveis.
- **Saldo**: receita − investir − despesas.

Os lançamentos ficam em três abas:

- **Receita**: salário, freelas etc. Marque *Receita recorrente* para repetir todo mês, ou *Recebimento futuro* para só contar quando você marcar como recebido.
- **Despesa fixa**: aluguel, internet, academia… Vale deste mês em diante, com dia de vencimento. Toque em *Pendente/Pago* para marcar o pagamento. O sino avisa as contas que vencem nos próximos dias.
- **Despesa variável**: gastos do dia a dia, com categoria. Marque *Parcelado* para dividir uma compra nos próximos meses.

Cada aba tem um gráfico de rosca mostrando para onde vai o dinheiro, filtro/busca e **Gerenciar categorias** (nome e cor).

Outros detalhes:

- O olho ao lado de "Orçamento" esconde os valores.
- Alterar ou excluir algo recorrente num mês posterior vale daquele mês em diante, e o passado não muda.
- O ícone de lua/sol ao lado da engrenagem alterna entre tema claro e escuro.
- A engrenagem tem a escolha de fonte (Urbanist, Outfit, Sora, Parkinsans ou Syne, embutidas no arquivo, funcionam sem internet), exportação do mês para CSV (abre no Excel / Google Planilhas), backup e restauração.
- Atalhos: `N` novo lançamento, `←` `→` troca o mês, `Esc` fecha.

## Dados

Tudo fica salvo no `localStorage` do navegador. Faça backup pela engrenagem de vez em quando, porque limpar os dados do navegador apaga os lançamentos. Dados da versão anterior do app são migrados automaticamente.
