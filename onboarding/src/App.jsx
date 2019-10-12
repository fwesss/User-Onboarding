import React, { useState } from 'react';

import FormikLoginForm from './components/Form';
import UserList from './components/UserList';


const App = () => {
  const [userList, addUser] = useState([]);

  return (
    <>
      <UserList userList={userList} />
      <FormikLoginForm addUser={addUser} userList={userList} />
    </>
  );
};

export default App;
