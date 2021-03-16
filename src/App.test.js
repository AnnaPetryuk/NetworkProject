import { render, screen } from '@testing-library/react';
import SamuraiJsApp from './App';
import ReactDOM from 'react-dom'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('render without crashing', () => {
    const div = document.createElement('div');
    render(<SamuraiJsApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
})
