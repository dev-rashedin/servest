import DisplayContent from '@/components/DisplayContent';
import { getContent } from '@/lib';

export default async function ConfigPage() {
  const { content, headings, slugOrder, currentSlug, prevSlug, nextSlug } = await getContent(
    'config',
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
