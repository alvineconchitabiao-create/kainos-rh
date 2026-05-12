// ══════════════════════════════════════════════════
// KAINOS RH — Verrou d'accès universel
// Insérer via <script src="kainos-lock.js"></script>
// dans chaque outil HTML
// ══════════════════════════════════════════════════
(function(){
  // Clé session : si le portail client a authentifié, laisser passer
  var clientId = sessionStorage.getItem('kainosrh_client_id');
  if(clientId){ return; } // Client authentifié via portail → accès libre

  // Injecter les styles du verrou
  var style = document.createElement('style');
  style.textContent = `
    #kainos-lock-overlay{
      position:fixed;inset:0;z-index:99999;
      background:linear-gradient(135deg,#0A0F1E 0%,#111827 60%,#0A0F1E 100%);
      display:flex;align-items:center;justify-content:center;
      font-family:'Syne','DM Sans','Segoe UI',sans-serif;
      padding:1.5rem;
    }
    #kainos-lock-overlay *{box-sizing:border-box;margin:0;padding:0;}
    .kl-wrap{
      width:100%;max-width:480px;text-align:center;
      animation:kl-in .5s cubic-bezier(.25,.46,.45,.94);
    }
    @keyframes kl-in{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
    .kl-logo{
      display:inline-flex;align-items:center;gap:10px;
      margin-bottom:2.5rem;
    }
    .kl-logo-svg{flex-shrink:0;}
    .kl-logo-name{font-size:18px;font-weight:800;color:#FFFFFF;letter-spacing:.06em;}
    .kl-logo-name span{color:#3B82F6;}
    .kl-icon{
      width:80px;height:80px;border-radius:50%;
      background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);
      display:flex;align-items:center;justify-content:center;
      margin:0 auto 1.5rem;font-size:32px;
    }
    .kl-title{
      font-size:1.5rem;font-weight:800;color:#FFFFFF;
      letter-spacing:-.02em;margin-bottom:.75rem;line-height:1.2;
    }
    .kl-desc{
      font-size:13px;color:#64748B;line-height:1.8;
      margin-bottom:2rem;font-weight:300;
    }
    .kl-card{
      background:#111827;border:1px solid #1E293B;border-radius:16px;
      padding:1.75rem 2rem;margin-bottom:1.5rem;
    }
    .kl-card-title{
      font-size:11px;font-weight:700;letter-spacing:.12em;
      text-transform:uppercase;color:#3B82F6;margin-bottom:1.25rem;
    }
    .kl-contacts{display:flex;flex-direction:column;gap:.875rem;}
    .kl-contact{
      display:flex;align-items:center;gap:.75rem;
      background:#0A0F1E;border:1px solid #1E293B;border-radius:10px;
      padding:.75rem 1rem;transition:border-color .2s;cursor:pointer;
      text-decoration:none;
    }
    .kl-contact:hover{border-color:rgba(59,130,246,.4);}
    .kl-contact-ico{
      width:36px;height:36px;border-radius:8px;
      background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);
      display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;
    }
    .kl-contact-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#475569;margin-bottom:2px;}
    .kl-contact-val{font-size:13px;font-weight:600;color:#FFFFFF;}
    .kl-btn{
      display:block;width:100%;padding:14px;
      background:#2563EB;color:#FFFFFF;border:none;border-radius:10px;
      font-family:'Syne','Segoe UI',sans-serif;font-size:13px;font-weight:800;
      letter-spacing:.06em;cursor:pointer;transition:all .25s;
      box-shadow:0 4px 24px rgba(37,99,235,.4);text-decoration:none;
    }
    .kl-btn:hover{background:#3B82F6;transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,99,235,.5);}
    .kl-footer{font-size:11px;color:#334155;margin-top:1.25rem;}
    .kl-tool-name{
      display:inline-flex;align-items:center;gap:6px;
      background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.15);
      border-radius:20px;padding:4px 14px;font-size:10px;font-weight:700;
      color:#60A5FA;letter-spacing:.08em;text-transform:uppercase;
      margin-bottom:1.25rem;
    }
  `;
  document.head.appendChild(style);

  // Récupérer le nom de l'outil depuis le titre de la page
  var toolName = document.title || 'Outil RH';

  // Créer l'overlay
  var overlay = document.createElement('div');
  overlay.id = 'kainos-lock-overlay';
  overlay.innerHTML = `
    <div class="kl-wrap">
      <div class="kl-logo">
        <svg class="kl-logo-svg" width="36" height="36" viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="12" fill="#2563EB"/>
          <path d="M32 7 L54 19 L54 39 Q54 55 32 62 Q10 55 10 39 L10 19 Z" fill="#FFFFFF" opacity="0.15"/>
          <path d="M32 15 L46 23 L46 37 Q46 49 32 54 Q18 49 18 37 L18 23 Z" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
          <text x="32" y="41" text-anchor="middle" font-family="Syne,sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" letter-spacing="1">RH</text>
          <polygon points="32,9 34,13 32,17 30,13" fill="#FFFFFF" opacity="0.8"/>
        </svg>
        <div class="kl-logo-name">KAINOS <span>RH</span></div>
      </div>

      <div class="kl-tool-name">🔒 ${toolName}</div>

      <div class="kl-icon">🔐</div>
      <div class="kl-title">Accès réservé<br>aux clients KAINOS RH</div>
      <div class="kl-desc">
        Cet outil fait partie de la suite <strong style="color:#60A5FA;">RHFit</strong> de KAINOS RH.<br>
        L'accès est réservé aux entreprises clientes.<br>
        Contactez-nous pour obtenir votre accès personnalisé.
      </div>

      <div class="kl-card">
        <div class="kl-card-title">Nous contacter pour un accès</div>
        <div class="kl-contacts">
          <a href="tel:+22901993447390" class="kl-contact">
            <div class="kl-contact-ico">📞</div>
            <div>
              <div class="kl-contact-label">Téléphone</div>
              <div class="kl-contact-val">+229 01 99 34 47 39</div>
            </div>
          </a>
          <a href="mailto:contact@kainosrh.com?subject=Demande d'accès — ${toolName}" class="kl-contact">
            <div class="kl-contact-ico">✉️</div>
            <div>
              <div class="kl-contact-label">Email</div>
              <div class="kl-contact-val">contact@kainosrh.com</div>
            </div>
          </a>
        </div>
      </div>

      <a href="index.html#contact" class="kl-btn">Parlez-nous de votre projet →</a>
      <div class="kl-footer">© 2026 KAINOS RH · Cotonou, Bénin · Tous droits réservés</div>
    </div>
  `;

  // Attendre que le DOM soit prêt
  function injecter(){
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  if(document.body){ injecter(); }
  else { document.addEventListener('DOMContentLoaded', injecter); }
})();
