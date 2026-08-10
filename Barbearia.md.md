============================================================
SISTEMA DE ANIMAÇÃO — BARBEARIA PREMIUM (CLEAN & FLUIDO)
============================================================

As animações no site da barbearia devem refletir a precisão de um corte 
impecável e a sofisticação de um ambiente de alto padrão.

O objetivo é passar uma sensação de modernidade, elegância e robustez,
com movimentos precisos, suaves e quase cinematográficos.

NUNCA utilize animações exageradas, infantis ou polutuadas.

Evite completamente:

- bounce
- elastic exagerado
- elementos pulando
- rotações desnecessárias
- zoom agressivo
- efeitos de glitch
- parallax exagerado
- textos e imagens voando de todos os lados
- animações rápidas demais
- elementos aparecendo de forma abrupta
- excesso de blur
- animações simultâneas em múltiplos elementos

============================================================
PRINCÍPIOS DE MOVIMENTO
============================================================

Toda animação deve possuir:

- entrada suave
- aceleração natural
- desaceleração natural
- duração adequada
- easing refinado
- continuidade entre estados

Utilize principalmente:

opacity
transform
scale
translate
clip-path

Evite animar propriedades pesadas (como width, height, margin) quando 
não forem necessárias.

Prefira animações baseadas exclusivamente em transform e opacity.

============================================================
SCROLL REVEAL
============================================================

As seções (Serviços, Sobre Nós, Barbeiros, Galeria) devem aparecer 
suavemente conforme o cliente rola a página.

Utilize:

opacity: 0 → 1

e pequenos deslocamentos verticais:

translateY: 20px → 0

Exemplo de sequência visual:

elemento surge levemente abaixo
↓
entra com opacidade progressiva
↓
assenta perfeitamente na posição final

Não faça todos os elementos de um card ou seção entrarem juntos.
Crie pequenos delays (stagger) em ordem de leitura:

1. Título da Seção
2. Subtítulo / Descrição
3. Cards de Serviços / Fotos de Cortes
4. Botão de Agendamento (CTA)

============================================================
GALERIA E FOTOS DE CORTES / AMBIENTE
============================================================

As fotos dos cortes, da estrutura e da equipe devem transmitir refinamento.

Ao entrar no viewport:

opacity + scale sutil (ex: 0.98 → 1.0).

No hover (interação com o card de corte/barbeiro):

scale de no máximo 1.02 ou 1.03.

Nunca utilize zoom agressivo. 

As imagens da barbearia devem parecer vivas e em destaque sem 
comprometer a fluidez da navegação.

============================================================
BOTÕES DE AGENDAMENTO (CTAs)
============================================================

Os botões (ex: "Agendar Horário", "Ver Serviços") precisam de 
microinterações com resposta tátil e rápida.

No hover:

- mudança extremamente sutil de cor de fundo ou brilho na borda
- pequeno deslocamento ou scale
- transição fluida

No active (ao clicar):

- pequeno scale down

Exemplo:

hover:
scale(1.02)

active:
scale(0.98)

O botão de agendamento nunca deve pular ou piscar. Ele deve passar 
firmeza e resposta imediata ao clique do cliente.

============================================================
NAVEGAÇÃO E LINKS
============================================================

Os links do menu (Início, Serviços, Preços, Localização, Contato) 
devem possuir microinterações refinadas.

Utilize linha inferior animada (underline slide) ou mudança 
discreta de opacity/cor.

A animação deve ser rápida, sem parecer instantânea nem arrastada.

============================================================
HEADER
============================================================

O header fixo deve acompanhar a rolagem do usuário com suavidade.

Ao rolar a página:

- o fundo transparente transiciona suavemente para o tom escuro/sólido da marca
- efeito de glassmorphism / backdrop surge discretamente
- a altura diminui levemente (compactação elegante do logo)
- uma borda inferior discreta pode aparecer

NÃO faça o header sumir ou piscar bruscamente.

============================================================
MENU MOBILE
============================================================

O menu mobile (hambúrguer) deve abrir como uma gaveta premium.

Utilize:

opacity
transform
clip-path

Os links de navegação e o botão fixo de agendamento no mobile devem 
aparecer em sequência rápida com pequenos delays.

O menu deve ter a sensação de um app nativo de alta tecnologia.

============================================================
CARDS DE SERVIÇOS E BARBEIROS
============================================================

Para os cards que detalham os serviços (Cabelo, Barba, Toalha Quente, Combo):

- no hover, elevação sutil no eixo Y (translateY: -4px)
- borda realçada suavemente
- contêiner interno com overflow: hidden para manter o zoom da imagem contido

Mantenha a transição suave para que a seleção de serviços seja agradável.

============================================================
TIPOGRAFIA
============================================================

Títulos marcantes e frases de destaque podem usar pequenas entradas graduais.

Exemplo:

opacity: 0 → 1
translateY: 15px → 0

Nunca faça letras soltas voarem, girarem ou simularem máquinas de escrever 
muito lentas. A leitura dos preços e serviços deve ser imediata.

============================================================
PAGE LOAD (CARREGAMENTO INICIAL)
============================================================

A apresentação da barbearia ao abrir o site deve ser marcante e ágil.

Sequência coordenada para o Hero (Início):

1. Header desliza suavemente para baixo
2. Imagem principal / Vídeo de fundo ganha nitidez
3. Titular principal (ex: "Sua melhor versão começa aqui") surge
4. Texto descritivo aparece
5. Botão principal "Agendar Horário" se destaca
6. Indicador de scroll (se houver) pisca suavemente

NÃO utilize telas de carregamento (splash screens) demoradas. O cliente 
deve conseguir agendar em poucos segundos.

============================================================
EASING
============================================================

Priorize curvas de movimento refinadas.

Utilize easing semelhante a:

ease-out
cubic-bezier(0.16, 1, 0.3, 1)

Evite:

linear para elementos de interface
bounce
elastic

============================================================
PERFORMANCE E ACESSIBILIDADE
============================================================

O site deve rodar perfeitamente em qualquer smartphone.

Priorize:

transform
opacity

Evite animações que causam layout shift ou travamentos em conexões móveis.

Utilize Intersection Observer para acionar animações somente quando 
o elemento estiver visível na tela.

Respeite obrigatoriamente:

prefers-reduced-motion

Clientes com preferência por menos movimento devem ver o site em 
estado estático ou com esvanecimentos mínimos.

============================================================
REGRA DE OURO
============================================================

A animação é a navalha do barbeiro: precisa de precisão, não de excessos.

O cliente deve sentir:

"Esse site é extremamente rápido, moderno e fácil de agendar."

e NÃO:

"O site está demorando para carregar por causa dos efeitos."

Na dúvida entre animar um elemento ou deixá-lo estático:

MANTENHA ESTÁTICO.

============================================================
MOTION (BIBLIOTECA)
============================================================

Utilize a biblioteca Motion já configurada no projeto.

Crie componentes reutilizáveis para manter o padrão em todas as seções:

- Reveal (para blocos de texto e títulos)
- FadeIn (para elementos simples)
- Stagger (para listas de preços e serviços)
- ImageReveal (para fotos de cortes e galeria)
- AnimatedButton (para o botão de agendamento)
- SmoothHeader (para o topo fixo)

Centralize as configurações de transição em um arquivo de temas/motion 
para evitar duplicar código.