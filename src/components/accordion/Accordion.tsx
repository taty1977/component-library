import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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

const Container = styled.div`
    display: grid;
    gap: 0.75rem;
`;

const Item = styled.div<{ $reverse?: boolean }>`
    border-radius: ${({ theme }) => theme.sizes.sz_075};
    overflow: hidden;
    border: ${({ $reverse, theme }) => ($reverse ? 'none' : `1px solid ${theme.colors.border}`)};
    box-shadow: ${({ $reverse, theme }) => ($reverse ? 'none' : theme.boxShadow.bs_01)};
`;

const ToggleButton = styled.button<{ $reverse?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
    background-color: ${({ theme }) => theme.colors.surface};
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.heading};
`;

const Panel = styled.div<{ $reverse?: boolean }>`
    padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.mutedText};
    border-top: ${({ $reverse, theme }) => ($reverse ? 'none' : `1px solid ${theme.colors.border}`)};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const HeaderContent = styled.div<{ $reverse?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $reverse, theme }) => ($reverse ? 'flex-start' : 'space-between')};
    gap: ${({ theme }) => theme.sizes.sz_075};
    width: 100%;
    flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
    font-family: ${({ theme }) => theme.fontFamily};

    & > span {
        flex: 1;
    }

    & > div {
        flex: 0;
    }
`;

const IconWrapper = styled.span`
    width: 100%;
    max-width: 1em;
    height: 1em;
    color: ${({ theme }) => theme.colors.icon};
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const getHeaderIcon = (expanded: boolean, reverseHeader: boolean) => {
    if (expanded) {
        if (reverseHeader) {
            return ChevronDownIcon;
        }
        return ChevronUpIcon;
    } 
    return reverseHeader ? ChevronRightIcon : ChevronDownIcon;
};

export const Accordion = ({ items, allowMultiple = false, reverseHeader = false, children }: AccordionProps) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const childPanels = React.Children.toArray(children);

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
        <Container>
            {items.map((item, index) => {
                const expanded = expandedIds.has(item.id);
                const HeaderIcon = getHeaderIcon(expanded, reverseHeader);
                const panelContent = childPanels[index] ?? item.content;

                return (
                    <Item key={item.id} $reverse={reverseHeader}>
                        <ToggleButton
                            type="button"
                            id={`accordion-button-${item.id}`}
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={expanded}
                            aria-controls={`accordion-content-${item.id}`}
                            $reverse={reverseHeader}
                        >
                            <HeaderContent $reverse={reverseHeader}>
                                <span>{item.title}</span>
                                <IconWrapper>
                                    <HeaderIcon width="1em" height="1em" />
                                </IconWrapper>
                            </HeaderContent>
                        </ToggleButton>
                        {expanded && panelContent != null && (
                            <Panel
                                id={`accordion-content-${item.id}`}
                                role="region"
                                aria-labelledby={`accordion-button-${item.id}`}
                                $reverse={reverseHeader}
                            >
                                {panelContent}
                            </Panel>
                        )}
                    </Item>
                );
            })}
        </Container>
    );
};

export default Accordion;