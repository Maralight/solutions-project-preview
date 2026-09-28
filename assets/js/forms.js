/* =========================================================
   FORMS — Formspree production integration
   Endpoint is configured once in assets/js/config.js
========================================================= */
(function(){
  const forms=document.querySelectorAll('form[data-form], form[data-formspree], .contact-form, .quote-form');
  if(!forms.length) return;
  forms.forEach(form=>{
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const endpoint=window.SP_CONFIG&&window.SP_CONFIG.formspreeEndpoint;
      let status=form.querySelector('[data-form-status]');
      if(!status){ status=document.createElement('p'); status.setAttribute('data-form-status',''); status.setAttribute('aria-live','polite'); form.appendChild(status); }
      if(!endpoint){ status.textContent='Online submission is being configured. Please contact Solutions Project directly using the contact details on this page.'; return; }
      const button=form.querySelector('[type="submit"]'); if(button) button.disabled=true; status.textContent='Sending…';
      try{
        const r=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(!r.ok) throw new Error('Submission failed');
        form.reset(); status.textContent='Thank you. Your enquiry has been submitted successfully.';
      }catch(err){ status.textContent='We could not send your enquiry. Please try again or contact Solutions Project directly.'; }
      finally{ if(button) button.disabled=false; }
    });
  });
})();
