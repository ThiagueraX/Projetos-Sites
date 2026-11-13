# COURTEDGE NBA — V3

URL: https://courtedge-nba.vercel.app
Código: ThiagueraX/Projetos-Sites/courtedge (rootDirectory: courtedge).

## Recursos entregues
- Dashboard mobile-first com partidas da NBA da data escolhida, resultados e escudos via ESPN.
- Elencos por partida com fotos de atletas e fallback para elencos dos times antes dos jogos.
- Histórico individual de até 20 jogos de temporada regular de 2026–27 (e das temporadas seguintes) com pontos, rebotes, assistências, triplos e minutos.
- Gráficos visuais, médias dos últimos 5 e 10 jogos e frequência histórica por linha escolhida sem necessidade de odds.
- Chat em português com Claude; quando há jogador selecionado, o backend busca seus 10 jogos na ESPN para fundamentar a análise; a pesquisa web da Anthropic complementa com notícias e contexto.
- Acompanhamento de linhas sem odds, armazenado localmente, com revisão após o jogo a partir do box score ESPN.
- Conversas e acompanhamentos salvos localmente no navegador em uso; nada é sincronizado entre aparelhos.
- Projeto protegido por Vercel Authentication (SSO) em todos os ambientes para impedir visitantes anônimos de consumir API.

## Endpoints
- GET /api/games?date=YYYYMMDD — placar e calendário de um dia.
- GET /api/game?event=ID — elenco, estatísticas do box score, lesões (quando disponíveis) e estado do jogo.
- GET /api/player?id=ID — histórico estruturado de jogos do jogador.
- POST /api/chat — Anthropic Messages API, web_search e contexto de jogador obtido no servidor.
- GET /api/health — estado de configuração sem retornar secrets.

## Configuração
- ANTHROPIC_API_KEY (recomendado) ou ANTROPHIC_API_KEY (nome legada digitado incorretamente) configurado como Sensitive em Production.
- Opcional CLAUDE_MODEL; padrão claude-sonnet-5-5.
- Um teste real via API Anthropic com o modelo padrão e a configuração de ferramentas retornou HTTP 200.
- A chave da OpenAI não é utilizada pelo backend do chat.

## Limites e cautelas
- O endpoint de dados usa serviços web públicos da ESPN, cujo esquema e disponibilidade podem mudar; o código retorna erro e não fabrica estatísticas.
- Dados de temporada e históricos não equivalem a probabilidades de resultados futuros. Relatórios médicos/lesões e estatísticas avançadas de defesa dependem de disponibilidade das fontes e pesquisa do Claude, e não são garantidos.
- O verificador de acompanhamento marca resultado apenas se a ESPN informar jogo concluído e box score disponível.
- Históricos e linhas são guardados no localStorage e não sincronizam entre dispositivos.
- A autenticação por Vercel é dependente de acesso à conta Vercel. Limites de requisições em memória são básicos; configure alertas de gastos e limites no Claude Console para proteção financeira adicional.
- Créditos API e pesquisas na web podem gerar custos. Não exponha chaves no navegador nem no repositório.
- O COURTEDGE é uma ferramenta informativa; não garante acertos nem substitui checagem das fontes.