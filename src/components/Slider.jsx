import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../css/slider.css";
import { Scrollbar, Autoplay } from "swiper/modules";
//
const Slider = (props) => {
  const sliderImages = props?.data;
  //
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      scrollbar={{
        hide: true,
      }}
      modules={[Autoplay, Scrollbar]}
      className="mySwiper rounded-lg overflow-hidden h-full w-full"
    >
      {sliderImages?.map((item, i) => {
        return (
          <SwiperSlide className="h-full w-full" key={i}>
            <img className="w-full h-full" src={item} alt="item" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
