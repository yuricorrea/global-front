'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import 'swiper/css';

export default function Wins() {
    return(<div className='w-full text-white mt-4 px-0 border-b bg-[rgba(0,0,0,.2)] 
    backdrop-blur-md border-[rgba(0,0,0,.2)] wins-item lg:hidden 2xl:hidden xl:hidden'>
        <Swiper className='w-full'
            loop={true}
            speed={5000}
            spaceBetween={10}
            slidesPerView={2}
            autoplay={{
                delay:0, 
                reverseDirection: true,
                disableOnInteraction:false,
            }} 
            modules={[Autoplay, Pagination, Navigation]}>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Junior Prado</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Marcos Nunes</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Juliana Morais</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Carlos Muller</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Jamile Novais</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide className="border border-[#5050506b] py-2 pr-2 flex items-center justify-between rounded-md">
                <div className="flex items-center px-1 justify-between">
                    <div className="flex flex-col text-xs ml-2">
                        <span className='whitespace-nowrap'>Amanda Lima</span>
                        <small className="whitespace-nowrap text-green-500">R$ 50.00</small>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/799597328730558464/ks3kVnp-_400x400.jpg" className='max-w-[30px] rounded-md' alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
    </div>)
}