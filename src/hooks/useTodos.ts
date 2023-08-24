import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";
import { ITodo } from '../app.interface';
import {AxiosResponse} from 'axios'

const data: AxiosResponse<ITodo[], any> = {
  data: [
    {
      id: 1,
      completed: false,
      title: "Learn React",
      userId: 1
    }
  ]
}

export const useTodos = () => {
  return useQuery(["todos"], () => todoService.getByAll(), {
    select: ({ data }) => data,
    onSuccess(data) {
      console.log('Get data')
    },
    onError(err) {
      console.log({ err })
    },
    initialData() {
      return data
    }
  }
  );


  // const todoId = 1
  // return useQuery(["todos", todoId], () => todoService.getById(todoId.toString()), {
  //   select: ({ data }) => data,
  //   enabled: !!todoId
  // }
  // );
}