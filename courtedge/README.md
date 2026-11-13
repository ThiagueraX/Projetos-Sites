# COURTEDGE — Assistente NBA

Interface mobile-first de conversa em português para discutir estatísticas da NBA, sem pedir odds.

## Estado atual
- Interface e histórico local disponíveis sem backend.
- Para respostas reais: hospedar esta pasta como projeto Vercel **com diretório raiz `courtedge`**.
- Definir a variável de ambiente **`OPENAI_API_KEY`** somente no servidor. Opcional: `OPENAI_MODEL` (padrão: `gpt-5-mini`).
- O endpoint `/api/chat` usa a Responses API e a ferramenta `web_search`, sujeita a uso cobrado e disponibilidade do provedor. A ferramenta não substitui um provedor NBA com estatísticas verificadas.
- `/api/health` informa se a chave está configurada sem expô-la.
- Não abra este app ao público com a API ativada sem proteção por login e rate limiting distribuído (o limitador em memória é apenas básico).

## Publicação
1. Importar o repositório `ThiagueraX/Projetos-Sites` no Vercel.
2. Definir Root Directory: `courtedge`.
3. Adicionar `OPENAI_API_KEY` em Environment Variables.
4. Fazer deploy e abrir o domínio HTTPS gerado.

O GitHub Pages pode mostrar a interface estática, mas **não executa** o backend Node em `api/chat.js`. Na página estática, respostas de IA ficam desabilitadas. Para bot conversacional real, use hospedagem com funções de servidor.

## Privacidade e responsabilidade
Histórico salvo no localStorage do aparelho. O serviço de IA tem custo por uso; evite compartilhar a chave. O app é ferramenta de estudo, não recomendação ou garantia de apostas. As estatísticas e notícias pesquisadas devem ser checadas em fontes verificáveis.
