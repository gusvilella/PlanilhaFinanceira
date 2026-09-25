# Orçamento — Planilha Financeira


**Abrir o app:** https://gusvilella.github.io/PlanilhaFinanceira/ (atualiza sozinho a cada mudança publicada)

Web app simples para organizar o dinheiro do mês. Sem cadastro, sem instalação, sem servidor: o app inteiro está num único arquivo, `index.html`.

## Como abrir

Baixe o projeto, extraia a pasta e dê dois cliques no `index.html`. Também dá para publicar no GitHub Pages / Netlify / Vercel e usar no celular.

## Instalar no celular (app)

Para ter o app com ícone na tela inicial, abrindo em tela cheia e funcionando sem internet, ele precisa estar publicado num endereço. O jeito grátis é o GitHub Pages:

1. No GitHub, abra o repositório → **Settings** → **Pages**.
2. Em **Branch**, escolha a branch do app e a pasta `/ (root)` e clique em **Save**.
3. Depois de uns minutos o endereço aparece no topo da página (algo como `https://seu-usuario.github.io/PlanilhaFinanceira/`).
4. Abra esse endereço no celular:
   - **Android (Chrome)**: menu **⋮** → **Instalar app**.
   - **iPhone (Safari)**: **Compartilhar** → **Adicionar à Tela de Início**.

Na engrenagem também tem **Instalar como app**, com essas instruções.

Os dados ficam em cada aparelho. Para usar o mesmo conteúdo no celular e no computador, veja **Sincronizar** mais abaixo.

## Como funciona

No topo ficam os 4 números do mês:

- **Receita**: tudo o que entrou.
- **Investir**: quanto da receita você separa para investir. Em **Ajustar**, escolha a porcentagem ou digite o valor.
- **Despesas**: despesas fixas + variáveis.
- **Saldo**: em **Contas**, informe quanto tem em cada banco (Itaú, Bradesco, Nubank, Mercado Pago…); o cartão mostra a soma de todas, e embaixo a sobra do mês (receita − investir − despesas). Toque em "R$" para marcar uma conta como negativa (cheque especial). Os bancos aparecem com logo; toque no ícone para usar uma imagem sua. Sem contas cadastradas, o cartão mostra só a sobra do mês.

**Visão geral** (primeira aba): um painel com a previsão do saldo nos próximos 30 dias (com aviso se a conta vai ficar negativa e detalhe de cada dia ao passar o mouse), o calendário do mês com o que entra e sai em cada dia, para onde vai o dinheiro (todas as despesas), a fatura da vez de cada cartão com o uso do limite, e metas e patrimônio.

Os lançamentos ficam nas abas:

- **Receita**: salário, freelas etc. Marque *Receita recorrente* para repetir todo mês, ou *Recebimento futuro* para só contar quando você marcar como recebido.
- **Despesa fixa**: aluguel, internet, academia… Vale deste mês em diante, com dia de vencimento. Toque em *Pendente/Pago* para marcar o pagamento. O sino avisa as contas que vencem nos próximos dias.
- **Despesa variável**: gastos do dia a dia, com categoria. Marque *Parcelado* para dividir uma compra nos próximos meses.

- **Assinaturas**: Netflix, Spotify, Crunchyroll, Prime, Disney+ e outras, com logo. Escolha o serviço, o valor e se a cobrança é mensal ou anual (a anual só entra nas despesas no mês da renovação). Mostra o custo por mês e por ano, e o sino avisa as renovações dos próximos dias. Reajuste de preço vale deste mês em diante.
- **Cartões**: cadastre cada cartão com banco, bandeira (Visa, Mastercard, Elo, Amex, Hipercard, Diners), final, limite, dia de fechamento e de vencimento. Cada fatura tem datas reais (fecha dd/mm, vence dd/mm) e status pelas datas: **Aberta** (ainda recebendo compras), **A pagar** (fechada), **Vencida** ou **Paga**. No mês atual a aba mostra a fatura "da vez" de cada cartão, e as setas na janela da fatura navegam entre as faturas. Uma fatura vencida sem pagar tem o botão "Mover para a fatura de…", para corrigir valores lançados no mês errado. O sino avisa as faturas fechadas perto do vencimento ou vencidas.
- **Limite disponível**: com o limite cadastrado, cada cartão mostra quanto ainda tem livre (limite − faturas em aberto − compras e parcelas que ainda vão entrar). Compras parceladas no cartão caem uma parcela em cada fatura, e enquanto a fatura não é lançada aparece uma prévia com o que já está nela.
- **Pago com / Recebido em**: todo lançamento pode dizer de onde saiu ou pra onde foi: uma conta (Pix, débito, boleto) ou um cartão. O app lembra a última escolha. Conta: o saldo dela se atualiza sozinho (receitas somam, gastos descontam, na data do lançamento, até hoje). Cartão: a cobrança entra na fatura certa pela data (depois do fechamento, vai para a próxima) e, quando essa fatura é lançada, deixa de somar separado, porque já está dentro dela. No cadastro do cartão dá para dizer com qual conta a fatura é paga: ao marcar como paga, o valor sai dessa conta. Corrigir um saldo à mão em Contas faz a conta recomeçar daquele valor.
- **Investimentos**: onde seu dinheiro está guardado (ex.: conta Mercado Pago a 120% do CDI, CDB, Tesouro). Informe o saldo e o rendimento (% do CDI, prefixado ou sem rendimento), e o app estima o saldo de hoje dia a dia (dias úteis) e quanto rende por mês. Em *Editar* dá para corrigir o saldo, aportar ou resgatar. A taxa do CDI é buscada no Banco Central uma vez por dia; se não der, dá para ajustar clicando nela. Os valores são brutos, antes do IR.

**Importar extrato** (engrenagem → *Importar extrato do banco*): aceita CSV (Nubank conta e cartão, Inter, Itaú e outros com colunas de data/descrição/valor, separados por vírgula ou ponto e vírgula) e OFX. Mostra uma prévia para conferir: você diz de qual conta ou cartão é o extrato, cada lançamento vem com categoria sugerida (por palavras como iFood, posto, farmácia e pelo que você já categorizou antes) e o que já foi lançado, pagamentos de fatura e estornos vêm desmarcados. Dá para desfazer logo depois de importar.

- **Metas**: objetivos com valor e prazo (viagem, carro, reserva de emergência…). O app mostra o progresso e quanto guardar por mês para chegar lá. O guardado pode ser digitado ou vir dos seus investimentos (soma o saldo estimado deles). O botão *Calcular reserva de emergência* usa 6 meses da sua média de despesas. O resumo avisa se as metas pedem mais do que você reserva em Investir.

- **Limite por categoria**: em *Gerenciar categorias* (aba Despesa variável), dê um limite por mês a cada categoria. A aba mostra uma barra por categoria (⚠️ a partir de 80%, ⛔ quando passa), a janela de nova despesa diz quanto ainda cabe, e o sino avisa.

**Evolução** (cartão embaixo das abas): colunas de receita × despesas dos últimos 6 ou 12 meses (passe o mouse para ver os valores, clique para ir ao mês, ou *Ver tabela*), e comparações automáticas: quanto você gastou a mais/menos que no mês anterior, as categorias que mais mudaram, a média de despesas, quanto sobrou da receita e o patrimônio (contas + investimentos, registrado mês a mês).

Cada aba tem um gráfico de rosca mostrando para onde vai o dinheiro, filtro/busca e **Gerenciar categorias** (nome e cor).

**Lançamento rápido** (botão **+** no canto, ou tecla `Q`): escreva do seu jeito, como `mercado 45,90 nubank`, `uber 23 crédito itaú`, `café 6,50 ontem` ou `recebi 300 freela pix nubank`. O app entende valor, data, categoria, e se foi na conta ou no cartão (também pelo final, ex.: `cartão 8890`), e mostra o que entendeu antes de lançar. Gastos frequentes viram ⭐ favoritos: um toque e está lançado.

Outros detalhes:

- O olho ao lado de "Orçamento" esconde os valores.
- Alterar ou excluir algo recorrente num mês posterior vale daquele mês em diante, e o passado não muda.
- O ícone de lua/sol ao lado da engrenagem alterna entre tema claro e escuro.
- A engrenagem tem a escolha de fonte (Urbanist, Outfit, Sora, Parkinsans ou Syne, embutidas no arquivo, funcionam sem internet), exportação do mês para CSV (abre no Excel / Google Planilhas), backup e restauração.
- Atalhos: `N` novo lançamento, `←` `→` troca o mês, `Esc` fecha.

## Dados

Tudo fica salvo no `localStorage` do navegador. Faça backup pela engrenagem de vez em quando, porque limpar os dados do navegador apaga os lançamentos. Dados de versões anteriores do app são migrados automaticamente.

## Sincronizar celular e computador

Engrenagem → **Sincronizar entre aparelhos**. Usa um Gist secreto da sua conta do GitHub, de graça:

1. Crie um token no GitHub só com permissão de **gist** (o app tem o link direto).
2. Cole o token e crie uma **senha de sincronização**.
3. Nos outros aparelhos, conecte com **o mesmo token e a mesma senha**.

Os dados vão **criptografados** (AES-GCM 256, chave derivada da senha com PBKDF2): o GitHub só guarda texto embaralhado. Sem a senha não dá para recuperar o conteúdo da nuvem. Cada mudança sobe sozinha em poucos segundos e os outros aparelhos baixam ao abrir o app. Se os dois aparelhos mudarem ao mesmo tempo sem internet, vale a versão salva por último.

## Senha e digital

Em **⚙ → Senha e digital** você cria um PIN de 4 dígitos para abrir o app. No celular (e no computador com Windows Hello / Touch ID) dá para ativar a **digital ou o rosto**. O app também se tranca sozinho quando fica mais de 1 minuto em segundo plano. O PIN não fica salvo em texto: só um hash dele fica no aparelho.

Esqueceu o PIN? Em "Esqueci a senha" você pode apagar os dados deste aparelho e depois recuperar tudo conectando a sincronização de novo (ou pelo backup).

## Logos

Os logos ficam embutidos no arquivo (funcionam sem internet):

- Bancos: [Bancos-em-SVG](https://github.com/Tgentil/Bancos-em-SVG)
- Serviços: [svgl](https://svgl.app) e [Simple Icons](https://simpleicons.org) (CC0)
- Bandeiras de cartão: [svg-credit-card-payment-icons](https://github.com/aaronfagan/svg-credit-card-payment-icons) (Apache 2.0)

Marcas sem logo disponível aparecem com a inicial na cor da marca, e em qualquer conta ou assinatura dá para tocar no ícone e escolher uma imagem própria. As marcas pertencem aos seus donos e aparecem aqui só para identificar as contas, cartões e assinaturas de quem usa o app.
