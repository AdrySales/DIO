
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id  
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default



    //________________________________________________________________________//
    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const [abilitie] = abilities
    pokemon.abilities = abilities
    pokemon.abilitie = abilitie

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)
    const [stat] = stats
    pokemon.stats = stats


    pokemon.height = (pokeDetail.height * 0.1).toFixed(1)
    pokemon.weight = (pokeDetail.weight * 0.1).toFixed(1)
    //_______________________________________________________________________//



    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
