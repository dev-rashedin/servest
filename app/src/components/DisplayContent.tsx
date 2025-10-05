import Link from 'next/link';
import RightSidebar from './RightSidebar';
import { getContent } from '@/lib';

interface Props {
  endpoint: string;
  slug: string;
}

const DisplayContent = async ({ endpoint, slug }: Props) => {
  const { content, headings, slugOrder, currentSlug, prevSlug, nextSlug } = await getContent(
    endpoint,
    slug,
  );

  console.log('inside display content', endpoint, currentSlug, prevSlug, nextSlug, slugOrder);

  return (
    <>
      <article className="prose prose-lg">{content}</article>

      <RightSidebar clientHeadings={headings} />

      {/* Previous / Next navigation */}
      <div className="max-w-4xl  flex justify-between mt-20 mb-40  min-h-16 pr-20 xl:pr-40">
        {prevSlug ? (
          <Link
            href={`/${endpoint}/${prevSlug === 'index' ? '' : prevSlug}`}
            className="text-muted-foreground hover:text-brand transition-colors border flex-center px-12 py-0 border-white rounded-lg"
          >
            ← {prevSlug}
          </Link>
        ) : (
          <div />
        )}

        {nextSlug ? (
          <Link
            href={`/${endpoint}/${nextSlug === 'index' ? '' : nextSlug}`}
            className="text-muted-foreground hover:text-brand transition-colors border flex-center px-12 py-0 border-white rounded-lg"
          >
            {nextSlug} →
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="h-80 mt-20">
        <div className="h-[2px] border-t border-muted pb-8"></div>

        <h2 className="text-2xl font-bold mt-4 pb-4">Community</h2>
        <div className="text-muted-foreground text-[16px]">
          If you have questions or need help, reach out to the community at{' '}
          <a
            className="text-brand underline hover:brightness-105 mr-2"
            href="https://discord.gg/AhqDGZj3"
            target="_blank"
          >
            Discord
          </a>
          and
          <a
            className="text-brand underline hover:brightness-105 ml-2"
            href="https://github.com/dev-rashedin/servest/discussions"
            target="_blank"
          >
            GitHub Discussions
          </a>
        </div>
      </div>
    </>
  );
};

export default DisplayContent;
