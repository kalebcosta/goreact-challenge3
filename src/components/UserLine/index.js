import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as UserActions } from '../../store/ducks/users';
import 'font-awesome/css/font-awesome.min.css';
import './UserLine.css';

// import PropTypes from 'prop-types';

const UserLine = props => (
  <Fragment>
    {props.users.data.map(user => (
      <Fragment key={user.id}>
        <a
          className="repo_link"
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="main_line">
            <img src={user.avatar} alt={user.login} className="repo_logo" />
            <div className="repo_info">
              <div>
                <p className="repo_name">{user.name}</p>
              </div>
              <div className="repo_login">{user.login}</div>
            </div>
            <div className="control">
              <button
                className="btn_remove"
                onClick={e => {
                  e.preventDefault();
                  props.removeUser(user.id);
                }}
              >
                <i className="fa fa-times" />
              </button>
              <div className="arrow" />
            </div>
          </div>
          <hr className="separator" />
        </a>
      </Fragment>
    ))}
  </Fragment>
);

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLine);

UserLine.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.shape({
    data: PropTypes.array
  }).isRequired
};
