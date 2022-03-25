import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';
jest.mock('axios');


describe('Run Birthday reminder App without Crashing', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should display all birthday list after render', () => {
    const items = screen.getAllByRole('heading', { level: 4 });
    expect(items).toHaveLength(5);
  });

  test('should clear all list from app container', async () => {

    userEvent.click(screen.getByRole('button', { name: 'clear all' }));
    expect(screen.queryByText(/Bertie/i)).not.toBeInTheDocument(); // check element not exist in document
    expect(screen.queryByRole('heading', { level: 4 })).toBeNull(); // element doesn't exist
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0); //// expect no elements

  });

  test('should reset all the birthday reminders', () => {
    userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(5);
  });

  test('should display mock data on screen', async () => {
    const stories = [
      {
        id: 1,
        name: 'Bhagyashrre Yates',
        age: 29,
        image:
          'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg',
      },
      {
        id: 2,
        name: 'sangam Hogan',
        age: 32,
        image:
          'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-3_rxtqvi.jpg',
      },
    ];

    const promise = Promise.resolve({ data: stories });
    axios.get.mockImplementationOnce(() => promise);
    // render(<App />);
    await userEvent.click(screen.getByRole('button', { 'name': 'Reset' }));

    await act(() => promise);

    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(5);


  })



});


