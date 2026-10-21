/* Original script.js owns .mobile-menu-toggle and .nav-links below 900px.
   This enhancement owns only desktop dropdowns and breakpoint/focus cleanup. */
(() => {
  'use strict';
  function init() {
    const header=document.querySelector('header.sm-header');
    if(!header||header.dataset.navigationReady==='true')return;
    const links=header.querySelector('.nav-links'),toggle=header.querySelector('.mobile-menu-toggle');
    if(!links||!toggle)return;
    header.dataset.navigationReady='true';header.classList.add('navigation-enhanced');
    const desktop=window.matchMedia('(min-width: 900px)');
    const groups=[...links.querySelectorAll('.nav-has-dropdown')];
    const parentOf=group=>group.querySelector(':scope > a');
    const setGroup=(group,open)=>{group.classList.toggle('open',open);parentOf(group)?.setAttribute('aria-expanded',String(open));};
    const closeGroups=()=>groups.forEach(group=>setGroup(group,false));
    function openGroup(group){groups.forEach(other=>setGroup(other,other===group));}
    function closeMobile(){links.classList.remove('active');toggle.setAttribute('aria-expanded','false');}
    function sync(){const activeInMenu=links.contains(document.activeElement),activeWasToggle=document.activeElement===toggle;closeMobile();closeGroups();if(!desktop.matches&&activeInMenu)toggle.focus();else if(desktop.matches&&activeWasToggle)parentOf(groups[0])?.focus();}
    desktop.addEventListener('change',sync);sync();
    // Listen on the parent link, before the original delegated ul handler. This
    // prevents the original <=1280 mobile branch from double-toggling at 900–1280.
    for(const group of groups){
      const parent=parentOf(group);if(!parent)continue;
      parent.addEventListener('click',event=>{
        if(!desktop.matches)return;
        if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey){event.stopPropagation();return;}
        event.preventDefault();event.stopPropagation();
        const open=!group.classList.contains('open');closeGroups();setGroup(group,open);
      });
      parent.addEventListener('keydown',event=>{
        if(!desktop.matches||!['ArrowDown','ArrowUp',' '].includes(event.key))return;
        event.preventDefault();event.stopPropagation();openGroup(group);
        if(event.key!==' '){const items=[...group.querySelectorAll('.nav-dropdown a')];(event.key==='ArrowUp'?items.at(-1):items[0])?.focus();}
      });
      group.addEventListener('keydown',event=>{
        if(!desktop.matches||event.key!=='Escape')return;
        event.preventDefault();event.stopPropagation();setGroup(group,false);parent.focus();
      });
      group.addEventListener('focusout',event=>{if(desktop.matches&&!group.contains(event.relatedTarget))setGroup(group,false);});
    }
    document.addEventListener('pointerdown',event=>{if(desktop.matches&&!header.contains(event.target))closeGroups();});
    document.addEventListener('focusin',event=>{if(desktop.matches&&!header.contains(event.target))closeGroups();});
    const canonical=pathname=>pathname==='/index.html'?'/':pathname==='/apply.html'?'/apply-now':pathname.replace(/\/$/,'')||'/';
    for(const a of links.querySelectorAll('a[href]')){
      const url=new URL(a.getAttribute('href'),location.href);
      if(canonical(url.pathname)===canonical(location.pathname)){a.setAttribute('aria-current','page');a.closest('.nav-has-dropdown')?.classList.add('is-current');}
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
