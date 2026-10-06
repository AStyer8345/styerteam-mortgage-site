/* Desktop keyboard support; the established shared script retains mobile ownership. */
(function(){
  'use strict';
  if(!document.body.classList.contains('premium-interior'))return;
  // The shared smooth-scroll handler owns scrolling. Move keyboard focus to
  // the existing focusable review panel without changing attribution or fields.
  document.querySelectorAll('.journey-actions a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(){
      var target=document.getElementById(link.getAttribute('href').slice(1));
      if(target&&target.hasAttribute('tabindex'))target.focus({preventScroll:true});
    });
  });
  document.querySelectorAll('header .nav-has-dropdown').forEach(function(item){
    var parent=item.querySelector(':scope > a');
    if(!parent)return;
    item.addEventListener('focusin',function(){
      if(window.innerWidth>1280&&!item.hasAttribute('data-dismissed')){
        item.classList.add('open');parent.setAttribute('aria-expanded','true');
      }
    });
    item.addEventListener('focusout',function(event){
      if(!item.contains(event.relatedTarget)){
        item.removeAttribute('data-dismissed');item.classList.remove('open');parent.setAttribute('aria-expanded','false');
      }
    });
    item.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&window.innerWidth>1280){
        item.setAttribute('data-dismissed','');item.classList.remove('open');parent.setAttribute('aria-expanded','false');parent.focus();
      }
    });
    item.addEventListener('mouseenter',function(){item.removeAttribute('data-dismissed');});
  });
})();
