import Image from 'next/image';
import { ComponentProps } from 'react';

export default function DocsImage(props: ComponentProps<typeof Image>) {
  return (
    <Image {...props} loading="lazy" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
  );
}
