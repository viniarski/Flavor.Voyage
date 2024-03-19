import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png'

export default function Header() {
  return (
    <header className="flex bg-white py-4 px-8 justify-between items-center">
      <div className='flex'>
        <Image src={logo} height={100} width={80} alt='Flavor.Voyage Logo' />
        <h1 className="text-3xl font-bold p-4">Flavor.Voyage</h1>
      </div>
      <nav>
        <ul className='flex gap-8 text-2xl '>
          <Link href={'#'} className='hover:underline hover:underline-offset-8'>Home</Link>
          <Link href={'#'} className='hover:underline hover:underline-offset-8'>Recipes</Link>
          <Link href={'#'} className='hover:underline hover:underline-offset-8'>About</Link>
          <Link href={'#'} className='hover:underline hover:underline-offset-8'>Contact</Link>
        </ul>
      </nav>
    </header>
  );
}
