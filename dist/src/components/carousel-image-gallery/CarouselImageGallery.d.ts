import React from 'react';
import type { Breakpoint } from '../../styles';
export interface CarouselImageItem {
    id?: string;
    src: string;
    alt: string;
    thumbnailSrc?: string;
    badge?: string;
    likeButton?: boolean;
}
export interface CarouselImageGalleryProps {
    images: CarouselImageItem[];
    likeButton?: boolean;
    breakpoint?: Breakpoint;
    initialIndex?: number;
    onImageChange?: (index: number, image: CarouselImageItem) => void;
    showThumbnails?: boolean;
    thumbnailsPosition?: 'left' | 'right' | 'bottom';
    showIndicators?: boolean;
    ariaLabel?: string;
    ofText?: string;
    openOnClick?: boolean;
}
export declare const CarouselImageGallery: React.FC<CarouselImageGalleryProps>;
export default CarouselImageGallery;
