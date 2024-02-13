import { client } from "..";
export interface Todo  {title: string, description: string, done: boolean, id: number, user_id: number};

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const createQuery = `INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *;`;
    //console.log(userId, title, description);

    const values = [userId, title, description];
    try {
        const res = await client.query(createQuery, values);

        if (res) {
            //console.log('create',res.rows[0]);
            const { id, title, description, done } = res.rows[0];
            return { title, description, done, id };
        }
    } catch (error) {
        console.error('Error', error);
    }
    return undefined; // Add a return statement at the end of the function
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const updateQuery = `UPDATE todos SET done=true WHERE id=$1 RETURNING *;`;
    const values = [todoId];
    try {
        const res = await client.query(updateQuery, values);
        if (res) {
            //console.log('update',res.rows[0]);
            const { id, title, description, done } = res.rows[0];
            return { title, description, done, id };
        }
    } catch (error) {
        console.error('Error', error);
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const getQuery = `SELECT * FROM todos WHERE user_id = $1;`;
    const values = [userId];
    try {
        const res = await client.query(getQuery, values);
        //console.log('res', res);

        const todos = res.rows.map((todo: Todo) => ({
            title: todo.title,
            description: todo.description,
            done: todo.done,
            id: todo.id,
            user_id: todo.user_id
        }));
        console.log('todos', todos);

        return todos;
    } catch (error) {

    }
}