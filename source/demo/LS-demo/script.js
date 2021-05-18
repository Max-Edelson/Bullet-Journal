import LocalStorage from './LocalStorage.js';

const storage = new LocalStorage(); // create, update, and delete tasks using this instance

const tasks = storage.tasks; // get list of tasks

const container = document.querySelector('.tasks');
const template = document.querySelector('#task');

const createTaskForm = document.querySelector('.create-task');
const createTaskField = document.querySelector('.create-task__textarea');
const createTaskButton = document.querySelector('.create-task__submit');

// iterate over tasks list with onCreateTask method
tasks.forEach((data) => {
    onCreateTask({data});
});

// check for input
createTaskField.addEventListener('input', () => {
    // if input, create button is enabled
    createTaskButton.disabled = !createTaskField.value;
});

// event listener for create button
createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = createTaskField.value;

    // if there is input value, set data
    if (value) {
        // data has 2 attributes: value, checked
        const data = {
        value,
        checked: false
        };

        storage.create(data); // create new task
        onCreateTask({data});
        createTaskForm.reset(); // reset form
    }
});

// method gets called when create button is clicked 
// updates and removes task items
function onCreateTask({data}) {
    const clone = template.content.cloneNode(true);

    const task = clone.querySelector('.task');
    const checkbox = clone.querySelector('.task__checkbox');
    const title = clone.querySelector('.task__text');
    const del = clone.querySelector('.task__delete');

    // set task title to input value
    title.innerHTML = data.value;
    // set checkbox to boolean based on data 
    checkbox.checked = data.checked;

    // call toggle method
    toggleTaskStatusClass({checked: data.checked, task});

    // event listener for checkbox
    checkbox.addEventListener('input', () => {
        // set data.checked to true if checkbox is clicked
        data.checked = checkbox.checked;
        toggleTaskStatusClass({checked: data.checked, task});
        storage.update(data);
    });

    // event listener for item title
    // if input, set data.value to input value and update data
    title.addEventListener('input', () => {
        data.value = title.innerHTML;
        storage.update(data);
    });

    // event listener for delete button
    // removes task off html page 
    del.addEventListener('click', (e) => {
        storage.delete(data);
        task.remove();
    });

    // add task item to list container
    container.appendChild(clone);
}

// toggle method
// sets class attribute 'task--done' and strikes item title
function toggleTaskStatusClass({checked, task}) {
    task.classList[checked ? 'add' : 'remove']('task--done');
}
