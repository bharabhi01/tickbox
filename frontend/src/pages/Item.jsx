import React, { useState } from "react";
import { Form, Input, Button, Textarea } from "@nextui-org/react";
import { setGoals } from "../actions/setGoals";

const Item = () => {
    const [submitted, setSubmitted] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);

        const requestPayload = {
            goal: data.goal,
            description: data.description,
        }

        setGoals(requestPayload);

        setSubmitted(data);
    }

    return (
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
                label="Description"
                placeholder="Describe your goal (By when you want to achieve it, etc.)"
                minRows={4}
            />
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default Item;