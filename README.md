# PokéDex Explorer

App hecha con **Expo + React Native** que consume la [PokéAPI](https://pokeapi.co/). Lista Pokémon en una cuadrícula con scroll infinito, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos y estadísticas.

Taller: *Consumo de API con React Native y Expo — PokéDex*.
Equipo: Tamiro y Ximena.

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escanea el QR con **Expo Go**. El proyecto usa **Expo SDK 57**, así que Expo Go debe ser de esa misma versión. No requiere API key ni librerías HTTP: usa `fetch`.

## Árbol de carpetas y responsabilidad de cada archivo

```
pokedex-explorer/
├── App.js
├── index.js
├── app.json
├── package.json
└── src/
    ├── api/
    │   └── pokeApi.js
    ├── components/
    │   ├── ErrorView.js
    │   ├── LoadingView.js
    │   ├── PokemonCard.js
    │   ├── SearchBar.js
    │   ├── StatBar.js
    │   └── TypeBadge.js
    ├── screens/
    │   ├── ListScreen.js
    │   └── DetailScreen.js
    └── utils/
        └── format.js
```

| Archivo | Responsabilidad |
|---|---|
| `App.js` | Raíz de la app. Decide qué vista se muestra (lista o detalle) con `useState`, sin librería de navegación. Mantiene la lista montada para conservar el scroll y las páginas cargadas. Envuelve todo en `SafeAreaProvider` y `SafeAreaView`. |
| `index.js` | Punto de entrada de Expo (`registerRootComponent`). |
| `src/api/pokeApi.js` | **Capa de red.** Es el único archivo que usa `fetch`. Expone `getPokemonList` y `getPokemonDetail`, revisa `response.ok`, controla el 404 y devuelve datos ya limpios (id, altura en m, peso en kg, tipos, estadísticas, imagen). |
| `src/utils/format.js` | Funciones y constantes puras, sin React ni red: `formatId` (`#025`), `capitalize`, etiquetas de estadísticas en español y colores por tipo. |
| `src/screens/ListScreen.js` | Vista de lista: título, buscador, `FlatList` de 2 columnas y scroll infinito. Maneja los estados cargando, error y éxito. |
| `src/screens/DetailScreen.js` | Vista de ficha. Pide el Pokémon a la API y maneja los 4 estados: cargando, error con "Reintentar", sin resultados y éxito. |
| `src/components/PokemonCard.js` | Tarjeta de la cuadrícula: imagen, número y nombre. |
| `src/components/SearchBar.js` | `TextInput` con el botón "Buscar". |
| `src/components/LoadingView.js` | Estado cargando: indicador y texto. |
| `src/components/ErrorView.js` | Estado error: mensaje en español y botón "Reintentar". |
| `src/components/TypeBadge.js` | Distintivo de tipo con un color por tipo. |
| `src/components/StatBar.js` | Una estadística base: etiqueta, valor y barra proporcional (máximo 255). |

## Por qué organizamos así el proyecto

- **Red separada de la interfaz.** Todas las llamadas a la API están en `src/api/pokeApi.js`. Las pantallas y los componentes nunca llaman a `fetch`; solo reciben datos ya procesados. Así, si la API cambia, se modifica un solo archivo.
- **Pantallas y componentes.** Las *screens* tienen la lógica (estado, peticiones, qué se muestra). Los *components* son piezas visuales pequeñas y reutilizables que solo reciben props.
- **Helpers puros en `utils`.** Formatear números o nombres no depende de React, por eso vive aparte y es fácil de probar.
- **Navegación con `useState`.** Con solo dos vistas, un estado `view` en `App.js` es suficiente y cumple lo que pide el taller (plantilla blank, sin Expo Router).

## Decisiones técnicas importantes

- **Array de dependencias de `useEffect`.**
  - En `ListScreen`, `loadPage` está envuelto en `useCallback` con `[]`, así que su identidad nunca cambia y el efecto `[loadPage]` corre una sola vez, al montar.
  - En `DetailScreen`, el efecto depende de `[query, attempt]`: la petición solo se repite cuando cambia el Pokémon buscado o cuando el usuario toca "Reintentar" (que incrementa `attempt`). Así no se generan peticiones infinitas.
- **Candado contra páginas duplicadas.** `setState` es asíncrono, y `onEndReached` puede dispararse dos veces antes de que `loadingMore` cambie. Un `useRef` (`isFetching`) bloquea la segunda llamada de inmediato.
- **Cancelación al salir de la ficha.** El efecto de `DetailScreen` usa una bandera `cancelled` en su función de limpieza para no actualizar el estado si la pantalla ya cambió.
- **404 con texto plano.** La PokéAPI responde 404 con texto, no JSON. Por eso se revisa `response.status` y `response.ok` antes de `response.json()`.
- **Imagen de la lista sin pedir la ficha.** El id se extrae del final de la URL de cada resultado y se arma la URL del artwork oficial, evitando 20 peticiones extra.
- **Conversión de unidades.** La API entrega altura en decímetros y peso en hectogramos; se divide entre 10 para mostrar metros y kilogramos.

## Estados de la interfaz

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador de carga con texto |
| Error | Mensaje en español y botón "Reintentar" |
| Sin resultados | Mensaje cuando el nombre o número buscado no existe |
| Éxito | La lista o la ficha |

Al cargar más Pokémon (scroll infinito) se muestra un indicador al final de la lista. Si esa carga falla, el pie de la lista muestra el mensaje con su propio botón "Reintentar".

## Reglas de código

- Código en inglés; textos de la interfaz en español.
- Cada concepto visto en clase está marcado con un comentario `CONCEPT:`.
