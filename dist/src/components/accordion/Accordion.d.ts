import React from 'react';
interface AccordionItem {
    id: string;
    title: string;
    content?: React.ReactNode;
}
export type AccordionVariant = 'default' | 'primary' | 'secondary';
export interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    collapsedIcon?: React.ReactNode;
    expandedIcon?: React.ReactNode;
    variant?: AccordionVariant;
    children?: React.ReactNode;
}
export declare const Accordion: ({ items, allowMultiple, collapsedIcon, expandedIcon, variant, children, }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
