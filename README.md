# Bilis 2.0

## Käynnistys ja kehittäminen

### Setup

Varmista, että seuraavat asiat on tehtynä:

- SSH-avain on luotu paikallisesti ja linkattu Githubiin
- Asenna Docker Desktop (Mac, Windows) ja docker-compose (https://www.docker.com/products/docker-desktop/)
- Asenna VSCodessa seuraavat extensionit
  - Docker
  - Dev Containers

---

1. Kloonaa repositorio `git clone git@github.com:Prodeko/Bilis-2.git`.
2. (Käynnistä Docker ja varmista, että docker-compose on myös asennettuna).
3. Luo .env file kopioimalla /app kansion .env.template tiedosto ja päivittämällä muuttujien arvot.
4. Avaa VS Code dev container app/-hakemistossa (F1 ja Open folder in container). Samalla asentuvat yarn paketit.
5. Käynnistä kehitysympäristö käskyllä `yarn dev` devikontissa.
6. Testit (jest ja cypress) ajetaan käskyllä `yarn test`.
7. Käskyllä `yarn build` voi buildata projektin tuotantoversion.
8. Käskyillä `yarn start` ja `yarn dev:start` voi käynnistää tuotantoversion NODE*ENV:in vastaavilla arvoilla \_production* ja _development_.

Rebuildaus onnistuu painamalla F1 ja valitsemalla Rebuild container.

Sovellus käynnistyy porttiin 3000. Siirry siis selaimella [http://localhost:3000](http://localhost:3000).

### Git devikontissa

Jos git valittaa puuttuvasta avaimesta, laita .env tiedostoon SSH_KEY_PATH, jossa määrittelet polun hostikoneella sijaitsevan ssh avaimeen.

## Tietokantakomennot

### Migraatiot

#### `yarn dev:migrate:create`

Luo uuden migraatiotiedoston kansioon `/app/server/migrations`, jonka nimi on hyvä viela vaihtaa kuvaavammaksi. Laittaa automaattisesti timestampin tiedostonimeen, jotta umzug tietää oikean migraatiojärjestyksen.

#### `yarn dev:migrate:up`

Ajaa kaikki ajamattomat migraatiot. Parametrejä on myös mahdollista lisätä perään [CLI-dokumentaation](https://github.com/sequelize/umzug#cli-usage) `up`-komennon mukaisesti.

#### `yarn dev:migrate:down`

Ottaa viimeisiimmän migraation alas. Parametrejä on myös mahdollista lisätä perään [CLI-dokumentaation](https://github.com/sequelize/umzug#cli-usage) `down`-komennon mukaisesti.

#### `yarn dev:migrate:executed`

Listaa ajetut migraatiot.

#### `yarn dev:migrate:pending`

Listaa ajamattomat migraatiot.

### Testidatan luominen

#### `yarn dev:create-test-data`

Generoi testidataa databaseen. Generoi 200 pelaajaa ja 20000 peliä.

## Debuggaus

Voit myös debuggailla sovellusta käyttämällä VS Coden Run and debug -välilehteä.
Lisää breakpointeja ja tarkastele senhetkistä muuttujakontekstia sivuja ladatessa.

## Projektin erityisyyksiä

### Tärkeimmät kansiot

#### Common

**common**-kansion alla on yleishyödyllisiä funktiota, muuttujia ja tärkeimpänä **tyypit**. NextJS takia meillä on käytössä monorepo, eli backend ja frontend on samassa repossa, ja siksi voimme määrittää kerran tyypit yhteen kansioon ja käyttää niitä sekä frontissa että backissa.

#### Components

**components**-kansioon luodaan kaikki Reactista tutut komponentit. Komponentin järjestellään kansioihin seuraavien kriteereiden mukaan:

- Yleisesti käytettävä komponentti --> **utility**
- Sivukohtainen peruslayout --> **Layouts** (tämä siksi että haluamme pitää CSS:n pois pages-kansiosta).
- Muut komponentit sivukohtaisesti ja käyttökohtaisesti: esim etusivun Leaderboard-komponentti menee **Homepage/Leaderboard**-kansion alle.

#### Hooks

**hooks**-kansion alle on määritetty kaikki yleisesti projektissa käytettävät custom React-hookit.

#### Pages

Tänne tulee kaikki sivut. Nextissä on käytössä ns. 'file-based routing', joka routtaa sivut suoraan **pages**-kansion alle olevien filujen mukaan. Esimerkiksi jos luot **pages**-directoryyn kansion **player** ja sen alle filun `edit.tsx`. löytää tämä selaimelta osoitteesta `localhost:3000/player/edit`. Nextissä index-filut on erikoisasemassa ja se ei lisää nimeä routeen. Eli vastaavasti **player**-kansion alle olevat `index.tsx` kansio luo routen, joka löytyy selaimesta osoitteesta `localhost:3000/player`

#### State

Jos haluat käyttää projektissa global statea, määrittele uusi provider **state**-kansion alle. Pyri pitämään provider niin pienenä ja alhaalla HTML-puussa kuin mahdollista. Esimerkiksi, jos globaalia state käytetään vain Queue-komponentissa etusivulla, silloin sen voi antaa vain Queue-komponentille eikä koko etusivulle. Muiden komponenttien ei tarvitse tietää tästä komponentista.

#### Styles

Meillä on tehty designia varten Figma. Oikeuksia Figmaan voit kysyä esimerkiksi nykyiseltä CTO:lta.

Tätä Figmaa vastaa melko yksi-yhteen meidän **styles**-kansion alla oleva tyylisysteemi. Tähän on ajan myötä tullut muutamia lisäyksiä mutta näitä muuttujia/mixinejä/placeholdereita tulisi hyödyntää, kun tyylittelee CSS:ää.

CSS-framworkkina käytämme Tailwindia, josta voi lukea lisää...

- virallisesta dokumentaatiosta (https://tailwindcss.com/docs/utility-first)

### Dokumentaatio

#### TSDoc

Virallinen TSDoc dokumentointi: https://tsdoc.org/

TSDoc:n avulla voidaan dokumentoidaan suoraan koodiin funktioiden, mitä kukin funktio tekee. TSDoc-koodipätkä kirjoitetaan `/** */`-merkkien väliin ja syntaksiin löytyy hyvät ohjeet dokumentaation omilta sivuilta ja esimerkkejä löytää myös projektin funktioista.

Tärkeimpiä tageja ovat seuraavat:
[`@param`](https://tsdoc.org/pages/tags/param/): Kuvaile funktio parametreja.
[`@returns`](https://tsdoc.org/pages/tags/return/): Kuvaile, mitä funktio palauttaa.
[`@throws`](https://tsdoc.org/pages/tags/throws/): Määritä funktion virhetyyppi
[`@example`](https://tsdoc.org/pages/tags/example/): Tämän jälkeen voi määritellä koodiblokin, johon voi kirjoittaa esimerkin funktion käytöstä.

Hyödyllisiä ovat myös:
[`@link`](https://tsdoc.org/pages/tags/link/): Linkki repon muihin osioihin tai URL jollekin ulkoiselle internet-sivulle.
[`@remarks`](https://tsdoc.org/pages/tags/remarks/): Anna lisähuomioita funktion toiminnasta. Tätä ei tarvitse käyttää peruskuvailun tekemiseen, sen voi kirjoittaa suoraan TSDoc:n yläosaan.
[`@typeParam`](https://tsdoc.org/pages/tags/typeparam/): Kuvaile geneeristä tyyppiä.
