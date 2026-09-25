# Orçamento — Planilha Financeira

Web app simples para organizar o dinheiro do mês. Sem cadastro, sem instalação, sem servidor: o app inteiro está num único arquivo, `index.html`.

## Como abrir

Baixe o projeto, extraia a pasta e dê dois cliques no `index.html`. Também dá para publicar no GitHub Pages / Netlify / Vercel e usar no celular.

## Como funciona

No topo ficam os 4 números do mês:

- **Receita**: tudo o que entrou.
- **Investir**: quanto da receita você separa para investir. Em **Ajustar**, escolha a porcentagem ou digite o valor.
- **Despesas**: despesas fixas + variáveis.
- **Saldo**: em **Contas**, informe quanto tem em cada banco (Itaú, Bradesco, Nubank, Mercado Pago…); o cartão mostra a soma de todas, e embaixo a sobra do mês (receita − investir − despesas). Toque em "R$" para marcar uma conta como negativa (cheque especial). Os bancos aparecem com logo; toque no ícone para usar uma imagem sua. Sem contas cadastradas, o cartão mostra só a sobra do mês.

Os lançamentos ficam em três abas:

- **Receita**: salário, freelas etc. Marque *Receita recorrente* para repetir todo mês, ou *Recebimento futuro* para só contar quando você marcar como recebido.
- **Despesa fixa**: aluguel, internet, academia… Vale deste mês em diante, com dia de vencimento. Toque em *Pendente/Pago* para marcar o pagamento. O sino avisa as contas que vencem nos próximos dias.
- **Despesa variável**: gastos do dia a dia, com categoria. Marque *Parcelado* para dividir uma compra nos próximos meses.

- **Assinaturas**: Netflix, Spotify, Crunchyroll, Prime, Disney+ e outras, com logo. Escolha o serviço, o valor e se a cobrança é mensal ou anual (a anual só entra nas despesas no mês da renovação). Mostra o custo por mês e por ano, e o sino avisa as renovações dos próximos dias. Reajuste de preço vale deste mês em diante.
- **Investimentos**: onde seu dinheiro está guardado (ex.: conta Mercado Pago a 120% do CDI, CDB, Tesouro). Informe o saldo e o rendimento (% do CDI, prefixado ou sem rendimento), e o app estima o saldo de hoje dia a dia (dias úteis) e quanto rende por mês. Em *Editar* dá para corrigir o saldo, aportar ou resgatar. A taxa do CDI é buscada no Banco Central uma vez por dia; se não der, dá para ajustar clicando nela. Os valores são brutos, antes do IR.

Cada aba tem um gráfico de rosca mostrando para onde vai o dinheiro, filtro/busca e **Gerenciar categorias** (nome e cor).

Outros detalhes:

- O olho ao lado de "Orçamento" esconde os valores.
- Alterar ou excluir algo recorrente num mês posterior vale daquele mês em diante, e o passado não muda.
- O ícone de lua/sol ao lado da engrenagem alterna entre tema claro e escuro.
- A engrenagem tem a escolha de fonte (Urbanist, Outfit, Sora, Parkinsans ou Syne, embutidas no arquivo, funcionam sem internet), exportação do mês para CSV (abre no Excel / Google Planilhas), backup e restauração.
- Atalhos: `N` novo lançamento, `←` `→` troca o mês, `Esc` fecha.

## Dados

Tudo fica salvo no `localStorage` do navegador. Faça backup pela engrenagem de vez em quando, porque limpar os dados do navegador apaga os lançamentos. Dados da versão anterior do app são migrados automaticamente.

## Logos

Os logos vêm do [Simple Icons](https://simpleicons.org) (CC0) e ficam embutidos no arquivo. Marcas que não estão lá (ex.: Itaú, Bradesco, Disney+) aparecem com a inicial na cor da marca, e em qualquer conta ou assinatura dá para tocar no ícone e escolher uma imagem própria. As marcas pertencem aos seus donos e aparecem aqui só para identificar as contas e assinaturas de quem usa o app.
