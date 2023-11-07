import React, { useCallback } from 'react'
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType
} from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'



const EmblaCarousel: React.FC = () => {

  const slides = ['https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaCUyMGdhZGdldHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1515940175183-6798529cb860?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGdhZGdldHN8ZW58MHx8MHx8fDA%3D',
    'https://cdn.wallpapersafari.com/22/11/UfztRb.jpg',
    'https://images6.alphacoders.com/133/1331511.png']

  const options: EmblaOptionsType = { dragFree: true, loop: true }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  )

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((url,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={url}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel
