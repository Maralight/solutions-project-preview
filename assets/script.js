const header=document.querySelector('.header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>80));
const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(([e],o)=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}},{threshold:.12}).observe(el));
document.querySelectorAll('[data-rail-next]').forEach(btn=>btn.addEventListener('click',()=>{const rail=document.querySelector(btn.dataset.railNext);rail?.scrollBy({left:420,behavior:'smooth'})}));
document.querySelectorAll('[data-rail-prev]').forEach(btn=>btn.addEventListener('click',()=>{const rail=document.querySelector(btn.dataset.railPrev);rail?.scrollBy({left:-420,behavior:'smooth'})}));
if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('.cursor-depth').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*2).toFixed(2)}deg)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}
document.querySelectorAll('form[data-preview-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const success=form.querySelector('.success');if(success)success.style.display='block';form.querySelector('button[type=submit]')?.setAttribute('disabled','disabled');}));
