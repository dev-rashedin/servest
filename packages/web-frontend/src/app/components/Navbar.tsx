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
          <li>
            <Link href='/docs'>Docs</Link>
          </li>
          <li>
            <Link href='/guide'>Guide</Link>
          </li>
          <li>
            <Link href='/blogs'>Blogs</Link>
          </li>
          <li>
            <Link href='/github'>GitHub</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar