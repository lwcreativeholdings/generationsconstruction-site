(function(){
  var toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
  toggle.addEventListener('click',function(){
    var open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});

  // Form delivery: Web3Forms sends each submission to the email the access key was created with.
  // Paste the access key from web3forms.com between the quotes below.
  var WEB3FORMS_KEY='';
  var TO='info@generationsconstruction.org';

  function mailtoFallback(form,status,lead){
    var lines=[];
    new FormData(form).forEach(function(v,k){if(k!=='botcheck'&&String(v).trim())lines.push(k+': '+v);});
    status.innerHTML='<p>'+lead+'</p><p>Your email app should open with your request filled in. Press send there to finish, or email <strong>'+TO+'</strong> directly.</p>';
    status.classList.add('show');
    window.location.href='mailto:'+TO+'?subject='+encodeURIComponent(form.dataset.subject)+'&body='+encodeURIComponent(lines.join('\n'));
  }

  document.querySelectorAll('form[data-subject]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var status=form.querySelector('.form-status'),button=form.querySelector('button[type=submit]');
      var missing=[].filter.call(form.querySelectorAll('[required]'),function(el){return !el.value.trim();});
      if(missing.length){
        status.innerHTML='<p>Please fill in your name and what needs fixing, then send again.</p>';
        status.classList.add('show');missing[0].focus();return;
      }
      if(!WEB3FORMS_KEY){mailtoFallback(form,status,'');return;}

      var data={access_key:WEB3FORMS_KEY,subject:form.dataset.subject+' from generationsconstruction.org',from_name:'Generations Construction website'};
      new FormData(form).forEach(function(v,k){data[k]=v;});
      button.disabled=true;button.textContent='Sending…';
      fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json();})
        .then(function(res){
          if(!res.success)throw new Error(res.message||'failed');
          form.reset();
          status.innerHTML='<p><strong>Request sent.</strong> We\'ll get back to you soon to talk it through.</p>';
          status.classList.add('show');
        })
        .catch(function(){mailtoFallback(form,status,'The request didn\'t go through from this page.');})
        .finally(function(){button.disabled=false;button.textContent='Send repair request';});
    });
  });
})();
