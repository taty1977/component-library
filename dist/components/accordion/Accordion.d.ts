import React from 'react';
interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}
interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}
export declare const Accordion: ({ items, allowMultiple }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
