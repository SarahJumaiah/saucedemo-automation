// password is in .env
const password = process.env.SAUCE_PASSWORD || '';

export const standardUser = {
  username: 'standard_user',
  password: password,
};

export const lockedOutUser = {
  username: 'locked_out_user',
  password: password,
};

// for the data driven login test
export const invalidLogins = [
  {
    name: 'locked out user',
    username: 'locked_out_user',
    password: password,
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'unknown user',
    username: 'unknown_user',
    password: password,
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'empty username',
    username: '',
    password: password,
    error: 'Epic sadface: Username is required',
  },
  {
    name: 'empty password',
    username: 'standard_user',
    password: '',
    error: 'Epic sadface: Password is required',
  },
];
