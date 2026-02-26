import { extractErrors } from '@hotel/lib';
import { RezervacijaSearchParams } from '@/lib/types';
import { Footer } from '@/app/components/footer';
import { DodajRezervacijuForm } from './DodajRezervacijuForm';

interface DodajRezervacijuPageProps {
  searchParams?: Promise<RezervacijaSearchParams>;
  sobe: {
    id: number;
    broj: string;
    tip: string;
    cena: number;
    kapacitet: number;
    opis: string;
    slike: string[];
    tip_en: string;
    opis_en: string;
  }[];
}

export const dynamic = 'force-dynamic';

export default async function DodajRezervacijuPage({
  searchParams,
  sobe,
}: DodajRezervacijuPageProps) {
  const params = (await searchParams) || {};

  const rawErrors = extractErrors(params);
  const errors = Object.fromEntries(
    Object.entries(rawErrors).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : typeof value === 'string' ? [value] : [],
    ])
  ) as Record<string, string[]>;

  return (
    <>
      <DodajRezervacijuForm
        sobe={sobe}
        error={params?.error}
        formDataInitial={params}
        errorsInitial={errors}
      />
      <Footer />
    </>
  );
}