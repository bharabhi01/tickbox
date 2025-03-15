import React, { useState, useEffect } from 'react';
import ViewGoals from './ViewGoals';
import Item from './Item';
import { Card, CardBody, Tabs, Tab, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getUserInfo } from '../actions/auth';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { token } = useAuth();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo(token);
            setUserInfo(response);
        }
        fetchUserInfo();
    }, [token]);

    let tabs = [
        {
            id: 1,
            label: "View Goals",
            content: <ViewGoals />
        },
        {
            id: 2,
            label: "Set New Goals",
            content: <Item />
        }
    ]
    return (
        <div className="max-w-2xl w-full">
            <Button
                variant='ghost'
                className="absolute top-0 right-0 px-4 py-2 text-2xl font-medium text-default-600"
                style={{ marginTop: '10px', marginRight: '10px', fontSize: '13px' }}
                onPress={() => {
                    logout();
                    navigate('/login');
                }}
                size="sm"

            >
                Logout
            </Button>
            <h2 className="text-2xl font-semibold leading-none text-default-600 text-center" style={{ marginBottom: '100px' }}>
                Welcome <span style={{ fontFamily: 'apple-system', fontStyle: 'italic' }}>{userInfo.first_name} {userInfo.last_name}!</span>
            </h2>
            <Tabs aria-label="Dynamic tabs" items={tabs} variant="underlined">
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card>
                            <CardBody>{item.content}</CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}

export default Dashboard;