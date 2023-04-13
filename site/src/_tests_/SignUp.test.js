import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router, navigate} from 'react-router-dom';
import SignUp from '../pages/SignUp';



describe("Sign Up page",() =>{

    test('empty field validation', () => {
        render(<Router><SignUp /></Router>);
        fireEvent.click(screen.getByText('Submit'));
        expect(screen.getByPlaceholderText('Username')).toHaveValue("");
    });


    test("Successfull Sign in", async  () =>{
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve({ data: 'Success' }),
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        render(<Router><SignUp /></Router>);
        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'drew' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'gon' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'drewgon' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass2' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'pass2' } });
        fireEvent.click(screen.getByText('Submit'));
        await mockFetchPromise;
        expect(fetch).toHaveBeenNthCalledWith(1,'api/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                firstName: 'drew',
                lastName: 'gon',
                username: 'drewgon',
                password: 'pass2',
            }),
        })


    });
    test("Displays error message if the user already exists", async () =>{
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve({ data: 'User already exists'}),
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        render(<Router><SignUp /></Router>);
        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'drew' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'gon' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'drewgon' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass2' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'pass2' } });
        fireEvent.click(screen.getByText('Submit'));
        expect(fetch).toHaveBeenNthCalledWith(1,'api/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                firstName: 'drew',
                lastName: 'gon',
                username: 'drewgon',
                password: 'pass2',
            }),
        })
    });
    test("API error accured", async () => {
        window.alert = jest.fn(); // mock the window.alert method
        const error = { data: null, error: 'An API error occurred' };
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.reject(error)
        );

        render(<Router><SignUp /></Router>);
        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'drew' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'gon' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'drewgon' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass2' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'pass2' } });
        fireEvent.click(screen.getByText('Submit'));

    })

    test('shows an alert when passwords do not match', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        render(<Router> <SignUp /> </Router>);
        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'test' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'test' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'test' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass2' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'notCorrect' } });
        fireEvent.click(screen.getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Password does not match. Please try again.');
        alertSpy.mockRestore();
    });

});
