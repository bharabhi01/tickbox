import React, { useState, useEffect } from 'react';
import { getGoals } from '../actions/setGoals';
import { useAuth } from '../context/AuthProvider';
import { Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter, Chip } from "@nextui-org/react";

const ViewGoals = () => {
    const { token } = useAuth();
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await getGoals(token);
                setGoals(response);
            } catch (error) {
                console.error('Failed to get goals:', error);
            }
        };
        fetchGoals();
    }, [token]);

    const formatDate = (dateStr) => {
        return new Date(dateStr.split('-').reverse().join('-')).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-2xl w-full">
            <div className="flex flex-col gap-4">
                {goals.length === 0 ? (
                    <p className="text-center text-default-400">No goals found! It's time to set a new goal!</p>
                ) : (
                    <Accordion>
                        {goals.length > 0 && goals.map((goal, index) => (
                            <AccordionItem
                                key={index}
                                aria-label={goal.goal_name}
                                title={goal.goal_name}
                                subtitle={<div className="text-default-400">Type: {goal.goal_type}</div>}
                            >
                                <div className="flex flex-col gap-4">
                                    {Object.entries(goal.steps).map(([stepName, stepData]) => (
                                        <Card key={stepName} className="max-w-2xl w-full">
                                            <CardHeader className="justify-between">
                                                <div className="flex gap-5">
                                                    <div className="flex flex-col gap-1 items-start justify-center">
                                                        <h4 className="text-small font-semibold leading-none text-default-600">{stepName}</h4>
                                                    </div>
                                                </div>
                                                <Chip>{formatDate(stepData.start_date)} - {formatDate(stepData.end_date)}</Chip>
                                            </CardHeader>
                                            <CardBody className="px-3 py-0 text-small text-default-400">
                                                <p>{stepData.description}</p>
                                            </CardBody>
                                            <CardFooter className="gap-3 flex-col items-start">
                                                {stepData.links.map((link, index) => (
                                                    <div key={index} className="flex gap-1 w-full">
                                                        <p className="font-semibold text-default-400 text-small">
                                                            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                                        </p>
                                                    </div>
                                                ))}
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}

export default ViewGoals;