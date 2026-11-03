const KEY="ig-agent-local-v1";
const initial={ideas:[],plans:[],memory:{brand:"",niche:"Tecnologia e inteligência artificial",voice:"Educativo e acessível"},published:0};
let state=load();
let currentDraft="";
function load(){try{return {...structuredClone(initial),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return structuredClone(initial)}}
function persist(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function el(id){return document.getElementById(id)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
 el("ideaCount").textContent=state.ideas.length;
 el("scheduledCount").textContent=state.plans.length;
 el("publishedCount").textContent=state.published||0;
 el("brandName").value=state.memory.brand||"";
 el("niche").value=state.memory.niche||"";
 el("voice").value=state.memory.voice||"Educativo e acessível";
 el("planList").innerHTML=state.plans.length?state.plans.map((p,i)=>`<article class="list-item"><strong>${escapeHtml(p.title)}</strong><small>${escapeHtml(p.date||"Sem data")}</small><div class="list-actions"><button data-done="${i}">Marcar como publicado</button><button data-del-plan="${i}">Excluir</button></div></article>`).join(""):'<p class="muted">Nenhuma publicação planejada ainda.</p>';
 el("ideasList").innerHTML=state.ideas.length?state.ideas.slice().reverse().map((p,i)=>`<article class="list-item"><strong>${escapeHtml(p.title)}</strong><small>${escapeHtml(p.created)}</small><p>${escapeHtml(p.text.slice(0,180))}${p.text.length>180?"…":""}</p><div class="list-actions"><button data-copy-idea="${state.ideas.length-1-i}">Copiar</button><button data-del-idea="${state.ideas.length-1-i}">Excluir</button></div></article>`).join(""):'<p class="muted">Suas ideias salvas aparecerão aqui.</p>';
}
function generate(){
 const topic=el("topic").value.trim(); if(!topic){alert("Digite um assunto primeiro.");return}
 const format=el("format").value, lang=el("language").value, niche=state.memory.niche||"seu nicho";
 const type={carrossel:"CARROSSEL — 5 slides",reels:"ROTEIRO DE REEL",post:"POST ÚNICO",story:"SEQUÊNCIA DE STORIES"}[format];
 const pt=`${type}\nTema: ${topic}\n\nABERTURA\nVocê já parou para pensar em ${topic.toLowerCase()}?\n\nDESENVOLVIMENTO\n1. Apresente o contexto de forma simples.\n2. Explique o ponto mais importante com um exemplo.\n3. Mostre como isso se conecta a ${niche}.\n4. Termine com uma dica prática.\n\nLEGENDA\n${topic}: informação boa é aquela que você consegue aplicar. Salve esta publicação para consultar depois e compartilhe com alguém que gostaria de aprender sobre o assunto.\n\nCTA\nQual é sua opinião? Conte nos comentários.\n\nHASHTAGS\n#tecnologia #inteligenciaartificial #inovacao #aprendizado`;
 const en=`${type}\nTopic: ${topic}\n\nHOOK\nHave you ever thought about ${topic.toLowerCase()}?\n\nBODY\n1. Introduce the context simply.\n2. Explain the key point with an example.\n3. Connect it to ${niche}.\n4. End with a practical takeaway.\n\nCAPTION\n${topic}: useful information is information you can put into practice. Save this post for later and share it with someone who would enjoy learning about this topic.\n\nCTA\nWhat do you think? Tell us in the comments.\n\nHASHTAGS\n#technology #artificialintelligence #innovation #learning`;
 currentDraft=lang==="en"?en:lang==="both"?pt+"\n\n---------------- ENGLISH ----------------\n\n"+en:pt;
 el("draft").value=currentDraft;el("outputPanel").hidden=false;
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));b.classList.add("active");el(b.dataset.tab).classList.add("active")}));
el("newIdeaBtn").onclick=()=>{document.querySelector('[data-tab="studio"]').click();el("topic").focus()};
el("generateBtn").onclick=generate;
el("copyBtn").onclick=async()=>{try{await navigator.clipboard.writeText(el("draft").value);alert("Texto copiado.")}catch{el("draft").select();alert("Selecione e copie o texto.")}};
el("saveBtn").onclick=()=>{const text=el("draft").value.trim();if(!text)return;state.ideas.push({title:el("topic").value.trim(),text,created:new Date().toLocaleString("pt-BR")});persist();alert("Ideia salva neste aparelho.")};
el("shareBtn").onclick=async()=>{const text=el("draft").value.trim();if(!text)return;if(navigator.share){try{await navigator.share({title:"Conteúdo para Instagram",text})}catch(e){}}else{await navigator.clipboard.writeText(text);alert("Texto copiado para compartilhar.")}};
el("addPlanBtn").onclick=()=>{const title=el("planTitle").value.trim();if(!title){alert("Informe um título.");return}state.plans.push({title,date:el("planDate").value});el("planTitle").value="";persist()};
el("saveMemoryBtn").onclick=()=>{state.memory={brand:el("brandName").value.trim(),niche:el("niche").value.trim(),voice:el("voice").value};persist();alert("Preferências salvas.")};
document.addEventListener("click",e=>{
 const d=e.target.dataset;
 if(d.delPlan!==undefined){state.plans.splice(+d.delPlan,1);persist()}
 if(d.done!==undefined){state.plans.splice(+d.done,1);state.published=(state.published||0)+1;persist()}
 if(d.delIdea!==undefined){state.ideas.splice(+d.delIdea,1);persist()}
 if(d.copyIdea!==undefined){const p=state.ideas[+d.copyIdea];if(p){navigator.clipboard?.writeText(p.text);alert("Texto copiado, se permitido pelo navegador.")}}
});
el("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="ig-agent-backup.json";a.click();URL.revokeObjectURL(a.href)};
el("clearBtn").onclick=()=>{if(confirm("Apagar todas as ideias, tarefas e preferências salvas neste aparelho?")){state=structuredClone(initial);persist()}};
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();