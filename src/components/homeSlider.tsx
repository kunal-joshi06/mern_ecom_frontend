import { Navigation, Pagination, Keyboard,EffectCreative} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function HomeSlider() {
  const slides = ['https://static.vecteezy.com/system/resources/previews/004/929/821/non_2x/abstract-wave-fluid-shapes-minimalistic-modern-gradient-background-combined-pastel-light-colors-trendy-template-for-brochure-business-card-landing-page-website-illustration-eps-10-vector.jpg',
                    'https://static.vecteezy.com/system/resources/previews/004/929/821/non_2x/abstract-wave-fluid-shapes-minimalistic-modern-gradient-background-combined-pastel-light-colors-trendy-template-for-brochure-business-card-landing-page-website-illustration-eps-10-vector.jpg',
                    'https://static.vecteezy.com/system/resources/previews/004/929/821/non_2x/abstract-wave-fluid-shapes-minimalistic-modern-gradient-background-combined-pastel-light-colors-trendy-template-for-brochure-business-card-landing-page-website-illustration-eps-10-vector.jpg',
                    'https://static.vecteezy.com/system/resources/previews/004/929/821/non_2x/abstract-wave-fluid-shapes-minimalistic-modern-gradient-background-combined-pastel-light-colors-trendy-template-for-brochure-business-card-landing-page-website-illustration-eps-10-vector.jpg']
  return (
    <div className="h-full overflow-hidden w-full flex ">
      <Swiper
      // install Swiper modules
      modules={[Navigation,Keyboard,Pagination,EffectCreative]}
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      pagination={{clickable: true,}}
      navigation={true}
      keyboard={true}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={index} className="" >
         <img className="object-cover object-top h-full w-full" src={slideContent}/>
        </SwiperSlide>
      ))}
      </Swiper>
      </div>
  )
}

export default HomeSlider