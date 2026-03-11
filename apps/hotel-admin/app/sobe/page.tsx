/* eslint-disable @typescript-eslint/no-explicit-any */
import { ucitajSobe, obrisiSobu } from '@/actions/sobe';
import { Metadata } from 'next';
import { Button } from '@hotel/ui';
import { SuccessMessage, ErrorMessage } from '@/components/messages/MessageComponents';
import SobeContent from './SobeContent';

export const metadata: Metadata = {
  title: 'Sobe'
};

export default async function SobeStrana({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const rawSobe = await ucitajSobe();
  const sobe = (Array.isArray(rawSobe) ? rawSobe : []).map((s: any) => ({
    ...s,
    slike: s.slike ?? ''
  }));

  const params = await searchParams;
  const successParam = params.success;
  const errorParam = params.error;

  return (
    <>
      {successParam && (
        <SuccessMessage message={successParam} />
      )}
      {errorParam && (
        <ErrorMessage message={errorParam} />
      )}
      <div className="w-full py-6 px-2 sm:px-4 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Sobe</h1>
          <Button asChild className="w-full sm:w-auto">
            <a href="/sobe/dodaj">Dodaj novu sobu</a>
          </Button>
        </div>

        <SobeContent
          sobe={sobe}
          obrisiSobu={obrisiSobu}
        />
      </div>
    </>
  );
}