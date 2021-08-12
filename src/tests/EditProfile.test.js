import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import EditProfile from '../Pages/EditProfile';
import createTestStore from '../Reducers/index';

describe('Snapshots', () => {
  let store;
  beforeEach(() => {
    store = createTestStore;
  });

  test('should match with snapshot', () => {
    const jsx = (
      <Provider store={store}>
        <BrowserRouter>
          <EditProfile />
        </BrowserRouter>
      </Provider>
    );
    const tree = (() => renderer.create(jsx).toJSON());
    expect(tree).toMatchSnapshot();
  });
});