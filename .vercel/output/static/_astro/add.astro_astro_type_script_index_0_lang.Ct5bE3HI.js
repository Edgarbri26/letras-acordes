const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/ai.CnV1FTzm.js","_astro/songs.Cv0urTgp.js"])))=>i.map(i=>d[i]);
import{_}from"./preload-helper.BlTxHScW.js";import{S as m}from"./sweetalert2.esm.all.BbQndx0i.js";const h={background:"#1f2937",color:"#fff",confirmButtonColor:"#f97316",cancelButtonColor:"#4b5563"},p=(a,s)=>m.fire({...h,icon:"error",title:a,text:s}),x=(a,s,d=3e3)=>m.fire({...h,icon:"success",title:a,text:s,toast:!0,position:"top-end",showConfirmButton:!1,timer:d}),O=(a,s,d="Sí",g="Cancelar")=>m.fire({...h,title:a,text:s,icon:"warning",showCancelButton:!0,confirmButtonText:d,cancelButtonText:g,reverseButtons:!0}),R=a=>m.fire({...h,title:a,allowOutsideClick:!1,didOpen:()=>{m.showLoading()}}),q=()=>{console.log("Initializing Add Song Page script");const a=document.getElementById("add-song-data");if(!a)return;const s=a?.dataset.apiUrl,d=a?.dataset.errorMessage,g=a?.dataset.token;d&&console.error("Error Message:",d),console.log("Initializing category logic...");const b=document.querySelector("#btn-new-category"),f=document.querySelector("#modal-category"),k=document.querySelector("#btn-save-category"),E=document.querySelector("#new-cat-name"),P=document.querySelector("#categoryId"),B=document.querySelector("#modal-category button[value='cancel']"),y=e=>{const t=e.cloneNode(!0);return e.parentNode?.replaceChild(t,e),t};if(b&&f&&y(b).addEventListener("click",t=>{t.preventDefault(),f.showModal(),E&&(E.value="",E.focus())}),B&&f&&y(B).addEventListener("click",t=>{t.preventDefault(),f.close()}),k){const e=y(k);e.addEventListener("click",async()=>{const t=E?.value.trim();if(t)try{if(e.disabled=!0,e.textContent="Guardando...",!s)throw new Error("API URL not found");const r={"Content-Type":"application/json"};g&&(r.Authorization=`Bearer ${g}`);const l=await fetch(`${s}/categories`,{method:"POST",headers:r,body:JSON.stringify({name:t})});if(l.ok){const c=await l.json(),i=document.createElement("option");i.value=c.id,i.textContent=c.name,i.selected=!0,P?.appendChild(i),f?.close(),console.log("¡Categoría creada!")}else{const c=await l.json();console.error("Error al crear la categoría",c)}}catch(r){console.error(r),console.error("Error de conexión")}finally{e.disabled=!1,e.textContent="Guardar"}})}const w=document.querySelector("main form");w&&(w.dataset.listenerAttached||(w.addEventListener("submit",()=>{const e=w.querySelector("button[type='submit']");e&&(e.setAttribute("disabled","true"),e.innerHTML="Guardando...",e.classList.add("opacity-75","cursor-not-allowed"))}),w.dataset.listenerAttached="true"));const L=document.getElementById("btn-ai-search-song");if(L){const e=y(L);e.addEventListener("click",async()=>{console.log("AI Search Song Button Clicked");const t=document.querySelector("#title"),r=document.querySelector("#artist"),l=document.querySelector('[name="content"]'),c=t?.value||"",i=r?.value||"",u=l?.value||"";if(!u||u.trim().length===0){await p("Fragmento de letra requerido",`Por favor escribe al menos 2-4 líneas de la letra de la canción que deseas buscar.

Ejemplo:
'Santo, santo, santo es el Señor
Dios del universo
Llenos están el cielo y la tierra'`);return}if(u.trim().length<50){await p("Fragmento muy corto",`El fragmento de letra es demasiado corto para identificar la canción.

Por favor escribe al menos 2-4 líneas completas de la letra.

Ejemplo:
'Santo, santo, santo es el Señor
Dios del universo
Llenos están el cielo y la tierra'`);return}const N=i?` de ${i}`:"",$=c?` (${c})`:"",T=u.substring(0,100);if((await O("¿Buscar canción por letra?",`Se buscará la canción original usando este fragmento${$}${N}:

"${T}${u.length>100?"...":""}"

El contenido actual del editor será reemplazado con la canción completa encontrada.`,"Sí, buscar","Cancelar")).isConfirmed)try{R("Buscando canción..."),e.disabled=!0,e.classList.add("opacity-75","cursor-not-allowed");const{searchSongByLyrics:v}=await _(async()=>{const{searchSongByLyrics:S}=await import("./ai.CnV1FTzm.js");return{searchSongByLyrics:S}},__vite__mapDeps([0,1])),o=await v({lyricFragment:u,artist:i||void 0,title:c||void 0},g,s);if(!o.success)throw new Error(o.error||"Error al buscar la canción");const n=o.data;if(console.log("AI Search Song Response:",n),n&&n.chordPro){if(n.metadata?.title&&t&&(t.value=n.metadata.title),n.metadata?.artist&&r&&(r.value=n.metadata.artist),n.metadata?.key){const I=document.querySelector("#key");I&&(I.value=n.metadata.key,window.dispatchEvent(new CustomEvent("song-key-change",{detail:{key:n.metadata.key}})))}window.dispatchEvent(new CustomEvent("update-editor-content",{detail:{content:n.chordPro}}));const S=n.chords?.list?.join(", ")||"N/A",C=n.metadata?.title||"Canción",D=n.metadata?.artist||"Desconocido";await x("¡Canción encontrada!",`${C} - ${D} (${n.metadata?.key||"N/A"}) | ${n.chords?.count||0} acordes`,6e3)}else throw new Error("Respuesta inválida del servidor")}catch(v){console.error("Error al buscar canción:",v);const o=v instanceof Error?v.message:"Error desconocido",n=o.includes("No se pudo identificar")||o.includes("no encontr"),S=o.includes("timeout")||o.includes("ECONNABORTED")||o.includes("Network Error"),C=o.includes("500")||o.includes("502")||o.includes("503");n?await p("Canción no identificada",`No se pudo identificar la canción con el fragmento proporcionado.

Intenta con:
• Un fragmento más largo (4-6 líneas)
• Frases más distintivas de la canción
• Agregar el nombre del artista como pista`):S||C?await p("Servicio de IA no disponible",`El servicio de inteligencia artificial no está respondiendo en este momento.

Posibles causas:
• El servicio puede estar temporalmente caído
• Problemas de conexión a internet
• El servidor está sobrecargado

Por favor intenta nuevamente en unos minutos.`):await p("Error al buscar la canción",`${o}

Por favor verifica tu conexión a internet e intenta nuevamente.`)}finally{m.close(),e.disabled=!1,e.classList.remove("opacity-75","cursor-not-allowed")}})}const A=document.querySelector("#key");A&&(y(A).addEventListener("change",t=>{const l=t.target.value,c=new CustomEvent("song-key-change",{detail:{key:l}});window.dispatchEvent(c)}),window.addEventListener("editor-key-change",t=>{if(t instanceof CustomEvent){const r=document.querySelector("#key");r&&t.detail&&t.detail.key&&(r.value=t.detail.key)}}))};document.addEventListener("DOMContentLoaded",q);document.addEventListener("astro:page-load",q);
