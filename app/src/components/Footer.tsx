import Link from 'next/link';
import { FaDiscord, FaGithub } from '@/data/icons';
import { navItems } from '@/data/constant';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(var(--footer-bg))] border-t border-[rgb(var(--border))] mt-10 sm:mt-16 md:mt-20">
      <div className="boundary py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Servest</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 max-w-md">
              The ultimate backend starter & addon toolkit. Create ready-made backend templates for
              Express, Django, Laravel, and more with a single click.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href="https://github.com/dev-rashedin/servest"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="text-lg sm:text-xl" />
              </Link>
              <Link
                href="https://discord.com/channels/@dev_rashedin"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaDiscord className="text-lg sm:text-xl" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Documentation</h4>
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.to}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="https://github.com/dev-rashedin/servest"
                  target="_blank"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dev-rashedin/servest/issues"
                  target="_blank"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dev-rashedin/servest/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgb(var(--border))] pt-4 sm:pt-6 mt-6 sm:mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {currentYear} Servest. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 md:mt-0">
            Built with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
