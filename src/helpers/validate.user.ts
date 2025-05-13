import { CreateUserData } from "../users/users";

export const validateBody = (user: CreateUserData) => {
  let errors = [];

  if (!user.username) {
    errors.push('Username is required.');
  } else if (typeof user.username !== 'string') {
    errors.push('Username should be a string type.');
  }
  if (!user.age) {
    errors.push('Age is required.');
  } else if (typeof user.age !== 'number') {
    errors.push('Age should be a number type.');
  }
  if (!user.hobbies) {
    errors.push('Hobbies are required.');
  } else if (!Array.isArray(user.hobbies) || user.hobbies.some((hobby: unknown) => typeof hobby !== 'string')) {
    errors.push('Hobbies should be an array of strings or an empty array.');
  }
  return errors;
}