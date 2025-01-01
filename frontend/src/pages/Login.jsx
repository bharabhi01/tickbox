import React, { useState } from 'react';
import { Form, Input, Button, Alert } from '@nextui-org/react';
import { loginUser } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { token } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const response = await loginUser(data, token);
            login(response.user, response.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    }

    return (
        <div className="max-w-2xl w-full gap-4">
            <Form
                className="max-w-2xl w-full gap-4"
                validationBehavior="native"
                onSubmit={onSubmit}
            >
                <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                />

                <Input
                    isRequired
                    errorMessage="Please enter a valid password"
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                />
                <div className="flex gap-2">
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            <p className="text-small text-default-500 text-center text-bold" style={{ marginTop: '50px' }}>
                Don't have an account?{" "}
                <a href="/signup" style={{ color: 'text-default-500', fontStyle: 'italic' }}>Sign Up</a>
            </p>
            {error &&
                <div className="flex justify-center" style={{ marginTop: '200px' }}>
                    <Alert color='danger' variant='faded' hideIcon>
                        {error}
                    </Alert>
                </div>
            }
        </div>
    );
}

export default Login;