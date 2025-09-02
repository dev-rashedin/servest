import { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <div className="h-20 flex-center flex-col bg-[rgb(var(--footer-bg))]">
      <h3 className="text-lg.lg:text-xl">Released under the MIT License</h3>
      <h3 className="text-lg.lg:text-xl">Copyrith @2025 - Rashedin Islam</h3>
    </div>
  );
};
export default Footer;
