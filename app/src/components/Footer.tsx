import { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <footer className="h-28 flex-center flex-col gap-2 py-4 bg-[rgb(var(--footer-bg))] ">
      <h3 className=" font-bold opacity-75">Released under the MIT License</h3>
      <h3 className="text-sm leading-loose tracking-wider opacity-75">
        Copyrith @ 2025-present Rashedin Islam & Servest Contributors
      </h3>
    </footer>
  );
};
export default Footer;
