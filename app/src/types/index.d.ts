interface LinkItem {
  type: 'group' | 'link';
  slug?: string;
  label: string;
}

declare interface DrawerProps {
  links: LinkItem[];
  type: string;
}

declare interface Heading {
  id: string;
  text: string;
  level: number;
}
