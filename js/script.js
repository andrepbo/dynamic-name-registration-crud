window.addEventListener('load', start);

var globalNames = ['Andre', 'Jose', 'Maria'];
var isEditing = false;
var currentIndex = null;

function start() {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  handleInputName();
  render();
};

const preventFormSubmit = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
};

const handleInputName = () => {
  const handleTyping = (event) => {
    newName = event.target.value;
    if (event.key === 'Enter' && newName !== '') {
      if (isEditing) {
        globalNames[currentIndex] = newName;
      } else {
        globalNames.push(newName);
      }
      isEditing = false;
      render();
      clearInput();
    };
  };

  inputName.addEventListener('keyup', handleTyping)
  inputName.focus();
};

const render = () => {
  const createDeleteButton = (index) => {
    const deleteName = () => {
      globalNames.splice(index, 1);
      render();
    };

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'remove';
    button.addEventListener('click', deleteName);

    return button;
  };

  const createSpan = (name, index) => {
    const editName = () => {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    };

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editName);

    return span;
  };

  var divName = document.querySelector('#names');
  divName.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  };

  divName.appendChild(ul);
};

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}