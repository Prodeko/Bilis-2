Näin tunkkaat vanhan DB:n uuteen -->

1. Määrittele Sequelize modelit sekä vanhalle, että uudelle tietokannalle
2. Ota yhteys molempiin kantoihin
3. Hae vanhat kamat oldModels.model_name.findAll({})
4. Formatoi mätsäämään uutta modelia
5. Luo uudet modelit newModels.model_name.bulkCreate(new_instances)
6. enjoy

restore to devdb from ./possu.dump

- Ota dumppi vanhasta tietokannasta ihan turvasyistä (possu.dump)
- Meillä on docker kontissa postgres kanta, johon kopsataan nää tiedot
  - pg_restore -h localhost -p 5431 -d devdb -U devadmin < ./possu.dump
  - tässä devdb on db:n nimi ja devadmin useri
- Aja node index.js jolla kamat löytää tiensä prod db:seen
