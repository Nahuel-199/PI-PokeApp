const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_NAME_POKE":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "POST_POKE":
      return {
        ...state,
      };
    case "DELETE_POKE":
      const eliminated = state.pokemons.filter(
        (el) => el.id !== action.payload.id
      );
      return {
        ...state,
        pokemons: eliminated,
      };
    case "FILTER_BY_TYPES":
        let pokemonsAllTypes = state.allPokemons;

        let pokesFiltrTypes = action.payload === 'All' ? pokemonsAllTypes : 
             pokemonsAllTypes.filter(el =>

            el.createdInDB ? el.types.map(el => el.name).includes(action.payload)
                :
                el.types.includes(action.payload))

        return {
            ...state,
            pokemons: pokesFiltrTypes
        }
    case "FILTER_CREATE":
      const filterCreated =
        action.payload === "Created"
          ? state.allPokemons.filter((el) => el.createdInDB === true)
          : state.allPokemons.filter((el) => !el.createdInDB);
      return {
        ...state,
        pokemons: filterCreated,
      };
    case "ORDER_BY_STRENGTH":
      const filterStrength =
        action.payload === "max"
          ? state.allPokemons.sort((a, b) => {
              if (a.attack < b.attack) {
                return 1;
              }
              if (b.attack < a.attack) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.allPokemons.sort((a, b) => {
              if (a.attack < b.attack) {
                return -1;
              }
              if (b.attack < a.attack) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        pokemons: filterStrength,
      };
    case "ORDER_BY_NAME":
      const filterName =
        action.payload === "asc"
          ? state.allPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.allPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        videogames: filterName,
      };
    default:
      return state;
  }
}
