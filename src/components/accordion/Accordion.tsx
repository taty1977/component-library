import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import type { ThemeType } from '../../styles/theme'

interface AccordionItem {
  id: string
  title: string
  content?: React.ReactNode
}

export type AccordionVariant = 'default' | 'primary' | 'secondary'
export type AccordionIconPosition = 'left' | 'right'

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
  collapsedIcon?: React.ReactNode
  expandedIcon?: React.ReactNode
  iconPosition?: AccordionIconPosition
  variant?: AccordionVariant
  children?: React.ReactNode
}

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.sizes.sz_075};
`

const getVariantAppearance = (theme: ThemeType, variant: AccordionVariant) => {
  if (variant === 'primary') {
    return {
      background: theme.colors.primary.base,
      hoverBackground: theme.colors.primary.hover,
      border: theme.colors.primary.border,
      focusBorder: theme.colors.primary.focusBorder,
      text: theme.colors.primary.text,
      panelBackground: theme.colors.primary.surface,
    }
  }

  if (variant === 'secondary') {
    return {
      background: theme.colors.secondary.base,
      hoverBackground: theme.colors.secondary.hover,
      border: theme.colors.secondary.border,
      focusBorder: theme.colors.secondary.focusBorder,
      text: theme.colors.surface,
      panelBackground: theme.colors.secondary.surface,
    }
  }

  return {
    background: theme.colors.surface,
    hoverBackground: theme.colors.surface,
    border: theme.colors.border,
    focusBorder: theme.colors.focusRing,
    text: theme.colors.title,
    panelBackground: theme.colors.surfaceAlt,
  }
}

const Item = styled.div<{ $expanded: boolean; $variant: AccordionVariant }>`
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  overflow: hidden;
  border: ${({ $variant, theme }) => `1px solid ${getVariantAppearance(theme, $variant).border}`};
  box-shadow: ${({ $expanded, theme }) => ($expanded ? theme.boxShadow.bs_04 : theme.boxShadow.bs_01)};
  transition: box-shadow 0.2s ease;
`

const ToggleButton = styled.button<{ $variant: AccordionVariant }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  background-color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).background};
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).text};

  &:hover {
    background-color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).hoverBackground};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ $variant, theme }) => getVariantAppearance(theme, $variant).focusBorder};
  }
`

const Panel = styled.div<{ $variant: AccordionVariant }>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  background-color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).panelBackground};
  color: ${({ theme }) => theme.colors.mutedText};
  border-top: ${({ $variant, theme }) => `1px solid ${getVariantAppearance(theme, $variant).border}`};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.sizes.sz_075};
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  & > span {
    flex: 1;
  }

  & > div {
    flex: 0;
  }
`

const IconWrapper = styled.span<{ $variant: AccordionVariant }>`
  max-width: 1em;
  height: 1em;
  color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).text};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const getHeaderIcon = (expanded: boolean) => (expanded ? ChevronUpIcon : ChevronDownIcon)

const getNextExpandedIds = (expandedIds: Set<string>, id: string, allowMultiple: boolean) => {
  const nextExpandedIds = new Set(expandedIds)

  if (allowMultiple) {
    if (nextExpandedIds.has(id)) {
      nextExpandedIds.delete(id)
    } else {
      nextExpandedIds.add(id)
    }
    return nextExpandedIds
  }

  nextExpandedIds.clear()
  if (!expandedIds.has(id)) {
    nextExpandedIds.add(id)
  }

  return nextExpandedIds
}

export const Accordion = ({
  items,
  className,
  allowMultiple = false,
  collapsedIcon,
  expandedIcon,
  iconPosition = 'right',
  variant = 'default',
  children,
}: AccordionProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const childPanels = React.Children.toArray(children)

  const toggleItem = (id: string) => {
    // Functional updates keep rapid interactions in sync with the latest expanded state.
    setExpandedIds(previousExpandedIds => getNextExpandedIds(previousExpandedIds, id, allowMultiple))
  }

  return (
    <Container className={className} data-variant={variant}>
      {items.map((item, index) => {
        const expanded = expandedIds.has(item.id)
        const HeaderIcon = getHeaderIcon(expanded)
        // A custom icon replaces only the state it was supplied for.
        const headerIcon = expanded ? expandedIcon : collapsedIcon
        const panelContent = childPanels[index] ?? item.content
        const icon = (
          <IconWrapper $variant={variant}>
            {headerIcon ?? <HeaderIcon width='1em' height='1em' aria-hidden='true' />}
          </IconWrapper>
        )

        return (
          <Item key={item.id} $expanded={expanded} $variant={variant}>
            <ToggleButton
              $variant={variant}
              type='button'
              id={`accordion-button-${item.id}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={expanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <HeaderContent>
                {iconPosition === 'left' ? icon : null}
                <span>{item.title}</span>
                {iconPosition === 'right' ? icon : null}
              </HeaderContent>
            </ToggleButton>
            {expanded && panelContent != null && (
              <Panel
                id={`accordion-content-${item.id}`}
                role='region'
                aria-labelledby={`accordion-button-${item.id}`}
                $variant={variant}
              >
                {panelContent}
              </Panel>
            )}
          </Item>
        )
      })}
    </Container>
  )
}

export default Accordion
