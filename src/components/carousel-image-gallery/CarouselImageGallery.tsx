import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, HeartIcon } from '@heroicons/react/24/solid';

interface CarouselImageItem {
  id?: string;
  src: string;
  alt: string;
  thumbnailSrc?: string;
  badge?: string;
}

interface CarouselImageGalleryProps {
  images: CarouselImageItem[];
  initialIndex?: number;
  onImageChange?: (index: number, image: CarouselImageItem) => void;
  showThumbnails?: boolean;
  thumbnailsPosition?: 'left' | 'right' | 'bottom';
  showIndicators?: boolean;
  ariaLabel?: string;
  ofText?: string;
  isMobile?: boolean;
}

interface GalleryTitleProps {
  text: string;
}

type ThumbnailPosition = 'left' | 'right' | 'bottom';

const GalleryRoot = styled.section`
  --carousel-thumb-size: ${({ theme }) => theme.sizes.sz_450};
  --carousel-main-image-height: ${({ theme }) => theme.carouselImageGallery.maxHeight};
  width: 100%;
  max-width: ${({ theme }) => theme.carouselImageGallery.maxWidth};
  font-family: ${({ theme }) => theme.fontFamily};
  display: grid;
  gap: ${({ theme }) => theme.spaces.md};

  @media (max-width: ${({ theme }) => theme.carouselImageGallery.tabletBreakpoint}) {
    --carousel-thumb-size: ${({ theme }) => theme.sizes.sz_375};
    --carousel-main-image-height: ${({ theme }) => theme.carouselImageGallery.tabletMaxHeight};
  }

  @media (max-width: ${({ theme }) => theme.carouselImageGallery.mobileBreakpoint}) {
    --carousel-thumb-size: ${({ theme }) => theme.sizes.sz_325};
    --carousel-main-image-height: ${({ theme }) => theme.carouselImageGallery.mobileMaxHeight};
  }
`;

const MainStage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: min(80vh, var(--carousel-main-image-height));
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
`;

const GalleryBody = styled.div<{ $showThumbnails: boolean; $thumbnailsPosition: ThumbnailPosition; $isMobile: boolean }>`
  display: ${({ $showThumbnails, $thumbnailsPosition }) =>
    $showThumbnails && $thumbnailsPosition !== 'bottom' ? 'grid' : 'block'};
  gap: ${({ theme }) => theme.spaces.md};
  grid-template-columns: ${({ $thumbnailsPosition }) =>
    $thumbnailsPosition === 'left'
      ? `var(--carousel-thumb-size) minmax(0, 1fr)`
      : $thumbnailsPosition === 'right'
        ? `minmax(0, 1fr) var(--carousel-thumb-size)`
        : '1fr'};

  ${({ $isMobile, theme }) =>
    $isMobile
      ? `
    display: block;
    gap: ${theme.spaces.sm};
  `
      : ''}
`;

const GalleryInlineBody = styled(GalleryBody)``;

const MainImage = styled.img<{ $clickable?: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  max-height: var(--carousel-main-image-height);
  object-fit: cover;
  object-position: center;
  cursor: ${({ $clickable }) => ($clickable ? 'zoom-in' : 'default')};
`;

const Badge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spaces.md};
  left: ${({ theme }) => theme.spaces.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => `${theme.spaces.xs} ${theme.spaces.sm}`};
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
`;

const LikeButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spaces.md};
  right: ${({ theme }) => theme.spaces.md};
  width: ${({ theme }) => theme.sizes.sz_200};
  height: ${({ theme }) => theme.sizes.sz_200};
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.icon)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  ${({ $side, theme }) => ($side === 'left' ? `left: ${theme.spaces.md};` : `right: ${theme.spaces.md};`)}
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.sizes.sz_200};
  height: ${({ theme }) => theme.sizes.sz_200};
  border: none;
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.icon};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

const Footer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: ${({ theme }) => theme.spaces.md};
  display: grid;
  gap: ${({ theme }) => theme.spaces.sm};
`;

const Indicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.sm};
`;

const DotButton = styled.button<{ $active: boolean }>`
  width: ${({ theme }) => theme.sizes.sz_0625};
  height: ${({ theme }) => theme.sizes.sz_0625};
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
`;

const Thumbnails = styled.div<{ $position: ThumbnailPosition; $slots: number; $isMobile: boolean }>`
  display: ${({ $isMobile }) => ($isMobile ? 'none' : 'grid')};
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
`;

const ThumbnailsRail = styled.div<{ $position: ThumbnailPosition; $isMobile: boolean }>`
  display: ${({ $isMobile }) => ($isMobile ? 'none' : 'grid')};
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
`;

const ThumbNavButton = styled.button`
  width: ${({ theme }) => theme.sizes.sz_200};
  height: ${({ theme }) => theme.sizes.sz_200};
  justify-self: center;
  align-self: center;
  border: none;
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.icon};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.sizes.sz_050};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  line-height: 0;
  box-shadow: ${({ $active }) => ($active ? '0 0 0 1px rgba(59, 130, 246, 0.25)' : 'none')};
`;

const MoreCountOverlay = styled.span`
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.58);
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  padding: ${({ theme }) => `${theme.spaces.lg} ${theme.spaces.md}`};
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const GalleryOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spaces.md};
`;

const GalleryDialog = styled.div`
  width: min(1024px, 100%);
  max-height: min(90vh, 980px);
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.carouselImageGallery.mobileBreakpoint}) {
    width: 100%;
    max-height: 100vh;
    border-radius: ${({ theme }) => theme.sizes.sz_050};
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const GalleryTitleText = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const GalleryTitle: React.FC<GalleryTitleProps> = ({ text }) => <GalleryTitleText>{text}</GalleryTitleText>;

const CloseButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.carouselImageGallery.borderRadius};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spaces.xs} ${theme.spaces.sm}`};
  cursor: pointer;
`;

const GalleryDialogContent = styled.div`
  padding: ${({ theme }) => theme.spaces.md};
  overflow: auto;
  display: grid;
  gap: ${({ theme }) => theme.spaces.md};

  @media (max-width: ${({ theme }) => theme.carouselImageGallery.mobileBreakpoint}) {
    padding: ${({ theme }) => theme.spaces.sm};
    gap: ${({ theme }) => theme.spaces.sm};
  }
`;

export const CarouselImageGallery: React.FC<CarouselImageGalleryProps> = ({
  images,
  initialIndex = 0,
  onImageChange,
  showThumbnails = true,
  thumbnailsPosition = 'bottom',
  showIndicators = true,
  ariaLabel = 'Product image gallery',
  ofText = 'of',
  isMobile = false,
}) => {
  const safeImages = useMemo(() => images ?? [], [images]);

  if (safeImages.length === 0) {
    return <EmptyState>No product images available.</EmptyState>;
  }

  const normalizedInitial = Math.min(Math.max(initialIndex, 0), safeImages.length - 1);
  const [activeIndex, setActiveIndex] = useState(normalizedInitial);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({});
  const activeImage = safeImages[activeIndex];

  const maxThumbSlots = thumbnailsPosition === 'bottom' ? 8 : 5;
  const hasOverflow = safeImages.length > maxThumbSlots;
  const visibleThumbCount = hasOverflow ? maxThumbSlots : safeImages.length;
  const hiddenThumbCount = hasOverflow ? safeImages.length - maxThumbSlots : 0;
  const maxThumbStart = Math.max(0, safeImages.length - maxThumbSlots);
  const canThumbPrev = thumbStartIndex > 0;
  const canThumbNext = thumbStartIndex + maxThumbSlots < safeImages.length;

  const ensureThumbVisible = (index: number) => {
    setThumbStartIndex((previousStart) => {
      if (index < previousStart) {
        return index;
      }

      if (index >= previousStart + maxThumbSlots) {
        return index - maxThumbSlots + 1;
      }

      return previousStart;
    });
  };

  const selectIndex = (index: number) => {
    const nextIndex = (index + safeImages.length) % safeImages.length;
    setActiveIndex(nextIndex);
    ensureThumbVisible(nextIndex);
    if (onImageChange) {
      onImageChange(nextIndex, safeImages[nextIndex]);
    }
  };

  const getImageLikeKey = (image: CarouselImageItem) => image.id || image.src;

  const toggleLike = (image: CarouselImageItem) => {
    const key = getImageLikeKey(image);
    setLikedImages((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const isActiveImageLiked = Boolean(likedImages[getImageLikeKey(activeImage)]);

  const openGallery = () => {
    ensureThumbVisible(activeIndex);
    setIsGalleryOpen(true);
  };

  const renderInlineThumbnails = (position: ThumbnailPosition) => {
    if (!showThumbnails || thumbnailsPosition !== position) {
      return null;
    }

    return (
      <Thumbnails $position={position} $slots={visibleThumbCount} $isMobile={isMobile}>
        {safeImages.slice(0, visibleThumbCount).map((image, index) => {
          const isOverflowThumb = hiddenThumbCount > 0 && index === visibleThumbCount - 1;

          return (
            <ThumbButton
              key={`thumb-${image.id || image.src}-${index}`}
              type="button"
              $active={!isOverflowThumb && activeIndex === index}
              aria-label={isOverflowThumb ? `Open image gallery (${hiddenThumbCount} more)` : `Select ${image.alt}`}
              onClick={() => {
                if (isOverflowThumb) {
                  openGallery();
                  return;
                }

                selectIndex(index);
              }}
            >
              <ThumbImage src={image.thumbnailSrc || image.src} alt="" aria-hidden="true" />
              {isOverflowThumb ? <MoreCountOverlay>+{hiddenThumbCount}</MoreCountOverlay> : null}
            </ThumbButton>
          );
        })}
      </Thumbnails>
    );
  };

  const renderGalleryThumbnails = (position: ThumbnailPosition) => {
    if (!showThumbnails || thumbnailsPosition !== position) {
      return null;
    }

    return (
      <ThumbnailsRail $position={position} $isMobile={isMobile}>
        <ThumbNavButton
          type="button"
          aria-label="Previous thumbnails"
          disabled={!canThumbPrev}
          onClick={() => setThumbStartIndex((current) => Math.max(0, current - 1))}
        >
          {position === 'bottom' ? (
            <ChevronLeftIcon width="1em" height="1em" aria-hidden="true" />
          ) : (
            <ChevronUpIcon width="1em" height="1em" aria-hidden="true" />
          )}
        </ThumbNavButton>

        <Thumbnails
          $position={position}
          $slots={Math.min(maxThumbSlots, safeImages.length - thumbStartIndex)}
          $isMobile={isMobile}
        >
          {safeImages.slice(thumbStartIndex, thumbStartIndex + maxThumbSlots).map((image, index) => {
            const actualIndex = thumbStartIndex + index;

            return (
              <ThumbButton
                key={`thumb-${image.id || image.src}-${actualIndex}`}
                type="button"
                $active={activeIndex === actualIndex}
                aria-label={`Select ${image.alt}`}
                onClick={() => selectIndex(actualIndex)}
              >
                <ThumbImage src={image.thumbnailSrc || image.src} alt="" aria-hidden="true" />
              </ThumbButton>
            );
          })}
        </Thumbnails>

        <ThumbNavButton
          type="button"
          aria-label="Next thumbnails"
          disabled={!canThumbNext}
          onClick={() => setThumbStartIndex((current) => Math.min(maxThumbStart, current + 1))}
        >
          {position === 'bottom' ? (
            <ChevronRightIcon width="1em" height="1em" aria-hidden="true" />
          ) : (
            <ChevronDownIcon width="1em" height="1em" aria-hidden="true" />
          )}
        </ThumbNavButton>
      </ThumbnailsRail>
    );
  };

  const showFooter = showIndicators || (showThumbnails && thumbnailsPosition === 'bottom');

  return (
    <GalleryRoot aria-label={ariaLabel}>
      <GalleryInlineBody $showThumbnails={showThumbnails} $thumbnailsPosition={thumbnailsPosition} $isMobile={isMobile}>
        {renderInlineThumbnails('left')}

        <MainStage>
          {activeImage.badge ? <Badge>{activeImage.badge}</Badge> : null}
          <LikeButton
            type="button"
            $active={isActiveImageLiked}
            aria-label={isActiveImageLiked ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isActiveImageLiked}
            onClick={() => toggleLike(activeImage)}
          >
            <HeartIcon width="1.5em" height="1.5em" aria-hidden="true" />
          </LikeButton>
          <MainImage $clickable src={activeImage.src} alt={activeImage.alt} onClick={openGallery} />
          <NavButton type="button" $side="left" aria-label="Previous image" onClick={() => selectIndex(activeIndex - 1)}>
            <ChevronLeftIcon width="1em" height="1em" aria-hidden="true" />
          </NavButton>
          <NavButton type="button" $side="right" aria-label="Next image" onClick={() => selectIndex(activeIndex + 1)}>
            <ChevronRightIcon width="1em" height="1em" aria-hidden="true" />
          </NavButton>
        </MainStage>

        {renderInlineThumbnails('right')}
      </GalleryInlineBody>

      {showFooter && !isMobile ? (
        <Footer>
          {showIndicators ? (
            <Indicators>
              {safeImages.map((image, index) => (
                <DotButton
                  key={`dot-${image.id || image.src}-${index}`}
                  type="button"
                  aria-label={`Go to image ${index + 1}`}
                  $active={activeIndex === index}
                  onClick={() => selectIndex(index)}
                />
              ))}
            </Indicators>
          ) : null}

          {renderInlineThumbnails('bottom')}
        </Footer>
      ) : null}

      {isGalleryOpen ? (
        <GalleryOverlay role="presentation" onClick={() => setIsGalleryOpen(false)}>
          <GalleryDialog role="dialog" aria-modal="true" aria-label="Image gallery" onClick={(event) => event.stopPropagation()}>
            <GalleryHeader>
              <GalleryTitle text={`${activeIndex + 1} ${ofText} ${safeImages.length}`} />
              <CloseButton type="button" aria-label="Close image gallery" onClick={() => setIsGalleryOpen(false)}>
                <span aria-hidden="true">&#10005;</span>
              </CloseButton>
            </GalleryHeader>

            <GalleryDialogContent>
              <GalleryBody $showThumbnails={showThumbnails} $thumbnailsPosition={thumbnailsPosition} $isMobile={isMobile}>
                {renderGalleryThumbnails('left')}

                <MainStage>
                  {activeImage.badge ? <Badge>{activeImage.badge}</Badge> : null}
                  <LikeButton
                    type="button"
                    $active={isActiveImageLiked}
                    aria-label={isActiveImageLiked ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={isActiveImageLiked}
                    onClick={() => toggleLike(activeImage)}
                  >
                    <HeartIcon width="1.5em" height="1.5em" aria-hidden="true" />
                  </LikeButton>
                  <MainImage src={activeImage.src} alt={activeImage.alt} />
                  <NavButton type="button" $side="left" aria-label="Previous image" onClick={() => selectIndex(activeIndex - 1)}>
                    <ChevronLeftIcon width="1em" height="1em" aria-hidden="true" />
                  </NavButton>
                  <NavButton type="button" $side="right" aria-label="Next image" onClick={() => selectIndex(activeIndex + 1)}>
                    <ChevronRightIcon width="1em" height="1em" aria-hidden="true" />
                  </NavButton>
                </MainStage>

                {renderGalleryThumbnails('right')}
              </GalleryBody>

              {thumbnailsPosition === 'bottom' ? renderGalleryThumbnails('bottom') : null}
            </GalleryDialogContent>
          </GalleryDialog>
        </GalleryOverlay>
      ) : null}
    </GalleryRoot>
  );
};

export default CarouselImageGallery;
