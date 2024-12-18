import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filterStatus: Filter;
  setFilterStatus: Dispatch<SetStateAction<Filter>>;
  todosLeft: number;
};

export const TodoFooter: React.FC<Props> = props => {
  const { filterStatus, setFilterStatus, todosLeft } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            key={value}
            href={`#/${value === Filter.All ? '' : value.toLowerCase()}`}
            className={cn('filter__link', {
              selected: filterStatus === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => setFilterStatus(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
