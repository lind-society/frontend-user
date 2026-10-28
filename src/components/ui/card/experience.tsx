import Image from 'next/image';
import Link from 'next/link';

interface ExperienceCardProps {
  title: string;
  count: string;
  image: string;
  href?: string;
}

/**
 * Experience tile from the redesign: a tall image with the caption set below
 * it — title in bronze, qualifier in muted ink — rather than overlaid.
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  count,
  image,
  href = '/tourist-activity',
}) => (
  <Link href={href} className='group flex flex-col gap-3'>
    <div className='relative aspect-[4/5] w-full overflow-hidden'>
      <Image
        src={image}
        alt={title}
        fill
        sizes='(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 20vw'
        className='object-cover transition-transform duration-500 group-hover:scale-105'
      />
    </div>

    <div className='flex flex-col'>
      <span className='font-heading text-lg font-semibold text-bronze-600 transition-colors group-hover:text-bronze-700'>
        {title}
      </span>
      <span className='text-sm text-ink-soft'>{count}</span>
    </div>
  </Link>
);
