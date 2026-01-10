import{c as w}from"./misas.DM9YAX4E.js";import{b as i,a as u}from"./alerts.B2mnkYRv.js";import"./songs.DRRN3sIx.js";import"./sweetalert2.esm.all.BbQndx0i.js";const e=document.getElementById("addMisaForm"),t=e?.querySelector("button[type='submit']");e?.addEventListener("submit",async n=>{n.preventDefault();const r=new FormData(e),c=r.get("title"),l=r.get("dateMisa"),d=r.get("visibility"),a=e.getAttribute("data-token");if(!a){await i("Error","No estás autenticado. Por favor inicia sesión."),window.location.href="/login";return}const o=t.innerText;t.disabled=!0,t.innerHTML=`
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creando...
        `;try{const{success:s,error:m}=await w(c,l,d,a);s?(await u("Misa creada correctamente"),window.location.href="/misas"):(i("Error",m||"Error al crear la misa"),t.disabled=!1,t.innerText=o)}catch{i("Error","Ocurrió un error inesperado"),t.disabled=!1,t.innerText=o}});
