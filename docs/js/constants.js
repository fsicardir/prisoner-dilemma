// Game constants
export const MAX_ROUNDS = 10;

// Score matrix for the prisoner's dilemma
export const SCORE_MATRIX = {
    'cooperar': {
        'cooperar': [3, 3], // Both cooperate: 3 points each
        'traicionar': [0, 5] // Player cooperates, opponent betrays: 0 for player, 5 for opponent
    },
    'traicionar': {
        'cooperar': [5, 0], // Player betrays, opponent cooperates: 5 for player, 0 for opponent
        'traicionar': [1, 1]  // Both betray: 1 point each
    }
};

// IRI Questions
export const IRI_QUESTIONS = [
    "Sueño y fantaseo, bastante seguido, acerca de las cosas que me podrían suceder.",
    "Me preocupa y conmueve la gente con menos suerte que yo.",
    "Encuentro difícil ver las cosas desde el punto de vista de otra persona.",
    "No me preocupan los problemas de los demás.",
    "Me identifico con los personajes de una novela.",
    "En situaciones de riesgo, tengo miedo.",
    "No me involucro con los personajes de películas u obras de teatro.",
    "Cuando tengo que decidir algo escucho diferentes opiniones.",
    "Cuando veo que le toman el pelo a alguien tiendo a protegerlo.",
    "Me siento vulnerable (no sé qué hacer) frente a una situación muy emotiva.",
    "Intento comprender mejor a mis amigos/as imaginándome cómo ven ellos/as las cosas (poniéndome en su lugar).",
    "Me es difícil entusiasmarme con un buen libro o película.",
    "Cuando veo a alguien lastimado, tiendo a estar calmado.",
    "Las desgracias (dolor) de otros no me molestan mucho.",
    "Si estoy seguro/a que tengo la razón en algo no pierdo tiempo escuchando los argumentos de los demás.",
    "Después de ver una obra de teatro o cine me he sentido como si fuera uno de los personajes.",
    "Cuando estoy en una situación emocionalmente tensa me asusto.",
    "Cuando veo que alguien está siendo tratado injustamente, no siento ninguna compasión por él/ella.",
    "Normalmente soy bastante eficaz (sé que hacer) en situaciones difíciles.",
    "Estoy bastante afectado emocionalmente por las cosas que veo que ocurren alrededor.",
    "Me describiría como una persona bastante sensible.",
    "Cuando veo una buena película puedo ponerme en el lugar del/de la protagonista muy fácilmente.",
    "Tiendo a perder el control frente a situaciones difíciles.",
    "Cuando estoy disgustado con alguien, intento ponerme en su lugar por un momento.",
    "Cuando estoy leyendo una historia interesante o una novela imagino cómo me sentiría si los acontecimientos de la historia me sucedieran a mí.",
    "Cuando veo a alguien que necesita urgentemente ayuda en una emergencia no sé qué hacer.",
    "Antes de criticar a alguien intento imaginar cómo me sentiría si estuviera en su lugar.",
    "Pienso que hay dos partes (diferentes puntos de vista) para cada situación e intento tenerlas en cuenta"
];

// MDMQ Questions
export const MDMQ_QUESTIONS = [
    "Me siento como si estuviera bajo una tremenda presión de tiempo cuando tomo decisiones.",
    "Me gusta considerar todas las alternativas.",
    "Prefiero dejarles a otros tomar las decisiones.",
    "Intento encontrar las desventajas de cada alternativa.",
    "Pierdo tiempo en cuestiones de poca importancia antes de llegar a una decisión final.",
    "Tomo en consideración cuál sería la mejor manera de llevar a cabo una decisión.",
    "Incluso después de haber tomado una decisión, retraso ponerla en práctica.",
    "Cuando tomo decisiones me gusta reunir grandes cantidades de información.",
    "Evito tomar decisiones.",
    "Cuando tengo que tomar una decisión, espero mucho tiempo antes de empezar a pensar en ello.",
    "No me gusta asumir la responsabilidad de tomar decisiones.",
    "Intento ser claro/a en mis objetivos antes de elegir.",
    "La posibilidad de que alguna cosa de poca importancia salga mal genera que cambien abruptamente mis prioridades.",
    "Si una decisión podemos tomarla otra persona o yo, dejo a la otra persona que la tome.",
    "Siempre que afronto una decisión difícil, me siento pesimista respecto a poder encontrar una buena solución.",
    "Tomo muchas precauciones antes de elegir.",
    "No tomo decisiones a menos que no tenga más remedio.",
    "Retraso tomar decisiones hasta que es demasiado tarde.",
    "Prefiero que las personas que están mejor informadas decidan por mí.",
    "Después de tomar una decisión, pierdo gran cantidad de tiempo en convencerme de que fue la decisión correcta.",
    "Aplazo tomar decisiones.",
    "No puedo pensar correctamente si tengo que tomar decisiones apresuradas."
];

// Scale options for IRI
export const IRI_SCALE_OPTIONS = [
    "1. No me describe bien",
    "2. Me describe un poco",
    "3. Me describe bastante bien",
    "4. Me describe bien",
    "5. Me describe muy bien"
];

// Scale options for MDMQ
export const MDMQ_SCALE_OPTIONS = [
    "1. Es cierto para mí",
    "2. Algunas veces es cierto para mí",
    "3. No es cierto para mí"
]; 