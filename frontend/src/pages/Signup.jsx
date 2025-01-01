import React, { useState } from 'react';
import { Form, Input, Button, Alert } from '@nextui-org/react';
import { signupUser } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const response = await signupUser(data);
            signup(response.user, response.token);
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
                    errorMessage="Please enter a valid first name"
                    label="First Name"
                    labelPlacement="outside"
                    name="first_name"
                    placeholder="Enter your first name"
                    type="text"
                />
                <Input
                    isRequired
                    errorMessage="Please enter a valid last name"
                    label="Last Name"
                    labelPlacement="outside"
                    name="last_name"
                    placeholder="Enter your last name"
                    type="text"
                />
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
                    errorMessage="Please enter a valid email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
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

export default Signup;