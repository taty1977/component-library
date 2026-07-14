import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}

const containerStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.75rem',
};

const itemStyle: React.CSSProperties = {
    borderRadius: '0.75rem',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
};

const buttonStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    backgroundColor: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#0f172a',
};

const panelStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    color: '#334155',
    borderTop: '1px solid #e2e8f0',
};

const iconStyle: React.CSSProperties = {
    width: '1em',
    height: '1em',
    color: '#64748b',
    flexShrink: 0,
};

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
        <div style={containerStyle}>
            {items.map((item) => {
                const expanded = expandedIds.has(item.id);
                return (
                    <div key={item.id} style={itemStyle}>
                        <button
                            type="button"
                            id={`accordion-button-${item.id}`}
                            style={buttonStyle}
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={expanded}
                            aria-controls={`accordion-content-${item.id}`}
                        >
                            <span>{item.title}</span>
                            {expanded ? (
                                <ChevronUpIcon width="1em" height="1em" style={iconStyle} />
                            ) : (
                                <ChevronDownIcon width="1em" height="1em" style={iconStyle} />
                            )}
                        </button>
                        {expanded && (
                            <div
                                id={`accordion-content-${item.id}`}
                                style={panelStyle}
                                role="region"
                                aria-labelledby={`accordion-button-${item.id}`}
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
        // <div className="space-y-3">
        //     {items.map((item) => {
        //         const expanded = expandedIds.has(item.id);
        //         return (
        //             <div key={item.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        //                 <button
        //                     type="button"
        //                     id={`accordion-button-${item.id}`}
        //                     className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 ${expanded ? 'bg-slate-50' : 'bg-white'}`}
        //                     onClick={() => toggleItem(item.id)}
        //                     aria-expanded={expanded}
        //                     aria-controls={`accordion-content-${item.id}`}
        //                 >
        //                     <span className="flex-1 font-medium text-slate-900">{item.title}</span>
        //                     <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        //                 </button>
        //                  {expandedIds.has(item.id) && (

        //                 <div
        //                     id={`accordion-content-${item.id}`}
        //                     role="region"
        //                     aria-labelledby={`accordion-button-${item.id}`}
        //                     aria-hidden={!expanded}
        //                     className={`overflow-hidden text-slate-700 transition-all duration-200 ease-in-out ${expanded ? 'py-4 opacity-100' : 'py-0 opacity-0'}`}
        //                     style={{ maxHeight: expanded ? 1000 : 0 }}
        //                 >
        //                     <div className="px-4">{item.content}</div>
        //                 </div>
        //                       )}
        //             </div>

        //         );
        //     })}
        // </div>
    );
};

export default Accordion;