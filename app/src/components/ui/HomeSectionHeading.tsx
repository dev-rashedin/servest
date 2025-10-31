import { TimelineContent } from './TimelineContent';
import { revealVariants } from '@/lib/utils';

interface HomeSectionHeadingProps {
  title: string;
  subtitle?: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

const HomeSectionHeading = ({ title, subtitle, ref }: HomeSectionHeadingProps) => {
  return (
    <article className="max-w-screen mx-auto text-center space-y-6 mb-16 lg:mb-20">
      <TimelineContent as="h3" animationNum={0} customVariants={revealVariants} timelineRef={ref}>
        {title}
      </TimelineContent>
      {subtitle && (
        <TimelineContent as="h6" animationNum={1} customVariants={revealVariants} timelineRef={ref}>
          {subtitle}
        </TimelineContent>
      )}
    </article>
  );
};
export default HomeSectionHeading;
