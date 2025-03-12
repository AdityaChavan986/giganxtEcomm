'use client';

import Image from 'next/image';
import NewsLetter from '@/components/NewsLetter';
import { assets } from '@/assets/assets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
    return (

        <>
            <Navbar />
            <div className="flex flex-col items-center px-6 md:px-16 lg:px-32">

                <div className="w-full flex flex-col items-center pt-12">
                    <p className="text-2xl font-medium text-center">About Us</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                <div className='flex items-center justify-center my-10 mb-28'>
                    <div className='flex flex-col md:flex-row gap-10 w-full max-w-4xl'>
                        <Image
                            className='w-full md:max-w-[480px]'
                            src={assets.contact_img}
                            alt="contact_img"
                        />
                        <div className='flex flex-col justify-center items-start gap-6'>
                            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                            <p className='text-gray-500'>Add Address Lorem, ipsum dolor. <br />Lorem ipsum dolor sit.</p>
                            <p className='text-gray-500'>
                                <span className='block'>Tel: 9898986438</span>
                                <span className='block'>Email: test@giganxt.com</span>
                            </p>
                            <p className='font-semibold text-xl text-gray-600'>Careers at Giganxt</p>
                            <p className='text-gray-500'>Learn more about our teams and job openings</p>
                            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300'>
                                Explore Jobs
                            </button>
                        </div>
                    </div>
                </div>

                
            </div>

            <NewsLetter />
            <Footer />
        </>
    );
};

export default Contact;
