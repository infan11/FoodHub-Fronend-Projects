
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='relative'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    
                }}


                className="mySwiper  "
            >
                <SwiperSlide>

                    <div className=' '>
                        <img src="https://i.ibb.co.com/MCd7jXg/HOME1.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' '>
                        <img src="https://i.ibb.co.com/xjTbNcp/home2.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' '>
                        <img src="https://i.ibb.co.com/YkRCTV7/home3.png" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' '>
                        <img src="https://i.ibb.co.com/XWzByRJ/home4.png" alt="" />
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;