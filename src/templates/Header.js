import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Header } from 'registers-react-library';
import { logout } from '../actions/LoginActions';

const HeaderTemplate = (props) => {
  return (
    <Header
      showHeaderItems={props.data.loggedIn}
      headerLinks={[
        { text: 'User Details', link: '/UserDetails' },
        { text: 'Information', link: '/TechnicalInformation' },
      ]}
      imageUrl="/Home"
    >
      <Button
        id="logoutButton"
        size="thin"
        text="Logout"
        onClick={!props.data.currentlySending ? () => props.dispatch(logout()) : null}
        ariaLabel="Logout Button"
        type="submit"
        loading={props.data.currentlySending}
      />
    </Header>
  );
};

HeaderTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.login,
  };
}

export default connect(select)(HeaderTemplate);
