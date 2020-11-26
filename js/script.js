window.addEventListener('load', start);

var globalNames = ['Ricardo', 'Márcia', 'Maria Cecília'];

var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
    inputName = document.querySelector('#inputName');

    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit() {
    
    function handleFormSubmit(event) {
        
        //evita o request da página
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {

    function insertName(newName) {
        
        globalNames.push(newName);
        
        //render();
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName;

        //render();
    }

    function handleTyping(event) {

        var hasText = !!event.target.value && event.target.value.trim() !== '';
        console.log(hasText);
        //Se não tiver algo digitado não continua
        if(!hasText){

            clearInput();

            return;
        }

        //Se a tecla digitada for o Enter do teclado
        if(event.key === 'Enter' && event.target.value.trim() !== ''){

            //Se verdadeiro faz a edição
            if(isEditing){
                updateName(event.target.value);
            }
            else{
                insertName(event.target.value);
            }

            render();

            isEditing = false;

            clearInput();
        }
    }

    inputName.addEventListener('keyup', handleTyping);    
    inputName.focus();
}

function render() {

    function createDeleteButton(index) {

        function deleteName() {
            
            //remove um item do array
            globalNames.splice(index, 1);

            render();
        }

        var button = document.createElement('button');
        
        button.classList.add('deleteButton');
        button.textContent = 'x';

        button.addEventListener('click', deleteName);

        return button;
    }

    function createSpan(name, index) {

        function editItem() {

            inputName.value = name;
            inputName.focus();

            isEditing = true;

            currentIndex = index;
        }

        var span = document.createElement('span');
        
        span.classList.add('clickable');

        span.textContent = name;

        span.addEventListener('click', editItem);

        return span;
    }
    
    var divNames = document.querySelector('#names');

    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for(var i = 0; i < globalNames.length; i++) {

        var currentName = globalNames[i];

        var li = document.createElement('li');

        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}
