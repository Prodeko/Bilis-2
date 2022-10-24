# Bilis 2.0

## Käynnistys ja kehittäminen

1. Kloonaa repositorio `git clone git@github.com:Prodeko/Bilis-2.git`
2. (Käynnistä Docker ja varmista, että docker-compose on myös asennettuna)
3. Luo .env.local file kopioimalla /app kansion .env.template tiedosto ja päivittämällä muuttujien arvot
4. Avaa VS Code dev container app/-hakemistossa (F1 ja Open folder in container). Samalla asentuvat yarn paketit.
5. Käynnistä kehitysympäristö käskyllä `yarn dev` devikontissa.
5. Testit (jest ja cypress) ajetaan käskyllä `yarn test`

Rebuildaus onnistuu painamalla F1 ja valitsemalla Rebuild container.

Sovellus käynnistyy porttiin 3000. Siirry siis selaimella [http://localhost:3000](http://localhost:3000).

## Muut komennot

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

#### `yarn dev:create-test-data [player_amount=20] [game_amount=30]`

Generoi testidataa databaseen. Hakasuluissa argumentit skriptille ja oletusarvot.

## Debuggaus

Voit myös debuggailla sovellusta käyttämällä VS Coden Run and debug -välilehteä. 
Lisää breakpointeja ja tarkastele senhetkistä muuttujakontekstia sivuja ladatessa.

## Projektin erityisyyksiä (TÄRKEÄ!!)

### Komponenttistruktuuri
Komponenttien luomisessa käytämme ns. Atomic-designia. Jaottelemme komponentit neljään pääluokkaan: atoms, molecules, organisms ja templates. Molekyylit koostuvat atomeista, organismit molekyyleistä jne. Hyvä lähde hakea lisätietoa tästä designista löytyy seuraavan linkin takaa: (https://bradfrost.com/blog/post/atomic-web-design/)

### SASS ja moduulit
Uutta komponenttia tehdessä luodaan pääluokan alle uusi kansio, jonka nimeksi tulee komponentin nimi, esimerkiksi Button. Tämän kansion sisälle tulee kaksi tiedostoa: index.tsx, joka on perinteinen React-komponentti ja "ComponentName".module.scss, johon tulee komponenttikohtainen SCSS-koodi.

#### SCSS
CSS-framworkkina käytämme SASSia, josta voi lukea lisää...
- virallisesta dokumentaatiosta (https://sass-lang.com/guide)
- SASS vs CSS (https://www.youtube.com/watch?v=g1kF45K-q7o&list=PL4-IK0AVhVjMYRhK9vRPatSlb-9r0aKgh&index=4)

SCSS-luokkien nimeäminen tapahtuu seuraavalla tavalla:
- {baseClass}__{variation}--{modifier} --> btn__positive--active
- baseClass on joku lyhyt viittaus komponentin nimeen, esim. Button-komponentti -> .btn
- variation määrittää komponentin variantin, esim. btn__positive on vihreä nappi
- modifier määrittää jonkin lisäominaisuuden, esim btn__positive--active on vihreä nappi, joka on tällä hetkellä aktiivisena

#### Komponentit
Komponentit ja niiden tyylit luodaan tietyn prosessin mukaan.
1. Kirjoita komponenttilogiikka:
- Propsit saavat lähtökohtaisesti seuraavat kolme propertya: 'onClick', 'variation' ja 'children'.
- Näistä kolmesta variation on tärkein. Siihen kirjoitetaan stringeillä kaikki komponentin variantit, jolta löytyy vastaava class scss-tiedostosta, esim buttonin variantti 'positive' löytyy scss-tiedostosta nimellä .btn__positive (tämä on nestattu, checkaa 'Nesting'-osio täältä: https://sass-lang.com/guide)
2. Importtaa SCSS-moduuli index.tsx-tiedostoon "import styles from './XXXX.module.scss'
3. Importtaa funktio getCssClass, joka luo css-luokat "styles" ja "variation" muuttujien avulla -> import getCssClass from "@common/utils/helperFunctions". Kirjoita className={getCssClass(styles, variation)} -> tämä luo css-luokat automaattisesti.
