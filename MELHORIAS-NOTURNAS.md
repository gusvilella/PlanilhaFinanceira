# Melhorias noturnas

Trabalho feito durante a noite, sem mudar o jeito como seus dados são guardados (tudo que já existe continua funcionando).

## Para você testar de manhã

1. **Sincronização (o mais importante)**: se usa em dois aparelhos, lance algo num deles e abra o outro em outro dia. O lançamento aparece nos dois e **não some** mais (item 23).
2. **Desfazer**: edite um gasto, salve e toque em "Desfazer" no aviso de baixo. Vale também para pagar fatura, excluir categoria, restaurar backup e "Apagar tudo".
3. **Receita recorrente**: abra o Salário num mês depois do primeiro, desmarque "Receita recorrente" e salve. Os meses anteriores continuam com o salário.
4. **Importar extrato** do C6, Itaú ou Mercado Pago (⚙ → Importar extrato). Antes davam erro ou valor errado.
5. **Buscar em todos os meses**: aba Despesa variável → Filtro → digite "ifood" → marque "Buscar em todos os meses".
6. **Celular**: arraste o dedo para os lados para trocar o mês; os botões pequenos ficaram mais fáceis de acertar.
7. **Cartão que fecha depois do vencimento** (ex.: fecha 26, vence 5): confira o "disponível" do cartão; agora conta as compras feitas depois do fechamento.
8. **Sininho no celular**: toque no sininho; a lista de avisos agora aparece inteira na tela (antes abria quase toda fora da tela).
9. **Saldo da conta no mesmo dia**: corrija o saldo de uma conta em Contas e, logo depois, lance um gasto pago com ela. O saldo agora desconta na hora.
10. **Previsão de 30 dias** (Visão geral): agora desconta a prévia da fatura do cartão que ainda não foi lançada.

## Pontos para você decidir (não mexi)

- **Despesa fixa paga "com a conta"**: quando o vencimento passa, o saldo da conta já desconta o valor automaticamente (como débito automático), mas a conta continua aparecendo como **Atrasada** no sininho até você tocar em "Paguei". Não mudei porque as duas leituras fazem sentido (lembrete × saldo) e mudar alteraria saldos que você já usa. Se preferir, dá para: (a) marcar como paga sozinha quando vence, ou (b) só descontar do saldo quando você marcar como paga.
- **Sincronização com os dois aparelhos mexendo ao mesmo tempo sem internet**: continua valendo a versão salva por último (como já estava no README). Juntar as mudanças dos dois lados seria uma mudança grande.

## O que mudou

### 1. Editar receita recorrente não apaga mais o passado
- **Antes:** se você abrisse o Salário (recorrente) em setembro e desmarcasse "Receita recorrente", o salário **sumia de todos os meses anteriores**. E trocar só a conta onde ele cai às vezes não era salvo.
- **Agora:** desmarcar vale só daquele mês em diante (os meses anteriores ficam como estavam) e trocar a conta de recebimento é salvo, valendo daquele mês em diante.
- O mesmo cuidado vale para despesa fixa e assinatura: trocar só a forma de pagamento (conta/cartão) num mês posterior não altera mais os meses passados (antes mexia no saldo das contas lá atrás).

### 2. O app percebe quando o dia vira
- **Antes:** o app guardava a data de "hoje" só quando era aberto. Instalado no celular, ele pode ficar dias aberto em segundo plano, e aí o calendário, os avisos de vencimento, a previsão e a data padrão de novos lançamentos ficavam presos no dia antigo.
- **Agora:** ao voltar para o app (e a cada minuto) ele confere a data. Se o dia mudou, atualiza tudo; se você estava olhando o mês atual e o mês virou, ele já mostra o mês novo.
- Também troquei um cálculo de datas que passava pelo horário UTC (podia errar o dia em fusos muito diferentes do Brasil).

### 3. Receita recorrente "a receber" é marcada mês a mês
- **Antes:** numa receita que se repete todo mês e está como "Recebimento futuro" (ex.: um aluguel que você recebe quando o inquilino paga), tocar em "A receber" marcava como recebida **em todos os meses**, inclusive os que ainda não chegaram.
- **Agora:** cada mês é marcado separadamente. O aviso de "Marcado como recebido" também ganhou o botão **Desfazer**, pra quando tocar sem querer.

### 4. "Outros" não aparece mais duas vezes na Visão geral
- No gráfico "Para onde vai o dinheiro", quando havia mais de 6 grupos, o app juntava os menores num item "Outros". Se você também tinha a categoria "Outros", apareciam **dois "Outros"** na legenda. Agora eles são somados num só.

### 5. Sininho enxerga a virada do mês
- **Antes:** no dia 29 ou 30, uma conta que vence dia 1º ou uma assinatura cobrada dia 2 do mês seguinte **não aparecia** no sininho ("vence em 3 dias"), porque ele só olhava o mês atual.
- **Agora:** ele olha também o começo do mês seguinte.

### 6. Dados antigos ou incompletos não travam mais o app
- **Antes:** se algum dado salvo estivesse incompleto (ex.: um backup muito antigo, um lançamento sem data, uma lista vazia salva como "nada"), o app abria **em branco**, sem mostrar nada. E se o arquivo de dados estivesse corrompido, o app começava do zero e **apagava** o que estava lá na primeira alteração.
- **Agora:** ao abrir (e ao restaurar backup ou baixar da sincronização), o app conserta o que estiver faltando sem jogar nada fora: listas voltam a ser listas, valores estranhos viram 0, lançamento sem data ganha a data em que foi criado. Dados que já estão certos não mudam em nada.
- Se os dados estiverem ilegíveis, o app guarda uma cópia deles (`orcamento:v2:corrompido`) antes de começar do zero e avisa você.

### 7. Importação de extrato funciona com mais bancos
Testei com arquivos no formato de cada banco:
- **C6 cartão**: antes pegava a coluna de valor em **dólar** (compras em reais vinham zeradas e sumiam). Agora usa o valor em reais e põe a parcela no nome (ex.: "MAGALU (2/10)").
- **C6 conta** (colunas separadas de Entrada e Saída): antes dava erro "Não achei as colunas". Agora funciona.
- **Itaú** (extrato que vem sem linha de títulos): antes dava erro. Agora o app reconhece data, descrição e valor sozinho e ignora as linhas de "SALDO".
- **Mercado Pago** (datas como 01-09-2026 e coluna RELEASE_DATE): antes dava erro. Agora funciona.
- **Inter e C6**: a descrição junta o tipo e o nome ("Pix enviado - Fulano"), em vez de só o nome.
- Nubank (conta e cartão) continua funcionando igual.

### 8. Duas telas arrumadas no celular
- **Importar extrato:** no celular o valor de cada lançamento quebrava em duas linhas ("-" numa linha e "R$ 55,90" na outra, espremido à esquerda). Agora cada item mostra descrição e valor na primeira linha, e data e categoria na segunda. A caixinha de marcar ficou maior, mais fácil de tocar.
- **Gerenciar categorias:** no celular o ✕ de excluir caía sozinho numa linha embaixo, parecendo ser da categoria seguinte (risco de apagar a errada). Agora ele fica ao lado do nome da própria categoria, e cada categoria tem uma linha separando da próxima.

### 9. Botões mais fáceis de acertar no celular
- Vários botões eram pequenos para o dedo (entre 20 e 30 pixels): olho, sininho, tema, engrenagem, setas do mês, "Ajustar"/"Contas", o lápis de editar cada lançamento, os selos "Pendente/Pago", "A receber", "Lançar fatura", o ✕ das janelas e os links "Ver todos". Agora, em telas de toque, cada um tem uma área de toque invisível de pelo menos 44 pixels (o tamanho recomendado). **O visual continua exatamente igual**, só ficou mais fácil acertar.
- As abas (Receita, Despesa fixa…) ficaram um pouco mais altas no celular pelo mesmo motivo.
- Nos cartões de Despesas e Saldo do topo, o texto pequeno não separa mais o nome do valor em linhas diferentes (antes aparecia "Variáveis" numa linha e "R$ 712,30" na outra).

### 10. Contraste e navegação pelo teclado
- O cinza dos textos secundários ficou um pouquinho mais escuro no tema claro (e um pouquinho mais claro no escuro), para ler melhor, principalmente em sol forte. A diferença é sutil; a cara do app é a mesma.
- Ao navegar com a tecla **Tab** no computador, o botão selecionado ganha um contorno verde bem visível.
- Ao fechar uma janela, o foco volta para o botão que a abriu; as abas e janelas agora são anunciadas corretamente por leitores de tela.
- Com uma janela aberta, a tecla Tab circula só dentro dela (antes ia parar nos botões da página por trás, invisíveis).

### 11. App mais rápido com muitos lançamentos
- Com 2.000 lançamentos, cada toque (trocar de aba, de mês, esconder valores) levava 60 a 85 milésimos de segundo num computador rápido; no celular isso vira meio segundo de travadinha. Agora leva 17 a 40 (cerca de **3 vezes mais rápido**).
- Depois, com muitos lançamentos no mês (ex.: depois de importar um extrato grande), cada toque ainda levava ~125 ms porque o navegador calculava o layout da página duas vezes; reordenei o desenho da tela e caiu para ~65 ms.
- Como: o app refazia as mesmas contas dezenas de vezes a cada tela (por exemplo, o limite do cartão olha 4 anos de parcelas e o saldo das contas refaz os meses desde a última atualização). Agora cada conta é feita uma vez por tela e reaproveitada. Conferi que **todos os números mostrados continuam idênticos** (comparei 4 meses × 8 abas antes e depois).

### 12. Despesa fixa nova não nasce "Atrasada"
- **Antes:** cadastrar hoje (dia 25) uma conta que vence todo dia 10 fazia ela aparecer na hora como **Atrasada** e o sininho reclamar, mesmo que você já tivesse pago.
- **Agora:** quando o vencimento deste mês já passou, a janela de nova despesa fixa mostra **"Já paguei a deste mês"** (marcado). Se ainda não pagou, é só desmarcar. Quando o vencimento ainda não chegou, a opção nem aparece.

### 13. O botão + não cobre mais o fim da página no celular
- Havia uma regra de espaço no fim da página para o botão verde "+" não ficar por cima do conteúdo, mas outra regra, mais abaixo no código, anulava ela. Resultado: rolando até o fim, o botão tampava o canto do último cartão (Evolução/metas). Agora sobra espaço e dá pra ler tudo.

### 14. A previsão dos próximos 30 dias conta a fatura do cartão que ainda não foi lançada
- **Antes:** a previsão de saldo só descontava as faturas que você já tinha digitado. Se a fatura do Nubank vence dia 10 e você ainda não lançou o valor, a previsão fingia que ela não existia, mesmo com as compras já registradas no cartão — o saldo previsto ficava otimista demais.
- **Agora:** para faturas que vencem nos próximos 30 dias e ainda não foram lançadas, a previsão desconta a **prévia** (as compras e parcelas que já estão no cartão), no dia do vencimento, com o nome "Fatura Nubank (prévia)". Quando você lança o valor real, ele passa a valer no lugar da prévia.

### 15. "Desfazer" em muito mais lugares
- Antes só dava pra desfazer exclusões. Agora o aviso que aparece embaixo tem **Desfazer** também quando você:
  - adiciona ou edita receita, despesa fixa, despesa variável (inclusive parcelada), assinatura, cartão, investimento, meta ou o saldo das contas;
  - salva ou move uma fatura, ou marca uma fatura como paga/em aberto;
  - exclui uma categoria;
  - restaura um backup (volta para os dados de antes);
  - usa **Apagar tudo** (por 5 segundos dá pra voltar atrás).

### 16. Buscar em todos os meses
- No **Filtro** das abas Receita e Despesa variável há a opção **"Buscar em todos os meses"**. Com ela marcada, a busca por nome (ou por categoria) mostra os lançamentos de qualquer mês, com o ano embaixo da data, e o total de tudo o que foi encontrado (ex.: "quanto gastei de iFood desde sempre?"). Mostra até os 300 mais recentes na lista; o total considera todos.
- De quebra, corrigi um problema de layout no celular: quando o título da tabela era comprido, o cartão todo ficava mais largo que a tela e o botão "Adicionar" era cortado.

### 17. Duplicar lançamento
- Ao abrir uma receita ou despesa variável para editar, agora tem o botão **Duplicar** (ao lado de Excluir). Ele abre um lançamento novo já preenchido com o mesmo valor, descrição, categoria e forma de pagamento, com a **data de hoje**. Bom para gastos que se repetem mas não são fixos (feira, gasolina, diarista).

### 18. Arrastar para os lados troca o mês (celular)
- No celular, arrastar o dedo para a **esquerda** vai para o próximo mês e para a **direita** volta um mês, com uma animaçãozinha. Não atrapalha a rolagem da página (só vale um arrasto bem horizontal) nem a barra de abas, os gráficos e os campos de texto.
- Também impedi que o navegador entenda um arrasto lateral como "voltar página" (no app instalado isso podia fechar a tela sem querer).

### 19. Lançamento rápido na virada do ano
- **Antes:** em janeiro, escrever `presente 150 28/12` no lançamento rápido registrava o gasto em **dezembro do ano seguinte** (no futuro), porque a data sem ano sempre usava o ano atual.
- **Agora:** uma data sem ano que cairia mais de 2 meses no futuro é entendida como do ano passado. E a prévia mostra o ano quando ele não é o atual ("28 de dez. de 2026"), pra você conferir antes de lançar.

### 20. Nomes não somem cortados nas listas do celular
- **Antes:** no celular, cada lançamento mostrava só uma linha: se o nome fosse um pouco maior, o selo do cartão/conta ("Nubank •1234") e avisos como "não cobra este mês" eram cortados com "…" e sumiam (ex.: aparecia só "Netflix…").
- **Agora:** o nome pode usar até 2 linhas, então o selo do cartão/conta e os avisos aparecem. Vale também no computador, onde o mesmo corte acontecia (ex.: "Farmácia 27…" escondia o cartão usado).

### 21. Editar compra parcelada de uma vez
- **Antes:** para renomear, trocar a categoria ou o cartão de uma compra parcelada (ex.: "Geladeira" em 6x), era preciso abrir e editar parcela por parcela.
- **Agora:** ao editar uma parcela aparece **"Aplicar a todas as parcelas"** (já marcado): descrição, categoria e forma de pagamento mudam em todas. Data e valor continuam mudando só na parcela aberta.

### 22. Exportar todos os meses para planilha
- Na engrenagem, além de "Exportar mês", agora tem **"Exportar todos os meses (CSV)"**: um arquivo só com todos os lançamentos desde o primeiro, com colunas de Mês, Data, Tipo, Descrição, Categoria/Status, Pago com e Valor. Abre direto no Excel ou no Google Planilhas.

### 23. Sincronização não apaga mais o que você lançou no outro aparelho ⚠️
- **O problema (grave):** ao abrir o app num dia novo, ele atualiza sozinho umas informações calculadas (o "retrato" do patrimônio do mês e a taxa do CDI) e salvava isso como se fosse uma mudança sua, com o horário de agora. Aí, ao sincronizar, este aparelho parecia ter os dados "mais novos" e **mandava os dados antigos dele para a nuvem, por cima do que você tinha lançado no outro aparelho**. Exemplo real que reproduzi: lancei um bônus no aparelho A; no dia seguinte abri o aparelho B; o bônus sumiu do B **e também do A** depois de recarregar.
- **Agora:** essas atualizações automáticas são salvas sem contar como mudança sua, então só o que você lança/edita decide quem é mais novo. Testei o mesmo roteiro com um GitHub simulado: o bônus aparece no B e continua no A.

### 24. Compras depois do fechamento em cartão que fecha no fim do mês
- **O problema:** em cartões que **fecham depois do dia do vencimento** (ex.: fecha dia 26 e vence dia 5, bem comum), uma compra feita depois do fechamento — digamos 28/12 — vai para a fatura que vence em **fevereiro** (dois meses depois). O app colocava ela na fatura certa para as contas do mês, mas **não enxergava** essa compra na prévia da fatura, na lista "Já dentro desta fatura" e no **limite disponível** do cartão (o limite aparecia maior do que é).
- **Agora:** essas compras aparecem na prévia e descontam do limite. Testei na virada de dezembro para janeiro: com uma compra de R$ 300 em 28/12, o limite disponível passou de R$ 3.000 (errado) para R$ 2.700.

### 25. Atalhos de teclado (computador)
- Novos: **`/`** abre a busca da aba e **`H`** volta para o mês atual (os antigos continuam: `N` novo, `Q` rápido, `←` `→` mês, `Esc` fecha).
- Correção: com a senha ligada, apertar `N` ou `Q` na tela de senha abria uma janela escondida atrás dela, que aparecia depois de desbloquear. Agora os atalhos não fazem nada enquanto o app está trancado.

### 26. Tela de senha cabe em qualquer tela
- **Antes:** com o celular deitado (ou num celular pequeno), a tela de senha ficava cortada embaixo e **não rolava**: a última linha do teclado (o **0** e o apagar) e o "Esqueci a senha" ficavam inalcançáveis — quem tem 0 na senha não conseguia entrar sem virar o celular.
- **Agora:** em telas baixas o teclado fica um pouco menor e a tela rola se precisar; com o celular deitado, as informações ficam à esquerda e o teclado à direita. Em celular em pé normal, nada mudou.

### 27. App instalado abre mesmo com internet ruim
- **Internet lenta** (aquele 4G de uma barrinha): o app instalado ficava esperando a rede para abrir. Agora, se a rede não responder em 4 segundos, ele abre a cópia guardada no aparelho (e termina de baixar a versão nova por trás, para a próxima vez).
- **Erro no servidor**: se o GitHub Pages respondesse com uma página de erro, essa página de erro virava a "cópia offline" do app. Agora só uma resposta boa substitui a cópia guardada; em caso de erro, abre a cópia boa.

### 28. Janelas no iPhone e rolagem dentro delas
- A altura máxima das janelas usava uma medida que, no Safari do iPhone, inclui a área atrás da barra de endereço — o fim da janela (com o botão **Salvar**) podia ficar escondido atrás da barra. Agora usa a altura visível de verdade.
- Rolar até o fim de uma janela não arrasta mais a página de trás junto.

### 29. A aba ativa sempre aparece na barra de abas (celular)
- No celular a barra de abas rola para o lado. Indo para Metas ou Cartões pelos links "Ver metas →"/"Ver todos →" da Visão geral (ou abrindo o app numa dessas abas), a aba marcada ficava **fora da tela**, e parecia que nenhuma estava selecionada. Agora a barra rola sozinha até a aba ativa.

### 30. Lançar fatura com um toque a partir das compras do cartão
- Na janela de lançar fatura, além de "Mês passado: … Usar esse valor", agora aparece **"Compras já lançadas neste cartão: R$ X · Usar esse valor"**, que preenche o valor com a soma do que você já registrou no cartão para aquela fatura. Útil para quem lança cada compra no cartão e só quer fechar a fatura.

### 31. Não perde mais o que você digitou ao tocar fora da janela
- **Antes:** no celular, um toque sem querer na parte escura acima da janela (ou a tecla Esc no computador) fechava o formulário e **perdia tudo o que tinha sido digitado**.
- **Agora:** se você já preencheu algo, o app pergunta "Descartar o que você preencheu?". Se a janela está intacta, fecha direto como antes. Os botões Cancelar e ✕ continuam fechando sem perguntar.

### 32. Lembrete de backup no sininho
- Os dados ficam só no navegador; se ele for limpo, tudo some. Agora, **se a sincronização estiver desligada** e passar **mais de 30 dias sem backup**, o sininho mostra "Faça um backup" com um botão que baixa o arquivo na hora. Fazer backup pela engrenagem também zera a contagem. Quem usa a sincronização não vê o lembrete. (Para você, a contagem começa hoje, então não vai aparecer de cara.)

### 33. Despesa fixa mostra quanto falta pagar no mês
- Embaixo do total da aba Despesa fixa agora aparece **"Já pago R$ X"** e **"Falta pagar R$ Y"** (ou "Tudo pago ✓"). As contas pagas no cartão contam como pagas, já que entram na fatura.

### 34. Importar extrato grande ficou 2x mais rápido
- Com um extrato de 1.500 linhas, a prévia levava ~0,7 s num computador rápido (uns 3 s no celular), e de novo a cada troca de conta. Agora ~0,35 s: a checagem de "já lançado" e a sugestão de categoria usam um índice montado uma vez só, e o navegador só desenha as linhas que estão aparecendo na tela.

### 35. Tocar numa categoria do gráfico filtra a lista
- Nas abas Receita e Despesa variável, tocar numa categoria da legenda do gráfico de rosca (ex.: "Carro 24%") mostra só os lançamentos dela; as outras ficam apagadinhas. Tocar de novo volta a mostrar tudo. É o mesmo filtro do botão Filtro, só que mais rápido.

### 36. Sininho do celular abria fora da tela ⚠️
- **Antes:** no celular, o sininho fica do lado esquerdo, mas a janelinha de avisos abria "para a esquerda" dele — ou seja, quase toda **fora da tela**. Só aparecia um pedacinho dos botões "Paguei"; dava para ver os avisos só no computador.
- **Agora:** no celular ela abre para a direita, ocupa quase a largura da tela e rola se tiver muitos avisos. No computador continua igual.

### 37. Celulares pequenos (tela de 320px) sem rolagem para o lado
- Em celulares bem estreitos (iPhone SE antigo, alguns Android de entrada), o seletor de mês ficava 2 a 6 pixels mais largo que a tela, e a página toda "escorregava" para o lado ao rolar. Agora o nome do mês encolhe um pouco e tudo cabe.
- Nas janelas de fatura e de importar extrato, o botão **Salvar/Importar** ficava parcialmente fora da tela nesses celulares. Agora os botões do rodapé descem para uma segunda linha quando não cabem.

### 38. Transferir dinheiro entre as suas contas
- Em **Saldo → Contas**, com duas contas ou mais, aparece **"⇄ Transferir entre contas"**: escolha de qual conta sai, para qual entra, o valor e a data. O saldo das duas se ajusta sozinho e isso **não conta como receita nem como despesa** (antes, pra refletir uma transferência, só lançando uma receita e uma despesa falsas, o que bagunçava os totais do mês).
- A mesma janela mostra as últimas transferências com opção de excluir (com Desfazer). Elas também saem no "Exportar todos os meses".
- Guardado num campo novo e opcional (`transfers`); dados antigos não mudam.

### 39. Gasto lançado no mesmo dia em que você corrigiu o saldo agora desconta
- **Antes:** se você corrigia o saldo de uma conta hoje (em Saldo → Contas) e depois lançava um gasto, uma receita, uma transferência ou pagava uma fatura com essa conta **no mesmo dia**, o saldo **não mudava nunca** — o app só contava o que tinha data depois do dia da correção.
- **Agora:** o app guarda também o horário em que você informou o saldo (campo novo e opcional), e conta o que foi lançado depois desse momento, mesmo que no mesmo dia. O que já existia antes continua igual (conferi que todos os números dos dados de teste ficaram idênticos). Extratos importados não entram nessa regra, porque o saldo que você digitou já inclui o que aconteceu no dia.

### 40. Aporte e resgate de investimento mexem na conta de onde o dinheiro saiu
- Ao editar um investimento e fazer um **aporte**, agora dá para escolher **"Sai da conta"** (ex.: Nubank); num **resgate**, **"Entra na conta"**. O saldo da conta acompanha sozinho e o movimento aparece no detalhe da conta ("Aporte em Mercado Pago"). Se deixar "Não mexer nas contas", fica como antes.
