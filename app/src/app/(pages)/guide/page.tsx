import { getContent } from '@/lib';
import DisplayContent from '@/components/DisplayContent';

export default async function AddonsPage() {
  const { content, headings } = await getContent('guide', 'index');

  return <DisplayContent content={content} headings={headings} />;
}
