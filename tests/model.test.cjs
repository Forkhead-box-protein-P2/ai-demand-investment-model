const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const file=process.argv[2]||path.join(__dirname,'..','two-tier.html');
const html=fs.readFileSync(file,'utf8'),script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const context={};vm.createContext(context);
vm.runInContext(script.slice(0,script.indexOf("$('runSweep').onclick"))+';globalThis.api={DEF,META,PRESETS,COST,normalization,choiceShares,demandAtPrice,catchupRate,muFrontier,path,compare,cumulativeInvestment,chartAxis,chartTick,investmentNote,rng,tri};',context);
const a=context.api;let checks=0;
function near(x,y,tol=1e-8){checks++;assert.ok(Math.abs(x-y)<=tol*Math.max(1,Math.abs(x),Math.abs(y)),`${x} != ${y}`)}
function verify(p){
 const result=a.compare(p),norm=a.normalization(p);
 near(result.ref[0].Q,1);near(result.ref[0].pk,a.COST.computeReference);
 near(result.ref[0].T/result.ref[0].K,p.trainingShare);
 for(const series of [result.ref,result.alt]){
  let inv=p.economicLife**-1;
  for(let t=0;t<series.length;t++){
   const r=series[t];for(const v of Object.values(r)){checks++;assert.ok(Number.isFinite(v))}
   near(r.Q,r.QF+r.QC);near(r.KI,r.kappaF*r.QF+r.kappaC*r.QC);near(r.K,r.KI+r.T);
   near(r.sF+r.sC+r.s0,1);near(r.frontierShare,r.QF/r.Q);near(r.Q+r.M*r.s0,r.M);
   near(r.P,(r.PF*r.QF+r.PC*r.QC)/r.Q);
   near(r.H,r.pk*r.K);near(r.CF,(r.pk-a.COST.variable)*r.K);
   near(r.pk,a.COST.variable+(a.COST.computeReference-a.COST.variable)*(r.K/r.S)**(1/p.supplyElasticity));
   checks+=5;assert.ok(r.PC<=r.PF+1e-9);assert.ok(r.VC<=r.VF+1e-9);assert.ok(r.QC>0&&r.QF>0);assert.ok(r.S>0&&r.I>=0);assert.ok(r.participation>0&&r.participation<1);
   inv=.5*inv+.5*Math.max(1/p.economicLife+p.investResponse*r.npv/p.buildCost,0);near(r.I,inv*r.S);
   if(t+1<series.length){near(series[t+1].S,(1-1/p.economicLife)*r.S+r.I);near(series[t+1].VC,r.VC+a.catchupRate(p,series===result.ref?1:p.pace)*(r.VF-r.VC))}
  }
 }
 result.ref.forEach((r,t)=>near(r.M,result.alt[t].M));
 const cumulative=rows=>rows.slice(0,p.horizon).reduce((sum,r)=>sum+r.I,0);
 near(result.summary.investment,100*(cumulative(result.alt)/cumulative(result.ref)-1));
 for(const v of Object.values(result.summary)){checks++;assert.ok(Number.isFinite(v))}
 return result;
}
for(const pace of [0,.25,.5,.75,1])verify({...a.DEF,pace});
const identical=verify({...a.DEF,pace:1});for(const value of Object.values(identical.summary))near(value,0);
const symmetrical={...a.DEF,initialFrontierValue:1,frontierDemandGrowth:0,frontierMarkup:0,commodityComputeRatio:1,trainingShare:0};
const symmetry=verify(symmetrical);for(const r of symmetry.alt)near(r.QF,r.QC);near(symmetry.summary.investment,0);
const original=a.choiceShares(.9,.6,1.5,1,1,1.3),betterC=a.choiceShares(.9,.6,1.5,1.3,1,1.3),cheaperC=a.choiceShares(.9,.5,1.5,1,1,1.3);
checks+=4;assert.ok(betterC.sC>original.sC&&betterC.sF<original.sF);assert.ok(cheaperC.sC>original.sC&&cheaperC.sF<original.sF);assert.ok(betterC.s0<original.s0);assert.ok(a.catchupRate(a.DEF,0)>a.catchupRate(a.DEF,1));
const dt=1e-6,changed=a.choiceShares(.9*Math.exp(dt),.6,1.5,1,1,1.3);
near(Math.log(changed.sF/original.sF)/dt,-1.3*(1-original.sF),1e-5);
const sharedRise=a.choiceShares(.9*Math.exp(dt),.6*Math.exp(dt),1.5,1,1,1.3);
near(Math.log((sharedRise.sF+sharedRise.sC)/(original.sF+original.sC))/dt,-1.3*original.s0,1e-5);
const fixed={...a.DEF,frontierDemandGrowth:0};let slow=1,fast=1;
for(let t=0;t<5;t++){slow+=a.catchupRate(fixed,1)*(fixed.initialFrontierValue-slow);fast+=a.catchupRate(fixed,0)*(fixed.initialFrontierValue-fast)}
checks++;assert.ok(fast>slow);checks++;assert.ok(a.muFrontier(5,0,a.DEF)<a.muFrontier(5,1,a.DEF));
const positive=verify({...a.DEF,...a.PRESETS.diffusion.p}),negative=verify({...a.DEF,...a.PRESETS.risk.p});
checks+=3;assert.ok(positive.summary.investment>1);assert.ok(negative.summary.investment<-1);assert.ok(negative.summary.commodityShareChange>0);
const close=verify({...a.DEF,pace:.500001});near(close.summary.investment,a.compare(a.DEF).summary.investment,1e-4);
const random=a.rng(731),corners=['min','max'];
for(const edge of corners){const p={...a.DEF,horizon:15};for(const m of a.META)p[m.key]=m[edge];verify(p)}
for(let draw=0;draw<150;draw++){const p={...a.DEF,pace:random(),horizon:5+Math.floor(random()*11)};for(const m of a.META)p[m.key]=m.min+random()*(m.max-m.min);verify(p)}
for(const m of a.META){const sample=a.tri(m.range[0],a.DEF[m.key],m.range[1],.42);checks++;assert.ok(sample>=m.range[0]&&sample<=m.range[1])}
// Endpoint annual flows belong to the following year, not the stated horizon.
const flows=[{t:0,I:1},{t:1,I:10},{t:2,I:100},{t:3,I:1000}];
near(a.cumulativeInvestment(flows,1),1);near(a.cumulativeInvestment(flows,3),111);
for(const [min,max] of [[0,.468],[0,.04],[-.244,.136],[0,1e8],[0,0]]){
 const axis=a.chartAxis(min,max);checks+=3;
 assert.ok(axis.min<=min&&axis.max>=max);
 assert.ok(axis.ticks.length>=2&&axis.ticks.length<=8);
 const labels=Array.from(axis.ticks,v=>a.chartTick(v,axis));assert.equal(new Set(labels).size,labels.length);
}
checks+=2;assert.ok(a.investmentNote({...a.DEF,...a.PRESETS.risk.p},negative).includes('approximately cancel'));
assert.ok(!a.investmentNote({...a.DEF,pace:1},identical).includes('training demand falls'));
console.log(JSON.stringify({checks,random_parameter_cases:150,affordability_investment_percent:positive.summary.investment,frontier_dependence_investment_percent:negative.summary.investment,frontier_dependence_commodity_share_pp:negative.summary.commodityShareChange},null,2));
