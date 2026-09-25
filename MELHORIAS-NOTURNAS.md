# Melhorias noturnas

Trabalho feito durante a noite, sem mudar o jeito como seus dados são guardados (tudo que já existe continua funcionando).

## Para você testar de manhã

1. **Receita recorrente**: abra o Salário num mês depois do primeiro, desmarque "Receita recorrente" e salve. Os meses anteriores continuam com o salário.
2. **App aberto na virada do dia**: se você deixa o app aberto no celular, ele agora percebe quando o dia muda (o "hoje" do calendário, as contas que vencem e a data padrão dos lançamentos acompanham).

3. **Receita recorrente "a receber"**: marque como recebida em um mês e veja que os outros meses continuam "A receber". Agora tem "Desfazer" no aviso.
4. **Importar extrato**: se tiver um CSV do C6, Itaú ou Mercado Pago, tente importar (⚙ → Importar extrato). Antes esses davam erro ou vinham com valor errado.
5. **Nova despesa fixa com vencimento já passado** (ex.: hoje é dia 25 e ela vence dia 10): aparece a opção "Já paguei a deste mês", já marcada.

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

### 11. App mais rápido com muitos lançamentos
- Com 2.000 lançamentos, cada toque (trocar de aba, de mês, esconder valores) levava 60 a 85 milésimos de segundo num computador rápido; no celular isso vira meio segundo de travadinha. Agora leva 17 a 40 (cerca de **3 vezes mais rápido**).
- Como: o app refazia as mesmas contas dezenas de vezes a cada tela (por exemplo, o limite do cartão olha 4 anos de parcelas e o saldo das contas refaz os meses desde a última atualização). Agora cada conta é feita uma vez por tela e reaproveitada. Conferi que **todos os números mostrados continuam idênticos** (comparei 4 meses × 8 abas antes e depois).

### 12. Despesa fixa nova não nasce "Atrasada"
- **Antes:** cadastrar hoje (dia 25) uma conta que vence todo dia 10 fazia ela aparecer na hora como **Atrasada** e o sininho reclamar, mesmo que você já tivesse pago.
- **Agora:** quando o vencimento deste mês já passou, a janela de nova despesa fixa mostra **"Já paguei a deste mês"** (marcado). Se ainda não pagou, é só desmarcar. Quando o vencimento ainda não chegou, a opção nem aparece.

### 13. O botão + não cobre mais o fim da página no celular
- Havia uma regra de espaço no fim da página para o botão verde "+" não ficar por cima do conteúdo, mas outra regra, mais abaixo no código, anulava ela. Resultado: rolando até o fim, o botão tampava o canto do último cartão (Evolução/metas). Agora sobra espaço e dá pra ler tudo.
