import React from 'react';
import { FaChartLine, FaHeadset, FaShieldAlt, FaUserTie } from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className='bg-primary px-5 py-6 rounded-lg shadow-md transition-transform hover:scale-[1.02]'>
    <div className='h-14 w-14 md:h-16 md:w-16 bg-tertiary flex items-center justify-center rounded-full mb-4'>
      {icon}
    </div>
    <div className='text-white'>
      <h3 className='text-lg md:text-xl font-bold mb-2'>{title}</h3>
      <p className='text-sm md:text-base text-white/90 line-clamp-4'>
        {description}
      </p>
    </div>
  </div>
);

const Content2AboutUs = () => {
  // Features with contextual icons
  const features = [
    {
      icon: <FaUserTie className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: 'Professional Experience',
      description:
        'With years of experience in the hotel and property industry, we have the expertise to manage properties optimally and provide guests with an exceptional stay.',
    },
    {
      icon: <FaChartLine className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: 'Real-time Market Analysis',
      description:
        'We use the latest data to set optimal rental prices, ensuring that your property is always attractive and profitable.',
    },
    {
      icon: <FaHeadset className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: '24/7 Customer Service',
      description:
        'Our team is ready to help at any time, ensuring the comfort of guests and property owners without interruption.',
    },
    {
      icon: <FaShieldAlt className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: 'Transparency & Security',
      description:
        'We are committed to providing a clear experience and no hidden fees, making every transaction safe and transparent.',
    },
  ];

  return (
    <section className='py-10 md:py-16 lg:py-20 bg-gray-50'>
      <BaseContainer>
        <div className='flex flex-col gap-10 md:gap-12 lg:gap-16'>
          {/* Section title */}
          <div className='text-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              Why Choose Us?
            </h2>
          </div>

          {/* Content container - fully responsive */}
          <div className='flex flex-col lg:flex-row gap-10 md:gap-12 items-center'>
            {/* Left column - stacks on mobile */}
            <div className='w-full lg:w-[40%] flex flex-col gap-4'>
              <h3 className='text-xl md:text-2xl font-bold text-primary'>
                We Simplify Your Home & Villa Booking Experience
              </h3>
              <p className='text-gray-600 text-base md:text-lg'>
                Our platform connects property owners with travelers seeking
                unique stays in homes and villas. We handle everything from
                marketing to guest management with exceptional care.
              </p>
            </div>

            {/* Right column - feature grid */}
            <div className='w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default Content2AboutUs;
