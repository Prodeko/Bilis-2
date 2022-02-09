# Bilis 2.0

## Käynnistys ja kehittäminen

1. Kloonaa repositorio `git clone git@github.com:Prodeko/Bilis-2.git`
2. (Käynnistä Docker ja varmista, että docker-compose on myös asennettuna)
3. Aja scripti `yarn build-dev`. Tämä skripti asentaa npm-modulit dockerin sisällä oikeaan kansioon. Tämä siksi, että tietyistä paketeista saadaan oikeat versiot dockeria varten.
4. Käynnistä kehitysympäristö käskyllä `yarn dev`
5. Testit (jest ja cypress) ajetaan käskyllä `yarn test`

Sovellus käynnistyy porttiin 3000. Siirry siis selaimella [http://localhost:3000](http://localhost:3000).

## Muut komennot

Näitä komentoja varten kehitysympäristön on oltava käynnissä.

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
