import { getContent } from '@/lib';
import DisplayContent from '@/components/DisplayContent';

export default async function AddonsPage() {
  const { content, headings, slugOrder, currentSlug, prevSlug, nextSlug } = await getContent(
    'addons',
    'index',
  );

  return (
    <DisplayContent
      content={content}
      headings={headings}
      slugOrder={slugOrder}
      currentSlug={currentSlug}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
    />
  );
}
