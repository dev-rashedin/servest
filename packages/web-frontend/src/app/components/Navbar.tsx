import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
  return (
    <div className='flex justify-between py-5'>
      <div>
        <Link href='/' className='flex-center gap-2'>
          <Image src='/logo.svg' width={40} height={40} alt='logo' />
          <h1 className='text-2xl font-bold'>Servest</h1>
        </Link>
      </div>
      <div>
        <ul className='flex gap-8'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>Guide</li>
          <li>GitHub</li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar