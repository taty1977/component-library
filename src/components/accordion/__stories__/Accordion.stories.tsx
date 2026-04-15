import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Accordion } from "../Accordion";

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    title: "Components/Accordion",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            {
                id: "1",
                title: "Accordion Item 1",
                content: "Content for the first accordion item",
            },
            {
                id: "2",
                title: "Accordion Item 2",
                content: "Content for the second accordion item",
            },
            {
                id: "3",
                title: "Accordion Item 3",
                content: "Content for the third accordion item",
            },
        ],
    },
};

export const SingleOpen: Story = {
    args: {
        ...Default.args,
        allowMultiple: false,
    },
};