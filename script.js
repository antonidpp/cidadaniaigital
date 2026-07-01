/* =========================================================
   VERIFIQ — script.js
   Vanilla JavaScript — sem frameworks ou bibliotecas externas
========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. MODO CLARO / ESCURO (persistido em localStorage)
  --------------------------------------------------------- */
  const THEME_KEY = 'verifiq-theme';
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      applyTheme(saved);
      return;
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  themeToggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  initTheme();

  /* ---------------------------------------------------------
     2. MENU MOBILE
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     3. CURSOR DE "ESCANEAMENTO" (efeito ambiente no hero)
  --------------------------------------------------------- */
  const scanCursor = document.getElementById('scanCursor');
  const heroSection = document.getElementById('hero');

  if (scanCursor && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      scanCursor.style.opacity = '1';
      scanCursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
    });
    heroSection.addEventListener('mouseleave', function () {
      scanCursor.style.opacity = '0';
    });
  }

  /* Simula uma "análise" concluída no visual do hero */
  const scanStatus = document.getElementById('scanStatus');
  if (scanStatus) {
    setTimeout(function () {
      scanStatus.innerHTML = 'confiabilidade: <b>72% suspeita de síntese por IA</b>';
    }, 2600);
  }

  /* ---------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.process-step, .impact-card, .acc-item, .practice-card, .quiz-question, .resource-list li, .section-eyebrow, .section-title, .section-lead'
  );

  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     5. HEADER: sombra sutil ao rolar
  --------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    header.style.boxShadow = window.scrollY > 12 ? '0 8px 30px -18px rgba(0,0,0,.6)' : 'none';
  });

  /* ---------------------------------------------------------
     6. ACORDEÃO — "Anatomia de uma Deepfake"
  --------------------------------------------------------- */
  const accTriggers = document.querySelectorAll('.acc-trigger');

  accTriggers.forEach(function (trigger) {
    const panel = trigger.nextElementSibling;
    panel.style.maxHeight = '0px';

    trigger.addEventListener('click', function () {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // fecha os demais itens (acordeão exclusivo)
      accTriggers.forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = '0px';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ---------------------------------------------------------
     7. QUIZ INTERATIVO — validação e pontuação
  --------------------------------------------------------- */
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const quizScoreValue = document.getElementById('quizScoreValue');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizBarFill = document.getElementById('quizBarFill');
  const quizSubmit = document.getElementById('quizSubmit');
  const quizReset = document.getElementById('quizReset');

  const feedbackByScore = [
    { min: 5, text: 'Nível Sentinela Digital: você aplica o método de checagem quase por instinto. Continue disseminando isso entre colegas e família.' },
    { min: 4, text: 'Muito bom! Você já tem reflexos sólidos contra desinformação. Revise o item que errou para fechar com nota máxima.' },
    { min: 3, text: 'Caminho certo, mas ainda dá para melhorar. Releia a seção "Como identificar" antes de refazer o teste.' },
    { min: 0, text: 'Vale a pena revisar todo o conteúdo do site com calma — esse é exatamente o público-alvo desta campanha educativa.' }
  ];

  function getFeedback(score) {
    return feedbackByScore.find(function (f) { return score >= f.min; }).text;
  }

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const questions = quizForm.querySelectorAll('.quiz-question');
    let answered = 0;
    let score = 0;

    questions.forEach(function (fieldset) {
      const name = fieldset.querySelector('input[type="radio"]').name;
      const checked = fieldset.querySelector('input[name="' + name + '"]:checked');
      const correctValue = fieldset.getAttribute('data-answer');

      fieldset.classList.remove('correct', 'incorrect');

      if (!checked) { return; }
      answered++;

      if (checked.value === correctValue) {
        score++;
        fieldset.classList.add('correct');
      } else {
        fieldset.classList.add('incorrect');
      }
    });

    if (answered < questions.length) {
      quizFeedback.textContent = '';
      quizResult.hidden = false;
      quizScoreValue.textContent = answered + '/' + questions.length + ' respondidas';
      quizFeedback.textContent = 'Responda todas as ' + questions.length + ' perguntas antes de corrigir.';
      quizBarFill.style.width = '0%';
      return;
    }

    quizResult.hidden = false;
    quizScoreValue.textContent = String(score);
    quizFeedback.textContent = getFeedback(score);
    quizBarFill.style.width = (score / questions.length) * 100 + '%';
    quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  quizReset.addEventListener('click', function () {
    quizForm.querySelectorAll('.quiz-question').forEach(function (fieldset) {
      fieldset.classList.remove('correct', 'incorrect');
    });
    quizResult.hidden = true;
    quizBarFill.style.width = '0%';
  });

  /* ---------------------------------------------------------
     8. FORMULÁRIO DE RELATO — simulação de envio (sem backend)
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const tipo = contactForm.querySelector('#tipo').value;
    const descricao = contactForm.querySelector('#descricao').value.trim();

    if (!tipo || descricao.length < 10) {
      formFeedback.style.color = 'var(--alert)';
      formFeedback.textContent = 'Selecione o tipo de conteúdo e descreva com pelo menos 10 caracteres.';
      return;
    }

    formFeedback.style.color = 'var(--signal)';
    formFeedback.textContent = 'Relato simulado registrado. Na vida real, procure sempre um adulto responsável ou a coordenação da escola.';
    contactForm.reset();
  });

})();
