# El Dilema del Prisionero

Un juego interactivo basado en el clásico "Dilema del Prisionero" de la teoría de juegos, implementado con HTML, CSS y JavaScript.

## Reglas del Juego

1. El juego consta de 6 rondas.
2. En cada ronda, el jugador puede elegir entre **Cooperar** o **Traicionar**.
3. En la primera ronda, el adversario (controlado por el programa) siempre cooperará.
4. En las siguientes rondas, el adversario copiará la acción realizada por el jugador en la ronda anterior.
5. Los puntos se otorgan según la matriz de puntuación del dilema del prisionero:
   - Ambos cooperan: 3 puntos cada uno
   - Ambos traicionan: 1 punto cada uno
   - Uno coopera y el otro traiciona: 0 puntos para el que coopera, 5 puntos para el que traiciona
6. Al final de las 6 rondas, se mostrará quién ganó según la puntuación acumulada.

## Puntuación

La matriz de puntuación refleja el clásico dilema:
- Si ambos cooperan, ambos obtienen una recompensa moderada (3 puntos)
- Si ambos traicionan, ambos obtienen un castigo leve (1 punto)
- Si uno coopera y el otro traiciona, el que coopera no recibe nada (0 puntos) y el que traiciona obtiene la máxima recompensa (5 puntos)

## Ejecución del Juego

Para jugar, simplemente:

1. Abre el archivo `index.html` en tu navegador web.
2. Haz click en "Cooperar" o "Traicionar" para cada ronda.
3. Observa el historial de decisiones y la puntuación acumulada en la tabla.
4. Al finalizar las 6 rondas, se mostrará el resultado final del juego.
5. Puedes volver a jugar haciendo click en "Jugar de nuevo".

## Estrategia

Este juego ilustra conceptos fundamentales de la teoría de juegos y la cooperación. Dado que el adversario copia tu movimiento anterior, ¿cuál será tu estrategia?

¿Cooperarás para obtener beneficios mutuos a largo plazo, o traicionarás para maximizar tu ganancia individual?

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript 