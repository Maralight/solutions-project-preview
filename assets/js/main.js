document.addEventListener("DOMContentLoaded",()=>{const id=window.SP_CONFIG?.gaMeasurementId;if(id){const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",id)}});


/* =========================================================
   GOOGLE ANALYTICS 4 — loads only after a valid ID is configured
========================================================= */
(function initGA(){
  const id = window.SP_CONFIG && window.SP_CONFIG.gaMeasurementId;
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return;
  const s=document.createElement('script'); s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments);};
  gtag('js',new Date()); gtag('config',id,{anonymize_ip:true});
})();
