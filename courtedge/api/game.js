const BASE='https://site.api.espn.com/apis/site/v2/sports/basketball/nba/';
export default async function handler(req,res){
 res.setHeader('Cache-Control','s-maxage=180, stale-while-revalidate=600');
 if(req.method!=='GET')return res.status(405).json({error:'Use GET'});
 const id=String(req.query.event||'');
 if(!/^\d{6,14}$/.test(id))return res.status(400).json({error:'ID do jogo inválido'});
 try{
 const upstream=await fetch(BASE+'summary?event='+id,{signal:AbortSignal.timeout(9000)});
 if(!upstream.ok)throw Error('ESPN HTTP '+upstream.status);
 const data=await upstream.json();const players=[];
 for(const team of data.boxscore?.players||[]){
   for(const a of team.statistics?.[0]?.athletes||[]){
    const p=a.athlete||{};const labels=team.statistics?.[0]?.labels||[];
    const stats={};(a.stats||[]).forEach((v,i)=>{if(labels[i])stats[labels[i]]=v});
    players.push({id:p.id,name:p.displayName||p.fullName,team:team.team?.abbreviation,headshot:p.headshot?.href,position:p.position?.abbreviation,starter:Boolean(a.starter),didNotPlay:Boolean(a.didNotPlay),stats});
   }
 }
 // Boxscore can be absent pregame; the roster may be available in the summary header or team rosters.
 for(const team of data.rosters||[]){
  for(const a of team.roster||[]){
   const p=a.athlete||a;
   if(!p.id||players.some(x=>String(x.id)===String(p.id)))continue;
   players.push({id:p.id,name:p.displayName||p.fullName,team:team.team?.abbreviation,headshot:p.headshot?.href,position:p.position?.abbreviation});
  }
 }
 const injuries=(data.injuries||[]).map(t=>({team:t.team?.displayName,players:(t.injuries||[]).map(i=>({name:i.athlete?.displayName,status:i.status,detail:i.details?.detail}))}));
 return res.status(200).json({event:id,source:'ESPN NBA game summary',sourceUrl:'https://www.espn.com/nba/game/_/gameId/'+id,updatedAt:new Date().toISOString(),players,injuries,header:data.header?.competitions?.[0]?.competitors?.map(c=>({team:c.team?.displayName,score:c.score}))});
 }catch(e){return res.status(502).json({error:'Não foi possível carregar informações do jogo.',detail:String(e.message).slice(0,120)})}
}