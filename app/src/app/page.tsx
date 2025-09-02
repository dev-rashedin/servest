import { Spotlight } from '@/components/ui/spotlight-new';

export default function Home() {
  return (
    <div className="flex-center flex-col pt-40">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <h1 className="text-3xl text-red-400 font-semibold font-heading">Welcome to servest</h1>
      <p className="mt-2">The fastest way to build your backend</p>
    </div>
  );
}
