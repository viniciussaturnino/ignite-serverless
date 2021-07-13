import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
  id: string;
	user_id: string;
	title: string;
	done: false;
	deadline: Date;
}

export const handle = async (event) => {0
  const { user_id } = event.params;
  const { id, title, done, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName: 'todos',
    Item:{
      id,
      user_id,
      title,
      done,
      deadline,
    }
  }).promise();

  return {
    staturCode: 201,
    body: JSON.stringify({
      message: 'To-do Created!',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
