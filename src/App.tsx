/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { TodoItem } from './Components/TodoItem';
import { TodoHeader } from './Components/TodoHeader';
import { TodoFooter } from './Components/TodoFooter';
import { ErrorNotification } from './Components/ErrorNotification';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.Empty);

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        if (filterStatus === Filter.All) {
          return true;
        }

        return filterStatus === Filter.Completed
          ? todo.completed
          : !todo.completed;
      }),
    [todos, filterStatus],
  );

  const todosLeft = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err) {
        setErrorMessage(ErrorType.LoadTodos);
      }
    })();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <TodoFooter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              todosLeft={todosLeft}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification error={errorMessage} setError={setErrorMessage} />
      )}
    </div>
  );
};
