const BASE='https://site.api.espn.com/apis/site/v2/sports/basketball/nba/';
const cache={};
const json=(r,status,data)=>r.status(status).json(data);
export default async function handler(req,res){
 res.setHeader('Cache-Control','s-maxage=75, stale-while-revalidate=180');
 if(req.method!=='GET')return json(res,405,{error:'Use GET'});
 const date=String(req.query.date||'').replace(/[^0-9]/g,'');
 const day=/^20\d{6}$/.test(date)?date:new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replace(/-/g,'');
 const key='games-'+day,now=Date.now();
 if(cache[key]&&now-cache[key].at<65000)return json(res,200,cache[key].payload);
 try{
  const response=await fetch(BASE+'scoreboard?dates='+day+'&limit=30',{headers:{'accept':'application/json'},signal:AbortSignal.timeout(8500)});
  if(!response.ok)throw Error('ESPN HTTP '+response.status);
  const data=await response.json();
  const games=(data.events||[]).map(e=>{
   const competitors=e.competitions?.[0]?.competitors||[];
   const team=c=>({id:c?.team?.id,abbr:c?.team?.abbreviation,name:c?.team?.displayName,logo:c?.team?.logo,score:c?.score,homeAway:c?.homeAway,record:c?.records?.[0]?.summary});
   return {id:e.id,name:e.name,date:e.date,status:e.status?.type?.description,completed:Boolean(e.status?.type?.completed),state:e.status?.type?.state,detail:e.status?.type?.shortDetail,home:team(competitors.find(c=>c.homeAway==='home')),away:team(competitors.find(c=>c.homeAway==='away'))};
  });
  const payload={date:day,source:'ESPN public scoreboard',sourceUrl:'https://www.espn.com/nba/scoreboard/_/date/'+day,updatedAt:new Date().toISOString(),games};
  cache[key]={at:now,payload};return json(res,200,payload);
 }catch(e){return json(res,502,{error:'Não foi possível consultar os jogos reais da NBA agora.',source:'ESPN',detail:String(e.message).slice(0,120)})}
}