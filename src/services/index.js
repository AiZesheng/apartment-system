import axios from 'axios';
const host = 'http://localhost/aaa';
export async function getAll () {
  return await axios.get(`${host}/aaa.php`);
}
// export async function getById () {
// 	return await axios.get(`${host}/getById.php`);
// }