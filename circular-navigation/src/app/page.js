'use client'
// import Image from 'next/image';
import Navigator from './components/navigator';

const labels = [
  { name: 'Label 1', url: 'https://example.com/1' },
  { name: 'Label 2', url: 'https://example.com/2' },
  { name: 'Label 3', url: 'https://example.com/3' },
  { name: 'Label 4', url: 'https://example.com/4' },
  { name: 'Label 1', url: 'https://example.com/1' },
  { name: 'Label 2', url: 'https://example.com/2' },
  { name: 'Label 3', url: 'https://example.com/3' },
  { name: 'Label 4', url: 'https://example.com/4' },
  // Add more labels as needed
];

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Circular Navigator Poc</p>
      <p>Instructions: Hold down right click to open menu, drag mouse to button, release right click to select.</p>
      <Navigator labelData={labels} />

    </main>
  );
}
