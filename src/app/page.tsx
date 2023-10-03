import Image from 'next/image';
import deskDivider from '/public/images/pattern-divider-desktop.svg';
import mobileDivider from '/public/images/pattern-divider-mobile.svg';
import dice from '/public/images/icon-dice.svg';

async function getData() {
  const res = await fetch('https://api.adviceslip.com/advice', {
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const advice = await getData();

  return (
    <main className='min-h-screen grid place-content-center'>
      <section className='text-center mx-auto max-w-sm w-[90%] bg-slate-500 p-6 rounded-xl h-fit '>
        <h1 className='text-xs'>Advise #{advice.slip.id}</h1>
        <p className='text-xl py-6'> {advice.slip.advice} </p>
        <div>
          <Image
            src={mobileDivider}
            alt='mobile divider py-6'
            className='md:hidden'
          />
          <Image
            src={deskDivider}
            alt='desk divider'
            className='hidden md:block py-6'
          />
        </div>
        <div className='grid place-content-center absolute left-[50%]'>
          <Image src={dice} alt='dice' className='relative ' />
        </div>
      </section>
    </main>
  );
}
