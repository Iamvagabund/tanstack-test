import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTodos } from "./hooks/useTodos";
import { SyntheticEvent, useState } from "react";
import todoService from "./services/todo.service";

function App() {
  const { isLoading, data, refetch } = useTodos();

  const countFetching = useIsFetching()

  const {} = useMutation(["refresh"], () => {}, {
    onSuccess() {
      refetch();
    },
  });

  const queryClient = useQueryClient();

  
  const [title, setTitle] = useState("");

  const {mutate} = useMutation(['create todo'], (title: string) => todoService.create(title), {
    async onSuccess() {
      setTitle('')
      alert('Todo created')
      await refetch()
    }
  })

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    mutate(title)
  };

  return (
    <div>
      <button onClick={() => refetch()}>Refresh by refetch</button>

      <button onClick={() => queryClient.invalidateQueries(["todos"])}>
        Refresh by useQueryClient
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div className="form">
          {!!countFetching && <h3>Loading...</h3>}
          <h3>Count fetching: {countFetching}</h3>
          <h2>Create TODO</h2>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Enter Todo"
              />
              <br />
              <br />
              <button>Create</button>
            </div>
          </form>
        </div>
        <div>
          <h1>TODOS</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : data?.length ? (
            data.map((todo) => (
              <div key={todo.id}>
                <b>{todo.id}</b>- {todo.title}
              </div>
            ))
          ) : (
            <h1>Data not found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export { App };
