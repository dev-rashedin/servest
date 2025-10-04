import RightSidebar from './RightSidebar';

const DisplayContent = ({
  content,
  headings,
}: {
  content: React.ReactNode;
  headings: { id: string; text: string; level: number }[];
}) => {
  return (
    <>
      <article className="prose prose-lg">{content}</article>
      <RightSidebar clientHeadings={headings} />
    </>
  );
};
export default DisplayContent;
