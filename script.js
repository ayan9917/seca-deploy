let yourName="",theirName="",customMessage="";
const screens=["setup","proposal","dateStep","final"];
const noBtn=document.getElementById("noBtn");

function show(id){
  screens.forEach(x=>document.getElementById(x).classList.remove("active"));
  document.getElementById(id).classList.add("active");
  scrollTo({top:0,behavior:"smooth"});
}

function createProposal(){
  yourName=document.getElementById("yourName").value.trim()||"Someone special";
  theirName=document.getElementById("theirName").value.trim();
  customMessage=document.getElementById("message").value.trim();

  if(!theirName){toast("Please enter their name ❤️");return}

  if(!customMessage){
    customMessage=`I don't need a perfect reason to ask you this. I just know that spending time with you would make my day better.`;
  }

  document.getElementById("theirNameShow").textContent=theirName;
  document.getElementById("proposalText").textContent=customMessage;
  resetNo();
  show("proposal");
}

function moveNo(e){
  if(e)e.preventDefault();
  const w=noBtn.offsetWidth,h=noBtn.offsetHeight,p=15;
  const maxX=Math.max(p,innerWidth-w-p);
  const maxY=Math.max(p,innerHeight-h-p);
  let x=Math.random()*maxX,y=Math.random()*maxY;
  noBtn.style.position="fixed";
  noBtn.style.left=x+"px";
  noBtn.style.top=y+"px";
  noBtn.style.zIndex=50;
  noBtn.style.transform=`rotate(${Math.random()*12-6}deg)`;
  toast("Haha 😏 try the other one!");
}

noBtn.addEventListener("mouseenter",moveNo);
noBtn.addEventListener("touchstart",moveNo,{passive:false});
noBtn.addEventListener("mousedown",moveNo);

function resetNo(){
  noBtn.style.position="relative";
  noBtn.style.left="";
  noBtn.style.top="";
  noBtn.style.transform="";
}

function acceptProposal(){
  // Default date is tomorrow so the picker is immediately usable.
  const d=new Date();
  d.setDate(d.getDate()+1);
  document.getElementById("dateInput").value=d.toISOString().split("T")[0];
  document.getElementById("timeInput").value="18:00";
  document.getElementById("placeInput").value="";
  show("dateStep");
}

function confirmDate(){
  const dateValue=document.getElementById("dateInput").value;
  const timeValue=document.getElementById("timeInput").value;
  const place=document.getElementById("placeInput").value.trim();

  if(!dateValue||!timeValue){
    toast("Please choose both date and time ❤️");
    return;
  }

  const date=new Date(dateValue+"T00:00:00");
  const formattedDate=date.toLocaleDateString("en-IN",{
    weekday:"long",day:"numeric",month:"long",year:"numeric"
  });

  const [h,m]=timeValue.split(":");
  const time=new Date();
  time.setHours(Number(h),Number(m));
  const formattedTime=time.toLocaleTimeString("en-IN",{
    hour:"numeric",minute:"2-digit"
  });

  document.getElementById("finalTheir").textContent=theirName;
  document.getElementById("finalYour").textContent=yourName;
  document.getElementById("finalMessage").textContent=
    `I'm really happy you said yes. Now we have something beautiful to look forward to. ❤️`;

  document.getElementById("finalDate").textContent=formattedDate;
  document.getElementById("finalTime").textContent=formattedTime;

  const placeTicket=document.getElementById("placeTicket");
  if(place){
    document.getElementById("finalPlace").textContent=place;
    placeTicket.style.display="flex";
  }else{
    placeTicket.style.display="none";
  }

  show("final");
  celebration();
}

function restart(){
  resetNo();
  show("setup");
}

function toast(text){
  const t=document.getElementById("toast");
  t.textContent=text;t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.classList.remove("show"),1200);
}

function celebration(){
  for(let i=0;i<28;i++){
    setTimeout(()=>{
      const h=document.createElement("div");
      h.textContent=["❤️","💖","💕","✨","🌹"][Math.floor(Math.random()*5)];
      h.style.cssText=`position:fixed;left:${Math.random()*100}vw;bottom:-30px;font-size:${18+Math.random()*25}px;z-index:60;pointer-events:none;animation:rise 4s linear forwards`;
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),4200);
    },i*70);
  }
}
const s=document.createElement("style");
s.textContent="@keyframes rise{to{transform:translateY(-110vh) rotate(25deg);opacity:0}}";
document.head.appendChild(s);