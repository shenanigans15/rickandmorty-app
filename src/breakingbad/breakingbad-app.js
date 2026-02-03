
/**
 * @returns {Promise<Object>} single character
 */
const fetchCharacter = async(id) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const character = await res.json()
    return character
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RicknMortyApp = async(element) => {
    document.querySelector('#app-title').innerHTML = 'Rick & Morty App'
    element.innerHTML = 'Loading...'

    const charLabel = document.createElement('blockquote')
    const speLabel = document.createElement('h3')
    const nextCharButton = document.createElement('button')
    nextCharButton.innerText = 'Next Character'

    const renderChar = (char) => {
        charLabel.innerHTML = char.name
        speLabel.innerHTML = char.species
        element.replaceChildren(charLabel, speLabel, nextCharButton)
    }

    let currentCharId = 1

    const loadCharacter = async() => {
        element.innerHTML = 'Loading...'
        const character = await fetchCharacter(currentCharId)
        renderChar(character)
    }

    // primer render
    await loadCharacter()

    // botón next
    nextCharButton.addEventListener('click', async() => {
        currentCharId++
        await loadCharacter()
    })
}