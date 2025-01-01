import React from 'react';
import ViewGoals from './ViewGoals';
import Item from './Item';
import { Card, CardBody, Tabs, Tab, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
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
                className="absolute top-0 right-0 px-4 py-2 text-sm font-mediums"
                style={{ marginTop: '10px', marginRight: '10px' }}
                onPress={() => {
                    logout();
                    navigate('/login');
                }}
            >
                Logout
            </Button>
            <h2 className="text-2xl font-semibold leading-none text-default-600 text-center" style={{ marginBottom: '100px' }}>
                Welcome!
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