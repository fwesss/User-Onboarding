import React from 'react';
import PropTypes from 'prop-types';


const UserList = ({ userList }) => (
  <section className="section">
    <div className="columns is-centered">
      {userList.map((user) => (
        <div className="column is-3" key={user.email}>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">{user.name}</p>
            </header>
            <div className="card-content">
              <p className="content">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

UserList.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  ).isRequired,
};

export default UserList;
