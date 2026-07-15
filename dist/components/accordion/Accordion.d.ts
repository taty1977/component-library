import React from 'react';
interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}
interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    reverseHeader?: boolean;
}
export declare const Accordion: ({ items, allowMultiple, reverseHeader }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
