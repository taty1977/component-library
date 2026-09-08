import React, { useEffect, useId, useRef, useState } from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, HeartIcon } from '@heroicons/react/24/solid'
import type { Breakpoint } from '../../styles'
import type { ThemeType } from '../../styles/theme'
import Heading from '../heading/Heading'

export interface CarouselImageItem {
  id?: string
  src: string
  alt: string
  thumbnailSrc?: string
  badge?: string
  likeButton?: boolean
}

export type CarouselVariant = 'primary' | 'secondary'

export interface CarouselProps {
  images: CarouselImageItem[]
  className?: string
  likeButton?: boolean
  breakpoint?: Breakpoint
  variant?: CarouselVariant
  initialIndex?: number
  onImageChange?: (index: number, image: CarouselImageItem) => void
  showThumbnails?: boolean
  thumbnailsPosition?: 'left' | 'right' | 'bottom'
  showIndicators?: boolean
  ariaLabel?: string
  ofText?: string
  openOnClick?: boolean
}

type ThumbnailPosition = 'left' | 'right' | 'bottom'

const getAccessibleAlt = (image: CarouselImageItem, index: number) => {
  const alt = image.alt.trim()
  return alt || `Product image ${index + 1}`
}

// The source fallback keeps image state stable when an optional id is absent.
const getImageKey = (image: CarouselImageItem) => image.id || image.src

// Keep every active carousel treatment aligned with the selected color variant.
const getVariantAppearance = (theme: ThemeType, variant: CarouselVariant) => {
  if (variant === 'secondary') {
    return {
      color: theme.colors.secondary.base,
      hoverColor: theme.colors.secondary.hover,
      focusBorder: theme.colors.secondary.focusBorder,
      surface: theme.colors.secondary.surface,
    }
  }

  return {
    color: theme.colors.primary.base,
    hoverColor: theme.colors.primary.hover,
    focusBorder: theme.colors.primary.focusBorder,
    surface: theme.colors.primary.surface,
  }
}

const GalleryRoot = styled.section<{ $breakpoint: Breakpoint; $thumbnailsPosition: ThumbnailPosition }>`
  /* Breakpoint-specific values are exposed as CSS variables for nested gallery layouts. */
  --carousel-thumb-size: ${({ theme }) => theme.sizes.sz_450};
  --carousel-main-image-height: ${({ theme }) => theme.carouselImageGallery.maxHeight};
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  padding: ${({ theme }) => theme.spaces.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  display: grid;
  gap: ${({ theme }) => theme.spaces.md};

  ${({ $breakpoint, theme }) =>
    $breakpoint === 'tablet'
      ? `
    --carousel-thumb-size: ${theme.sizes.sz_375};
    --carousel-main-image-height: ${theme.carouselImageGallery.tabletMaxHeight};
  `
      : ''}

  ${({ $breakpoint, $thumbnailsPosition, theme }) =>
    $breakpoint === 'tablet' && $thumbnailsPosition !== 'bottom'
      ? `--carousel-main-image-min-height: calc(${theme.sizes.sz_375} * 5 + ${theme.sizes.sz_0625} * 4);`
      : ''}

  ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? `
    --carousel-thumb-size: ${theme.sizes.sz_325};
    --carousel-main-image-height: ${theme.carouselImageGallery.mobileMaxHeight};
  `
      : ''}
`

const MainStage = styled.div`
  --carousel-control-size: ${({ theme }) => theme.sizes.sz_200};
  position: relative;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: min(80vh, var(--carousel-main-image-height));
  min-height: var(
    --carousel-main-image-min-height,
    min(${({ theme }) => theme.carouselImageGallery.minHeight}, var(--carousel-main-image-height))
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
`

const GalleryBody = styled.div<{
  $showThumbnails: boolean
  $thumbnailsPosition: ThumbnailPosition
  $breakpoint: Breakpoint
}>`
  min-width: 0;
  display: ${({ $showThumbnails, $thumbnailsPosition }) =>
    $showThumbnails && $thumbnailsPosition !== 'bottom' ? 'grid' : 'block'};
  gap: ${({ theme }) => theme.spaces.md};
  grid-template-columns: ${({ $thumbnailsPosition }) =>
    $thumbnailsPosition === 'left'
      ? `var(--carousel-thumb-size) minmax(0, 1fr)`
      : $thumbnailsPosition === 'right'
      ? `minmax(0, 1fr) var(--carousel-thumb-size)`
      : '1fr'};

  ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? `
    display: block;
    gap: ${theme.spaces.sm};
  `
      : ''}
`

const GalleryInlineBody = styled(GalleryBody)``

const MainImage = styled.img<{ $clickable?: boolean; $variant: CarouselVariant }>`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-width: 0;
  min-height: var(
    --carousel-main-image-min-height,
    min(${({ theme }) => theme.carouselImageGallery.minHeight}, var(--carousel-main-image-height))
  );
  max-height: var(--carousel-main-image-height);
  object-fit: cover;
  object-position: center;
  cursor: ${({ $clickable }) => ($clickable ? 'zoom-in' : 'default')};

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }
`

const Badge = styled.span<{ $variant: CarouselVariant }>`
  position: absolute;
  top: ${({ theme }) => theme.spaces.md};
  left: ${({ theme }) => theme.spaces.md};
  background-color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: ${({ theme }) => `${theme.spaces.xs} ${theme.spaces.sm}`};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
`

const LikeButton = styled.button<{ $active: boolean; $variant: CarouselVariant }>`
  position: absolute;
  top: ${({ theme }) => theme.spaces.md};
  right: ${({ theme }) => theme.spaces.md};
  width: var(--carousel-control-size);
  height: var(--carousel-control-size);
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, $active, $variant }) => ($active ? theme.actionColors.danger : theme.colors.nature.base)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }

  &:hover {
    color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).hoverColor};
    background-color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).surface};
  }
`

const NavButton = styled.button<{ $side: 'left' | 'right'; $variant: CarouselVariant }>`
  position: absolute;
  ${({ $side, theme }) => ($side === 'left' ? `left: ${theme.spaces.md};` : `right: ${theme.spaces.md};`)}
  top: 50%;
  transform: translateY(-50%);
  width: var(--carousel-control-size);
  height: var(--carousel-control-size);
  border: none;
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

const Footer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: ${({ theme }) => theme.spaces.md};
  display: grid;
  gap: ${({ theme }) => theme.spaces.sm};
`

const Indicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.sm};
`

const DotButton = styled.button<{ $active: boolean; $variant: CarouselVariant }>`
  width: ${({ theme }) => theme.sizes.sz_0625};
  height: ${({ theme }) => theme.sizes.sz_0625};
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  background-color: ${({ theme, $active, $variant }) =>
    $active ? getVariantAppearance(theme, $variant).color : theme.colors.surface};

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }
`

const Thumbnails = styled.div<{ $position: ThumbnailPosition; $slots: number; $breakpoint: Breakpoint }>`
  display: ${({ $breakpoint }) => ($breakpoint === 'mobile' ? 'none' : 'grid')};
  width: 100%;
  gap: ${({ theme }) => theme.sizes.sz_0625};
  overflow: hidden;

  ${({ $position, $slots, theme }) =>
    $position === 'bottom'
      ? `
      grid-template-columns: repeat(${$slots}, var(--carousel-thumb-size));
      grid-template-rows: 1fr;
      justify-content: center;
    `
      : `
      height: 100%;
      max-height: ${theme.carouselImageGallery.maxHeight};
      grid-template-columns: var(--carousel-thumb-size);
      grid-template-rows: repeat(${$slots}, var(--carousel-thumb-size));
      align-content: start;
    `}
`

const ThumbnailsRail = styled.div<{ $position: ThumbnailPosition; $breakpoint: Breakpoint }>`
  display: ${({ $breakpoint }) => ($breakpoint === 'mobile' ? 'none' : 'grid')};
  gap: ${({ $position, theme }) => ($position === 'bottom' ? theme.spaces.md : theme.sizes.sz_0625)};
  align-items: ${({ $position }) => ($position === 'bottom' ? 'center' : 'start')};
  align-content: ${({ $position }) => ($position === 'bottom' ? 'center' : 'start')};
  grid-template-columns: ${({ $position }) => ($position === 'bottom' ? 'auto 1fr auto' : '1fr')};
  grid-template-rows: ${({ $position }) => ($position === 'bottom' ? '1fr' : 'auto auto auto')};
  ${({ $position, theme }) =>
    $position === 'bottom'
      ? ''
      : `
      height: ${theme.carouselImageGallery.maxHeight};
      overflow: hidden;
    `}
`

const ThumbNavButton = styled.button<{ $variant: CarouselVariant }>`
  width: ${({ theme }) => theme.sizes.sz_200};
  height: ${({ theme }) => theme.sizes.sz_200};
  justify-self: center;
  align-self: center;
  border: none;
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).hoverColor};
    background-color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).surface};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

const ThumbButton = styled.button<{ $active: boolean; $variant: CarouselVariant }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.sizes.sz_050};
  border: 1px solid
    ${({ theme, $active, $variant }) => ($active ? getVariantAppearance(theme, $variant).color : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  line-height: 0;
  box-shadow: ${({ theme, $active, $variant }) =>
    $active ? `0 0 0 1px ${getVariantAppearance(theme, $variant).color}40` : 'none'};

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }
`

const MoreCountOverlay = styled.span`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  padding: ${({ theme }) => `${theme.spaces.lg} ${theme.spaces.md}`};
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const GalleryOverlay = styled.div<{ $breakpoint: Breakpoint }>`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlayBackdrop};
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spaces.md};

  ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? `padding: ${theme.spaces.sm};`
      : $breakpoint === 'tablet'
      ? `padding: ${theme.spaces.md};`
      : ''}
`

const GalleryDialog = styled.div<{ $breakpoint: Breakpoint }>`
  width: ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? '100%'
      : $breakpoint === 'tablet'
      ? `min(${theme.carouselImageGallery.modalTabletMaxWidth}, 100%)`
      : `min(${theme.carouselImageGallery.modalMaxWidth}, 100%)`};
  max-height: ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? theme.carouselImageGallery.modalMobileMaxHeight
      : $breakpoint === 'tablet'
      ? theme.carouselImageGallery.modalTabletMaxHeight
      : theme.carouselImageGallery.modalMaxHeight};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`

const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const CloseButton = styled.button<{ $variant: CarouselVariant }>`
  border: none;
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spaces.xs} ${theme.spaces.sm}`};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).focusBorder};
    outline-offset: 2px;
  }
`

const GalleryDialogContent = styled.div<{ $breakpoint: Breakpoint }>`
  padding: ${({ theme }) => theme.spaces.md};
  overflow: auto;
  display: grid;
  gap: ${({ theme }) => theme.spaces.md};

  ${({ $breakpoint, theme }) =>
    $breakpoint === 'mobile'
      ? `padding: ${theme.spaces.sm}; gap: ${theme.spaces.sm};`
      : $breakpoint === 'tablet'
      ? `padding: ${theme.spaces.md}; gap: ${theme.spaces.md};`
      : ''}
`

export const Carousel: React.FC<CarouselProps> = ({
  images,
  className,
  likeButton = true,
  variant = 'primary',
  initialIndex = 0,
  onImageChange,
  showThumbnails = true,
  thumbnailsPosition = 'bottom',
  showIndicators = true,
  ariaLabel = 'Product image gallery',
  ofText = 'of',
  breakpoint = 'desktop',
  openOnClick = true,
}) => {
  const safeImages = images
  const galleryTitleId = useId()
  const normalizedInitial = Math.min(Math.max(initialIndex, 0), Math.max(safeImages.length - 1, 0))
  const [activeIndex, setActiveIndex] = useState(normalizedInitial)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [thumbStartIndex, setThumbStartIndex] = useState(0)
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({})
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const galleryTriggerRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setActiveIndex(current => Math.min(current, Math.max(safeImages.length - 1, 0)))
    setThumbStartIndex(current => Math.min(current, Math.max(safeImages.length - 1, 0)))
    if (safeImages.length === 0) {
      setIsGalleryOpen(false)
    }
  }, [safeImages.length])

  useEffect(() => {
    if (!isGalleryOpen) {
      return
    }

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsGalleryOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      galleryTriggerRef.current?.focus()
    }
  }, [isGalleryOpen])

  if (safeImages.length === 0) {
    return <EmptyState className={className}>No product images available.</EmptyState>
  }

  const activeImage = safeImages[activeIndex]

  const maxThumbSlots = thumbnailsPosition === 'bottom' ? 8 : 5
  const hasOverflow = safeImages.length > maxThumbSlots
  const visibleThumbCount = hasOverflow ? maxThumbSlots : safeImages.length
  const hiddenThumbCount = hasOverflow ? safeImages.length - maxThumbSlots : 0
  const maxThumbStart = Math.max(0, safeImages.length - maxThumbSlots)
  const canThumbPrev = thumbStartIndex > 0
  const canThumbNext = thumbStartIndex + maxThumbSlots < safeImages.length

  // Keep the selected thumbnail inside the visible window in the dialog rail.
  const ensureThumbVisible = (index: number) => {
    setThumbStartIndex(previousStart => {
      if (index < previousStart) {
        return index
      }

      if (index >= previousStart + maxThumbSlots) {
        return index - maxThumbSlots + 1
      }

      return previousStart
    })
  }

  const selectIndex = (index: number) => {
    const nextIndex = (index + safeImages.length) % safeImages.length
    setActiveIndex(nextIndex)
    ensureThumbVisible(nextIndex)
    if (onImageChange) {
      onImageChange(nextIndex, safeImages[nextIndex])
    }
  }

  const toggleLike = (image: CarouselImageItem) => {
    const key = getImageKey(image)
    setLikedImages(current => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const isActiveImageLiked = Boolean(likedImages[getImageKey(activeImage)])

  const openGallery = () => {
    ensureThumbVisible(activeIndex)
    setIsGalleryOpen(true)
  }

  // Inline and dialog stages intentionally share these controls and their accessibility labels.
  const renderLikeButton = () => {
    if (!likeButton || activeImage.likeButton === false) {
      return null
    }

    return (
      <LikeButton
        type='button'
        $active={isActiveImageLiked}
        $variant={variant}
        aria-label={isActiveImageLiked ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isActiveImageLiked}
        onClick={() => toggleLike(activeImage)}
      >
        <HeartIcon width='1.5em' height='1.5em' aria-hidden='true' />
      </LikeButton>
    )
  }

  const renderImageNavigation = () => (
    <>
      <NavButton
        type='button'
        $side='left'
        $variant={variant}
        aria-label='Previous image'
        onClick={() => selectIndex(activeIndex - 1)}
      >
        <ChevronLeftIcon width='1em' height='1em' aria-hidden='true' />
      </NavButton>
      <NavButton
        type='button'
        $side='right'
        $variant={variant}
        aria-label='Next image'
        onClick={() => selectIndex(activeIndex + 1)}
      >
        <ChevronRightIcon width='1em' height='1em' aria-hidden='true' />
      </NavButton>
    </>
  )

  const handleMainImageKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (!openOnClick) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openGallery()
    }
  }

  const renderInlineThumbnails = (position: ThumbnailPosition) => {
    if (!showThumbnails || thumbnailsPosition !== position) {
      return null
    }

    return (
      <Thumbnails $position={position} $slots={visibleThumbCount} $breakpoint={breakpoint}>
        {safeImages.slice(0, visibleThumbCount).map((image, index) => {
          const isOverflowThumb = hiddenThumbCount > 0 && index === visibleThumbCount - 1

          return (
            <ThumbButton
              key={`thumb-${getImageKey(image)}-${index}`}
              type='button'
              $active={!isOverflowThumb && activeIndex === index}
              $variant={variant}
              aria-label={
                isOverflowThumb
                  ? openOnClick
                    ? `Open image gallery (${hiddenThumbCount} more)`
                    : `${hiddenThumbCount} additional images`
                  : `Select ${getAccessibleAlt(image, index)}`
              }
              onClick={() => {
                if (isOverflowThumb) {
                  if (openOnClick) {
                    openGallery()
                  }
                  return
                }

                selectIndex(index)
              }}
            >
              <ThumbImage src={image.thumbnailSrc || image.src} alt='' aria-hidden='true' />
              {isOverflowThumb ? <MoreCountOverlay>+{hiddenThumbCount}</MoreCountOverlay> : null}
            </ThumbButton>
          )
        })}
      </Thumbnails>
    )
  }

  const renderGalleryThumbnails = (position: ThumbnailPosition) => {
    if (!showThumbnails || thumbnailsPosition !== position) {
      return null
    }

    return (
      <ThumbnailsRail $position={position} $breakpoint={breakpoint}>
        <ThumbNavButton
          type='button'
          $variant={variant}
          aria-label='Previous thumbnails'
          disabled={!canThumbPrev}
          onClick={() => setThumbStartIndex(current => Math.max(0, current - 1))}
        >
          {position === 'bottom' ? (
            <ChevronLeftIcon width='1em' height='1em' aria-hidden='true' />
          ) : (
            <ChevronUpIcon width='1em' height='1em' aria-hidden='true' />
          )}
        </ThumbNavButton>

        <Thumbnails
          $position={position}
          $slots={Math.min(maxThumbSlots, safeImages.length - thumbStartIndex)}
          $breakpoint={breakpoint}
        >
          {safeImages.slice(thumbStartIndex, thumbStartIndex + maxThumbSlots).map((image, index) => {
            const actualIndex = thumbStartIndex + index

            return (
              <ThumbButton
                key={`thumb-${getImageKey(image)}-${actualIndex}`}
                type='button'
                $active={activeIndex === actualIndex}
                $variant={variant}
                aria-label={`Select ${getAccessibleAlt(image, actualIndex)}`}
                onClick={() => selectIndex(actualIndex)}
              >
                <ThumbImage src={image.thumbnailSrc || image.src} alt='' aria-hidden='true' />
              </ThumbButton>
            )
          })}
        </Thumbnails>

        <ThumbNavButton
          type='button'
          $variant={variant}
          aria-label='Next thumbnails'
          disabled={!canThumbNext}
          onClick={() => setThumbStartIndex(current => Math.min(maxThumbStart, current + 1))}
        >
          {position === 'bottom' ? (
            <ChevronRightIcon width='1em' height='1em' aria-hidden='true' />
          ) : (
            <ChevronDownIcon width='1em' height='1em' aria-hidden='true' />
          )}
        </ThumbNavButton>
      </ThumbnailsRail>
    )
  }

  const showFooter = showIndicators || (showThumbnails && thumbnailsPosition === 'bottom')

  return (
    <GalleryRoot
      className={className}
      aria-label={ariaLabel}
      $breakpoint={breakpoint}
      $thumbnailsPosition={thumbnailsPosition}
    >
      <GalleryInlineBody
        $showThumbnails={showThumbnails}
        $thumbnailsPosition={thumbnailsPosition}
        $breakpoint={breakpoint}
      >
        {renderInlineThumbnails('left')}

        <MainStage>
          {activeImage.badge ? <Badge $variant={variant}>{activeImage.badge}</Badge> : null}
          {renderLikeButton()}
          <MainImage
            $clickable={openOnClick}
            $variant={variant}
            ref={openOnClick ? galleryTriggerRef : undefined}
            src={activeImage.src}
            alt={getAccessibleAlt(activeImage, activeIndex)}
            {...(openOnClick
              ? {
                  role: 'button' as const,
                  'aria-label': `Open image gallery: ${getAccessibleAlt(activeImage, activeIndex)}`,
                  tabIndex: 0,
                  onClick: openGallery,
                  onKeyDown: handleMainImageKeyDown,
                }
              : {})}
          />
          {renderImageNavigation()}
        </MainStage>

        {renderInlineThumbnails('right')}
      </GalleryInlineBody>

      {showFooter && breakpoint !== 'mobile' ? (
        <Footer>
          {showIndicators ? (
            <Indicators>
              {safeImages.map((image, index) => (
                <DotButton
                  key={`dot-${getImageKey(image)}-${index}`}
                  type='button'
                  aria-label={`Go to image ${index + 1}`}
                  $active={activeIndex === index}
                  $variant={variant}
                  onClick={() => selectIndex(index)}
                />
              ))}
            </Indicators>
          ) : null}

          {renderInlineThumbnails('bottom')}
        </Footer>
      ) : null}

      {isGalleryOpen ? (
        <GalleryOverlay $breakpoint={breakpoint} role='presentation' onClick={() => setIsGalleryOpen(false)}>
          <GalleryDialog
            $breakpoint={breakpoint}
            role='dialog'
            aria-modal='true'
            aria-labelledby={galleryTitleId}
            tabIndex={-1}
            onClick={event => event.stopPropagation()}
          >
            <GalleryHeader>
              <Heading id={galleryTitleId} level='h4' weight='medium'>
                {`Image gallery: ${activeIndex + 1} ${ofText} ${safeImages.length}`}
              </Heading>
              <CloseButton
                ref={closeButtonRef}
                type='button'
                $variant={variant}
                aria-label='Close image gallery'
                onClick={() => setIsGalleryOpen(false)}
              >
                <span aria-hidden='true'>&#10005;</span>
              </CloseButton>
            </GalleryHeader>

            <GalleryDialogContent $breakpoint={breakpoint}>
              <GalleryBody
                $showThumbnails={showThumbnails}
                $thumbnailsPosition={thumbnailsPosition}
                $breakpoint={breakpoint}
              >
                {renderGalleryThumbnails('left')}

                <MainStage>
                  {activeImage.badge ? <Badge $variant={variant}>{activeImage.badge}</Badge> : null}
                  {renderLikeButton()}
                  <MainImage
                    $variant={variant}
                    src={activeImage.src}
                    alt={getAccessibleAlt(activeImage, activeIndex)}
                  />
                  {renderImageNavigation()}
                </MainStage>

                {renderGalleryThumbnails('right')}
              </GalleryBody>

              {thumbnailsPosition === 'bottom' ? renderGalleryThumbnails('bottom') : null}
            </GalleryDialogContent>
          </GalleryDialog>
        </GalleryOverlay>
      ) : null}
    </GalleryRoot>
  )
}

export default Carousel
