# Melhorias noturnas

Trabalho feito durante a noite, sem mudar o jeito como seus dados são guardados (tudo que já existe continua funcionando).

## Para você testar de manhã

1. **Receita recorrente**: abra o Salário num mês depois do primeiro, desmarque "Receita recorrente" e salve. Os meses anteriores continuam com o salário.
2. **App aberto na virada do dia**: se você deixa o app aberto no celular, ele agora percebe quando o dia muda (o "hoje" do calendário, as contas que vencem e a data padrão dos lançamentos acompanham).

3. **Receita recorrente "a receber"**: marque como recebida em um mês e veja que os outros meses continuam "A receber". Agora tem "Desfazer" no aviso.

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
