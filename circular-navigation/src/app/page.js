'use client'
// import Image from 'next/image';
import Navigator from './components/navigator';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Circular Navigator Poc</p>
      <p>Instructions: Hold down right click to open menu, drag mouse to button, release right click to select.</p>
      <Navigator />
    </main>
  );
}
