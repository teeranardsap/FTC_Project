const a=1;
const f=x=>x*x;
const F=x=>x*x*x/3;
const xs=Array.from({length:161},(_,i)=>i*4/160);
let chart1,chart2;

function makeChart1(){
 const ctx=document.getElementById('chart1');
 chart1=new Chart(ctx,{type:'line',data:{labels:xs,datasets:[{label:'f(x)=x²',data:xs.map(f),borderWidth:3,pointRadius:0,fill:false}]},options:{animation:false,responsive:true,plugins:{legend:{display:true}},scales:{x:{title:{display:true,text:'x'}},y:{title:{display:true,text:'f(x)'}}}}});
 updatePart1();
}
function updatePart1(){
 const x=+document.getElementById('xSlider').value;
 document.getElementById('xValue').textContent=x.toFixed(2);
 document.getElementById('areaValue').textContent=(F(x)-F(a)).toFixed(3);
 document.getElementById('fxValue').textContent=f(x).toFixed(3);
 const areaData=xs.map(v=>v>=a&&v<=x?f(v):null);
 chart1.data.datasets=[{label:'f(x)=x²',data:xs.map(f),borderWidth:3,pointRadius:0,fill:false},{label:'พื้นที่สะสม',data:areaData,borderWidth:0,pointRadius:0,fill:'origin'}];
 chart1.options.plugins.annotation={annotations:{xLine:{type:'line',xMin:x,xMax:x,borderWidth:2,label:{display:true,content:'x'}}}};
 chart1.update();
 document.getElementById('part1Message').textContent=`เมื่อ x = ${x.toFixed(2)} พื้นที่สะสม F(x) = ${((F(x)-F(a))).toFixed(3)} และ f(x) = ${f(x).toFixed(3)}`;
}
function makeChart2(){
 const ctx=document.getElementById('chart2');
 chart2=new Chart(ctx,{type:'line',data:{labels:xs,datasets:[{label:'f(x)=x²',data:xs.map(f),borderWidth:3,pointRadius:0,fill:false}]},options:{animation:false,responsive:true,plugins:{legend:{display:true}},scales:{x:{title:{display:true,text:'x'}},y:{title:{display:true,text:'f(x)'}}}}});
}
function setPart2(stage){
 const area=F(3)-F(1);
 let fill=xs.map(v=>v>=1&&v<=3?f(v):null);
 chart2.data.datasets=[{label:'f(x)=x²',data:xs.map(f),borderWidth:3,pointRadius:0,fill:false},{label:'พื้นที่',data:stage>=1?fill:xs.map(()=>null),borderWidth:0,pointRadius:0,fill:'origin'}];
 chart2.options.plugins.annotation={annotations:{aLine:{type:'line',xMin:1,xMax:1,borderWidth:2,label:{display:stage>=1,content:'a'}},bLine:{type:'line',xMin:3,xMax:3,borderWidth:2,label:{display:stage>=1,content:'b'}}}};
 chart2.update();
 if(stage===0){animationText.textContent='กด Start Animation เพื่อดูความสัมพันธ์ทีละขั้น';integralDisplay.textContent='?';differenceDisplay.textContent='?'}
 if(stage===1){animationText.textContent='1) พื้นที่ใต้กราฟระหว่าง a = 1 และ b = 3 ถูกเน้นให้เห็น';integralDisplay.textContent='กำลังคำนวณ';differenceDisplay.textContent='?'}
 if(stage===2){animationText.textContent='2) Integral คือค่าการสะสมทั้งหมดในช่วงนี้';integralDisplay.textContent=area.toFixed(3);differenceDisplay.textContent='?'}
 if(stage===3){animationText.textContent='3) Antiderivative ให้ค่า F(b) − F(a) ที่ปลายช่วง';integralDisplay.textContent=area.toFixed(3);differenceDisplay.textContent=area.toFixed(3)}
 if(stage===4){animationText.textContent='✓ เห็นแล้วว่า ∫₁³ f(x)dx = F(3) − F(1) — นี่คือ FTC Part 2';integralDisplay.textContent=area.toFixed(3);differenceDisplay.textContent=area.toFixed(3)}
}
const animationText=document.getElementById('animationText'),integralDisplay=document.getElementById('integralDisplay'),differenceDisplay=document.getElementById('differenceDisplay');
document.getElementById('xSlider').addEventListener('input',updatePart1);
document.getElementById('resetBtn').addEventListener('click',()=>{clearInterval(window.anim);setPart2(0)});
document.getElementById('animateBtn').addEventListener('click',()=>{clearInterval(window.anim);let s=0;setPart2(s);window.anim=setInterval(()=>{s++;setPart2(s);if(s>=4)clearInterval(window.anim)},1200)});
makeChart1();makeChart2();setPart2(0);
