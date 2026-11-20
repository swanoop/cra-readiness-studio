// Browser-native modal. Never use window.prompt for secret entry.
export function passphraseAssessment(value) {
  if (typeof value !== 'string') return {ok:false, message:'Enter a passphrase.'};
  if (value.length < 16) return {ok:false, message:'Use at least 16 characters; a long, unique passphrase is recommended.'};
  if (value.length > 1024) return {ok:false, message:'Passphrase is too long.'};
  if (/^(.)\\1{11,}$/u.test(value) || /(password|123456789|qwerty|letmein)/iu.test(value)) {
    return {ok:false, message:'Choose a less predictable passphrase.'};
  }
  return {ok:true, message:'Length requirement met. Use a unique, randomly generated passphrase.'};
}
export function requestPassword({title='Enter password',confirm=false}={}) {
  return new Promise(resolve => {
    const dialog=document.createElement('dialog');
    dialog.className='password-dialog';
    const form=document.createElement('form');
    form.method='dialog';
    form.innerHTML=`<h2 id="secret-title"></h2>
      <p class="subtle" id="secret-advice"></p>
      <label class="field"><span>Passphrase</span><input autocomplete="${confirm?'new-password':'current-password'}" type="password" name="secret" required /></label>
      ${confirm?'<label class="field"><span>Confirm passphrase</span><input type="password" name="again" autocomplete="new-password" required /></label>':''}
      <p class="subtle" role="status" id="secret-strength"></p>
      <div class="button-line"><button class="button primary" type="submit">Continue</button><button class="button outline" type="button" id="secret-cancel">Cancel</button></div>`;
    form.querySelector('#secret-title').textContent=title;
    form.querySelector('#secret-advice').textContent=confirm?
      'Use a unique passphrase (16+ characters). There is no password recovery.':
      'Enter the passphrase. It stays within this browser session.';
    dialog.setAttribute('aria-labelledby','secret-title');
    dialog.append(form);
    document.body.append(dialog);
    const secret=form.elements.namedItem('secret');
    const again=form.elements.namedItem('again');
    const feedback=form.querySelector('#secret-strength');
    let settled=false;
    const done=value=>{if(settled)return;settled=true;secret.value='';if(again)again.value='';dialog.close();dialog.remove();resolve(value);};
    const update=()=>{if(confirm)feedback.textContent=passphraseAssessment(secret.value).message;};
    secret.addEventListener('input',update);
    form.querySelector('#secret-cancel').addEventListener('click',()=>done(null));
    dialog.addEventListener('cancel',e=>{e.preventDefault();done(null);});
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(confirm){
        const test=passphraseAssessment(secret.value);
        if(!test.ok){feedback.textContent=test.message;return;}
        if(secret.value!==again.value){feedback.textContent='Passphrases do not match.';return;}
      }
      done(secret.value);
    });
    dialog.showModal();
    secret.focus();
  });
}
