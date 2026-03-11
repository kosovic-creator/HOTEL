import prisma from '@hotel/lib/prisma';
import DodajRezervacijuPage from './page';

export default async function DodajRezervacijuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sobe = await prisma.soba.findMany();

  return <DodajRezervacijuPage sobe={sobe} />;
}
