import Image from 'next/image';

// Reusable card component to reduce repetition while maintaining layout
interface ExperienceCardProps {
  title: string;
  count: string;
  image: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  count,
  image,
}) => (
  <div className='relative h-[300px] md:h-full w-full rounded-sm overflow-hidden group'>
    {/* Image with proper gradient overlay */}
    <div className='absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-black/0 to-black/80'></div>
    <Image
      src={image}
      alt={`${title} - Discover Unforgettable Experiences`}
      fill
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
      className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
    />

    {/* Location text overlay */}
    <div className='absolute bottom-0 left-0 z-20 p-3 md:p-5 flex flex-col text-white gap-1 md:gap-2'>
      <p className='text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap'>
        {title}
      </p>
      <p className='text-xs md:text-sm lg:text-base font-normal line-clamp-1 text-end'>
        {count}
      </p>
    </div>
  </div>
);
