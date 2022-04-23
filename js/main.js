'use strict';
const switchTheme = document.getElementById('icon-theme');
const body = document.getElementById('body');
let checkBox = document.querySelectorAll('.check-task');

let filterAll = document.getElementById('filter-all');
let filterActive = document.getElementById('filter-active');
let filterComplete = document.getElementById('filter-complete');
let clearCompleted = document.getElementById('clear-completed');

let cross = document.querySelectorAll('.remove-task')

let task = document.querySelectorAll('.task');

let leftItems = document.getElementById('items-left')

let removeTask = []

const input = document.getElementById('input');

let taskContainer = document.getElementById('task-container');

let arrayFilter = [filterAll, filterActive, filterComplete];

let activeClicked = false;
let completeClicked = false;

let tasksArray = []
let checksArray = []
let allTasks = taskContainer.children


let taskCount = tasksArray.length

for (let i = 0; i < allTasks.length; i++) {
    tasksArray.push(allTasks[i]);
}

for (let c = 0; c < tasksArray.length; c++) {
    checksArray.push(tasksArray[c].firstElementChild)
    removeTask.push(cross[c])
}

//Remove task by clicking the cross.
for (let z = 0; z < removeTask.length; z++) {
    removeTask[z].addEventListener('click', () => {
        removeTask[z].parentElement.remove()
        leftItems.textContent = `${taskContainer.children.length}  items left`
    })
}

//Add new tasks
input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && input.value != '' && input.value != undefined && input.value != null) {
        addNewTask(input.value)
        input.value = ''
        leftItems.textContent = `${taskContainer.children.length}  items left`
    }
})

let addNewTask = (text) => {

    let newTask = task[0].cloneNode(true)

    newTask.children[1].firstElementChild.textContent = text
    newTask.children[1].firstElementChild.classList.remove('text-canceled')

    newTask.children[2].addEventListener('click', () => {
        newTask.remove()
        leftItems.textContent = `${taskContainer.children.length}  items left`
    })

    removeTask.push(newTask.children[2])
    addClick(newTask);
    tasksArray.push(newTask)
    let lastItem = tasksArray.length - 1
    checksArray.push(newTask.firstElementChild)
    newTask.firstElementChild.classList.remove('remove')
    newTask.firstElementChild.classList.add('invisible')
    taskContainer.append(tasksArray[lastItem]);

}
//Add click events to new elements
let addClick = (x) => {
    x.firstElementChild.addEventListener('click', () => {


        x.firstElementChild.classList.toggle('invisible');
        x.firstElementChild.classList.toggle('remove');

        if (x.firstElementChild.classList.contains('remove')) {
            x.firstElementChild.nextElementSibling.firstElementChild.classList.add('text-canceled');

        } else {
            x.firstElementChild.nextElementSibling.firstElementChild.classList.remove('text-canceled');

        }
        //If active filter is clicked then i remove the clicked task.
        if (activeClicked) {
            x.style.display = 'none';
        } else if (completeClicked) {
            x.style.display = 'none';
        }
    })
}

//Switch theme color.
switchTheme.addEventListener('click', () => {
    body.classList.toggle('light');
})

//Switch checkbox 
checksArray.forEach((n, i) => {
    checksArray[i].addEventListener('click', () => {

        checksArray[i].classList.toggle('invisible');
        checksArray[i].classList.toggle('remove');

        if (checksArray[i].classList.contains('remove')) {
            checksArray[i].nextElementSibling.firstElementChild.classList.add('text-canceled')
        } else {
            checksArray[i].nextElementSibling.firstElementChild.classList.remove('text-canceled')

        }
        //If active filter is clicked then i remove the clicked task.
        if (activeClicked) {
            tasksArray[i].style.display = 'none';
        } else if (completeClicked) {
            tasksArray[i].style.display = 'none';
        }

    })
})

//Task filter
arrayFilter.forEach((x, i) => {
    //Add click event to each filter
    arrayFilter[i].addEventListener('click', () => {


        //Remove blue color to each filter in order to add color just to the clicked one.
        for (let x of arrayFilter) {
            x.classList.remove('blue-hover');
        }
        arrayFilter[i].classList.add('blue-hover');
    })

})

//Show all tasks if 'all' filter is clicked
filterAll.addEventListener('click', () => {
    tasksArray.forEach((n, i) => {
        tasksArray[i].style.display = 'flex';
    })
    activeClicked = false;
    completeClicked = false;
})

//If a task is actived i'll show it, else, i'll remove it.

filterActive.addEventListener('click', () => {
    activeClicked = true;
    completeClicked = false;

    tasksArray.forEach((f, i) => {
        if (checksArray[i].classList.contains('remove')) {
            tasksArray[i].style.display = 'none';
        } else {
            tasksArray[i].style.display = 'flex';

        }
    })
})

//If a task is completed i'll show it, else, i'll remove it.
filterComplete.addEventListener('click', () => {
    completeClicked = true;

    tasksArray.forEach((a, i) => {

        if (checksArray[i].classList.contains('remove')) {
            tasksArray[i].style.display = 'flex';
        } else {
            tasksArray[i].style.display = 'none';
        }
    })

})

//Clear completed tasks
clearCompleted.addEventListener('click', () => {

    tasksArray.forEach((q, i) => {

        if (checksArray[i].classList.contains('remove')) {
            tasksArray[i].remove();

        }
    })
    leftItems.textContent = `${taskContainer.children.length}  items left`

})