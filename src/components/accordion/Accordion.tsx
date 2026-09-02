import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface AccordionItem {
  id: string;
  title: string;
  content?: React.ReactNode;
}

export type AccordionVariant = 'default' | 'leftIcon';

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  collapsedIcon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  variant?: AccordionVariant;
  children?: React.ReactNode;
}

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.sizes.sz_075};
`;

const Item = styled.div<{ $variant: AccordionVariant }>`
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  overflow: hidden;
  border: ${({ $variant, theme }) => ($variant === 'leftIcon' ? 'none' : `1px solid ${theme.colors.border}`)};
  box-shadow: ${({ $variant, theme }) => ($variant === 'leftIcon' ? 'none' : theme.boxShadow.bs_01)};
`;

const ToggleButton = styled.button`
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

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

const Panel = styled.div<{ $variant: AccordionVariant }>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.mutedText};
  border-top: ${({ $variant, theme }) => ($variant === 'leftIcon' ? 'none' : `1px solid ${theme.colors.border}`)};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const HeaderContent = styled.div<{ $variant: AccordionVariant }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $variant }) => ($variant === 'leftIcon' ? 'flex-start' : 'space-between')};
  gap: ${({ theme }) => theme.sizes.sz_075};
  width: 100%;
  flex-direction: ${({ $variant }) => ($variant === 'leftIcon' ? 'row-reverse' : 'row')};
  font-family: ${({ theme }) => theme.fontFamily};

  & > span {
    flex: 1;
  }

  & > div {
    flex: 0;
  }
`;

const IconWrapper = styled.span`
  max-width: 1em;
  height: 1em;
  color: ${({ theme }) => theme.colors.icon};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const headerIcons = {
  default: {
    expanded: ChevronUpIcon,
    collapsed: ChevronDownIcon,
  },
  leftIcon: {
    expanded: ChevronDownIcon,
    collapsed: ChevronRightIcon,
  },
} as const;

const getHeaderIcon = (expanded: boolean, variant: AccordionVariant) => {
  // Variants supply the fallback chevrons when custom state icons are not provided.
  return headerIcons[variant][expanded ? 'expanded' : 'collapsed'];
};

export const Accordion = ({
  items,
  allowMultiple = false,
  collapsedIcon,
  expandedIcon,
  variant = 'default',
  children,
}: AccordionProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const childPanels = React.Children.toArray(children);

  const toggleItem = (id: string) => {
    // Functional updates keep rapid interactions in sync with the latest expanded state.
    setExpandedIds((previousExpandedIds) => {
      const nextExpandedIds = new Set(previousExpandedIds);

      if (allowMultiple) {
        if (nextExpandedIds.has(id)) {
          nextExpandedIds.delete(id);
        } else {
          nextExpandedIds.add(id);
        }
      } else {
        nextExpandedIds.clear();
        if (!previousExpandedIds.has(id)) {
          nextExpandedIds.add(id);
        }
      }

      return nextExpandedIds;
    });
  };

  return (
    <Container data-variant={variant}>
      {items.map((item, index) => {
        const expanded = expandedIds.has(item.id);
        const HeaderIcon = getHeaderIcon(expanded, variant);
        // A custom icon replaces only the state it was supplied for.
        const headerIcon = expanded ? expandedIcon : collapsedIcon;
        const panelContent = childPanels[index] ?? item.content;

        return (
          <Item key={item.id} $variant={variant}>
            <ToggleButton
              type="button"
              id={`accordion-button-${item.id}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={expanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <HeaderContent $variant={variant}>
                <span>{item.title}</span>
                <IconWrapper>{headerIcon ?? <HeaderIcon width="1em" height="1em" aria-hidden="true" />}</IconWrapper>
              </HeaderContent>
            </ToggleButton>
            {expanded && panelContent != null && (
              <Panel
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-button-${item.id}`}
                $variant={variant}
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
