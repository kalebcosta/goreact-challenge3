import React, { Component, Fragment } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { Creators as UserActions } from '../store/ducks/users';
import './Main.css';

import 'mapbox-gl/dist/mapbox-gl.css';

class Main extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -60.026222201993585,
      latitude: -3.072147722288018,
      zoom: 14
    },
    open: false,
    userInput: '',
    latitude: null,
    longitude: null
  };

  static propTypes = {
    userRequest: PropTypes.func.isRequired,
    users: PropTypes.shape({
      data: PropTypes.array
    }).isRequired
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  onCloseModal = e => {
    e.preventDefault();
    this.setState({ open: false, userInput: '' });
  };

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleAddUser = e => {
    e.preventDefault();
    this.setState({ open: false, userInput: '' });
    this.props.userRequest(
      this.state.userInput,
      this.state.latitude,
      this.state.longitude
    );
  };

  handleEnterAddUser = () => {
    this.setState({ open: false, userInput: '' });
    this.props.userRequest(
      this.state.userInput,
      this.state.latitude,
      this.state.longitude
    );
  };

  handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;
    this.setState({
      open: true,
      latitude,
      longitude
    });
  };

  render() {
    const { open, userInput } = this.state;

    return (
      <Fragment>
        <MapGL
          {...this.state.viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {this.props.users.data.map(user => (
            <Marker
              key={user.id}
              longitude={user.longitude}
              latitude={user.latitude}
              onClick={this.handleMapClick}
              offsetLeft={-20}
              offsetTop={-20}
              captureClick
            >
              <img
                alt={user.login}
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                  border: '5px solid #7159c1'
                }}
                src={user.avatar}
              />
            </Marker>
          ))}
        </MapGL>

        <Modal
          open={open}
          onClose={this.onCloseModal}
          classNames={{ modal: 'custom-modal', closeButton: 'custom-close' }}
          center
        >
          <div>
            <p>
              <strong>Adicionar novo usuário</strong>
            </p>
            <form className="form">
              <input
                type="text"
                className="user_input"
                placeholder="Usuário no Github"
                value={userInput}
                onChange={e => this.setState({ userInput: e.target.value })}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    this.handleEnterAddUser();
                  }
                }}
              />
              <div className="buttons">
                <button onClick={this.onCloseModal} className="btn_cancel">
                  Cancelar
                </button>
                <button onClick={this.handleAddUser} className="btn_save">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
