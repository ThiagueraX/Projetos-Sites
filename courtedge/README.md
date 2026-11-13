# COURTEDGE NBA — assistente com Claude

Site: https://courtedge-nba.vercel.app
Código: pasta courtedge de ThiagueraX/Projetos-Sites

## Configuração
- Criar chave no Claude Console: https://platform.claude.com/settings/keys
- Verificar créditos API: https://platform.claude.com/settings/billing
- Vercel > Environment Variables: ANTHROPIC_API_KEY (Secret/Sensitive, Production)
- Fazer novo deployment Production para aplicar a chave.
- Opcional: CLAUDE_MODEL (padrão claude-sonnet-5-5).
- /api/health retorna ai:true quando a chave é reconhecida.

## Análise
Backend usa Claude Messages API e web_search_20250305 (até 3 pesquisas por resposta). O prompt exige fontes quando disponíveis e informa incerteza. Analisa estatísticas dos últimos 5/10 jogos, minutos, defesas, ritmo e desfalques. Não pede odds obrigatoriamente.

## Segurança e custo
O endpoint ainda é público. Antes de adicionar créditos e usar regularmente, habilite autenticação e limites robustos; o rate limit atual em memória é apenas básico. Não exponha a chave no GitHub. A API e a ferramenta web search podem gerar custos. Histórico local no navegador. Nenhuma análise garante resultado.