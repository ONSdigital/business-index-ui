import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import configureStore from 'redux-mock-store';
import LoginErrorMessage from '../../src/components/LoginErrorMessage';

const mockStore = configureStore();

describe('<LoginErrorMessage />', () => {
  const initialState = { login: { errorMessage: "General error." }};
  const mockStore = configureStore();
  let store,container;

  beforeEach(() => {
    jasmineEnzyme();
  });

  it('renders the correct error message from props', () => {
    store = mockStore(initialState);
    container = shallow(<LoginErrorMessage store={store} /> );
    expect(container.prop('errorMessage')).to.equal(initialState.login.errorMessage);
  });
});
