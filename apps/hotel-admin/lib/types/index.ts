/**
 * Re-export shared types from @hotel/lib
 */
export type { validacijaSearchParams, AsyncSearchParams, PagePropsWithSearchParams, Awaited, Language, BasePageProps, MessageType, MessageParams } from '@hotel/lib';

/**
 * App-specific search params types
 */
import { validacijaSearchParams } from '@hotel/lib';

export type RezervacijaSearchParams = validacijaSearchParams<
    'soba' | 'gost' | 'prijava' | 'odjava' | 'broj_osoba' | 'popust' | 'status' |
    'gost_titula' | 'gost_ime' | 'gost_prezime' | 'gost_titula_drugog_gosta' |
    'gost_ime_drugog_gosta' | 'gost_prezime_drugog_gosta' | 'gost_adresa' |
    'gost_grad' | 'gost_drzava' | 'gost_email' | 'gost_telefon' |
    'postojeci_gost' | 'koristi_postojeceg_gosta'
> & {
    id?: string;
    gost_id?: string;
};

export type SobaSearchParams = validacijaSearchParams<
    'broj' | 'tip' | 'kapacitet' | 'cena' | 'opis' | 'slike' | 'tip_en' | 'opis_en'
> & {
    id?: string;
    sobaId?: string;
};

export type AuthSearchParams = validacijaSearchParams<
    'ime' | 'prezime' | 'email' | 'lozinka'
>;

export type GostiSearchParams = validacijaSearchParams<
    'titula' | 'ime' | 'prezime' | 'titula_drugog_gosta' | 'ime_drugog_gosta' | 'prezime_drugog_gosta' | 'adresa' | 'grad' | 'drzava' | 'email' | 'telefon'
> & {
    id?: string;
};
