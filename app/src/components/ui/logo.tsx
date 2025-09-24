import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`
        flex items-center gap-2 group h-full transition-all duration-300 ease-in-out hover:scale-105
        ${className}
      `}
    >
      <div className="relative overflow-hidden">
        <Image
          src="/logo.svg"
          width={40}
          height={40}
          alt="logo"
          className="transition-transform duration-300 hover:rotate-6"
        />
      </div>
      <span className="font-heading font-extrabold text-2xl tracking-tight text-brand transition-colors duration-300 hover:text-glow-hover">
        Servest
      </span>
    </Link>
  );
};
export default Logo;
