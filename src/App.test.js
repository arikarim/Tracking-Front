import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from './components/App';
import createTestStore from './Reducers/index';

describe('Snapshots', () => {
  let store;
  beforeEach(() => {
    store = createTestStore;
  });

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const linkElement = screen.getByText('Track.it');
    expect(linkElement).toBeInTheDocument();
  });

  test('should match with snapshot', () => {
    const jsx = (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const tree = (() => renderer.create(jsx).toJSON());
    expect(tree).toMatchSnapshot();
  });
});
