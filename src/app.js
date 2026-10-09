const MAX = {
  title: 120,
  painPoint: 350,
  desiredOutcome: 200,
  stepTitle: 140,
  role: 80,
  frictionNote: 180,
  improvementIdea: 300,
  humanOversight: 250,
  aiInformation: 250,
  openQuestions: 250,
  firstTest: 250,
  prerequisites: 250,
};

const frictionKinds = [
  ["waiting", "Väntan"],
  ["repetition", "Upprepning"],
  ["finding-info", "Leta information"],
  ["summarizing", "Sammanställa eller sammanfatta"],
  ["text-work", "Textarbete"],
  ["recurring-judgement", "Återkommande bedömning"],
  ["duplicate-work", "Dubbelarbete"],
  ["unclear-ownership", "Otydligt ansvar"],
  ["error-risk", "Risk för fel"],
  ["other", "Annat"],
];

const improvementKinds = [
  ["process", "Ändra arbetssättet", "Ta bort, förenkla eller tydliggör ett steg."],
  ["automation", "Vanlig automatisering", "Låt en regel eller integration göra återkommande arbete."],
  ["ai", "AI-stöd", "Undersök stöd för utkast, sammanfattning, klassificering eller analys med mänsklig kontroll."],
  ["keep-as-is", "Behåll som det är", "Om momentet fungerar eller risken är större än nyttan."],
];

const aiOpportunityExamples = [
  "Sammanfatta underlag",
  "Skapa ett första utkast",
  "Sortera eller klassificera",
  "Hitta eller extrahera information",
  "Jämföra eller analysera alternativ",
];

const successSignals = [
  "Mindre tid",
  "Färre fel",
  "Enklare överlämning",
  "Tydligare ansvar",
  "Mindre dubbelarbete",
  "Annat",
];

const paperPrompts = [
  "",
  "Skriv arbetsmomentet som rubrik på ditt papper. Rita gärna en ruta runt. Håll det litet nog att förstå på 10 minuter.",
  "Rita en ruta per moment och dra pilar mellan. Skriv in missade steg i efterhand. Det får se fult ut.",
  "Ringa in ställen där det skaver. Sätt ett frågetecken där du är osäker eller där ett beslut behöver tas.",
  "Skriv 1-2 idéer bredvid en inringad ruta. Markera vem som måste kontrollera, besluta eller kvalitetssäkra.",
  "Skriv en mening: Jag vill prova att ... för att se om ... Ring in vad du behöver hjälp med innan testet.",
];

const examples = [
  null,
  "Exempel: Arbetsmoment: Ta fram en månadsrapport. Skav: Jag hämtar samma uppgifter på flera ställen.",
  "Exempel: 1. Får fråga om rapport. 2. Hämtar siffror. 3. Klistrar in i mall. 4. Ber kollega kontrollera. 5. Skickar vidare.",
  "Exempel: Det skaver vid steg 2 eftersom uppgifter ligger på flera ställen, och vid steg 4 eftersom ansvar är otydligt.",
  "Exempel: Kanske kan mallen förenklas, eller så kan en godkänd regel hämta återkommande siffror. En människa måste fortfarande tolka avvikelser.",
  "Exempel: Testa en förenklad rapportmall med en kollega nästa månad och se om tiden minskar utan fler frågor efteråt.",
];

const initialState = () => ({
  screen: 0,
  mode: null,
  title: "",
  painPoint: "",
  desiredOutcome: "",
  steps: [createStep(), createStep(), createStep()],
  noClearFriction: false,
  improvementKinds: [],
  improvementIdea: "",
  humanOversight: "",
  aiInformation: "",
  openQuestions: "",
  firstTest: "",
  successSignal: "",
  customSuccessSignal: "",
  prerequisites: "",
  needsHelp: false,
});

let state = initialState();
let lastMovedMessage = "";

function createStep() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    title: "",
    role: "",
    friction: [],
    frictionNote: "",
  };
}

function app() {
  return document.querySelector("#app");
}

function setState(patch) {
  state = { ...state, ...patch };
  render();
}

function updateField(name, value) {
  state[name] = value;
}

function updateStep(id, patch) {
  state.steps = state.steps.map((step) => (step.id === id ? { ...step, ...patch } : step));
}

function goTo(screen) {
  state.screen = screen;
  render();
  requestAnimationFrame(() => app()?.focus());
}

function next() {
  const errors = validateScreen(state.screen, state);
  if (errors.length) {
    render(errors);
    requestAnimationFrame(() => document.querySelector(".error-summary")?.focus());
    return;
  }
  goTo(Math.min(6, state.screen + 1));
}

function previous() {
  goTo(Math.max(0, state.screen - 1));
}

function validateScreen(screen, data) {
  if (data.mode === "paper") return [];
  if (screen === 1 && !data.title.trim()) {
    return ["Skriv ett kort arbetsmoment, eller byt till pappersläget om du vill göra allt analogt."];
  }
  if (screen === 2) {
    const filledSteps = data.steps.filter((step) => step.title.trim());
    if (filledSteps.length < 2) {
      return ["Skriv minst två steg för att kunna se en enkel ordning."];
    }
  }
  return [];
}

function render(errors = []) {
  const root = app();
  if (!root) return;

  const html = state.screen === 0 ? renderStart() : renderWorkshop(errors);
  root.innerHTML = html;
  bindEvents();
}

function renderStart() {
  return `
    <div class="workshop">
      <section class="hero" aria-labelledby="start-title">
        <p class="eyebrow">En workshop på 10-15 minuter</p>
        <h1 id="start-title">Börja med skavet. Inte med AI.</h1>
        <p class="lead">Välj ett arbetsmoment, dela upp det i steg och se vad som skulle kunna göras enklare.</p>
      </section>

      <section class="choice-grid" aria-label="Välj arbetssätt">
        <button class="mode-card ${state.mode === "digital" ? "is-selected" : ""}" data-action="choose-mode" data-mode="digital">
          <strong>Skriv här</strong>
          <span class="muted">Guiden håller kvar dina svar i den här sessionen tills du laddar om.</span>
        </button>
        <button class="mode-card ${state.mode === "paper" ? "is-selected" : ""}" data-action="choose-mode" data-mode="paper">
          <strong>Ta penna och papper</strong>
          <span class="muted">Följ samma frågor, men kladda, rita pilar och stryk över på papper.</span>
        </button>
      </section>

      <div class="alert alert--warning safety">
        <div>
          <strong>Publik sida.</strong>
          Använd inga personuppgifter, kunduppgifter, inloggningar, affärshemligheter eller skyddsvärd intern information.
        </div>
      </div>

      <div class="panel paper-note">
        <h2>Det får se fult ut</h2>
        <p>Rita rutor, dra pilar, kladda och skissa om. Poängen är att få syn på jobbet, inte att rita snyggt.</p>
      </div>

      <details class="card">
        <summary>Så fungerar metoden</summary>
        <div class="stack stack-3 mt-2">
          <p>Du börjar med ett konkret skav, ritar nuläget, markerar friktion och väljer ett litet test. AI är bara ett av flera möjliga spår.</p>
          <p>Det här är en övning för reflektion. Inget skickas till någon server och inga svar sparas automatiskt.</p>
        </div>
      </details>

      <details class="card">
        <summary>Metodbakgrund och källor</summary>
        <ul class="sources-list mt-2">
          <li><a href="https://www.zerounoweb.it/analytics/business-intelligence/ai-collaboration-canvas-come-integrare-lintelligenza-artificiale-nei-processi-aziendali/">Nicola Mattina - AI Collaboration Canvas</a></li>
          <li><a href="https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/">OpenAI - Identifying and Scaling AI Use Cases</a></li>
          <li><a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic - Building effective agents</a></li>
          <li><a href="https://ue-marknad-kommunikation.github.io/workflow-mapper/">Workflow Mapper</a></li>
        </ul>
      </details>

      <div class="nav-bar">
        <span></span>
        <button class="btn btn--primary" data-action="start" ${state.mode ? "" : "disabled"}>Starta övningen</button>
      </div>
    </div>
  `;
}

function renderWorkshop(errors) {
  if (state.screen === 6) return renderSummary();

  const step = getStepMeta(state.screen);
  const progress = Math.round((state.screen / 5) * 100);
  return `
    <div class="workshop">
      <div class="progress-wrap" aria-label="Progress">
        <div class="progress-meta">
          <span>Steg ${state.screen} av 5</span>
          <span>${state.mode === "paper" ? "Papper" : "Digitalt"}</span>
        </div>
        <div class="progress" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress__bar" style="width:${progress}%"></div>
        </div>
      </div>

      <section class="step-heading" aria-labelledby="step-title">
        <div class="step-kicker">
          <span class="badge badge--primary">${step.badge}</span>
          <span class="muted">${step.why}</span>
        </div>
        <h1 id="step-title">${step.title}</h1>
        <p class="lead">${step.help}</p>
      </section>

      ${renderErrors(errors)}
      ${renderPaperPrompt()}
      ${renderStepBody(state.screen)}
      ${renderExample(state.screen)}

      <nav class="nav-bar" aria-label="Stegnavigering">
        <button class="btn btn--ghost" data-action="previous">Tillbaka</button>
        <button class="btn btn--primary" data-action="next">${state.screen === 5 ? "Visa sammanfattning" : "Fortsätt"}</button>
      </nav>
    </div>
  `;
}

function getStepMeta(screen) {
  return [
    null,
    {
      badge: "Välj skavet",
      title: "Vilket arbetsmoment skulle du vilja göra enklare?",
      help: "Välj något avgränsat som du gör återkommande. En liten del av jobbet räcker.",
      why: "Problemet först",
    },
    {
      badge: "Rita nuläget",
      title: "Vad händer från start till klart?",
      help: "Skriv momenten i den ordning de faktiskt händer. Du kan flytta runt dem när du ser flödet tydligare.",
      why: "Synliggör stegen",
    },
    {
      badge: "Hitta friktionen",
      title: "Var tar det onödigt mycket tid eller blir krångligt?",
      help: "Markera väntan, upprepning, informationssökning, textarbete, återkommande bedömningar eller annat som gör arbetet svårare.",
      why: "Se var energi tappas",
    },
    {
      badge: "Identifiera AI-möjligheter",
      title: "Var skulle AI kunna hjälpa, och var måste människan vara kvar?",
      help: "Titta särskilt på informationsarbete: sammanfatta, skapa utkast, sortera, extrahera eller jämföra. AI är en hypotes, inte ett facit.",
      why: "Människa och AI i samma flöde",
    },
    {
      badge: "Välj ett test",
      title: "Vad är minsta rimliga sak att prova?",
      help: "Formulera ett litet säkert test. Övningen är inget godkännande att ansluta system eller använda känslig information.",
      why: "Gör nästa steg litet",
    },
  ][screen];
}

function renderErrors(errors) {
  return `
    <div class="alert alert--error error-summary ${errors.length ? "is-visible" : ""}" tabindex="-1" role="alert">
      <div>
        <strong>Innan du fortsätter:</strong>
        <ul>${errors.map((error) => `<li>${escapeHtml(error)}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function renderPaperPrompt() {
  if (state.mode !== "paper") return "";
  return `
    <section class="panel paper-note" aria-label="Pappersinstruktion">
      <h2>Gör detta på papper</h2>
      <p>${paperPrompts[state.screen]}</p>
      <p class="muted">Du kan fortsätta utan att skriva något digitalt.</p>
    </section>
  `;
}

function renderExample(screen) {
  return `
    <details class="card no-print">
      <summary>Visa ett exempel</summary>
      <p class="mt-2">${examples[screen]}</p>
    </details>
  `;
}

function renderStepBody(screen) {
  if (screen === 1) return renderProblemStep();
  if (screen === 2) return renderCurrentStateStep();
  if (screen === 3) return renderFrictionStep();
  if (screen === 4) return renderImprovementStep();
  return renderTestStep();
}

function renderProblemStep() {
  return `
    <section class="panel section">
      <div class="alert alert--warning">
        <div>Skriv neutralt. Undvik personuppgifter, kunduppgifter och känslig intern information.</div>
      </div>
      <div class="form-grid">
        ${field("title", "Arbetsmoment", "text", state.title, MAX.title, "Till exempel: Ta fram en månadsrapport", state.mode !== "paper")}
        ${field("painPoint", "Vad skaver?", "textarea", state.painPoint, MAX.painPoint, "Till exempel: Jag hämtar samma uppgifter på flera ställen.")}
        ${field("desiredOutcome", "Vad vill du åstadkomma?", "textarea", state.desiredOutcome, MAX.desiredOutcome, "Till exempel: Mindre dubbeljobb och tydligare överlämning.")}
      </div>
    </section>
  `;
}

function renderCurrentStateStep() {
  return `
    <section class="panel section">
      <div class="stack stack-2">
        <h2>Steg i arbetsflödet</h2>
        <p class="muted">Sikta på 3-8 steg. Minst två behövs för en digital sammanfattning.</p>
      </div>
      <ol class="step-list">
        ${state.steps.map((step, index) => renderWorkflowStep(step, index)).join("")}
      </ol>
      <button class="btn btn--secondary" data-action="add-step" ${state.steps.length >= 8 ? "disabled" : ""}>Lägg till steg</button>
      <p class="help-text" role="status">${lastMovedMessage}</p>
    </section>
  `;
}

function renderWorkflowStep(step, index) {
  return `
    <li>
      <article class="card workflow-card">
        <div class="step-card-head">
          <span class="step-number" aria-hidden="true">${index + 1}</span>
          <div class="form-grid">
            ${stepField(step.id, "title", `Steg ${index + 1}`, step.title, MAX.stepTitle, "Kort beskrivning av momentet")}
            ${stepField(step.id, "role", "Ansvar/roll (frivilligt)", step.role, MAX.role, "Till exempel: handläggare, chef, kollega")}
          </div>
        </div>
        <div class="step-actions">
          <button class="btn btn--sm btn--ghost" data-action="move-step" data-id="${step.id}" data-direction="-1" ${index === 0 ? "disabled" : ""}>Upp</button>
          <button class="btn btn--sm btn--ghost" data-action="move-step" data-id="${step.id}" data-direction="1" ${index === state.steps.length - 1 ? "disabled" : ""}>Ner</button>
          <button class="btn btn--sm btn--danger" data-action="remove-step" data-id="${step.id}" ${state.steps.length <= 2 ? "disabled" : ""}>Ta bort</button>
        </div>
      </article>
    </li>
  `;
}

function renderFrictionStep() {
  return `
    <section class="panel section">
      <label class="inline-check">
        <input type="checkbox" data-field="noClearFriction" ${state.noClearFriction ? "checked" : ""}>
        <span>Jag hittade inget tydligt skav just nu.</span>
      </label>
      <div class="step-list">
        ${state.steps.map((step, index) => renderFrictionCard(step, index)).join("")}
      </div>
    </section>
  `;
}

function renderFrictionCard(step, index) {
  const checked = step.friction.length > 0 || step.frictionNote.trim();
  return `
    <article class="card workflow-card">
      <div class="step-card-head">
        <span class="step-number" aria-hidden="true">${index + 1}</span>
        <div class="stack stack-2">
          <h2>${escapeHtml(step.title || `Steg ${index + 1}`)}</h2>
          ${step.role ? `<p class="muted">${escapeHtml(step.role)}</p>` : ""}
          <label class="inline-check">
            <input type="checkbox" data-action="toggle-step-friction" data-id="${step.id}" ${checked ? "checked" : ""}>
            <span>Här skaver det</span>
          </label>
        </div>
      </div>
      <fieldset class="friction-tags" ${checked ? "" : "disabled"}>
        <legend class="sr-only">Typ av friktion för ${escapeHtml(step.title || `steg ${index + 1}`)}</legend>
        ${frictionKinds.map(([value, label]) => chip(value, label, step.friction.includes(value), "friction", step.id)).join("")}
      </fieldset>
      ${stepField(step.id, "frictionNote", "Kort notering (frivilligt)", step.frictionNote, MAX.frictionNote, "Vad händer här?")}
    </article>
  `;
}

function renderImprovementStep() {
  return `
    <section class="panel section">
      <div class="card">
        <h2>AI-möjligheter att fundera på</h2>
        <p class="muted mt-2">Använd som frågor, inte som rekommendationer. Passar inget av detta är det också ett giltigt svar.</p>
        <ul class="mt-2">
          ${aiOpportunityExamples.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div>
        <h2>Välj upp till två spår</h2>
        <p class="muted">Det är okej att inte veta än.</p>
      </div>
      <div class="track-grid">
        ${improvementKinds.map(([value, label, help]) => `
          <label class="option-card ${state.improvementKinds.includes(value) ? "is-selected" : ""}">
            <input type="checkbox" data-action="toggle-improvement" value="${value}" ${state.improvementKinds.includes(value) ? "checked" : ""}>
            <span><strong>${label}</strong><br><span class="muted">${help}</span></span>
          </label>
        `).join("")}
      </div>
      <div class="form-grid">
        ${field("improvementIdea", "Möjlig förbättring eller AI-hypotes", "textarea", state.improvementIdea, MAX.improvementIdea, "Till exempel: AI kanske kan sammanfatta underlag, men en människa behöver bedöma avvikelser.")}
        ${field("humanOversight", "Vad måste en människa fortfarande göra?", "textarea", state.humanOversight, MAX.humanOversight, "Till exempel ge instruktioner, granska resultat, fatta beslut eller hantera undantag.")}
        ${field("aiInformation", "Vilken information skulle AI behöva?", "textarea", state.aiInformation, MAX.aiInformation, "Beskriv bara generella kategorier, till exempel rapporttext eller ärenderubriker. Skriv inte verkliga känsliga uppgifter.")}
        ${field("openQuestions", "Vad behöver du veta innan du provar?", "textarea", state.openQuestions, MAX.openQuestions, "Till exempel om informationen får användas, godkända verktyg, ansvar eller vem du bör fråga.")}
      </div>
    </section>
  `;
}

function renderTestStep() {
  return `
    <section class="panel section">
      <div class="form-grid">
        ${field("firstTest", "Testidé", "textarea", state.firstTest, MAX.firstTest, "Till exempel: Prova en förenklad mall med en kollega nästa månad.")}
        <fieldset class="friction-tags">
          <legend class="label">Vad vill du se förbättras?</legend>
          ${successSignals.map((label) => chip(label, label, state.successSignal === label, "success")).join("")}
        </fieldset>
        ${state.successSignal === "Annat" ? field("customSuccessSignal", "Skriv egen förbättring", "text", state.customSuccessSignal, 80, "Till exempel: färre följdfrågor") : ""}
        ${field("prerequisites", "Vad behöver kontrolleras först?", "textarea", state.prerequisites, MAX.prerequisites, "Till exempel godkända verktyg, säkerhet, ansvar eller någon att fråga.")}
        <label class="inline-check">
          <input type="checkbox" data-field="needsHelp" ${state.needsHelp ? "checked" : ""}>
          <span>Det här behöver jag ta vidare med någon.</span>
        </label>
      </div>
    </section>
  `;
}

function field(name, label, type, value, max, placeholder, required = false) {
  const id = `field-${name}`;
  const safeValue = escapeHtml(value);
  const requiredText = required ? " <span aria-hidden=\"true\">*</span>" : "";
  const control = type === "textarea"
    ? `<textarea class="textarea" id="${id}" data-field="${name}" maxlength="${max}" placeholder="${placeholder}" ${required ? "required" : ""}>${safeValue}</textarea>`
    : `<input class="input" id="${id}" data-field="${name}" type="${type}" value="${safeValue}" maxlength="${max}" placeholder="${placeholder}" ${required ? "required" : ""}>`;
  return `
    <div class="field">
      <label class="label" for="${id}">${label}${requiredText}</label>
      ${control}
      <span class="help-text char-count">${value.length}/${max}</span>
    </div>
  `;
}

function stepField(id, name, label, value, max, placeholder) {
  const inputId = `step-${id}-${name}`;
  return `
    <div class="field">
      <label class="label" for="${inputId}">${label}</label>
      <input class="input" id="${inputId}" data-step-field="${name}" data-id="${id}" value="${escapeHtml(value)}" maxlength="${max}" placeholder="${placeholder}">
      <span class="help-text char-count">${value.length}/${max}</span>
    </div>
  `;
}

function chip(value, label, checked, group, stepId = "") {
  const type = group === "success" ? "radio" : "checkbox";
  return `
    <label class="chip-check">
      <input type="${type}" name="${group}${stepId}" value="${value}" data-action="toggle-chip" data-chip-group="${group}" data-id="${stepId}" ${checked ? "checked" : ""}>
      <span>${label}</span>
    </label>
  `;
}

function renderSummary() {
  const summary = generateSummary(state);
  return `
    <div class="workshop summary">
      <section class="step-heading" aria-labelledby="summary-title">
        <span class="badge badge--success">Sammanfattning</span>
        <h1 id="summary-title">Det här tar du med dig</h1>
        <p class="lead">${state.mode === "paper" ? "Använd checklistan för att berätta om din skiss för en kollega." : "Läs igenom, kopiera eller skriv ut om innehållet är okej att hantera vidare."}</p>
      </section>
      <div class="alert alert--warning no-print">
        <div>Kontrollera att sammanfattningen inte innehåller personuppgifter, kunduppgifter eller känslig intern information innan du kopierar eller skriver ut.</div>
      </div>
      <article class="panel summary-section">
        ${state.mode === "paper" ? renderPaperSummary() : renderDigitalSummary()}
      </article>
      <details class="card no-print">
        <summary>Visa som ren text</summary>
        <pre class="summary-text mt-2">${escapeHtml(summary)}</pre>
      </details>
      <div class="alert alert--info no-print">
        <div><strong>PDF:</strong> Ladda ner en stående A4-PDF direkt. Utskrift finns kvar som reserv om webbläsaren stoppar nedladdningen.</div>
      </div>
      <div class="nav-bar no-print">
        <button class="btn btn--ghost" data-action="previous">Ändra mina svar</button>
        <button class="btn btn--primary" data-action="copy-summary">Kopiera sammanfattning</button>
      </div>
      <div class="flex flex-wrap gap-3 no-print">
        <button class="btn btn--secondary" data-action="download-pdf">Ladda ner PDF</button>
        <button class="btn btn--ghost" data-action="print">Skriv ut</button>
        <button class="btn btn--danger" data-action="restart">Börja om</button>
      </div>
    </div>
  `;
}

function renderDigitalSummary() {
  const frictions = state.steps.filter((step) => step.friction.length || step.frictionNote.trim());
  return `
    ${summarySection("Det här vill jag förbättra", [
      state.title || "Inte angivet",
      state.painPoint ? `Skav: ${state.painPoint}` : "",
      state.desiredOutcome ? `Önskat läge: ${state.desiredOutcome}` : "",
    ])}
    ${summarySection("Så går arbetet till i dag", state.steps.filter((step) => step.title.trim()).map((step, index) => `${index + 1}. ${step.title}${step.role ? ` (${step.role})` : ""}`))}
    ${summarySection("Här skaver det", frictions.length ? frictions.map((step) => `${step.title || "Namnlöst steg"}: ${labelsFor(step.friction, frictionKinds).join(", ") || "notering"}${step.frictionNote ? ` - ${step.frictionNote}` : ""}`) : [state.noClearFriction ? "Inget tydligt skav markerat." : "Inget tydligt skav markerat ännu."])}
    ${summarySection("Möjliga vägar vidare", [
      labelsFor(state.improvementKinds, improvementKinds).join(", ") || "Ännu oklart",
      state.improvementIdea,
      state.aiInformation ? `Information AI skulle behöva: ${state.aiInformation}` : "",
      state.openQuestions ? `Behöver veta: ${state.openQuestions}` : "",
    ])}
    ${summarySection("Mänskligt omdöme och kontroller", [state.humanOversight || "Inte angivet ännu."])}
    ${summarySection("Mitt första test", [
      state.firstTest || "Inte angivet ännu.",
      effectiveSuccessSignal() ? `Förbättring att titta efter: ${effectiveSuccessSignal()}` : "",
      state.prerequisites ? `Kontrollera först: ${state.prerequisites}` : "",
      state.needsHelp ? "Behöver tas vidare med någon." : "",
    ])}
  `;
}

function renderPaperSummary() {
  return `
    ${summarySection("Berätta om din skiss", [
      "1. Vad heter arbetsmomentet?",
      "2. Vilka 3-8 rutor visar hur arbetet går till i dag?",
      "3. Vilka rutor har du ringat in, och varför?",
      "4. Vilka 1-2 förbättringsidéer vill du undersöka?",
      "5. Var behövs mänskligt omdöme, kontroll eller beslut?",
      "6. Vilket litet test kan du göra utan att använda känslig information eller ansluta system?",
    ])}
    ${summarySection("Bra mening att avsluta med", [
      "Jag vill prova att ... för att se om ... Innan dess behöver jag kontrollera ...",
    ])}
  `;
}

function summarySection(title, items) {
  const visibleItems = items.filter(Boolean);
  return `
    <section class="summary-section">
      <h2>${title}</h2>
      ${visibleItems.length > 1 ? `<ul>${visibleItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>${escapeHtml(visibleItems[0] || "Inte angivet.")}</p>`}
    </section>
  `;
}

export function generateSummary(data) {
  if (data.mode === "paper") {
    return [
      "Workflow Mapper Light - pappersövning",
      "",
      "1. Vad vill jag förstå eller förenkla?",
      "2. Vilka steg har jag ritat från start till klart?",
      "3. Var har jag ringat in friktion, väntan, upprepning eller otydlighet?",
      "4. Vilka förbättringsspår verkar värda att undersöka?",
      "5. Var behövs mänskligt omdöme, ansvar eller kontroll?",
      "6. Mitt första test: Jag vill prova att ... för att se om ...",
      "",
      "Kom ihåg: använd inte personuppgifter, kunduppgifter eller känslig intern information i en publik övning.",
    ].join("\n");
  }

  const lines = [
    "Workflow Mapper Light - sammanfattning",
    "",
    "1. Det här vill jag förbättra",
    data.title || "Inte angivet",
    data.painPoint ? `Skav: ${data.painPoint}` : "",
    data.desiredOutcome ? `Önskat läge: ${data.desiredOutcome}` : "",
    "",
    "2. Så går arbetet till i dag",
    ...data.steps.filter((step) => step.title.trim()).map((step, index) => `${index + 1}. ${step.title}${step.role ? ` (${step.role})` : ""}`),
    "",
    "3. Här skaver det",
    ...frictionSummary(data),
    "",
    "4. Möjliga vägar vidare",
    labelsFor(data.improvementKinds, improvementKinds).join(", ") || "Ännu oklart",
    data.improvementIdea || "",
    data.aiInformation ? `Information AI skulle behöva: ${data.aiInformation}` : "",
    data.openQuestions ? `Behöver veta: ${data.openQuestions}` : "",
    "",
    "5. Här behövs mänskligt omdöme och kontroller",
    data.humanOversight || "Inte angivet ännu.",
    "",
    "6. Mitt första test och vad jag behöver veta innan dess",
    data.firstTest || "Inte angivet ännu.",
    effectiveSuccessSignal(data) ? `Förbättring att titta efter: ${effectiveSuccessSignal(data)}` : "",
    data.prerequisites ? `Kontrollera först: ${data.prerequisites}` : "",
    data.needsHelp ? "Behöver tas vidare med någon." : "",
    "",
    "Säkerhet: detta är ingen godkänd intern lagringsyta och inget godkännande att ansluta system eller använda skyddsvärd information.",
  ];
  return lines.filter((line, index, arr) => line || arr[index - 1]).join("\n").trim();
}

function frictionSummary(data) {
  const rows = data.steps
    .filter((step) => step.friction.length || step.frictionNote.trim())
    .map((step) => `${step.title || "Namnlöst steg"}: ${labelsFor(step.friction, frictionKinds).join(", ") || "notering"}${step.frictionNote ? ` - ${step.frictionNote}` : ""}`);
  if (rows.length) return rows;
  return [data.noClearFriction ? "Inget tydligt skav markerat." : "Inget tydligt skav markerat ännu."];
}

function labelsFor(values, source) {
  return values.map((value) => source.find((item) => item[0] === value)?.[1] || value);
}

function effectiveSuccessSignal(data = state) {
  return data.successSignal === "Annat" ? data.customSuccessSignal : data.successSignal;
}

function bindEvents() {
  document.querySelectorAll("[data-field]").forEach((element) => {
    const fieldName = element.dataset.field;
    const eventName = element.type === "checkbox" ? "change" : "input";
    element.addEventListener(eventName, () => {
      updateField(fieldName, element.type === "checkbox" ? element.checked : element.value);
      if (element.type !== "checkbox") updateCounter(element);
    });
  });

  document.querySelectorAll("[data-step-field]").forEach((element) => {
    element.addEventListener("input", () => {
      updateStep(element.dataset.id, { [element.dataset.stepField]: element.value });
      updateCounter(element);
    });
  });

  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => handleAction(event, element));
    element.addEventListener("change", (event) => handleAction(event, element));
  });
}

function updateCounter(element) {
  const counter = element.parentElement?.querySelector(".char-count");
  if (counter && element.maxLength > -1) counter.textContent = `${element.value.length}/${element.maxLength}`;
}

function handleAction(event, element) {
  const action = element.dataset.action;
  if (event.type === "change" && !["toggle-chip", "toggle-improvement"].includes(action)) return;
  if (event.type === "click" && ["toggle-chip", "toggle-improvement"].includes(action)) return;

  if (action === "choose-mode") setState({ mode: element.dataset.mode });
  if (action === "start") goTo(1);
  if (action === "next") next();
  if (action === "previous") previous();
  if (action === "add-step") addStep();
  if (action === "remove-step") removeStep(element.dataset.id);
  if (action === "move-step") moveStep(element.dataset.id, Number(element.dataset.direction));
  if (action === "toggle-step-friction") toggleStepFriction(element.dataset.id, element.checked);
  if (action === "toggle-chip") toggleChip(element);
  if (action === "toggle-improvement") toggleImprovement(element.value, element.checked);
  if (action === "copy-summary") copySummary();
  if (action === "download-pdf") downloadPdf();
  if (action === "print") openPrintDialog();
  if (action === "restart") restart();
}

function addStep() {
  if (state.steps.length >= 8) return;
  state.steps = [...state.steps, createStep()];
  render();
}

function removeStep(id) {
  if (state.steps.length <= 2) return;
  state.steps = state.steps.filter((step) => step.id !== id);
  render();
}

function moveStep(id, direction) {
  const index = state.steps.findIndex((step) => step.id === id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.steps.length) return;
  const copy = [...state.steps];
  const [item] = copy.splice(index, 1);
  copy.splice(nextIndex, 0, item);
  state.steps = copy;
  lastMovedMessage = `Steg flyttat till plats ${nextIndex + 1}.`;
  render();
}

function toggleStepFriction(id, checked) {
  if (checked) {
    updateStep(id, { friction: ["other"] });
  } else {
    updateStep(id, { friction: [], frictionNote: "" });
  }
  render();
}

function toggleChip(element) {
  if (element.dataset.chipGroup === "success") {
    state.successSignal = element.checked ? element.value : "";
    render();
    return;
  }

  const step = state.steps.find((item) => item.id === element.dataset.id);
  if (!step) return;
  const values = new Set(step.friction);
  element.checked ? values.add(element.value) : values.delete(element.value);
  updateStep(step.id, { friction: [...values] });
  render();
}

function toggleImprovement(value, checked) {
  const values = new Set(state.improvementKinds);
  checked ? values.add(value) : values.delete(value);
  const nextValues = [...values].slice(0, 2);
  state.improvementKinds = nextValues;
  if (checked && !nextValues.includes(value)) {
    showToast("Välj högst två spår.");
  }
  render();
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(generateSummary(state));
    showToast("Sammanfattningen är kopierad.");
  } catch {
    showToast("Det gick inte att kopiera automatiskt. Visa ren text och kopiera manuellt.");
  }
}

function restart() {
  if (!confirm("Vill du börja om? Det raderar bara dina pågående svar i den här sidvisningen.")) return;
  state = initialState();
  render();
}

async function downloadPdf() {
  try {
    const { PDFDocument, fontkit, rgb } = await import("./vendor/pdf-vendor.js");
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);

    const [regularBytes, semiboldBytes] = await Promise.all([
      fetch(new URL("../shared-ui/fonts/Borna-Regular.woff2", import.meta.url)).then((response) => response.arrayBuffer()),
      fetch(new URL("../shared-ui/fonts/Borna-Semibold.woff2", import.meta.url)).then((response) => response.arrayBuffer()),
    ]);
    const regular = await pdf.embedFont(regularBytes);
    const semibold = await pdf.embedFont(semiboldBytes);

    const pageSize = [595.28, 841.89];
    const margin = 45.35;
    const maxWidth = pageSize[0] - margin * 2;
    const colors = {
      ink: rgb(0.004, 0.176, 0.184),
      muted: rgb(0.078, 0.314, 0.345),
      green: rgb(0.263, 0.722, 0.361),
      yellow: rgb(0.965, 0.878, 0.329),
      line: rgb(0.82, 0.88, 0.86),
    };

    const today = new Date().toLocaleDateString("sv-SE");
    const sections = state.mode === "paper" ? paperSummaryData() : digitalSummaryData(state);
    let page = pdf.addPage(pageSize);
    let y = pageSize[1] - margin;

    const ensureSpace = (needed) => {
      if (y - needed >= margin) return;
      page = pdf.addPage(pageSize);
      y = pageSize[1] - margin;
    };

    const line = (x1, y1, x2, y2, color = colors.line, thickness = 1) => {
      page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, color, thickness });
    };

    const drawWrapped = (text, x, options = {}) => {
      const size = options.size || 10.5;
      const font = options.font || regular;
      const color = options.color || colors.ink;
      const width = options.width || maxWidth;
      const lineHeight = options.lineHeight || size * 1.38;
      const prefix = options.prefix || "";
      const lines = wrapPdfText(text, font, size, width - font.widthOfTextAtSize(prefix, size));
      for (const [index, row] of lines.entries()) {
        ensureSpace(lineHeight + 2);
        page.drawText(`${index === 0 ? prefix : ""}${row}`, { x, y, size, font, color });
        y -= lineHeight;
      }
    };

    page.drawText("Umea Energi · Workflow Mapper Light", { x: margin, y, size: 10.5, font: semibold, color: colors.green });
    page.drawText(today, { x: pageSize[0] - margin - regular.widthOfTextAtSize(today, 10), y, size: 10, font: regular, color: colors.muted });
    y -= 16;
    line(margin, y, pageSize[0] - margin, y, colors.green, 1.5);
    y -= 34;

    drawWrapped("Sammanfattning", margin, { size: 26, font: semibold, lineHeight: 31 });
    y -= 2;
    drawWrapped("En enkel workshopanteckning för att prata vidare om skav, nuläge, förbättringar och ett litet första test.", margin, {
      size: 10.5,
      color: colors.muted,
      lineHeight: 15,
    });
    y -= 12;

    for (const section of sections) {
      ensureSpace(56);
      line(margin, y, pageSize[0] - margin, y);
      y -= 18;
      drawWrapped(section.title, margin, { size: 13, font: semibold, lineHeight: 16 });
      y -= 2;
      const items = section.items.length ? section.items : ["Inte angivet."];
      if (items.length === 1) {
        drawWrapped(items[0], margin, { size: 10.5, lineHeight: 15 });
      } else {
        for (const item of items) {
          drawWrapped(item, margin + 10, { size: 10.5, lineHeight: 15, prefix: "• " });
        }
      }
      y -= 8;
    }

    ensureSpace(54);
    y -= 4;
    page.drawRectangle({
      x: margin,
      y: y - 42,
      width: maxWidth,
      height: 42,
      borderColor: colors.yellow,
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });
    y -= 16;
    drawWrapped("Kontrollera att dokumentet inte innehåller personuppgifter, kunduppgifter eller känslig intern information innan du sparar eller delar det.", margin + 12, {
      size: 9.5,
      width: maxWidth - 24,
      lineHeight: 13,
    });

    const bytes = await pdf.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    downloadBlob(blob, `workflow-mapper-light-${new Date().toISOString().slice(0, 10)}.pdf`);
    showToast("PDF laddas ner.");
  } catch (error) {
    console.error(error);
    showToast("PDF-nedladdningen stoppades. Prova Skriv ut som reserv.");
  }
}

function wrapPdfText(text, font, size, width) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= width || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openPrintDialog() {
  const frame = document.createElement("iframe");
  frame.className = "print-frame";
  frame.setAttribute("aria-hidden", "true");
  document.body.append(frame);

  const doc = frame.contentDocument;
  if (!doc) {
    frame.remove();
    showToast("Det gick inte att öppna PDF-vyn i den här webbläsaren.");
    return;
  }

  doc.open();
  doc.write(renderPrintDocument(state));
  doc.close();

  const printFrame = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      showToast("Välj Spara som PDF i utskriftsdialogen.");
    } catch {
      showToast("Det gick inte att öppna utskriftsdialogen i den här webbläsaren.");
    } finally {
      setTimeout(() => frame.remove(), 1000);
    }
  };

  if (doc.fonts?.ready) {
    doc.fonts.ready.then(printFrame).catch(printFrame);
  } else {
    setTimeout(printFrame, 250);
  }
}

function renderPrintDocument(data) {
  const sections = data.mode === "paper" ? paperSummaryData() : digitalSummaryData(data);
  const today = new Date().toLocaleDateString("sv-SE");
  return `<!doctype html>
    <html lang="sv">
      <head>
        <meta charset="utf-8">
        <title>Workflow Mapper Light - sammanfattning</title>
        <style>
          @font-face {
            font-family: "Borna";
            src: url("./shared-ui/fonts/Borna-Regular.woff2") format("woff2");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Borna";
            src: url("./shared-ui/fonts/Borna-Semibold.woff2") format("woff2");
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          @page {
            size: A4 portrait;
            margin: 16mm;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #012d2f;
            background: #ffffff;
            font-family: "Borna", Arial, sans-serif;
            font-size: 10.5pt;
            line-height: 1.45;
          }
          header {
            display: flex;
            justify-content: space-between;
            gap: 12mm;
            border-bottom: 1.5pt solid #43b85c;
            padding-bottom: 7mm;
            margin-bottom: 8mm;
          }
          .brand {
            font-weight: 600;
            color: #007f58;
          }
          .date {
            color: #145058;
            text-align: right;
          }
          h1 {
            margin: 0 0 4mm;
            font-size: 25pt;
            line-height: 1.05;
          }
          .intro {
            margin: 0 0 8mm;
            color: #145058;
          }
          section {
            break-inside: avoid;
            border-top: 0.7pt solid #d7e2df;
            padding-top: 4mm;
            margin-top: 4.5mm;
          }
          h2 {
            margin: 0 0 2mm;
            font-size: 13pt;
            line-height: 1.2;
          }
          p {
            margin: 0;
          }
          ul {
            margin: 0;
            padding-left: 5mm;
          }
          li + li {
            margin-top: 1.2mm;
          }
          .notice {
            margin-top: 8mm;
            padding: 4mm;
            border: 1pt solid #f6e054;
            color: #012d2f;
          }
        </style>
      </head>
      <body>
        <header>
          <div class="brand">Umeå Energi · Workflow Mapper Light</div>
          <div class="date">${escapeHtml(today)}</div>
        </header>
        <h1>Sammanfattning</h1>
        <p class="intro">En enkel workshopanteckning för att prata vidare om skav, nuläge, förbättringar och ett litet första test.</p>
        ${sections.map(({ title, items }) => `
          <section>
            <h2>${escapeHtml(title)}</h2>
            ${items.length > 1 ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>${escapeHtml(items[0] || "Inte angivet.")}</p>`}
          </section>
        `).join("")}
        <p class="notice">Kontrollera att dokumentet inte innehåller personuppgifter, kunduppgifter eller känslig intern information innan du sparar eller delar det.</p>
      </body>
    </html>`;
}

function digitalSummaryData(data) {
  const frictions = data.steps.filter((step) => step.friction.length || step.frictionNote.trim());
  return [
    {
      title: "Det här vill jag förbättra",
      items: [
        data.title || "Inte angivet",
        data.painPoint ? `Skav: ${data.painPoint}` : "",
        data.desiredOutcome ? `Önskat läge: ${data.desiredOutcome}` : "",
      ].filter(Boolean),
    },
    {
      title: "Så går arbetet till i dag",
      items: data.steps.filter((step) => step.title.trim()).map((step, index) => `${index + 1}. ${step.title}${step.role ? ` (${step.role})` : ""}`),
    },
    {
      title: "Här skaver det",
      items: frictions.length ? frictions.map((step) => `${step.title || "Namnlöst steg"}: ${labelsFor(step.friction, frictionKinds).join(", ") || "notering"}${step.frictionNote ? ` - ${step.frictionNote}` : ""}`) : [data.noClearFriction ? "Inget tydligt skav markerat." : "Inget tydligt skav markerat ännu."],
    },
    {
      title: "Möjliga vägar vidare",
      items: [
        labelsFor(data.improvementKinds, improvementKinds).join(", ") || "Ännu oklart",
        data.improvementIdea,
        data.aiInformation ? `Information AI skulle behöva: ${data.aiInformation}` : "",
        data.openQuestions ? `Behöver veta: ${data.openQuestions}` : "",
      ].filter(Boolean),
    },
    {
      title: "Mänskligt omdöme och kontroller",
      items: [data.humanOversight || "Inte angivet ännu."],
    },
    {
      title: "Mitt första test",
      items: [
        data.firstTest || "Inte angivet ännu.",
        effectiveSuccessSignal(data) ? `Förbättring att titta efter: ${effectiveSuccessSignal(data)}` : "",
        data.prerequisites ? `Kontrollera först: ${data.prerequisites}` : "",
        data.needsHelp ? "Behöver tas vidare med någon." : "",
      ].filter(Boolean),
    },
  ];
}

function paperSummaryData() {
  return [
    {
      title: "Berätta om din skiss",
      items: [
        "1. Vad heter arbetsmomentet?",
        "2. Vilka 3-8 rutor visar hur arbetet går till i dag?",
        "3. Vilka rutor har du ringat in, och varför?",
        "4. Vilka 1-2 förbättringsidéer vill du undersöka?",
        "5. Var behövs mänskligt omdöme, kontroll eller beslut?",
        "6. Vilket litet test kan du göra utan att använda känslig information eller ansluta system?",
      ],
    },
    {
      title: "Bra mening att avsluta med",
      items: ["Jag vill prova att ... för att se om ... Innan dess behöver jag kontrollera ..."],
    },
  ];
}

function showToast(message) {
  const region = document.querySelector("#toast-region");
  if (!region) return;
  region.innerHTML = `<div class="toast" role="status">${escapeHtml(message)}</div>`;
  setTimeout(() => {
    region.innerHTML = "";
  }, 3200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if (typeof window !== "undefined") {
  render();
}
