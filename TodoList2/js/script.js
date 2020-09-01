// Select the Elements

const add = document.querySelector('.add'),
    list = document.querySelector('.list'),
    toDoText = document.querySelector('.to-do-text'),
    dateOutput = document.querySelector('.date-output')

// Get the classes name

const CHECK = 'complete-selected',
    UNCHECK = 'complete',
    LINE_THROUGH = 'lineThrough'

// Arr toDo and id for elements of 'const item'

let LIST = [],
    id = 0

// Show data

const today = new Date(),
    options = { weekday: 'long', month: 'short', day: 'numeric' }

dateOutput.innerHTML = today.toLocaleDateString('en-US', options)

// get data from localeStorage

let data = JSON.parse(localStorage.getItem('todo'))

// if data isn't empty when get data from localStorage in LIST

if (data) {
    LIST = data
    loadItems(LIST)
    id = LIST.length
} else {
    LIST = []
    id = 0
}

// loadItems to the user's interface

function loadItems(array) {
    array.forEach(el => {
        addToDo(el.name, el.id, el.done, el.trash)
    })
}

// add toDo function

function addToDo(toDo, id, done, trash) {
    if (trash) return

    const DONE = done ? CHECK : UNCHECK,
        LINE = done ? LINE_THROUGH : ''

    const item = `
        <li class="item">
            <div class="${DONE}" job="complete" id="${id}"></div>
                <p class="text ${LINE}">${toDo}</p>
            <div class="delete" job="delete" id="${id}"></div>
        </li>
    `

    list.insertAdjacentHTML('beforeend', item)
}

// call addToListAndShow when enter key press or click on add button

document.addEventListener('keyup', e => {
    if (e.keyCode === 13 && toDoText.value != '' && toDoText.value != ' ') {
        addToListAndShow()
    }
})

add.addEventListener('click', e => {
    if (toDoText.value != '' && toDoText.value != ' ') {
        addToListAndShow()
    }
})

// add an items to the list and call addToDo 

function addToListAndShow() {
    const toDo = toDoText.value
    if (toDo.length <= 33) {


        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false,
        })

        addToDo(toDo, id, false, false)

        localStorage.setItem('todo', JSON.stringify(LIST))

        id++
        toDoText.value = ''
        toDoText.placeholder = 'Add a to-do'
    } else {
        toDoText.value = ''
        toDoText.placeholder = 'So match symbols'
}
}

// complete toDo

function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}

// delete toDo

function deleteToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

// call to complete or delete on event

list.addEventListener('click', e => {
    const eventClass = e.target.classList.value
    if (eventClass === 'complete' || eventClass === 'complete-selected' || eventClass === 'delete') {

        const element = e.target,
            elementJob = element.attributes.job.value

        if (elementJob === 'complete') {
            completeToDo(element)
        } else if (elementJob === 'delete') {
            deleteToDo(element)
        }
        localStorage.setItem('todo', JSON.stringify(LIST))
    }

})