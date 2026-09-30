/* Formspree integration: contact and RFQ endpoints are configured in config.js. */
(function(){
  const forms=document.querySelectorAll('form[data-form], form[data-formspree], .contact-form, .quote-form');
  if(!forms.length) return;
  forms.forEach(form=>{
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const subject=form.querySelector('[name="subject"]')?.value||'';
      const cfg=window.SP_CONFIG||{};
      const endpoint=/quotation/i.test(subject)?cfg.rfqFormEndpoint:cfg.contactFormEndpoint;
      let status=form.querySelector('[data-form-status]');
      if(!status){status=document.createElement('p');status.setAttribute('data-form-status','');status.setAttribute('aria-live','polite');form.appendChild(status);}
      if(!endpoint){status.textContent='Online submission is not yet activated. Please email us directly using the address shown on this page.';return;}
      const button=form.querySelector('[type="submit"]'); if(button) button.disabled=true; status.textContent='Sending…';
      try{const r=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!r.ok)throw new Error();form.reset();status.textContent='Thank you. Your submission has been received.';}
      catch(_){status.textContent='We could not send your submission. Please try again or email us directly.';}
      finally{if(button)button.disabled=false;}
    });
  });
})();
