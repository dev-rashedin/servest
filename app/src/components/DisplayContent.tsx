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

      <div className="h-80 mt-40">
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
