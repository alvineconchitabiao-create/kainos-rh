(function(){
  // Ne pas activer sur rhfit.html (page de présentation des outils)
  var page = window.location.pathname.split('/').pop();
  if(page === 'rhfit.html' || page === '' || page === 'index.html') return;
  
  // Ne pas activer si client authentifié via portail
  if(sessionStorage.getItem('kainosrh_client_id')) return;

  var declenche = false;

  // ── STYLES ──
  var css = document.createElement('style');
  css.textContent = '#kl-ov{position:fixed;inset:0;z-index:99999;background:rgba(5,8,18,.95);display:none;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(14px);}#kl-ov.on{display:flex;}#kl-box{background:#0D0D18;border:1px solid #1E1E32;border-radius:22px;width:100%;max-width:460px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.8);}#kl-bar{height:3px;background:linear-gradient(90deg,#C9A84C,#E2C47A);}#kl-in{padding:2rem;text-align:center;}#kl-logo{display:flex;align-items:center;justify-content:center;gap:9px;margin-bottom:1.75rem;}#kl-lname{font-size:15px;font-weight:800;color:#F0EEF8;letter-spacing:.05em;}#kl-lname b{color:#C9A84C;font-weight:inherit;}#kl-ico{font-size:3rem;margin-bottom:.875rem;}#kl-tit{font-size:1.2rem;font-weight:800;color:#F0EEF8;margin-bottom:.5rem;line-height:1.25;}#kl-sub{font-size:12px;color:#6B7A99;line-height:1.85;margin-bottom:1.5rem;}#kl-a{display:block;width:100%;padding:13px;background:#C9A84C;color:#07070D;border:none;border-radius:9px;font-size:12px;font-weight:800;letter-spacing:.08em;cursor:pointer;text-decoration:none;margin-bottom:.625rem;box-shadow:0 4px 20px rgba(201,168,76,.3);}#kl-a:hover{background:#E2C47A;}#kl-b{display:block;width:100%;padding:10px;background:transparent;color:#6B7A99;border:1px solid #1E1E32;border-radius:9px;font-size:11px;cursor:pointer;}#kl-b:hover{color:#F0EEF8;}#kl-row{display:flex;gap:.5rem;margin-top:.875rem;}#kl-row a{flex:1;display:flex;align-items:center;justify-content:center;gap:.4rem;background:#07070D;border:1px solid #1E1E32;border-radius:7px;padding:.6rem;font-size:11px;color:#6B7A99;text-decoration:none;}#kl-row a:hover{border-color:#C9A84C;color:#F0EEF8;}';
  document.head.appendChild(css);

  // ── OVERLAY HTML ──
  var ov = document.createElement('div');
  ov.id = 'kl-ov';
  ov.innerHTML = '<div id="kl-box"><div id="kl-bar"></div><div id="kl-in"><div id="kl-logo"><svg width="30" height="30" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="11" fill="#C9A84C"/><path d="M32 8L53 19L53 38Q53 54 32 61Q11 54 11 38L11 19Z" fill="#07070D" opacity=".9"/><text x="32" y="41" text-anchor="middle" font-family="Syne,sans-serif" font-size="16" font-weight="800" fill="#C9A84C">RH</text></svg><div id="kl-lname">KAINOS <b>RH</b></div></div><div id="kl-ico">&#128272;</div><div id="kl-tit">R&eacute;serv&eacute; aux clients<br>KAINOS RH</div><div id="kl-sub">Vous visualisez cet outil en mode d&eacute;mo.<br>Pour saisir vos donn&eacute;es et utiliser l\'outil,<br>contactez-nous pour obtenir votre acc&egrave;s.</div><a href="index.html#contact" id="kl-a">&#128172; Parlez-nous de votre projet</a><button id="kl-b">Continuer &agrave; visualiser (lecture seule)</button><div id="kl-row"><a href="tel:+22901993447390">&#128222; +229 01 99 34 47 39</a><a href="mailto:contact@kainosrh.com">&#9993; contact@kainosrh.com</a></div></div></div>';

  function show(){
    if(declenche) return;
    declenche = true;
    ov.classList.add('on');
  }

  function hide(){
    declenche = false;
    ov.classList.remove('on');
  }

  function init(){
    document.body.appendChild(ov);

    document.getElementById('kl-b').addEventListener('click', hide);

    // Bloquer frappe clavier (sauf Escape, F5, F12, Tab pour navigation)
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ hide(); return; }
      if(e.key === 'F5' || e.key === 'F12' || e.key === 'Tab') return;
      if(ov.classList.contains('on')) return;
      e.preventDefault();
      e.stopPropagation();
      show();
    }, true);

    // Bloquer clic sur éléments interactifs
    document.addEventListener('click', function(e){
      // Laisser passer si dans l'overlay
      if(e.target.closest('#kl-ov')) return;
      var el = e.target.closest('input, textarea, select, button, a');
      if(!el) return;
      e.preventDefault();
      e.stopPropagation();
      show();
    }, true);

    // Bloquer paste et input
    document.addEventListener('paste', function(e){ e.preventDefault(); show(); }, true);
    document.addEventListener('input', function(e){ e.preventDefault(); show(); }, true);

    // Réinitialiser flag quand on ferme en lecture seule
    document.getElementById('kl-b').addEventListener('click', function(){
      declenche = false;
    });
  }

  if(document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
