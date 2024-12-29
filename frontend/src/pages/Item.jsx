import React, { useState, useEffect } from "react";
import { Form, Input, Button, Textarea, Card, CardHeader, CardBody, CardFooter, Chip, Checkbox, Progress } from "@nextui-org/react";
import { setGoals } from "../actions/setGoals";

const Item = () => {
    const [submitted, setSubmitted] = useState(null);
    const [steps, setSteps] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 5));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);

        const requestPayload = {
            goal: data.goal,
            description: data.description,
        }

        try {
            setIsLoading(true);
            const response = await setGoals(requestPayload);
            setSubmitted(response.newGoal);
            setSteps(response.newGoal.ai_response);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to submit goal:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr.split('-').reverse().join('-')).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-2xl w-full">
            <Form
                validationBehavior="native"
                onSubmit={onSubmit}
                className="max-w-2xl w-full gap-4"
            >
                <Input
                    label="Goal"
                    placeholder="Enter your goal"
                    name="goal"
                />
                <Textarea
                    name="description"
                    label="Description"
                    placeholder="Describe your goal (By when you want to achieve it, etc.)"
                    minRows={4}
                />
                <Button type="submit">Submit</Button>
            </Form>

            {
                isLoading ?
                    <Progress
                        aria-label="Generating your learning path..."
                        className="max-w-md"
                        color="primary"
                        showValueLabel={true}
                        size="md"
                        value={value}
                    /> :
                    submitted && Object.entries(submitted.ai_response).map(([step, details]) => (
                        <Checkbox
                            isSelected={steps[step]}
                            onValueChange={(isSelected) =>
                                setSteps(prev => ({ ...prev, [step]: isSelected }))
                            }
                            className="mb-4 block"
                        >
                            <Card key={step} className="max-w-2xl w-full">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{step}</h4>
                                        </div>
                                    </div>
                                    <Chip>{formatDate(details.start_date)} - {formatDate(details.end_date)}</Chip>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p>{details.description}</p>
                                </CardBody>
                                <CardFooter className="gap-3">
                                    {details.links.map((link, index) => (
                                        <div className="flex gap-1">
                                            <p className="font-semibold text-default-400 text-small">{<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>}</p>
                                        </div>
                                    ))}
                                </CardFooter>
                            </Card>
                        </Checkbox>
                    ))
            }
        </div>
    );
}

export default Item;