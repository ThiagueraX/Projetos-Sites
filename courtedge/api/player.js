const BASE='https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/';
export default async function handler(req,res){
 res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
 const id=String(req.query.id||'');if(!/^\d{3,12}$/.test(id))return res.status(400).json({error:'ID do atleta inválido'});
 const season=new Date().getUTCMonth()>=8?new Date().getUTCFullYear()+1:new Date().getUTCFullYear();
 try{
  const upstream=await fetch(BASE+id+'/gamelog?season='+season,{signal:AbortSignal.timeout(9500)});
  if(!upstream.ok)throw Error('ESPN HTTP '+upstream.status);
  const data=await upstream.json();
  if(req.query.debug==='shape')return res.status(200).json({rootKeys:Object.keys(data),labels:data.labels,names:data.names,displayNames:data.displayNames,eventExample:Object.entries(data.events||{}).slice(0,1),seasonTypes:(data.seasonTypes||[]).slice(0,2).map(t=>({keys:Object.keys(t),categorySample:(t.categories||[]).slice(0,2).map(c=>({keys:Object.keys(c),labels:c.labels,firstEvent:c.events?.[0]}))})),categories:(data.categories||[]).slice(0,1),statsSample:data.stats?.slice?.(0,2)});
  const labels=[],rows=[];const events=data.events||{};
  function scanCategory(cat){
   if(cat.labels?.length)labels.splice(0,labels.length,...cat.labels);
   for(const group of cat.events||[]){
    const event=events[group.eventId]||events[group.id]||{};
    rows.push({id:group.eventId||group.id,date:event.gameDate||event.date||group.date,opponent:event.opponent?.abbreviation||event.opponent?.displayName||group.opponent,homeAway:event.homeAway,stats:group.stats||group.statistics||[],result:event.gameResult,score:event.score,minutes:group.minutes});
   }
  }
  for(const seasonType of data.seasonTypes||[])for(const c of seasonType.categories||[])scanCategory(c);
  if(!rows.length)for(const c of data.categories||[])scanCategory(c);
  // If provider changes schema, explicitly indicate missing data rather than fabricate.
  const unique=[...new Map(rows.filter(x=>x.id).map(x=>[x.id,x])).values()].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
  const recent=unique.slice(0,20).map(x=>({id:x.id,date:x.date,opponent:x.opponent,homeAway:x.homeAway,stats:Object.fromEntries(labels.map((name,i)=>[name,x.stats[i]])),result:x.result,score:x.score}));
  return res.status(200).json({id,season,source:'ESPN player game log',sourceUrl:'https://www.espn.com/nba/player/gamelog/_/id/'+id,updatedAt:new Date().toISOString(),labels,games:recent,available:recent.length>0});
 }catch(e){return res.status(502).json({error:'Não foi possível obter os últimos jogos do atleta.',detail:String(e.message).slice(0,130)})}
}