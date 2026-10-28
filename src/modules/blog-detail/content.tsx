import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaShare,
  FaTag,
  FaTwitter,
  FaUser,
} from 'react-icons/fa';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui/card/blog';

import { blogPosts } from '@/modules/landing-page/constant';

const ContentBlogDetail = () => {
  // Sample blog post data
  const post = {
    title: 'The Ultimate Guide to Buying a House in Bali',
    date: 'April 15, 2023',
    author: 'Sarah Johnson',
    category: 'Property Investment',
    excerpt:
      'Discover everything you need to know about purchasing property in Bali, from legal considerations to finding the perfect location that matches your lifestyle and investment goals.',
    content: [
      {
        type: 'paragraph',
        content:
          'Bali, known as the Island of the Gods, has become one of the most sought-after locations for property investment in Southeast Asia. With its stunning landscapes, rich cultural heritage, and growing expatriate community, many international buyers are looking to purchase their slice of paradise in Bali. However, navigating the property market in a foreign country comes with its unique challenges and considerations.',
      },
      {
        type: 'heading',
        content: 'Understanding Property Ownership in Indonesia',
      },
      {
        type: 'paragraph',
        content:
          "Before diving into the Bali property market, it's crucial to understand the legal framework for foreign ownership in Indonesia. Unlike many Western countries, Indonesia has restrictions on land ownership by foreigners. The most common options for foreign investors include:",
      },
      {
        type: 'list',
        items: [
          'Hak Pakai (Right to Use) - A title that allows foreigners to use land for a specified period, typically 25 years with possible extensions.',
          "Nominee Arrangement - Using an Indonesian citizen's name for property ownership (though this comes with significant legal risks).",
          'PMA Company Ownership - Establishing a foreign investment company (PT PMA) to purchase property.',
          'Leasehold - Long-term lease agreements, usually ranging from 25 to 50 years.',
        ],
      },
      {
        type: 'paragraph',
        content:
          "Recent legal changes have made Hak Pakai a more attractive option for foreigners, providing greater security and longer timeframes. It's essential to work with reputable legal advisors who specialize in Indonesian property law to ensure your investment is protected.",
      },
      {
        type: 'heading',
        content: 'Choosing the Right Location in Bali',
      },
      {
        type: 'paragraph',
        content:
          'Bali offers diverse locations, each with its own character and appeal. Your ideal location depends on your lifestyle preferences and investment goals:',
      },
      {
        type: 'image',
        src: '/images/blog-1.png',
        alt: 'Beautiful villa in Ubud surrounded by rice fields',
        caption:
          'Ubud offers tranquil settings surrounded by lush rice terraces and cultural attractions.',
      },
      {
        type: 'list',
        items: [
          'Seminyak and Canggu - Popular with expatriates and tourists, offering vibrant nightlife, beaches, and strong rental potential.',
          'Ubud - Cultural center of Bali, known for its artistic community, cooler climate, and lush landscapes.',
          'Uluwatu - Upscale area with stunning cliff-top properties and world-class surfing beaches.',
          'Sanur - Family-friendly area with a more relaxed atmosphere and beautiful sunrise views.',
          'Nusa Dua - Luxury resort area with pristine beaches and excellent infrastructure.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Consider factors such as proximity to amenities, infrastructure quality, flooding risks during rainy seasons, and access to transportation when selecting your location.',
      },
      {
        type: 'heading',
        content: 'The Buying Process and Due Diligence',
      },
      {
        type: 'paragraph',
        content:
          "Once you've selected a property, thorough due diligence is essential before proceeding with the purchase. This includes:",
      },
      {
        type: 'list',
        items: [
          'Verifying the legitimacy of land certificates and ownership history',
          'Checking for any encumbrances or disputes related to the property',
          'Reviewing spatial planning regulations to ensure the property complies with zoning laws',
          'Conducting a building inspection to assess structural integrity and quality',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Working with a reputable real estate agent who understands both the local market and the needs of foreign buyers can be invaluable in navigating this process. They can help identify suitable properties, negotiate prices, and connect you with legal professionals.',
      },
      {
        type: 'image',
        src: '/images/blog-3.jpeg',
        alt: 'Modern villa with infinity pool overlooking the ocean in Bali',
        caption:
          'Many buyers are attracted to properties with spectacular ocean views and modern amenities.',
      },
      {
        type: 'heading',
        content: 'Costs and Taxation',
      },
      {
        type: 'paragraph',
        content:
          'Beyond the property purchase price, buyers should budget for additional costs including:',
      },
      {
        type: 'list',
        items: [
          'Transfer tax (BPHTB) - Approximately 5% of the property value',
          'Notary fees - Around 1% of the transaction value',
          'Land deed registration fee - Approximately 1%',
          'Legal fees for document review and preparation',
          'Annual property tax (PBB) - Generally very reasonable compared to Western countries',
        ],
      },
      {
        type: 'paragraph',
        content:
          "It's also important to understand Indonesia's tax regulations regarding rental income if you plan to rent out your property when not in residence.",
      },
      {
        type: 'heading',
        content: 'Conclusion',
      },
      {
        type: 'paragraph',
        content:
          'Buying property in Bali can be a rewarding investment that provides both lifestyle benefits and potential financial returns. However, the process requires careful planning, thorough due diligence, and professional guidance to navigate the legal complexities. By understanding ownership structures, selecting the right location, and working with experienced professionals, you can make your dream of owning a slice of paradise in Bali a reality.',
      },
    ],
  };

  // Function to render content based on its type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <p key={index} className='text-text text-base md:text-lg mb-6'>
            {item.content}
          </p>
        );
      case 'heading':
        return (
          <h3
            key={index}
            className='text-xl md:text-2xl font-semibold text-primary mb-4 mt-8'
          >
            {item.content}
          </h3>
        );
      case 'list':
        return (
          <ul key={index} className='list-disc pl-6 mb-6 space-y-2 text-text'>
            {item.items.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className='text-base md:text-lg'>
                {listItem}
              </li>
            ))}
          </ul>
        );
      case 'image':
        return (
          <figure key={index} className='my-8 block'>
            <div className='rounded overflow-hidden'>
              <Image
                src={item.src}
                alt={item.alt}
                width={0}
                height={0}
                sizes='100vw'
                className='w-full object-contain mx-auto max-h-[400px]'
              />
            </div>
            {item.caption && (
              <figcaption className='text-sm text-text/80 mt-2 italic text-center'>
                {item.caption}
              </figcaption>
            )}
          </figure>
        );
      default:
        return null;
    }
  };

  return (
    <div className='py-8 md:py-12 lg:py-16 bg-bg'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              {
                label: 'The Ultimate Guide to Buying a House in Bali',
                href: '/blog/the-ultimate-guide-to-buying-a-house-in-bali',
                isActive: true,
              },
            ]}
          />

          <article className='flex flex-col gap-8 max-w-[1000px] mx-auto '>
            {/* Header */}
            <header className='flex flex-col gap-4'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary'>
                {post.title}
              </h1>
              <p className='text-base md:text-lg text-text/90'>
                {post.excerpt}
              </p>

              {/* Meta information */}
              <div className='flex flex-wrap gap-4 text-sm text-text/70'>
                <div className='flex items-center gap-1'>
                  <FaCalendarAlt className='text-primary' />
                  <span>{post.date}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <FaUser className='text-primary' />
                  <span>{post.author}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <FaTag className='text-primary' />
                  <span>{post.category}</span>
                </div>
              </div>
            </header>

            {/* Social sharing */}
            <div className='flex justify-between items-center w-full border-y border-bronze/25 py-4'>
              <div className='flex gap-2 items-center'>
                <a
                  href='#'
                  className='flex items-center justify-center rounded bg-primary w-10 h-10 text-cream hover:bg-primary/90 transition-colors'
                  aria-label='Share on Instagram'
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href='#'
                  className='flex items-center justify-center rounded bg-primary w-10 h-10 text-cream hover:bg-primary/90 transition-colors'
                  aria-label='Share on Twitter'
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href='#'
                  className='flex items-center justify-center rounded bg-primary w-10 h-10 text-cream hover:bg-primary/90 transition-colors'
                  aria-label='Share on Facebook'
                >
                  <FaFacebook size={20} />
                </a>
              </div>
              <Button
                variant='primary-outline'
                className='flex items-center gap-2'
              >
                <span>Share</span>
                <FaShare size={16} />
              </Button>
            </div>

            {/* Featured image */}
            <figure className='my-6'>
              <div className='rounded overflow-hidden'>
                <Image
                  src='/images/blog-2.jpeg'
                  width={1000}
                  height={600}
                  sizes='(max-width: 1000px) 100vw, 1000px'
                  className='w-full max-h-[580px] object-cover'
                  alt='Luxury villa in Bali with swimming pool and ocean view'
                  priority
                />
              </div>
            </figure>

            {/* Article content */}
            <div className='text-left'>
              {post.content.map((item, index) => renderContent(item, index))}
            </div>
          </article>

          {/* Related articles section */}
          <section className='mt-8 pt-8 border-t border-bronze/25'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <h2 className='text-xl md:text-2xl font-semibold text-primary'>
                  Related Articles
                </h2>
                <Button variant='primary-outline' asChild>
                  <Link href='/blog' className='flex gap-2 items-center'>
                    <span>View All</span>
                    <RiArrowRightUpLine size={20} />
                  </Link>
                </Button>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {blogPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentBlogDetail;
