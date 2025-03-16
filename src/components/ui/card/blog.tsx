import Image from 'next/image';
import Link from 'next/link';

// Define blog post type
export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}

// Reusable Blog Card Component
export const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className='flex flex-col gap-4 h-full'>
    <div className='relative overflow-hidden rounded-lg group'>
      <Image
        src={post.image}
        width={0}
        height={0}
        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        alt={post.title}
        className='h-[200px] sm:h-[250px] md:h-[287px] w-full object-cover transition-transform duration-500 group-hover:scale-105'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity'></div>
    </div>

    <p className='text-primary text-sm md:text-base'>{post.date}</p>

    <Link href={`/blog/${post.slug}`} className='group'>
      <h5 className='text-lg md:text-xl font-semibold line-clamp-1 text-primary group-hover:underline'>
        {post.title}
      </h5>
    </Link>

    <p className='text-sm md:text-base text-gray-600 line-clamp-3'>
      {post.excerpt}
    </p>
  </div>
);
