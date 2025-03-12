'use client';

import Image from 'next/image';
import NewsLetter from '@/components/NewsLetter';
import { assets } from '@/assets/assets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
    return (
       
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                
                <div className="w-full flex flex-col items-center pt-12">
                    <p className="text-2xl font-medium text-center">About Us</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>
            
                
            

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <Image
                    className='w-full md:max-w-[450px]'
                    src={assets.about_img}
                    alt='about_img'
                    width={450}
                    height={300}
                    priority
                />
                <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui accusantium deserunt voluptates?Lorem ipsum dolor sit amet, consectetur adipisicing Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam atque libero incidunt dolorem, odio cupiditate temporibus doloremque obcaecati illum autem ipsa labore. Blanditiis. elit. Cum minima ad ducimus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vitae delectus, odit pariatur impedit cumque perspiciatis molestiae soluta provident asperiores eum fugiat similique consequatur deleniti odio ut unde nostrum repellendus vero voluptates.</p>
                    <b className='text-gray-800 mb-[-10px]'>Our Mission</b>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi quisquam minus repellendus aut itaque eos eveniet amet inventore, id expedita quia atque mollitia!</p>
                </div>
            </div>

            
                <div className="flex flex-col items-end pt-12 mb-5">
                    <p className="text-2xl font-end">Why CHOOSE US </p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                {[
                    { title: 'Quality Assurance', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, cupiditate.' },
                    { title: 'Convenience', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, cupiditate.' },
                    { title: 'Exceptional Customer Service', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, cupiditate.' }
                ].map((item, index) => (
                    <div key={index} className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>{item.title}:</b>
                        <p className='text-gray-600'>{item.text}</p>
                    </div>
                ))}
            </div>
            </div>

            <NewsLetter/>
            <Footer/>
        </>
    );
};

export default About;
