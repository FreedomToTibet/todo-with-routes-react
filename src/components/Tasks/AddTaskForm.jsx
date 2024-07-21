import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

/* eslint-disable react/prop-types */
const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

	const inputRef = useRef(null);

	useEffect(() => {
		if (visibleForm) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	}, [visibleForm]);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios
      .post('https://todo-with-routes-react.vercel.app/api/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch((e) => {
        alert('Error adding task!');
				console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>New task</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
						ref={inputRef}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Task name"
            onChange={e => setInputValue(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter' && !isLoading) {
								addTask();
							} else if (e.key === 'Escape' && !isLoading) {
								toggleFormVisible();
							}
						}}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Adding...' : 'Add task'}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;