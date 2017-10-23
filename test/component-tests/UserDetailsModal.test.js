import 'jsdom-global/register';
import React from 'react';
import UserDetailsModal from '../../src/components/UserDetailsModal';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

describe('<UserDetailsModal />', () => {
  it('renders the correct error message from props', () => {
    const wrapper = mount(
      <UserDetailsModal username="jonDoe123" role="admin" />
    );
    expect(wrapper.props().username).to.equal('jonDoe123');
    expect(wrapper.props().role).to.equal('admin');
  });

  it('renders the correct error message from props', () => {
    const wrapper = mount(
      <UserDetailsModal
        username="jonDoe123"
        userRole="admin"
      />
    );
    expect(wrapper.state().isShowingModal).to.equal(false);
    //wrapper.find('#userDetailsModal').simulate('click');
    //expect(wrapper.state().isShowingModal).to.equal(true);
  });
});
