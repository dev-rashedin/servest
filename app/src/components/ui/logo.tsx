import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ type }: { type: string }) => {
  return (
    <div>
      <Link
        href="/"
        className={`flex items-center gap-2 group group-hover:scale-105 h-20 ${type === 'sidebar' ? 'lg:hidden' : ''}`}
      >
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        <span className="font-heading font-extrabold text-2xl tracking-tight text-brand">
          Servest
        </span>
      </Link>
    </div>
  );
};
export default Logo;
