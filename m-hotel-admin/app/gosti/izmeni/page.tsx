import { ucitajGostaId,updateGost} from '@/actions/gosti';
import { FormWrapper, InputField, HiddenField } from '@hotel/ui/form/FormComponents';
import { getLocaleMessages } from '@/i18n/i18n';
import { extractErrors, getFieldValue } from '@/lib/helpers/url';
import { GostiSearchParams } from '@/lib/types/searchParams';
import { getRequestLocale } from '@/lib/locale';

export default async function IzmjeniGostaPage({ searchParams }: { searchParams: Promise<GostiSearchParams> }) {
    const params = await searchParams;
    const lang = await getRequestLocale();
    const t = getLocaleMessages(lang, 'gosti');
    const commonMessages = getLocaleMessages(lang, 'common');
    const id = Number(params.id || params.id);

    if ((!params.id && !params.id) || isNaN(id)) {
        return <div>{t.neispravan_gost_id}</div>;
    }

    const gost = await ucitajGostaId({ gostId: id });
    if (!gost) {
        return <div>{t.gost_nije_pronadjen}</div>;
    }

    const errors = extractErrors(params);

    const formData: Record<string, string> = {
        titula: getFieldValue(params?.titula, gost.titula),
       ime: getFieldValue(params?.ime, gost.ime),
       prezime: getFieldValue(params?.prezime, gost.prezime),
        titula_drugog_gosta: getFieldValue(params?.titula_drugog_gosta, gost.titula_drugog_gosta || ''),
        ime_drugog_gosta: getFieldValue(params?.ime_drugog_gosta, gost.ime_drugog_gosta || ''),
        prezime_drugog_gosta: getFieldValue(params?.prezime_drugog_gosta, gost.prezime_drugog_gosta || ''),
        adresa: getFieldValue(params?.adresa, gost.adresa || ''),
        grad: getFieldValue(params?.grad, gost.grad || ''),
        drzava: getFieldValue(params?.drzava, gost.drzava),
        email: getFieldValue(params?.email, gost.email),
        telefon: getFieldValue(params?.telefon, gost.mob_telefon || ''),
    };

    return (
        <FormWrapper
            title={`${t.uredi_gosta} - ID: ${gost.id}`}
            action={updateGost}
            submitLabel={t.uredi_gosta}
            cancelLabel={t.otkazi}
            cancelHref="/gosti"
            description={commonMessages.form_description}
        >
            <HiddenField name="id" value={gost.id} />

            <InputField
                name="titula"
                label={t.titula}
                placeholder={t.titula}
                required
                defaultValue={formData.titula}
                error={errors.titula}
            />

            <InputField
                name="ime"
                label={t.ime}
                placeholder={t.ime}
                required
                defaultValue={formData.ime}
                error={errors.ime}
            />

            <InputField
                name="prezime"
                label={t.prezime}
                placeholder={t.prezime}
                required
                defaultValue={formData.prezime}
                error={errors.prezime}
            />

            <InputField
                name="titula_drugog_gosta"
                label={t.titula_drugog_gosta}
                placeholder={t.titula_drugog_gosta}
                defaultValue={formData.titula_drugog_gosta}
                error={errors.titula_drugog_gosta}
            />

            <InputField
                name="ime_drugog_gosta"
                label={t.ime_drugog_gosta}
                placeholder={t.ime_drugog_gosta}
                defaultValue={formData.ime_drugog_gosta}
                error={errors.ime_drugog_gosta}
            />

            <InputField
                name="prezime_drugog_gosta"
                label={t.prezime_drugog_gosta}
                placeholder={t.prezime_drugog_gosta}
                defaultValue={formData.prezime_drugog_gosta}
                error={errors.prezime_drugog_gosta}
            />

            <InputField
                name="adresa"
                label={t.adresa}
                placeholder={t.adresa}
                defaultValue={formData.adresa}
                error={errors.adresa}
            />

            <InputField
                name="grad"
                label={t.grad}
                placeholder={t.grad}
                defaultValue={formData.grad}
                error={errors.grad}
            />

            <InputField
                name="drzava"
                label={t.drzava}
                placeholder={t.drzava}
                required
                defaultValue={formData.drzava}
                error={errors.drzava}
            />

            <InputField
                name="email"
                label={t.email}
                placeholder={t.email}
                required
                defaultValue={formData.email}
                error={errors.email}
            />

            <InputField
                name="telefon"
                label={t.telefon}
                placeholder={t.telefon}
                defaultValue={formData.telefon}
                error={errors.telefon}
            />

        </FormWrapper>
    );
}