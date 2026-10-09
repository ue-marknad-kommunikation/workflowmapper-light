# Workflow Mapper Light

**En enkel, mobilanpassad övning för att kartlägga ett arbetsmoment och upptäcka var AI kan stötta, förenkla eller förändra arbetsflödet.**

> **Börja gärna med penna och papper.** Kladda, rita pilar, stryk över, skissa fult. Det viktiga är inte en snygg processkarta, utan att du ser hur arbetet faktiskt går till. Den digitala guiden är ett stöd, inte ett krav.

## Syfte

Workflow Mapper Light är en fristående och publik workshopövning inspirerad av [Workflow Mapper](https://ue-marknad-kommunikation.github.io/workflow-mapper/). Den hjälper en person att:

1. välja ett verkligt, avgränsat arbetsmoment som skaver,
2. beskriva nuläget i konkreta steg,
3. markera friktion, informationsarbete och moment som kräver mänskligt omdöme,
4. bedöma **var AI kan bidra**, och jämföra AI med enkel automatisering, förändrat arbetssätt eller fortsatt mänskligt arbete,
5. formulera ett litet, säkert nästa test.

Light-versionen ska lära ut ett tankesätt, **inte analysera arbetsflöden automatiskt**. Användaren äger analysen och slutsatserna.

## För vem?

Primärt deltagare i ett AI-lärandeforum på Umeå Energi. Sajten är dock publik och ska fungera för alla utan organisationsinloggning, intern kunskap eller specialprogram.

**Användningssätt:** mobil under ett möte eller i efterhand, cirka 10–15 minuter. Övningen ska också gå att genomföra helt analogt.

## Vad användaren får

En enkel sammanfattning att läsa, kopiera eller skriva av:

- valt problem och önskat resultat,
- arbetsflödets steg i ordning,
- var det skaver,
- tänkbara förbättringar och var mänskligt omdöme behövs,
- ett första avgränsat test och vad som behöver undersökas innan det genomförs.

Inget konto, ingen agent, ingen serverlagring, inget automatiskt insamlande av svar.

## Övningens fem steg

| Steg | Fråga | Resultat |
| --- | --- | --- |
| 1. Välj skavet | Vad vill du förstå eller förenkla? | En kort problemformulering |
| 2. Rita nuläget | Vad händer från start till klart? | 3–8 steg i ordning |
| 3. Hitta friktionen | Var blir det väntan, upprepning, otydlighet eller dubbeljobb? | Markerade steg och korta noteringar |
| 4. Identifiera AI-möjligheter | Kan AI hjälpa till att förstå, sammanfatta, skapa, klassificera eller bearbeta information i något steg? Var krävs mänsklig kontroll? | En hypotes om ett AI-stött arbetsflöde, eller ett annat förbättringsspår |
| 5. Välj ett test | Vad är minsta säkra test, och hur märker du om det hjälper? | En enkel testplan |

Detta är en **pedagogisk AI-workflow-övning**: användaren utforskar hur ett befintligt arbete skulle kunna få AI-stöd, vilka steg som ska förbli människostyrda och vad som behöver testas. Det är inte en formell eller vetenskapligt validerad urvalsmodell.

## Prova också utan skärm

Övningen ska återkommande normalisera enkla arbetssätt:

- **Papper först? Absolut.** Ta ett tomt papper och skriv arbetsmomenten som rutor.
- Dra pilar mellan stegen. Rita om när du kommer på något du missat.
- Ring in moment som tar tid eller känns onödigt krångliga.
- Sätt ett frågetecken där ansvar eller beslut är otydliga.
- Fotografera bara din egen skiss om den inte innehåller skyddsvärd information och om du har rätt att hantera bilden på det sättet. Ingen bilduppladdning ingår i sajten.

**Föreslagen mikrocopy:** ”Det får se fult ut. Poängen är att få syn på jobbet – inte att rita snyggt.”

## Säkerhet och integritet på en publik webbplats

Sidan publiceras genom GitHub Pages och är åtkomlig för alla. Den är **inte ett godkänt internt verksamhetssystem**.

- Skriv **inte** in personuppgifter, kunduppgifter, sekretessbelagd information, inloggningsuppgifter eller annan skyddsvärd intern information.
- Använd neutrala beskrivningar och påhittade exempel när verkliga arbetsflöden skulle kräva känsligt innehåll.
- Inga uppgifter skickas till en AI-tjänst, ett API eller en databas.
- Övningsdata finns i sidans minne medan den används. **Inget automatiskt bestående sparande i webbläsaren i MVP.** Vid omladdning kan svar försvinna – informera om detta.
- Sammanfattningen kan kopieras eller skrivas ut på användarens eget initiativ. Varna innan kopiering/utskrift om innehållet inte lämpar sig för att delas.
- Ingen analytics, tredjepartsspårning, externa formulär eller insamling av övningssvar.

## Design och tekniska ramar

- **Mobile first:** primärt 320–430 px skärmbredd; fungerar även på större skärmar.
- **Endast dark mode:** inget ljust tema, ingen tema-växlare.
- **`shared-ui` är obligatoriskt:** återanvänd det gemensamma bibliotekets dokumenterade komponenter, tokens och mönster i första hand. Bygg inte en separat designstandard.
- Umeå Energis mörka varumärkesuttryck är referens: bakgrund `#012D2F`, ljus text `#FBFFF8`, accent Björk `#43B85C`, Sol `#F6E054` där kontrast och komponentregler tillåter.
- Kontrollera faktiska `shared-ui`-tokens och komponent-API innan kod skrivs. Den här specifikationen **gissar inte** paketnamn, importvägar eller publiceringsmetod.
- Semantisk HTML, tydlig fokusmarkering, tangentbordsstöd, läsbara feltexter och respekt för `prefers-reduced-motion`.
- Ingen canvas-/drag-and-drop-editor behövs. En **sorterbar lista med upp- och nedknappar** är mer lämplig på mobil och för tillgänglighet.

Se [PRD.md](./PRD.md) för fullständig specifikation, skärmar och acceptanskriterier.

## Lokal utveckling – instruktion till Codex

1. Inspektera först repot och det faktiska **`shared-ui`**-biblioteket. Lokalisera dess README, paketmanifest, exports, tema/tokens, exempel, licens och tillåtna installationssätt. Om biblioteket saknas eller är privat/otillgängligt: **stanna och be om repo-/paketåtkomst**. Hitta inte på ett komponent-API.
2. Följ den teknikstack och byggstruktur som `shared-ui` och organisationens befintliga Github Pages-projekt stöder. En statiskt byggbar frontend är ett krav; inget backend behövs.
3. Implementera funktionerna och copy enligt [PRD.md](./PRD.md). Separera övningsdata/modell från presentation.
4. Sätt korrekt base path för projektwebbplats, till exempel `/workflow-mapper-light/` **om repot faktiskt heter så**. Ingen hårdkodad root-path som bryter GitHub Pages underkataloger.
5. Dokumentera verifierade kommandon för installera, utveckla, testa och bygga här efter att stacken är fastställd. Skriv inte fiktiva kommandon före inspektion.
6. Testa med mobil viewport (320, 375, 390, 430 px), tangentbord och en produktionsbyggd GitHub Pages-path.

### Verifierade kommandon

```bash
npm run dev
npm run test
npm run build
npm run check
```

`npm run dev` bygger den statiska appen och serverar `dist/` på port `4173`. PDF-nedladdning använder lokalt bundlade `pdf-lib` och `@pdf-lib/fontkit`, med Borna-fonter från `shared-ui`.

### Definition of Done

- Alla fem stegen går att utföra utan konto eller AI.
- Analogt arbetssätt presenteras som ett jämbördigt alternativ, inte en fotnot.
- Webbappen fungerar på mobil och större skärmar, i dark mode enbart.
- `shared-ui` används enligt dess faktiska kontrakt.
- Ingen information skickas bort eller sparas beständigt automatiskt.
- Användaren kan gå tillbaka, ändra och få en tydlig sammanfattning.
- Bygget fungerar under GitHub Pages repo-base-path.
- Säkerhetsinformationen är begriplig och synlig före fritextinmatning.

## Metodgrund: AI workflows och människa–AI-samverkan

**Med AI-workflow menas här ett arbetsflöde där AI kan utföra eller stötta vissa uppgifter, medan människor, regler och andra system hanterar övriga delar.** Målet med övningen är att upptäcka *var* AI kan passa in – inte att automatisera allt eller bygga en agent.

Metodens logik i Light är en **egen pedagogisk syntes** av följande principer: bryt ner arbetet i steg, hitta friktion, bedöm AI-lämplighet och risk, skissa på ansvarsfördelningen mellan AI och människa, och välj ett litet test. Det är **inte** en officiell metod eller ett certifierat ramverk från källorna.

### Huvudkällor – välj, kartlägg, utforma

1. **Nicola Mattina – AI Collaboration Canvas (publicerad genomgång av upphovspersonen)**  
   https://www.zerounoweb.it/analytics/business-intelligence/ai-collaboration-canvas-come-integrare-lintelligenza-artificiale-nei-processi-aziendali/  
   **Stödjer övningens kartläggningsdel:** dela upp ett återkommande arbete i konkreta steg, beskriv vad som görs och identifiera var och hur människa och AI skulle kunna samarbeta. Detta är den närmaste **praktiska förebilden**, inte en metod vi återger ordagrant. Artikeln är på italienska.

2. **OpenAI – Identifying and Scaling AI Use Cases**  
   https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/  
   **Stödjer identifiering och prioritering:** särskilt avsnittet *Department workflow mapping*, som beskriver att bryta ner arbetsflöden i uppgifter, identifiera möjliga AI-insatser och prioritera efter påverkan och insats.

3. **Anthropic – Building effective agents**  
   https://www.anthropic.com/engineering/building-effective-agents  
   **Stödjer utformningen av en möjlig lösning:** skillnaden mellan fördefinierade AI-workflows och autonoma agenter, enkla sekvenser och mänskliga kontrollpunkter. Börja med den enklaste lösning som räcker. Det är en teknisk designkälla, inte ett workshopupplägg.

4. **Workflow Mapper – befintlig prototyp**  
   https://ue-marknad-kommunikation.github.io/workflow-mapper/  
   **Projektets eget exempel och inspirationskälla**, inte en oberoende eller vetenskapligt validerad metod.

### Hur källorna ska användas

Källorna fyller **olika roller**: Mattina visar ett praktiskt angreppssätt för att beskriva arbetet och samverkan; OpenAI beskriver hur AI-möjligheter kan upptäckas och prioriteras i verksamheten; Anthropic illustrerar hur en vald AI-insats kan formas till ett fungerande workflow. Ingen av dem definierar Light-övningens exakta fem steg. Light är projektets **egen pedagogiska syntes**, inte en officiell metod, certifiering eller en kopia av AI Collaboration Canvas. Den publika sidan ska inte framställa förebildernas material som Umeå Energis eget.

En AI-möjlighet är en hypotes och ska bedömas med hänsyn till nytta, information, felrisk, mänskligt ansvar och verksamhetens godkända arbetssätt.

## Status

**Produktspecifikation för en första MVP.** Ej en färdig lösning, inte ett godkännande för användning med intern eller känslig information.
