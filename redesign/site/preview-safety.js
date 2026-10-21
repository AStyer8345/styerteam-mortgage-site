// Static-preview boundaries. Calculator arithmetic remains untouched.
(() => {
  'use strict';
  let saveNoteId=0;
  const saveNotes=new WeakMap();
  function saveNotice(button){
    if(saveNotes.has(button))return saveNotes.get(button);
    const existing=button.closest('[data-calculator-actions]')?.nextElementSibling;
    const note=existing?.matches('.experience-calculator-note')?existing:document.createElement('p');
    note.className='experience-calculator-note';note.id='preview-save-note-'+(++saveNoteId);
    note.setAttribute('data-preview-save-note','');note.setAttribute('role','status');
    note.textContent='Saving is unavailable in this preview. Your calculation is still shown on this page.';
    if(!note.parentNode)button.after(note);
    button.setAttribute('aria-describedby',[button.getAttribute('aria-describedby'),note.id].filter(Boolean).join(' '));
    saveNotes.set(button,note);return note;
  }
  function explainSaveActions(){document.querySelectorAll('[data-save-analysis]').forEach(saveNotice);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',explainSaveActions,{once:true});else explainSaveActions();
  document.addEventListener('submit',event=>{
    const form=event.target;if(!form.matches('form[data-preview-inquiry]'))return;
    event.preventDefault();event.stopImmediatePropagation();if(!form.reportValidity())return;
    let status=form.querySelector('[data-preview-result]');
    if(!status){status=document.createElement('p');status.setAttribute('data-preview-result','');status.setAttribute('role','status');form.append(status);}
    status.textContent='Preview complete. Nothing was sent or saved.';
  },true);
  document.addEventListener('click',event=>{
    const save=event.target.closest('[data-save-analysis]');
    if(save){event.preventDefault();event.stopImmediatePropagation();saveNotice(save).textContent='Nothing was saved. Saving is unavailable in this preview; your calculation is still shown on this page.';return;}
    const link=event.target.closest('a');
    if(link&&/my1003app/.test(link.href)){event.preventDefault();location.href='/apply.html';}
  },true);
})();
