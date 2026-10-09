# PRD – Workflow Mapper Light

**Version:** 1.0 (MVP-specifikation)  
**Status:** Underlag för implementation med Codex  
**Primär kanal:** Publik mobilwebb, GitHub Pages  
**Designsystem:** Umeå Energis befintliga `shared-ui`, endast dark mode

## 1. Bakgrund

Enskilda medarbetare kan med AI snabbare pröva idéer och bygga prototyper, men det är inte självklart hur användbara initiativ ska tas vidare organisatoriskt. En befintlig prototyp, [Workflow Mapper](https://ue-marknad-kommunikation.github.io/workflow-mapper/), utforskar hur verksamheten kan kartlägga arbetsflöden, markera friktion och identifiera AI-möjligheter utan att ersätta mänskligt omdöme.

**Light** är inte en förenklad kopia av hela produkten. Det är **en praktisk, mobil workshopövning för att lära sig metoden**. Deltagarna ska kunna upptäcka ett konkret skav i sitt arbete och formulera ett rimligt första förbättringstest. Större organisatorisk hantering av idéer ligger utanför MVP.

## 2. Problem att lösa

Frågan ”Vad kan vi använda AI till?” leder lätt till lösningar innan arbetet är förstått. Här är målet att identifiera **lämpliga platser för AI-stöd i ett befintligt arbetsflöde**, och först därefter formulera ett tänkbart AI-stött framtida flöde. Den som inte är van vid processkartläggning behöver ett enkelt sätt att konkretisera:

- vad som ska åstadkommas,
- vilka moment som faktiskt utförs i dag,
- var tid, kvalitet eller tydlighet tappas,
- vilka förbättringar som kan vara möjliga – med eller utan AI,
- vad som behöver testas och vem som bör involveras.

Workshopdeltagare har ofta **mobilen i handen**, lite tid och ingen förkunskap inom processmodellering.

## 3. Produktprinciper (prioriterade)

1. **Problemet före AI.** Metoden börjar i användarens arbete, inte i ett AI-verktyg.
2. **Förståelse före automatik.** Användaren gör själv bedömningen; ingen AI-agent i MVP.
3. **Papper är lika rätt.** Uppmana uttryckligen till att kladda, skissa fult, stryka och rita om.
4. **Litet och konkret.** Ett avgränsat arbetsmoment, inte hela verksamhetens processlandskap.
5. **Människan kvar i flödet.** Beslut, ansvar och kvalitetssäkring ska synliggöras.
6. **Säker publik övning.** Inga interna hemligheter eller kund-/personuppgifter.
7. **Mobile first, dark only, shared-ui first.** Utveckla inte parallella komponenter om biblioteket redan har dem.

## 4. Mål och framgång

### Användarmål

Efter 10–15 minuter ska deltagaren kunna säga:

> ”Nu ser jag vilka steg jag faktiskt gör, var det skaver och vad jag skulle vilja prova för att förbättra det.”

### MVP-mål

- En nybörjare kan genomföra övningen själv med sin mobil.
- Det finns ett analogt alternativ som ger samma metodiska resultat.
- Slutresultatet är begripligt utan appen och kan kopieras eller skrivas ut.
- Användaren kan uttrycka att **ingen AI behövs** och ändå slutföra övningen.

### Kvalitativ validering

Testa med 3–5 personer utan förklaring från skaparen. Kontrollera att de förstår uppgiften, kan namnge 3–8 steg och identifierar minst ett skav eller kan motivera att inget skav hittades. Mät inte användarsvar med publik analytics.

## 5. Målgrupp och situation

**Primär persona:** medarbetare i Affär och produkt eller annan del av Umeå Energi som deltar i ett lärandeforum kring AI. Inte nödvändigtvis tekniskt kunnig.

**Situation:** personen öppnar en publik QR-länk på mobilen under ett möte. Hen kan börja direkt, välja att använda papper eller skriva i mobilen, pausa och diskutera med kollega. Ingen registrering.

**Sekundär målgrupp:** externa besökare som vill prova samma övning. All copy ska därför vara begriplig utan internt språk och får inte ge sken av att sajten är ett godkänt internt IT-system.

## 6. Informationsarkitektur och användarresa

**Start → 1. Välj skavet → 2. Beskriv stegen → 3. Markera friktion → 4. Välj förbättringsspår → 5. Planera test → Sammanfattning**

Globalt:

- Tydlig progress (exempelvis ”Steg 2 av 5”), föregående/nästa.
- Inga obligatoriska stora formulär på en enda skärm.
- ”Visa ett exempel” som kan öppnas vid behov.
- ”Jag gör övningen på papper” som fullt legitimt val, med instruktion för varje steg; användaren kan fortsätta genom alla steg utan att skriva digitalt.
- All fritext är frivillig i **pappersläge**. Digitalt läge kan ha små, sakliga minimikrav för att bygga en användbar sammanfattning.
- Samma metodiska frågor oavsett läge.
- Ingen automatisk beständig lagring; diskret varning om att innehåll kan försvinna vid omladdning.

### Skärm 0: Start

**Rubrik:** ”Börja med skavet. Inte med AI.”

**Ingress:** ”Välj ett arbetsmoment, dela upp det i steg och se vad som skulle kunna göras enklare. Det tar ungefär 10–15 minuter.”

Visa två tydliga likvärdiga startval:

- **”Skriv i mobilen”** → digitalt läge.
- **”Ta penna och papper”** → analogt guidad läge.

Synlig uppmuntran:

> ”Rita rutor, dra pilar, kladda och skissa fult. Det här är inte en tävling i snygga flödesscheman.”

Infobox före inmatning: ”Det här är en publik sida. Använd inga personuppgifter, kunduppgifter eller känslig intern information.”

Sekundärt: ”Så fungerar metoden” (kort förklaring), ”Se källor”.

### Skärm 1: Välj ett skav

**Ledfråga:** ”Vilket arbetsmoment skulle du vilja göra enklare?”

Hjälp: ”Välj något avgränsat som du gör återkommande. Det räcker med en liten del av jobbet.”

Digitala fält:

- Arbetsmoment (kort text, max 120 tecken; obligatoriskt digitalt).
- Vad skaver? (text, max 350 tecken; frivilligt).
- Vad vill du åstadkomma? (text, max 200 tecken; frivilligt).

Pappersläge: ”Skriv arbetsmomentet som rubrik på ditt papper. Rita gärna en ruta runt.”

Exempel: ”Ta fram en månadsrapport” / ”Jag hämtar samma uppgifter på flera ställen.”

### Skärm 2: Rita nuläget

**Ledfråga:** ”Vad händer från start till klart?”

Digitalt:

- Skapa steg som **ordnade kort** med en kort beskrivning (max 140 tecken/steg).
- 3 steg föreslagna i tomt läge; användaren kan lägga till upp till 8 steg eller ta bort tills minst 2 återstår. Målet i guidningen är 3–8, inte en hård metodstandard.
- Flytta steg med knapparna **upp/ner**. Ingen drag-and-drop krävs.
- Visa enkel lodrät sekvens med kopplingar/pilar, utan zoom/pan/canvas.
- Ange eventuellt ansvar/roll i ett frivilligt expanderbart fält (max 80 tecken/steg).

Pappersläge: ”Rita en ruta per moment, dra pilar mellan. Missade du ett steg? Skriv in det mellan två rutor. Det får bli rörigt.”

Hjälpfrågor: Vad triggar starten? Vilket underlag behövs? Vem tar över? Var fattas ett beslut? Vad blir resultatet?

**MVP-förenkling:** Inga BPMN-symboler, separata nodtyper eller förgreningseditorer.

### Skärm 3: Hitta friktionen

**Ledfråga:** ”Var tar det onödigt mycket tid eller blir krångligt?”

Digitalt:

- Lista tidigare steg med kryssruta ”Här skaver det”.
- För markerade steg: ett eller flera val, exempelvis **väntan**, **upprepning**, **leta information**, **dubbelarbete**, **otydligt ansvar**, **risk för fel**, **annat**.
- Frivillig notering (max 180 tecken/steg).
- Tillåt ”Jag hittade inget tydligt skav”, utan att tvinga fram ett problem.

Pappersläge: ”Ringa in ställen där det skaver. Sätt ett frågetecken där du är osäker eller där ett beslut behöver tas.”

### Skärm 4: Vad skulle kunna hjälpa?

**Ledfråga:** ”Var i arbetsflödet skulle AI kunna hjälpa – och vad ska en människa fortfarande göra?”

Visa först konkreta AI-möjligheter att överväga för varje markerat steg: **sammanfatta**, **skapa utkast**, **sortera/klassificera**, **hitta eller extrahera information** och **jämföra/analysera**. Användaren avgör själv om något passar. Visa sedan fyra **lika legitima** förbättringsspår, med kort vardagligt stöd:

1. **Ändra arbetssättet:** ta bort, förenkla eller tydliggör ett steg.
2. **Vanlig automatisering:** låt en förutsägbar regel eller integration göra återkommande arbete.
3. **AI-stöd:** prova hjälp med till exempel utkast, sortering eller sammanfattning, med mänsklig kontroll.
4. **Behåll som det är:** om momentet fungerar eller risken är större än nyttan.

Digitalt:

- Välj 0–2 spår (0 är tillåtet om användaren ännu inte vet).
- Beskriv möjlig förbättring (max 300 tecken).
- Beskriv mänskligt ansvar/kvalitetskontroll (max 250 tecken; uppmuntrat vid AI-spår).
- Fråga: ”Vilken information skulle AI behöva?” (frivilligt, generella kategorier – inga verkliga skyddsvärda data).
- Fråga: ”Vad behöver du veta innan du provar?” (frivilligt).

Pappersläge: ”Skriv 1–2 idéer bredvid den inringade rutan. Markera vem som måste kontrollera eller besluta.”

**Viktigt:** Visa förslag som *exempel att fundera på*, aldrig som en automatisk rekommendation eller garanti för AI-lämplighet.

### Skärm 5: Ett litet första test

**Ledfråga:** ”Vad är minsta rimliga sak att prova?”

Digitalt:

- Testidé (max 250 tecken).
- Vad vill du se förbättras? (t.ex. mindre tid, färre fel, enklare överlämning; välj eller skriv själv).
- Vad behöver kontrolleras först? (max 250 tecken; t.ex. godkända verktyg, säkerhet, ansvar, någon att fråga).
- Frivillig markering: ”Det här behöver jag ta vidare med någon.”

Pappersläge: ”Skriv en mening: ’Jag vill prova att … för att se om …’. Ring in vad du behöver hjälp med.”

Förklara att övningen **inte** innebär ett godkännande att ansluta system, överföra data eller börja använda AI med verksamhetsinformation.

### Skärm 6: Sammanfattning

Sammanfatta i följande ordning:

1. Det här vill jag förbättra.
2. Så går arbetet till i dag (numrerade steg).
3. Här skaver det (eller ”Inget tydligt skav markerat”).
4. Möjliga vägar vidare (AI/automatisering/arbetssätt/behåll som det är/ännu oklart).
5. Här behövs mänskligt omdöme och kontroller.
6. Mitt första test och vad jag behöver veta innan dess.

Åtgärder:

- **Kopiera sammanfattning** som ren text.
- **Skriv ut** med en enkel utskriftslayout (frivilligt om webbläsaren stödjer det).
- **Ändra mina svar**.
- **Börja om** med bekräftelsedialog (raderar endast pågående lokala data i sidans minne).

Pappersläge: sammanfattning av *frågor att besvara på papper*, inte ett tomt resultat som antyder att användaren misslyckats. Till exempel en checklista för att presentera sin skiss för en kollega.

## 7. Funktionella krav och prioritering

| ID | Krav | Prioritet |
| --- | --- | --- |
| F01 | Öppen publik sida utan inloggning | Måste |
| F02 | Fem guidade steg + start + sammanfattning | Måste |
| F03 | Lika synligt digitalt och analogt arbetssätt | Måste |
| F04 | Ordnade steg med lägg till/ta bort/upp/ner | Måste |
| F05 | Markera friktion och anteckna | Måste |
| F06 | Välja förbättringsspår utan AI-tvång | Måste |
| F07 | Formulera litet test samt mänskligt ansvar | Måste |
| F08 | Backa/fortsätt utan att förlora pågående svar | Måste |
| F09 | Kopiera sammanfattning | Måste |
| F10 | Dark mode only, `shared-ui` som grund | Måste |
| F11 | Säkerhetsmeddelande före första fritextfält | Måste |
| F12 | Inga API-anrop, backend, konton eller analytics | Måste |
| F13 | Utskriftsvänlig sammanfattning | Bör |
| F14 | Förklaringar och ett helt ofarligt exempel per steg | Bör |
| F15 | Återställ/börja om med bekräftelse | Måste |
| F16 | Inga bestående data som standard | Måste |

## 8. Ej i MVP

- AI-agent, automatiska analyser eller AI-genererade förslag.
- Inloggning, Microsoft 365- eller SharePoint-integration.
- Databas, serverfunktioner, molnlagring, delningslänkar som innehåller användarsvar.
- Foton på pappersskisser, OCR eller filuppladdningar.
- Komplicerade processdiagram, BPMN-editor, drag-and-drop-canvas eller samarbetsredigering.
- Central administratörsvy, insamling av cases, prioriteringskö eller organisatoriskt godkännandeflöde.
- Ljust tema och temaväxlare.

## 9. Design och interaktion

### 9.1 `shared-ui` – bindande beroende

Codex ska **före implementation**:

1. lokalisera det faktiska `shared-ui`-repot eller paketet och läsa README, exports och exempel,
2. fastställa installerbart paket/versionslås/importväg, styling/tema, typsnitt och tillgänglighetskontrakt,
3. använda bibliotekets komponenter för knappar, formulär, val, kort, feedback och navigation där sådana finns,
4. dokumentera vilka komponenter som återanvänds och vilka små app-specifika komponenter som behövde skapas,
5. **inte hitta på** package names, CSS-variabler, hookar eller props.

Om biblioteket inte kan nås: stoppa och begär åtkomst eller konkret installationsinstruktion. Skapa inte en skenbar `shared-ui`-integration eller en separat substitutdesign.

### 9.2 Tema och varumärke

- Endast **dark mode**, konsekvent även vid systeminställningen light.
- Prioritera faktiska `shared-ui`-tokens. Kontrollera kontrast efter att temat är applicerat.
- Varumärkesreferenser för mörkt uttryck: `#012D2F` bakgrund, `#FBFFF8` text, `#43B85C` Björk, `#F6E054` Sol, `#145058` Tall. Värdena är **referenser**, inte påhittade tokennamn.
- Typografi: Borna där bibliotekets tillåtna och tillgängliga fontresurser finns; annars organisationens dokumenterade fallback (Arial). **Kopiera inte fontfiler från andra projekt utan rättigheter eller godkänd distributionsmetod.**
- Rak, jordnära svensk copy. Undvik hype och teknikjargong.

### 9.3 Mobilkrav

- Designa först för **320–430 px** bredd; testa även 768 och 1280 px.
- En kolumn i primärflödet; på större skärm får innehållet begränsad läsbredd.
- Inga horisontella överflöden; inga beroenden av hover.
- Pekytor minst cirka **44 × 44 CSS-px** när möjligt.
- Primär handling tydlig och bekvämt nåbar, även när tangentbordet är öppet.
- Stegkort får flyttas upp/ner med tillgängliga knappar och bekräftad ordningsförändring.
- Visa progression i text utöver visuella indikatorer.
- Läsliga textstorlekar och stöd för 200 % zoom.
- Inga distraherande animationer; respektera reduced motion.

### 9.4 Tillgänglighet

- WCAG 2.2 AA som mål.
- Semantiska rubriker, etiketter, felmeddelanden och korrekt fokusordning.
- Inga enbart färgkodade besked eller ikonknappar utan åtkomligt namn.
- Fokus flyttas begripligt vid stegbyte; fel summeras och kopplas till fält.
- Kan användas med tangentbord/skärmläsare; inget drag-and-drop-krav.
- Utskriftsläget är begripligt i svartvitt.

## 10. Datamodell (förslag – anpassa till faktisk stack)

```ts
type ExerciseMode = 'digital' | 'paper';
type FrictionKind =
  | 'waiting' | 'repetition' | 'finding-info' | 'duplicate-work'
  | 'unclear-ownership' | 'error-risk' | 'other';
type ImprovementKind = 'process' | 'automation' | 'ai' | 'keep-as-is';

type WorkflowStep = {
  id: string;
  title: string;
  role?: string;
  friction: FrictionKind[];
  frictionNote?: string;
};

type Exercise = {
  mode: ExerciseMode;
  title: string;
  painPoint?: string;
  desiredOutcome?: string;
  steps: WorkflowStep[];
  noClearFriction?: boolean;
  improvementKinds: ImprovementKind[];
  improvementIdea?: string;
  humanOversight?: string;
  openQuestions?: string;
  firstTest?: string;
  successSignal?: string;
  prerequisites?: string;
  needsHelp?: boolean;
};
```

Data lagras **endast i React-/applikationsstate i pågående sidvisning**. Inga datanycklar i URL, cookies, LocalStorage eller SessionStorage i MVP. Ändring mellan stegen ska behålla state. Varning innan sidan lämnas kan övervägas om den inte blir störande.

## 11. Integritet och publik drift

GitHub Pages är offentligt. Ingen autentisering och ingen säker intern lagringsyta finns.

**Måste:**

- Säkerhetsnotis på startsidan och nära första fritextfältet.
- Förbjud i copy att ange personuppgifter, kunduppgifter, inloggningar, affärshemligheter eller skyddsvärd information.
- Inga externa API-anrop eller tredjepartsanalytik. Externa statiska resurser ska undvikas; leverera assets med bygget där licenser medger det.
- Inget resultat hamnar i query string eller länkfragment.
- Ingen AI-analys, inte ens via klientnyckel; inga nycklar i repo.
- Erbjud exempel med helt fiktiva förutsättningar.
- Kopiera/skriv ut initieras bara aktivt av användaren.

Om en framtida version ska samla in organisationsärenden krävs separat beslut om ägarskap, godkänd informationshantering, arkitektur och drift.

## 12. GitHub Pages / leverans

- Repo med statisk frontend, byggskript och GitHub Actions-workflow eller motsvarande dokumenterat GitHub Pages-flöde.
- Publicera till `https://ue-marknad-kommunikation.github.io/<repo>/` om GitHub-org/repo är samma som planerat. **Verifiera verkligt repo och Pages-inställningar innan URL låses.**
- Bas-URL och asset paths fungerar under repo-underkatalogen.
- Ingen server-side routing som kräver rewrite; föredra en enda sidapp eller hash-navigation.
- README uppdateras med **verifierade**, körbara utvecklings-/test-/byggkommandon efter stackval.
- Dokumentera licens och beroenden, inklusive `shared-ui` och dess distributionsvillkor.
- Repo och Pages får inte innehålla verkliga användarsvar eller intern information som inte får publiceras.

## 13. Tester och acceptanskriterier

### Funktion

- [ ] Start erbjuder både ”Skriv i mobilen” och ”Ta penna och papper” utan att värdera ett val högre.
- [ ] Det går att genomföra alla fem steg i båda lägena.
- [ ] Användaren kan skapa, ta bort och ordna om steg utan drag-and-drop.
- [ ] Friktion kan markeras per steg; ”inget tydligt skav” fungerar.
- [ ] Användaren kan välja processförändring, automatisering, AI, oförändrat eller inget spår ännu.
- [ ] Sammanfattningen återger vad användaren faktiskt angett; ingen AI-genererad slutsats.
- [ ] Kopiering ger begriplig ren text med rubriker och numrerade moment.
- [ ] Gå tillbaka/framåt behåller inmatningen; ”Börja om” begär bekräftelse.
- [ ] Analogt läge visar relevanta instruktioner och en användbar avslutande checklista utan ifyllda digitala fält.

### Kvalitet

- [ ] På 320, 375, 390, 430, 768 och 1280 px finns ingen horisontell scroll.
- [ ] Endast dark mode visas även om OS är inställt på light.
- [ ] `shared-ui`-beroende och faktisk återanvändning går att verifiera i koden.
- [ ] Formulär fungerar med tangentbord och skärmläsare; synliga fokusmarkeringar och fältetiketter.
- [ ] Kontrast kontrollerad; manuellt test mot WCAG 2.2 AA.
- [ ] Inga API-anrop för användardata, analytics, automatisk lagring eller nycklar i byggd JS.
- [ ] Bygg och GitHub Pages-driftsättning verifierad på rätt underkatalog.
- [ ] Länk till metodbakgrund och källor finns i UI (exempelvis ”Om metoden”).

## 14. Föreslagen arbetsordning för Codex

**Fas A – förutsättningar:** identifiera `shared-ui`, repo, distributionsätt, tillgängliga komponenter, dokumentera stackbeslut. Blockera implementation vid saknat bibliotek.

**Fas B – grundflöde:** startsida, val av analogt/digitalt läge, stegvis navigation, data/state, innehåll och mobilskal.

**Fas C – övningsfunktioner:** steglista, friktion, förbättringsspår, testplan och sammanfattning med kopiering.

**Fas D – kvalitet:** dark mode, kontrast, WCAG, 320 px, print, tomma/edge-cases, säkerhetscopy, källor.

**Fas E – publicering:** produktionsbygge, Pages-base-path, README-kommandon, verifierad live-sida.

## 15. Metodgrund och källor: AI workflows

### 15.1 Metodens inriktning

**Light handlar om att identifiera var AI skulle kunna bidra i ett arbetsflöde**, inte om traditionell processoptimering som mål i sig. En AI-workflow är i detta projekt ett arbetsflöde där AI kan stötta eller utföra vissa avgränsade uppgifter och där människor, regler och andra system har andra roller. En AI-workflow behöver **inte** vara en autonom agent.

Övningen ska hjälpa användaren att upptäcka följande:

1. **Nuläge:** Vilka steg ingår i ett verkligt arbetsmoment?
2. **Friktion och informationsarbete:** Var uppstår väntan, dubbelarbete, informationssökning, sammanställningar, textarbete eller återkommande bedömningar?
3. **AI-lämplighet:** Skulle AI kunna hjälpa till att exempelvis sammanfatta, skapa utkast, sortera, extrahera eller analysera information? Är en regelbaserad lösning mer lämplig?
4. **Människa–AI-samverkan:** Vem ger instruktioner, granskar resultaten, fattar beslut och hanterar undantag? Vilken information skulle AI behöva – och får den användas?
5. **Första experiment:** Vad kan prövas säkert och småskaligt, och hur vet man om det fungerade?

Detta är projektets **egen pedagogiska femstegsövning**, inte en vetenskapligt validerad modell eller en officiell standard från någon av källorna. Processkartläggning är en underordnad teknik för att synliggöra nuläget.

### 15.2 Primära källor och vilken del de stödjer

| Källa | Relevans för Workflow Mapper Light | Begränsning |
| --- | --- | --- |
| [Nicola Mattina – AI Collaboration Canvas](https://www.zerounoweb.it/analytics/business-intelligence/ai-collaboration-canvas-come-integrare-lintelligenza-artificiale-nei-processi-aziendali/) | Praktisk förebild för att bryta ner ett återkommande arbete i konkreta steg och bedöma människa–AI-samverkan | Separat upphovspersons ramverk, inte Light-metodens namn eller en metod som kopieras; källan är på italienska |
| [OpenAI – Identifying and Scaling AI Use Cases](https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/) | Avsnittet *Department workflow mapping* om att dela upp arbetsflöden, identifiera AI-användning och prioritera möjligheter | Guide om AI-adoption och prioritering, inte exakt femstegsövning |
| [Anthropic – Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Hur AI-workflows kan utformas med sekvenser, verktyg och kontroller; skilj styrda workflows från agenter och välj minsta rimliga komplexitet | Teknisk arkitektur för lösningar, inte metod för kartläggningsworkshop |
| [Workflow Mapper – prototyp](https://ue-marknad-kommunikation.github.io/workflow-mapper/) | Projektets egna exempel och språk: behov, nuläge, friktion, AI-möjlighet, människans ansvar och test | Egen prototyp; inte oberoende metodvalidering |

**Källtolkning:** Mattina stödjer att synliggöra *arbetet och möjliga samarbetsformer*, OpenAI stödjer att *hitta och prioritera AI-tillämpningar*, och Anthropic stödjer att *tänka igenom en lämplig AI-workflow-design*. Tillsammans inspirerar de vår egen förenklade övning. Källorna beskriver inte en gemensam standard eller en officiell femstegsmodell. Undvik att återanvända någon källas skyddade canvas-layout eller formuleringar ordagrant.

### 15.3 UX-regler härledda från metodinriktningen

- Steg 4 ska uttryckligen hjälpa användaren att **undersöka AI-möjligheter per arbetsmoment** – men inte antyda att AI är rätt för varje moment.
- Använd vardagsnära AI-exempel: sammanfatta underlag, formulera första utkast, kategorisera inkommande information, extrahera uppgifter och jämföra alternativ.
- När användaren väljer AI-spåret: ställ minst en fråga om **mänsklig kontroll** och en fråga om **vilken information som behövs**. På en publik sajt får sådan information beskrivas generiskt, inte matas in i form av verkliga skyddsvärda uppgifter.
- AI-lämplighet får inte automatiskt poängsättas eller utropas som säker baserat på ett enkelt val.
- Källor ska finnas bakom ”Om metoden” och förklaras som **inspiration och stöd**, inte som bevis för att övningen är en etablerad standard.
- Övningen ska vara begriplig utan att användaren behöver läsa källorna eller förstå skillnaden mellan AI-workflows och agenter i teknisk detalj.

## 16. Öppna beroenden före kodstart

1. **`shared-ui`:** exakt repo/paket, åtkomst, version, komponenter, tokens, licens och distribution måste verifieras av Codex i faktisk utvecklingsmiljö.
2. **Repo:** GitHub Pages-namn och deploymentinställningar bestäms vid skapandet.
3. **Typsnitt:** endast redan licensierade och korrekt publicerbara resurser får användas.

Övriga produktval ovan är **MVP-beslut**, så att Codex ska kunna bygga utan att behöva tolka visionen fritt.
