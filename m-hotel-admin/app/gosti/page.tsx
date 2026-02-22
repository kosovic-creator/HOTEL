/* eslint-disable @typescript-eslint/no-explicit-any */
import { ucitajGoste } from '@/actions/gosti';
import { obrisiGosta } from '@/actions/gosti';
import { getLocaleMessages } from '@/i18n/i18n';
import { Metadata } from 'next';
import { Button } from '@hotel/ui/ui/button';
import Link from 'next/link';
import { SuccessMessage, ErrorMessage } from '@hotel/ui/messages/MessageComponents';
import GostiContent from './GostiContent';
import { getRequestLocale } from '@/lib/locale';

export const metadata: Metadata = {
    title: 'Gosti'
};

export default async function GostiPage({ searchParams }: { searchParams: Promise<{ search?: string;[key: string]: string | undefined }> }) {
    const params = await searchParams;
    const search = params.search || '';

    const rawGosti = await ucitajGoste(search);
    const gosti = (rawGosti ?? []).map((r: any) => ({
        ...r,
        titula: r.titula || '',
        ime: r.ime || {},
        prezime: r.prezime || {},
        drzava: r.drzava || '',
        email: r.email,
        telefon: r.mob_telefon || ''
    }));

    const lang = await getRequestLocale();
    const t = getLocaleMessages(lang, 'gosti');
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
                    <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">{t.gosti_lista}</h1>
                    <Link href="/gosti/dodaj">
                        <Button size="lg" className="w-full sm:w-auto">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {t.dodaj_gosta}
                        </Button>
                    </Link>
                </div>

                <GostiContent
                    gosti={gosti}
                    obrisiGosta={obrisiGosta}
                    initialSearch={search}
                />
            </div>
        </>
    );
}