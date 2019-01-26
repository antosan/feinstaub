# PARTICULATE MATTER SENSOR

Each sensor has a unique ID. The one at TUK is 93.

## Sensor Types

1. SDS011 (The one at TUK)

   - Manufactured by Nova Fiteness
   - Has 1 pin
   - Measures:
     - P2
     - P1

2. DHT22

   - Manufactured by Ada Fruit
   - Has 7 pins
   - Measures:
     - humidity
     - temperature

3. MQ-7

   - Manufactured by HANWEI ELECTRONICS
   - Has 9 pins
   - Measures:
     - hdop

4. PPD42NS

   - Manufactured by SHINYEI
   - Has 5 pins
   - Measures:
     - ratioP2
     - durP2
     - P2
     - ratioP1
     - durP1
     - P1

5. DHT11

   - Manufactured by Adafruit
   - Has 8 pins
   - Measures:
     - temperature
     - humidity

Each sensor shows a `latitude` and `longitude` of where it is mounted.

## Deployment

To deploy the app directly to Github Pages, run:

```
npm run deploy
```

The site will be available at https://antosan.github.io/feinstaub/
