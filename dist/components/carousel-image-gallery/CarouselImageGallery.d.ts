import React from 'react';
export interface CarouselImageItem {
    id?: string;
    src: string;
    alt: string;
    thumbnailSrc?: string;
    badge?: string;
}
export interface CarouselImageGalleryProps {
    images: CarouselImageItem[];
    initialIndex?: number;
    onImageChange?: (index: number, image: CarouselImageItem) => void;
    showThumbnails?: boolean;
    showIndicators?: boolean;
    ariaLabel?: string;
}
export declare const CarouselImageGallery: React.FC<CarouselImageGalleryProps>;
export default CarouselImageGallery;
