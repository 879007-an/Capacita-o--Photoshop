# Capacitação em Photoshop & Tráfego Pago — Site (demonstração)

Site estático em HTML/CSS/JS que simula a inscrição e pagamento do curso
"Capacitação em Photoshop & Tráfego Pago 2026". Não tem backend, base de
dados nem pagamento real — tudo é simulado no próprio browser.

Esta versão é **"plana"** (sem subpastas) — todos os ficheiros estão na
raiz, de propósito, para ser fácil fazer upload pelo telemóvel (ex: para
o GitHub Pages, onde criar subpastas via upload manual é complicado).

## Como abrir

**Opção 1 — direto no browser**
Clica duas vezes em `index.html`. Funciona sem precisar de servidor.

**Opção 2 — com XAMPP/WAMP**
1. Copia todos estes ficheiros para uma pasta dentro de `htdocs` (XAMPP) ou `www` (WAMP).
2. Liga o Apache no painel de controlo.
3. Abre `http://localhost/nome-da-pasta/index.html`.

**Opção 3 — GitHub Pages (pelo telemóvel)**
Ver instruções completas mais abaixo.

## Lista de ficheiros

```
index.html              → página principal (currículo, instrutores, portfólio, planos)
cadastro.html            → criar conta + escolher plano
login.html               → entrar (aceita qualquer e-mail/senha — é simulação)
pagamento.html           → checkout simulado (estilo Multicaixa Express)
confirmacao.html         → página de sucesso com nº de pedido
area-aluno.html          → painel do aluno com as aulas
style.css                → todo o design do site
app.js                   → toda a lógica simulada (sem servidor)
img-brand-mark.jpg       → logo/identidade visual
img-team-firmino.jpg     → foto do formador (Photoshop)
img-team-serafim.jpg     → foto do formador (Tráfego Pago)
img-portfolio-*.jpg      → 5 peças de portfólio
```

## Publicar no GitHub Pages pelo telemóvel

1. No teu repositório, toca em **Add file → Upload files**.
2. Toca em **choose your files**, abre a pasta onde extraíste este ZIP
   e seleciona **todos os ficheiros de uma vez** (não há subpastas —
   é só selecionar tudo).
3. Desce até ao fim, escreve uma mensagem de commit (ex: "primeira versão")
   e toca em **Commit changes**.
4. Vai a **Settings → Pages**.
5. Em "Source", escolhe a branch **main** e a pasta **/ (root)** → **Save**.
6. Espera 1–2 minutos e abre o link que aparece no topo dessa página
   (algo como `https://teu-usuario.github.io/teu-repositorio/`).

## O que é só ilustração

- **Cadastro, login e pagamento** guardam os dados apenas no `localStorage`
  do navegador (em `js/app.js`). Não há envio para nenhum servidor.
- **Os preços dos planos** (15.000 / 28.000 / 45.000 Kz) são valores de
  exemplo — edita-os em `js/app.js` (objeto `PLANS`, no topo do ficheiro)
  e também nos números mostrados em `index.html` na secção de Planos.
- **O pagamento Multicaixa Express** é apenas visual (teclado e PIN
  decorativos). Não processa nenhuma transação real.

## Para tornar isto num site real (sem simulação)

Se um dia quiseres ligar isto a um backend real (por exemplo em PHP/MySQL,
como os teus outros projetos), os pontos a substituir são:
- `#form-cadastro` em `js/app.js` → enviar para um endpoint PHP que grave
  o utilizador na base de dados.
- `#form-pagamento` em `js/app.js` → integrar com um gateway de pagamento
  real (ex.: API do Multicaixa Express / EMIS).
- `#form-login` → validar contra a tabela de utilizadores na base de dados.

## Créditos do conteúdo

Curadoria de currículo, peças de portfólio e fotografias dos formadores
fornecidas pelo próprio cliente. Tipografia: Anton, Manrope e JetBrains
Mono (Google Fonts).
