import React from 'react';
interface AccordionItem {
    id: string;
    title: string;
    content?: React.ReactNode;
}
interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    reverseHeader?: boolean;
    children?: React.ReactNode;
}
export declare const Accordion: ({ items, allowMultiple, reverseHeader, children }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
