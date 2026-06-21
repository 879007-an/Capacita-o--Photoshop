/* =========================================================
   Capacitação em Photoshop & Tráfego Pago — app.js
   Tudo aqui é SIMULADO no browser (localStorage).
   Não existe servidor, banco de dados ou pagamento real.
   ========================================================= */

const PLANS = {
  basico: { nome: "Básico", preco: 15000, modulo: "Photoshop — Fundamentos" },
  intermediario: { nome: "Intermediário", preco: 28000, modulo: "Photoshop Avançado + Tráfego Pago (intro)" },
  completo: { nome: "Completo", preco: 45000, modulo: "Photoshop Avançado + Tráfego Pago Completo + Certificado" }
};

function kz(valor){
  return valor.toLocaleString("pt-PT").replace(/,/g, ".") + " Kz";
}

function getParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------------- nav mobile ---------------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.position = "absolute";
    links.style.top = "76px";
    links.style.left = "0";
    links.style.right = "0";
    links.style.background = "#111016";
    links.style.padding = "20px 24px";
    links.style.borderBottom = "1px solid rgba(255,255,255,.1)";
  });
}

/* ---------------- pricing -> cadastro ---------------- */
function initPricingLinks(){
  document.querySelectorAll("[data-plan]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plano = btn.getAttribute("data-plan");
      window.location.href = "cadastro.html?plano=" + plano;
    });
  });
}

/* ---------------- plan pill (cadastro/pagamento) ---------------- */
function renderPlanPill(){
  const el = document.querySelector("[data-plan-pill]");
  if(!el) return;
  let plano = getParam("plano") || localStorage.getItem("cps_plano") || "intermediario";
  if(!PLANS[plano]) plano = "intermediario";
  localStorage.setItem("cps_plano", plano);
  const p = PLANS[plano];
  el.innerHTML = `Plano selecionado: <b>${p.nome}</b> <span class="px">${kz(p.preco)}</span>`;
}

/* ---------------- cadastro form ---------------- */
function initCadastroForm(){
  const form = document.querySelector("#form-cadastro");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const nome = form.querySelector("#nome");
    const email = form.querySelector("#email");
    const telefone = form.querySelector("#telefone");
    const senha = form.querySelector("#senha");

    [nome, email, telefone, senha].forEach(f => f.closest(".field").classList.remove("invalid"));

    if(nome.value.trim().length < 3){ markInvalid(nome); valid = false; }
    if(!email.value.includes("@")){ markInvalid(email); valid = false; }
    if(telefone.value.trim().length < 9){ markInvalid(telefone); valid = false; }
    if(senha.value.length < 6){ markInvalid(senha); valid = false; }

    if(!valid) return;

    const user = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      telefone: telefone.value.trim(),
      plano: getParam("plano") || localStorage.getItem("cps_plano") || "intermediario"
    };
    localStorage.setItem("cps_user", JSON.stringify(user));
    localStorage.setItem("cps_plano", user.plano);

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "A criar conta...";
    setTimeout(() => {
      window.location.href = "pagamento.html?plano=" + user.plano;
    }, 700);
  });
}

function markInvalid(field){
  field.closest(".field").classList.add("invalid");
}

/* ---------------- login form ---------------- */
function initLoginForm(){
  const form = document.querySelector("#form-login");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "A entrar...";
    setTimeout(() => {
      window.location.href = "area-aluno.html";
    }, 600);
  });
}

/* ---------------- pagamento ---------------- */
function renderOrderSummary(){
  const wrap = document.querySelector("[data-order-summary]");
  if(!wrap) return;
  let plano = getParam("plano") || localStorage.getItem("cps_plano") || "intermediario";
  if(!PLANS[plano]) plano = "intermediario";
  const p = PLANS[plano];
  wrap.innerHTML = `
    <div class="order-row"><span>Plano</span><b>${p.nome}</b></div>
    <div class="order-row"><span>Inclui</span><b style="font-weight:600;text-align:right;max-width:240px;">${p.modulo}</b></div>
    <div class="order-row total"><span>Total</span><b>${kz(p.preco)}</b></div>
  `;
}

function initPayTabs(){
  const tabs = document.querySelectorAll(".pay-tab");
  if(!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
}

function initPaymentForm(){
  const form = document.querySelector("#form-pagamento");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "A confirmar pagamento...";
    setTimeout(() => {
      const orderId = "CPS-" + Math.floor(100000 + Math.random()*900000);
      localStorage.setItem("cps_order_id", orderId);
      window.location.href = "confirmacao.html";
    }, 1100);
  });
}

function renderOrderId(){
  const el = document.querySelector("[data-order-id]");
  if(!el) return;
  el.textContent = "Nº do pedido: " + (localStorage.getItem("cps_order_id") || "CPS-000000");
}

/* ---------------- init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initPricingLinks();
  renderPlanPill();
  initCadastroForm();
  initLoginForm();
  renderOrderSummary();
  initPayTabs();
  initPaymentForm();
  renderOrderId();
});
