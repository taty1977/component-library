import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles'
import { CarouselImageGallery } from '../CarouselImageGallery'

const images = [
  { id: '1', src: 'https://example.com/1.jpg', alt: 'Image one' },
  { id: '2', src: 'https://example.com/2.jpg', alt: 'Image two' },
  { id: '3', src: 'https://example.com/3.jpg', alt: 'Image three' },
  { id: '4', src: 'https://example.com/4.jpg', alt: 'Image four' },
  { id: '5', src: 'https://example.com/5.jpg', alt: 'Image five' },
  { id: '6', src: 'https://example.com/6.jpg', alt: 'Image six' },
  { id: '7', src: 'https://example.com/7.jpg', alt: 'Image seven' },
  { id: '8', src: 'https://example.com/8.jpg', alt: 'Image eight' },
  { id: '9', src: 'https://example.com/9.jpg', alt: 'Image nine' },
  { id: '10', src: 'https://example.com/10.jpg', alt: 'Image ten' },
]

const overflowImages = Array.from({ length: 30 }, (_, index) => {
  const id = `${index + 1}`

  return {
    id,
    src: `https://example.com/${id}.jpg`,
    alt: `Image ${id}`,
  }
})

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('CarouselImageGallery', () => {
  test('renders fallback when no images are provided', () => {
    renderWithTheme(<CarouselImageGallery images={[]} />)
    expect(screen.getByText(/no product images available/i)).toBeInTheDocument()
  })

  test('renders first image by default', () => {
    renderWithTheme(<CarouselImageGallery images={images} />)
    expect(screen.getByRole('button', { name: /open image gallery: image one/i })).toBeInTheDocument()
  })

  test('provides fallback accessible text when an image alt is empty', () => {
    renderWithTheme(<CarouselImageGallery images={[{ src: 'https://example.com/untitled.jpg', alt: '   ' }]} />)
    expect(screen.getByRole('button', { name: /open image gallery: product image 1/i })).toBeInTheDocument()
  })

  test('opens gallery when main image is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    await user.click(screen.getByRole('button', { name: /open image gallery: image one/i }))
    expect(screen.getByRole('dialog', { name: /image gallery/i })).toBeInTheDocument()
  })

  test('opens gallery when the active image is activated with the keyboard', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    const image = screen.getByRole('button', { name: /open image gallery: image one/i })
    image.focus()
    await user.keyboard('[Enter]')

    expect(screen.getByRole('dialog', { name: /image gallery/i })).toBeInTheDocument()
  })

  test('does not make the main image open the modal when disabled', () => {
    renderWithTheme(<CarouselImageGallery images={images} openOnClick={false} />)

    expect(screen.getByRole('img', { name: /image one/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^open image gallery:/i })).not.toBeInTheDocument()
  })

  test('dialog is labeled and closes on Escape', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    await user.click(screen.getByRole('button', { name: /open image gallery: image one/i }))
    const dialog = screen.getByRole('dialog', { name: /image gallery/i })

    expect(dialog).toHaveAttribute('aria-labelledby')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /image gallery/i })).not.toBeInTheDocument()
  })

  test('toggles like button state when clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    const likeButton = screen.getByRole('button', { name: /add to favorites/i })
    expect(likeButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(likeButton)
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toHaveAttribute('aria-pressed', 'true')
  })

  test('hides the like button when disabled', () => {
    renderWithTheme(<CarouselImageGallery images={images} likeButton={false} />)
    expect(screen.queryByRole('button', { name: /add to favorites/i })).not.toBeInTheDocument()
  })

  test('moves to next image when next button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    await user.click(screen.getByRole('button', { name: /next image/i }))
    expect(screen.getByRole('button', { name: /open image gallery: image two/i })).toBeInTheDocument()
  })

  test('selects image when thumbnail is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} />)

    await user.click(screen.getByRole('button', { name: /select image three/i }))
    expect(screen.getByRole('button', { name: /open image gallery: image three/i })).toBeInTheDocument()
  })

  test('calls onImageChange on navigation', async () => {
    const user = userEvent.setup()
    const onImageChange = jest.fn()
    renderWithTheme(<CarouselImageGallery images={images} onImageChange={onImageChange} />)

    await user.click(screen.getByRole('button', { name: /next image/i }))

    expect(onImageChange).toHaveBeenCalledTimes(1)
    expect(onImageChange).toHaveBeenCalledWith(1, images[1])
  })

  test.each(['left', 'right'] as const)('supports %s thumbnail position', async thumbnailsPosition => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={images} thumbnailsPosition={thumbnailsPosition} />)

    await user.click(screen.getByRole('button', { name: /select image three/i }))
    expect(screen.getByRole('button', { name: /open image gallery: image three/i })).toBeInTheDocument()
  })

  test('shows +N thumbnail and no thumbnail arrows in inline view', () => {
    renderWithTheme(<CarouselImageGallery images={overflowImages} thumbnailsPosition='bottom' />)

    expect(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /previous thumbnails/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next thumbnails/i })).not.toBeInTheDocument()
  })

  test.each(['left', 'right'] as const)('shows +N thumbnail in inline view for %s position', thumbnailsPosition => {
    renderWithTheme(<CarouselImageGallery images={overflowImages} thumbnailsPosition={thumbnailsPosition} />)

    expect(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /previous thumbnails/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next thumbnails/i })).not.toBeInTheDocument()
  })

  test('shows thumbnail arrows in open gallery and selects hidden image', async () => {
    const user = userEvent.setup()
    renderWithTheme(<CarouselImageGallery images={overflowImages} thumbnailsPosition='bottom' />)

    await user.click(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i }))
    const galleryDialog = screen.getByRole('dialog', { name: /image gallery/i })
    expect(galleryDialog).toBeInTheDocument()

    const nextThumbsButton = screen.getByRole('button', { name: /next thumbnails/i })
    for (let i = 0; i < 30 && !screen.queryByRole('button', { name: /select image 30/i }); i += 1) {
      await user.click(nextThumbsButton)
    }

    await user.click(screen.getByRole('button', { name: /select image 30/i }))
    expect(within(galleryDialog).getByRole('img', { name: /image 30/i })).toBeInTheDocument()
  }, 15000)

  test.each(['left', 'right'] as const)(
    'shows thumbnail arrows in open gallery and selects hidden image for %s position',
    async thumbnailsPosition => {
      const user = userEvent.setup()
      renderWithTheme(<CarouselImageGallery images={overflowImages} thumbnailsPosition={thumbnailsPosition} />)

      await user.click(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i }))
      const galleryDialog = screen.getByRole('dialog', { name: /image gallery/i })

      const nextThumbsButton = screen.getByRole('button', { name: /next thumbnails/i })
      for (let i = 0; i < 30 && !screen.queryByRole('button', { name: /select image 30/i }); i += 1) {
        await user.click(nextThumbsButton)
      }

      await user.click(screen.getByRole('button', { name: /select image 30/i }))
      expect(within(galleryDialog).getByRole('img', { name: /image 30/i })).toBeInTheDocument()
    },
    15000,
  )
})
