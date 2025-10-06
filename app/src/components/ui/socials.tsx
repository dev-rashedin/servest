import Link from 'next/link';
import { FaDiscord, FaGithub } from '@/data';

const Socials = ({ screenType = 'large' }) => {
  return (
    <div className={`flex-center ${screenType === 'large' ? 'gap-5' : 'gap-8'}`}>
      <Link href="https://github.com/dev-rashedin/servest" target="_blank">
        <FaGithub className="text-xl lg:text-2xl z-10" />
      </Link>
      <Link href="https://discord.gg/AhqDGZj3" target="_blank">
        <FaDiscord className="text-2xl lg:text-3xl z-10" />
      </Link>
    </div>
  );
};
export default Socials;
