import React, { useState } from 'react';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}

export const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newExpanded = new Set(expandedIds);
        
        if (allowMultiple) {
            if (newExpanded.has(id)) {
                newExpanded.delete(id);
            } else {
                newExpanded.add(id);
            }
        } else {
            newExpanded.clear();
            if (!expandedIds.has(id)) {
                newExpanded.add(id);
            }
        }
        
        setExpandedIds(newExpanded);
    };

    return (
        <div className="accordion">
            {items.map((item) => (
                <div key={item.id} className="accordion-item">
                    <button
                        id={`accordion-button-${item.id}`}
                        className="accordion-header"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={expandedIds.has(item.id)}
                        aria-controls={`accordion-content-${item.id}`}
                    >
                        <span>{item.title}</span>
                        <span className="accordion-icon">
                            {expandedIds.has(item.id) ? '−' : '+'}
                        </span>
                    </button>
                    {expandedIds.has(item.id) && (
                        <div
                            id={`accordion-content-${item.id}`}
                            className="accordion-content"
                            role="region"
                            aria-labelledby={`accordion-button-${item.id}`}
                        >
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;