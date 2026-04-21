# Laboration 3 | Backend-baserad Webbutveckling (Frontend)
Inom denna uppgift använder jag samma hemsida som i tidigare uppgift (laboration 2) men gör några förändringar för att skilja på dem. Exempelvis lite färger och anslutningar mot den nya webbtjänsten som skapats i backend. 

Frontend-webbplatsen har skapats med hjälp av HTML, Sass (SCSS), samt JavaScript och VITE. Syftet med webbplatsen är att kunna se sitt CV samt lägga till fler arbetserfarenheter i CV:et. Hemsidan uppdaterar sitt innehåll genom att ansluta mot en databas genom API-anrop. Databasen som användes var MongoDB tillsammans med MongoDB Atlas. Redan sparad data hämtas in från databasen genom ett fetch-anrop (GET). Data skapas, raderas och uppdateras på nytt genom ytterligare anrop och funktioner med metoderna POST, DELETE och PUT. 

Totalt finns det tre sidor som går att navigera mellan.

- **CV:** här presenteras CV:et.
- **Lägg till i CV:** här finns ett forumlär med fyra textfält för att lägga till en ny post i CV:et.
- **Om uppgiften:** här beskrivs mitt arbete med uppgiften och webbplatsens funktionalitet och syfte, samt databasen.

**Webbplats:** https://lab3backend-frontend.netlify.app/

## Funktionalitet
Möjligheten att radera och uppdatera ett befintligt jobb-inlägg finns medtaget. Dessa komponenter ligger som knappar inom varje jobb-inlägg. Inom båda knapparna finns ID lagrat för respektive post. När en knapp klickas, skickas knappens ID som argument mot respektive funktion.

När en uppdatera-knapp klickas, navigeras användaren till sidan med formuläret. Där är uppgifterna redan ifyllda och skiljer sig beroende på ID för inlägget som man klickade vid. Jag valde att spara ned det klickade ID:et till localStorage för att kunna använda mot funktionerna som argument.

Likadan logik är inom knappen för radera, där ID för knappen används som argument för funktionen till att radera ett jobb-inlägg. Ingen navigering sker vid klick på denna knapp utan innehållet uppdateras automatiskt.
