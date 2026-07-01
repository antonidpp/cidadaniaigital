# VERIFIQ — Cidadania Digital e Inteligência Artificial

**Tema:** Cidadania Digital e Inteligência Artificial: o impacto das deepfakes e da desinformação na sociedade
**Tag oficial do repositório:** `#cidadaniadigital2026`

## 🎯 Objetivo do site

O VERIFIQ é um site educativo e interativo criado para a atividade de Recuperação
Prática do componente de Educação Digital e IA. Seu objetivo é conscientizar a
comunidade escolar sobre:

- o que são deepfakes e como elas são produzidas por Inteligência Artificial;
- os impactos reais da desinformação automatizada (eleições, golpes financeiros,
  assédio, saúde pública, jornalismo e convivência escolar);
- sinais práticos para identificar mídia manipulada (áudio, imagem e vídeo);
- boas práticas de segurança e cidadania digital no dia a dia;
- fontes confiáveis de checagem de fatos no Brasil.

O site conta com um **quiz interativo** que avalia o nível de "olho crítico" do
visitante diante de situações reais, um **modo escuro/claro**, um acordeão
explicativo sobre os sinais de uma deepfake e um formulário simulado de relato
de conteúdo suspeito.

## 🗂️ Estrutura do projeto

```
├── index.html          → estrutura semântica da página (header, main, section, footer, form)
├── css/
│   └── style.css       → identidade visual, layout com Flexbox e media queries
├── js/
│   └── script.js       → interatividade: tema, menu, acordeão, quiz e formulário
├── img/
│   └── favicon.svg      → ícone do site (SVG vetorial, sem uso de imagens externas)
└── README.md
```

## ⚙️ Tecnologias

Apenas **HTML5, CSS3 e JavaScript (Vanilla)**, sem frameworks, bibliotecas ou
construtores automáticos. As únicas dependências externas são fontes do
Google Fonts (Space Grotesk, Inter e JetBrains Mono), carregadas via `<link>`
no `<head>`.

## 🧩 Funcionalidades implementadas

- Layout responsivo com **Flexbox** e **Media Queries** (adaptado para
  computadores, tablets e celulares).
- **Modo escuro/claro** com preferência salva em `localStorage`.
- **Menu mobile** com animação e controle de acessibilidade (`aria-expanded`).
- **Acordeão interativo** ("Anatomia de uma Deepfake") manipulando o DOM.
- **Quiz com validação em JavaScript**: verifica respostas, calcula pontuação,
  exibe feedback textual e uma barra de progresso animada.
- **Formulário de relato simulado** com validação de campos obrigatórios.
- Animações de entrada (scroll reveal) via `IntersectionObserver`.
- Respeita `prefers-reduced-motion` para acessibilidade.

## 🤖 Uso de Inteligência Artificial neste projeto

Este projeto foi desenvolvido com apoio do assistente de IA **Claude
(Anthropic)** para gerar a estrutura de código (HTML, CSS e JavaScript) e os
textos educativos, a partir do briefing da atividade. Conforme exigido pelos
critérios de Originalidade e Ética da atividade, o prompt utilizado está
documentado abaixo na íntegra:

> **Prompt utilizado:**
> "crie um site para mim moderno futurista e extenso seguindo as seguintes
> orientações: Criação de Site: Cidadania Digital e Inteligência Artificial —
> tema: 'Cidadania Digital e Inteligência Artificial: O Impacto das Deepfakes
> e da Desinformação na Sociedade'. Regras técnicas: usar apenas HTML5, CSS3 e
> JavaScript Vanilla; publicar no GitHub com GitHub Pages; incluir a tag
> `#cidadaniadigital2026` nos topics do repositório; documentar no README o
> título, o objetivo do site e os prompts de IA usados; usar tags semânticas
> (main, section, footer, form); estilizar com Flexbox e Media Queries para
> responsividade; implementar interatividade com JavaScript, como um
> validador de quiz sobre fake news e um botão de modo escuro."

Todos os textos, ícones (SVG) e a lógica de interatividade foram gerados a
partir desse prompt e depois revisados. Nenhuma imagem, texto de terceiros ou
trecho de código de outros repositórios foi copiado — os ícones são formas
geométricas vetoriais (SVG) criadas diretamente no código.

**Fontes de referência de conteúdo (dados institucionais, não copiados literalmente):**
Agência Lupa, Aos Fatos, Projeto Comprova e G1 Fato ou Fake — citadas apenas
como indicação de onde checar informações, na seção "Recursos".

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos deste projeto.
2. Nas configurações do repositório, adicione a tag `cidadaniadigital2026` em **Topics**.
3. Vá em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
4. Aguarde alguns minutos e acesse o link gerado pelo GitHub Pages.

## 👤 Autoria

Projeto escolar — componente de Educação Digital e Inteligência Artificial.
Entrega da atividade de Recuperação Prática, trimestre 2026.
