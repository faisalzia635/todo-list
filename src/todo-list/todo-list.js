import { useState } from 'react';
import styles from './todo-list.module.css';

const formatDate = (date) => new Date(date).toLocaleDateString();

function TodoList() {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        const taskText = newTask.trim();

        if (!taskText) return;

        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString(),
            },
        ]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks((currentTasks) => currentTasks.map((task) => (
            task.id === id ? { ...task, completed: !task.completed } : task
        )));
    };

    const deleteTask = (id) => {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1>Create your Daily Do-List</h1>
                <h5>Add your tasks for the day! ✏️</h5>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Add your task here..."
                        className={styles.input}
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') addTask();
                        }}
                    />
                    <button className={styles.addButton} type="button" onClick={addTask}>Add</button>
                </div>
                <ul className={styles.taskList}>
                    {tasks.map((task) => (
                        <li className={styles.taskItem} key={task.id}>
                            <label className={styles.taskLabel}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className={styles.taskDetails}>
                                    <span className={task.completed ? styles.completed : ''}>
                                        {task.text}
                                    </span>
                                    <small className={styles.taskDate}>
                                        {formatDate(task.createdAt)}
                                    </small>
                                </span>
                            </label>
                            <button
                                className={styles.deleteButton}
                                type="button"
                                aria-label={`Delete ${task.text}`}
                                onClick={() => deleteTask(task.id)}
                            >
                                🗑
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default TodoList;