import Link from 'next/link';
import { FaDiscord, FaGithub } from '@/data/icons';

interface SocialsProps {
  screenType?: 'large' | 'small';
}

const Socials = ({ screenType = 'large' }: SocialsProps) => {
  return (
    <div className={`flex-center ${screenType === 'large' ? 'gap-5' : 'gap-8'}`}>
      <Link
        href="https://github.com/dev-rashedin/servest"
        target="_blank"
        className="hover:scale-110 transition-transform duration-300 text-foreground/70 hover:text-foreground"
        aria-label="GitHub"
      >
        <FaGithub className={`${screenType === 'large' ? 'text-xl' : 'text-2xl'} z-10`} />
      </Link>
      <Link
        href="https://discord.com/channels/@dev_rashedin"
        target="_blank"
        className="hover:scale-110 transition-transform duration-300 text-foreground/70 hover:text-foreground"
        aria-label="Discord"
      >
        <FaDiscord className={`${screenType === 'large' ? 'text-2xl' : 'text-3xl'} z-10`} />
      </Link>
    </div>
  );
};
export default Socials;
