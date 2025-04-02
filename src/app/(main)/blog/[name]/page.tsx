/* eslint-disable unused-imports/no-unused-vars */
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import BlogDetailModules from '@/modules/blog-detail';

type Props = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name } = await params;

  try {
    // const response = await getArticleDetailRequest(name);
    // const article = response.data;

    // const previousImages = (await parent).openGraph?.images || [];

    return {
      // title: article.title,
      title: name,
      // description:
      //   article.content.replace(/<[^>]*>/g, '').slice(0, 155) + '...',
      // openGraph: {
      //   images: [article.image_url, ...previousImages],
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  // eslint-disable-next-line no-console
  console.log('name', name);
  try {
    return <BlogDetailModules />;
  } catch (error) {
    notFound();
  }
}
