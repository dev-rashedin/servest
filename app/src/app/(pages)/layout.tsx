export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="wall py-8">{children}</main>;
}
