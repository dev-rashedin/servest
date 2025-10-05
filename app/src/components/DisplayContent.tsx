import Link from 'next/link';
import RightSidebar from './RightSidebar';
import Divider from './ui/divider';
import { getContent } from '@/lib';
import { FiEdit } from '@/data';

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

      <section className="max-w-3xl min-h-80 py-40">
        {/* community */}
        {slug === 'index' && (
          <>
            <Divider />
            <h3 className="text-xl lg:text-2xl font-bold mt-4 pb-4">Community</h3>
            <p className="w-full text-muted-foreground lg:text-[16px]">
              If you have questions or feedback, reach out to the community at{' '}
              <a
                className="text-brand underline hover:brightness-105"
                href="https://discord.gg/AhqDGZj3"
                target="_blank"
              >
                Discord
              </a>{' '}
              and{' '}
              <a
                className="text-brand underline hover:brightness-105"
                href="https://github.com/dev-rashedin/servest/discussions"
                target="_blank"
              >
                GitHub Discussions
              </a>
              .
            </p>
          </>
        )}

        <div className="mt-20 mb-6">
          <Link
            href={`https://github.com/dev-rashedin/servest/edit/main/docs/${endpoint}/${currentSlug}.mdx`}
            target="_blank"
            className="flex items-center gap-4 text-brand"
          >
            <FiEdit />
            Suggest changes to this page
          </Link>
        </div>

        <Divider />

        {/* next and previous button */}
        <div className="flex justify-between mt-12 min-h-16">
          {prevSlug ? (
            <Link
              href={`/${endpoint}/${prevSlug === 'index' ? '' : prevSlug}`}
              className="next-previous-btn"
            >
              <span className="text-sm text-muted-highlight">Previous Page</span>
              <span className="text-brand">
                {prevSlug === 'index'
                  ? 'Overview'
                  : prevSlug.charAt(0).toUpperCase() + prevSlug.slice(1)}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextSlug ? (
            <Link
              href={`/${endpoint}/${nextSlug === 'index' ? '' : nextSlug}`}
              className="next-previous-btn items-end"
            >
              {' '}
              <span className="text-sm text-muted-highlight">Next Page</span>
              <span className="text-brand">
                {nextSlug.charAt(0).toUpperCase() + nextSlug.slice(1)}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
};

export default DisplayContent;
