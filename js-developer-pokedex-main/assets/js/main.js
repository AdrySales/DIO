const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let pokemon;
let contador=0;
function convertPokemonToLi(pokemon) {
   
    return `
        <li class="pokemon ${pokemon.type} trigger" onclick="showModal('${pokemon.name}','${pokemon.type}','${pokemon.number}','${pokemon.types}','${pokemon.height}','${pokemon.weight}','${pokemon.stats}','${pokemon.abilities}','${pokemon.photo}')" >
      
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        
    `
   
}



//____________________________________________Desafio_________________________________________________________//

   function showModal(name,tipo,number,types,height,weight,stats,abilities,photo) {
        var element = document.getElementById("modal");
        element.classList.add("show-modal");
        
        document.getElementById("modal").innerHTML=`
        
        <div class="modal-content  ${tipo} ">

            <div class="card1"> 

                <span class="close-button" onclick="closeModal()">
                    &times;
                </span>
             

                <table width="100%" >
                <tr>

                <td width="50%" >
                <h2 id="name"></h2>
                <text class="tipo" id="type"></text>
                </td>
               
                <td width="50%">
                <h4 id="number"></h4>
                </td>

               </tr>
                </table>
               
            </div>
            <section>
            <div id="photo"></div>
        <div class="informacoes">
     
  <br>
            <table>
            <tr><td><strong>Sobre</strong></td></tr>
        
            <tr><td>Altura</td><td class="cinza" id="height"></td></tr>
            <tr><td>Largura</td><td class="cinza" id="weight"></td></tr>
            <tr><td>Abilidades</td><td class="cinza" id="abilities"></td></tr>
            <tr><td>&nbsp;</td></tr>
            
            <tr><td><strong>Status</strong></td></tr>
            
            <tr><td>HP</td><td class="cinza"  id="hp"></td>                            <td class="espaco"> _________</td>      <td>Ataque</td> <td class="espaco">___</td><td class="cinza" id="ataque"></td></tr>
            <tr><td>Defesa</td> <td class="cinza"  id="defesa"></td>                    <td class="espaco">_________</td>      <td>Ataque especial</td> <td class="espaco">___</td><td class="cinza" id="ataqueEspecial"></td></tr>
            <tr><td>Defesa Especial</td> <td class="cinza"  id="defesaEspecial"></td>   <td class="espaco">_________</td>      <td>Rapidez</td> <td class="espaco">___</td><td class="cinza"  id="speed"></td></tr>
           
        </table>



        </div>
       
      
    </div>
    </section>
        `
        console.log(photo)
        document.getElementById("photo").innerHTML=`<img class="foto" src="${photo}" >`
        document.getElementById("name").innerHTML=`${name}`
        document.getElementById("number").innerHTML=`#${number}`
        document.getElementById("type").innerHTML=`${types}`
        document.getElementById("height").innerHTML=`${height}`
        document.getElementById("weight").innerHTML=`${weight}`

        document.getElementById("hp").innerHTML=`#${stats[0]}`
        document.getElementById("ataque").innerHTML=`#${stats[1]}`
        document.getElementById("defesa").innerHTML=`#${stats[2]}`
        document.getElementById("ataqueEspecial").innerHTML=`#${stats[3]}`
        document.getElementById("defesaEspecial").innerHTML=`#${stats[4]}`
        document.getElementById("speed").innerHTML=`#${stats[5]}`

        document.getElementById("abilities").innerHTML=`${abilities}`

    }
    

    function closeModal() {
        var element = document.getElementById("modal");
        element.classList.remove("show-modal");
    }


    

//______________________________________________________________________________________________________________//

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
     
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})