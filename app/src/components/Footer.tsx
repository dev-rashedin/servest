import { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <footer className="h-28 flex-center flex-col gap-2 py-4 bg-[rgb(var(--footer-bg))] ">
      <h3 className="font-bold text-[rgb(var(--muted-foreground))] opacity-80">
        Released under the MIT License
      </h3>
      <h3 className="max-w-sm mx-auto text-sm text-center leading-loose tracking-wider text-[rgb(var(--muted-foreground))] opacity-80">
        Copyright @ 2025-present Rashedin Islam & Servest Contributors
      </h3>
    </footer>
  );
};
export default Footer;
