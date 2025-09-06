import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group group-hover:brightness-110">
      <Image src="/logo.svg" width={40} height={40} alt="logo" />
      <span className="font-heading font-extrabold text-2xl tracking-tight text-brand">
        Servest
      </span>
    </Link>
  );
};
export default Logo;
