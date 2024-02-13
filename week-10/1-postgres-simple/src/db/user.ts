import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const createQuery = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3);`;
    const values = [username, password, name];
     try {
        const res = await client.query(createQuery, values);
        //const {username, password, name} = res.rows[0];
        //return {username, password, name};
     } catch (error) {
        console.error('Error', error);

     }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const getQuery = `SELECT * FROM users WHERE id=$1;`;
    const values = [userId];
     try {
        const res = await client.query(getQuery, values);
        const {username, password, name, id} = res.rows[0];
        return {username, password, name, id}
     } catch (error) {
        console.error('Error', error);
     }
}
