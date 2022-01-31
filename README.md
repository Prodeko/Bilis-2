# Bilis 2.0

## Käynnistys ja kehittäminen

1. Kloonaa repositorio `git clone git@github.com:Prodeko/Bilis-2.git`
2. (Käynnistä Docker ja varmista, että docker-compose on myös asennettuna)
3. Aja scripti `yarn build-dev`. Tämä skripti asentaa npm-modulit dockerin sisällä oikeaan kansioon. Tämä siksi, että tietyistä paketeista saadaan oikeat versiot dockeria varten.
4. Käynnistä kehitysympäristö käskyllä `yarn dev`
5. Testit (jest ja cypress) ajetaan käskyllä `yarn test`

Sovellus käynnistyy porttiin 3000. Siirry siis selaimella [http://localhost:3000](http://localhost:3000).
