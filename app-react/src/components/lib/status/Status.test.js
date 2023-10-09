import { render, screen } from '@testing-library/react';
import Status from './Status';

test('Should not be in document when shouldShow is not set and messages is empty array', () => {

    const emptyErrors = []

    render(
        <Status
            type="error"
            messages={emptyErrors}
        />
    );
    const statusElement = screen.queryByTestId("status")
    console.log(statusElement)
    expect(statusElement).toBeNull();
});


test('Should be in document when shouldShow is not set and messages is filled array', () => {

    const errors = ['error']

    render(
        <Status
            type="error"
            messages={errors}
        />
    );
    const errorElement = screen.getByText('error')
    expect(errorElement).toBeInTheDocument();
});


test('Should have class "error-color" when type = error', () => {

    const errors = ['error']

    render(
        <Status
            type="error"
            messages={errors}
        />
    );
    const statusElement = screen.getByTestId("status")
    expect(statusElement.classList.contains('error-color')).toBe(true);
    expect(statusElement.classList.contains('success-color')).toBe(false);
});


test('Should have class "success-color" when type = success', () => {

    const success = ['success']

    render(
        <Status
            type="success"
            messages={success}
        />
    );
    const statusElement = screen.getByTestId("status")
    expect(statusElement.classList.contains('success-color')).toBe(true);
    expect(statusElement.classList.contains('error-color')).toBe(false);
});


test('Should disappear after three seconds if MSBeforeClose = 3000', () => {

    const success = ['success']

    render(
        <Status
            type="success"
            messages={success}
            MSUntilClose={3000}
        />
    );

    const statusElement = screen.getByTestId("status")
    expect(statusElement).toBeInTheDocument();

    setTimeout(() => {
        const statusElement = screen.getByTestId("status")
        expect(statusElement).toBeNull();
    }, 4000)
});
