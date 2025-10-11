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

declare interface CodeBlockProps {
  code: string;
  language?: string;
  variant?: string;
}

declare interface CopyableCodeBlockProps {
  codeHTML: Record<string, string>;
  isVariants: boolean;
}

declare interface NavItemType {
  label: string;
  to?: string;
  dropdown?: NavItemType[];
  subMenu?: NavItemType[];
}

declare interface ItemProps {
  item: NavItemType;
  pathname: string;
  type?: 'main' | 'sub';
}
