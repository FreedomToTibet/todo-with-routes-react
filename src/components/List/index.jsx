import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';
import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

/* eslint-disable react/prop-types */
const List = ({
	items, 
	isRemovable, 
	onClick, 
	onRemove, 
	onClickItem, 
	activeItem
}) => {
  const removeList = (item) => {
    if (window.confirm('Are you sure you want to delete the list?')) {
      axios.delete('https://todo-with-routes-react-kn08jb73r-andrews-projects-f74b8ff5.vercel.app/api/lists' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active ? item.active : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.filter(task => task.completed === false).length}/${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
