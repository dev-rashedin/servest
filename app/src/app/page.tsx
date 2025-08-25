import { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <div className="flex-center flex-col">
      <h1 className="text-3xl text-red-400 font-semibold font-heading">Welcome to servest</h1>
      <p className="mt-2">The fastest way to build your backend</p>
    </div>
  );
}
