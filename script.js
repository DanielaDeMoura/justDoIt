document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        if (taskText !== '') {
            addTask(taskText, dueDate);
            taskInput.value = '';
            dueDateInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('edit')) {
            const li = e.target.parentElement;
            const input = li.querySelector('input[type="text"]');
            const dueDateSpan = li.querySelector('.due-date');
            if (input.disabled) {
                input.disabled = false;
                e.target.textContent = 'Save';
                dueDateSpan.style.display = 'none';
                const dueDateInput = document.createElement('input');
                dueDateInput.type = 'datetime-local';
                dueDateInput.value = dueDateSpan.getAttribute('data-due-date');
                dueDateInput.classList.add('due-date-input');
                li.insertBefore(dueDateInput, dueDateSpan);
                dueDateSpan.remove();
            } else {
                input.disabled = true;
                e.target.textContent = 'Edit';
                const dueDateInput = li.querySelector('.due-date-input');
                const newDueDateSpan = document.createElement('span');
                newDueDateSpan.classList.add('due-date');
                newDueDateSpan.setAttribute('data-due-date', dueDateInput.value);
                newDueDateSpan.textContent = `Due: ${dueDateInput.value ? new Date(dueDateInput.value).toLocaleString() : 'No due date'}`;
                li.insertBefore(newDueDateSpan, dueDateInput);
                dueDateInput.remove();
            }
        }
    });

    function addTask(taskText, dueDate) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskText;
        input.disabled = true;

        const dueDateSpan = document.createElement('span');
        dueDateSpan.classList.add('due-date');
        dueDateSpan.setAttribute('data-due-date', dueDate);
        dueDateSpan.textContent = dueDate ? `Due: ${new Date(dueDate).toLocaleString()}` : 'No due date';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');

        li.appendChild(input);
        li.appendChild(dueDateSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});
