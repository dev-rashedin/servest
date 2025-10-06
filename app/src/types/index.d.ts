interface LinkItem {
  slug: string;
  label: string;
}

declare interface DrawerProps {
  links: LinkItem[];
  type: string;
}

declare interface SidebarProps extends DrawerProps {
  setSidebarOpen?: (v: boolean) => void;
}

declare interface Heading {
  id: string;
  text: string;
  level: number;
}
