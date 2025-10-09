'use client';

import dynamic from 'next/dynamic';

// Dynamic import of your actual client-only code block
const CodeBlockClient = dynamic(() => import('./CodeBlockClient'), {
  ssr: false,
});

export default CodeBlockClient;
