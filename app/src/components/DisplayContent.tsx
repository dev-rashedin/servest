import Link from 'next/link';
import DisplayHeadings from './DisplayHeadings';
import Divider from './ui/divider';
import RightSidebarPortal from './RightSidebarPortal';
import { getContent } from '@/lib';
import { FiEdit } from '@/data';

interface Props {
  endpoint: string;
  slug: string;
}

const DisplayContent = async ({ endpoint, slug }: Props) => {
  const { content, headings, currentSlug, prevSlug, nextSlug } = await getContent(endpoint, slug);

  const isIndex = slug === 'index' || slug === 'introduction';

  return (
    <>
      <article className="prose prose-lg">{content}</article>

      <DisplayHeadings clientHeadings={headings} />
      <RightSidebarPortal clientHeadings={headings} />

      {/* Previous / Next navigation */}

      <section className="max-w-3xl pt-40 pb-60">
        {/* community */}
        {isIndex && (
          <>
            <Divider />
            <h3 className="text-xl lg:text-2xl font-bold mt-8 pb-4">Community</h3>
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

        <div className={`${isIndex ? 'mt-28' : ''}`}>
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
        <div className="flex justify-between min-h-16">
          {prevSlug && !prevSlug.startsWith('_') ? (
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

          {nextSlug && !nextSlug.startsWith('_') ? (
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
