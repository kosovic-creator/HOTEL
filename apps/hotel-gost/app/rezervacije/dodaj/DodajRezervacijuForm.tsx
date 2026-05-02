'use client';

import { dodajRezervacijuSaGostom } from '@/actions/rezervacije';
import { InputField, SelectField, FormActions } from '@/components/form/FormComponents';
import { useTranslation } from 'react-i18next';
import { getFieldValue } from '@hotel/lib';

interface SobaData {
  id: number;
  broj: string;
  tip: string;
  kapacitet: number;
  cena: number;
}

interface DodajRezervacijuFormProps {
  sobe: SobaData[];
  error?: string | null;
  formDataInitial?: Record<string, string | undefined>;
  errorsInitial?: Record<string, string[]>;
}

export function DodajRezervacijuForm({
  sobe,
  error,
  formDataInitial = {},
  errorsInitial = {},
}: DodajRezervacijuFormProps) {
  const { t: tRez } = useTranslation('rezervacije');
  const { t: tGost } = useTranslation('gosti');
  const { t: tCommon } = useTranslation('common');

  const formData = formDataInitial;
  const errors = errorsInitial;

  return (
    <>
      {/* Prikaz error poruke ako postoji */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300">
          <div>
            {(() => {
              if (error === 'guestNotFound') return tRez('guest_not_found');
              return tRez(error) || tCommon('errorGeneral');
            })()}
          </div>
          {/* Prikaz svih polja greške */}
          {Object.entries(errors).map(([field, errArr]) => (
            Array.isArray(errArr) && errArr.length > 0 ? (
              <div key={field}>
                <strong>{field}:</strong> {errArr.join(', ')}
              </div>
            ) : null
          ))}
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-24">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {tRez('book_now')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {tCommon('form_description')}
            </p>
          </div>
          <form action={dodajRezervacijuSaGostom}>
            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {tRez('reservation_details')}
              </h3>
              <SelectField
                name="soba"
                label={tRez('room')}
                placeholder={tRez('select_room')}
                defaultValue={formData.soba}
                error={errors.soba?.[0]}
                required
                options={sobe.map((s) => ({
                  value: s.broj,
                  label: s.broj,
                }))}
              />
              <InputField
                name="prijava"
                type="date"
                label={tRez('check_in')}
                defaultValue={formData.prijava}
                error={errors.prijava?.[0]}
                required
              />
              <InputField
                name="odjava"
                type="date"
                label={tRez('check_out')}
                defaultValue={formData.odjava}
                error={errors.odjava?.[0]}
                required
              />
              <InputField
                name="broj_osoba"
                type="number"
                label={tRez('number_of_guests_label')}
                defaultValue={formData.broj_osoba}
                error={errors.broj_osoba?.[0]}
                required
                min="1"
              />
              <InputField
                name="popust"
                type="number"
                label={tRez('popust')}
                defaultValue={getFieldValue(formData?.popust, '0')}
                error={errors.popust?.[0]}
                min="0"
                max="100"
                placeholder="0"
              />
              <SelectField
                name="status"
                label={tRez('status')}
                placeholder={tRez('select_status')}
                defaultValue={formData.status}
                error={errors.status?.[0]}
                required
                options={[
                  { value: 'pending', label: tRez('pending'), statusColor: 'bg-yellow-100 text-yellow-800' },
                  { value: 'confirmed', label: tRez('confirmed'), statusColor: 'bg-green-400 text-green-800' },
                  { value: 'cancelled', label: tRez('cancelled'), statusColor: 'bg-red-100 text-red-800' },
                  { value: 'completed', label: tRez('completed'), statusColor: 'bg-blue-100 text-blue-800' },
                  { value: 'free_rooms', label: tRez('free_rooms'), statusColor: 'bg-green-100 text-green-800' },
                  { value: 'no_free_rooms', label: tRez('no_free_rooms'), statusColor: 'bg-red-100 text-red-800' },
                ]}
              />
            </div>
            {/* SEKCIJA ZA GOSTA - ručni unos */}
            <div className="pb-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {tGost('guest_details')}
              </h3>
              <SelectField
                name="gost_titula"
                label={tGost('title')}
                defaultValue={formData.gost_titula}
                error={errors.gost_titula?.[0]}
                options={[
                  { value: '', label: tGost('select_title') },
                  { value: 'Mr', label: tGost('title_mr') },
                  { value: 'Mrs', label: tGost('title_mrs') },
                  { value: 'Ms', label: tGost('title_ms') },
                  { value: 'Dr', label: tGost('title_dr') },
                ]}
              />
              <InputField
                name="gost_ime"
                label={tGost('first_name')}
                defaultValue={formData.gost_ime}
                error={errors.gost_ime?.[0]}
                required
              />
              <InputField
                name="gost_prezime"
                label={tGost('last_name')}
                defaultValue={formData.gost_prezime}
                error={errors.gost_prezime?.[0]}
                required
              />
              <InputField
                name="gost_email"
                label={tGost('email')}
                defaultValue={formData.gost_email}
                error={errors.gost_email?.[0]}
                required
              />
              <InputField
                name="gost_telefon"
                label={tGost('phone')}
                defaultValue={formData.gost_telefon}
                error={errors.gost_telefon?.[0]}
              />
              <InputField
                name="gost_adresa"
                label={tGost('address')}
                defaultValue={formData.gost_adresa}
                error={errors.gost_adresa?.[0]}
              />
              <InputField
                name="gost_grad"
                label={tGost('city')}
                defaultValue={formData.gost_grad}
                error={errors.gost_grad?.[0]}
              />
              <InputField
                name="gost_drzava"
                label={tGost('country')}
                defaultValue={formData.gost_drzava}
                error={errors.gost_drzava?.[0]}
              />
              {/* Drugi gost polja */}
              <SelectField
                name="gost_titula_drugog_gosta"
                label={tGost('second_guest_title')}
                defaultValue={formData.gost_titula_drugog_gosta}
                error={errors.gost_titula_drugog_gosta?.[0]}
                options={[
                  { value: '', label: tGost('select_title') },
                  { value: 'Mr', label: tGost('title_mr') },
                  { value: 'Mrs', label: tGost('title_mrs') },
                  { value: 'Ms', label: tGost('title_ms') },
                  { value: 'Dr', label: tGost('title_dr') },
                ]}
              />
              <InputField
                name="gost_ime_drugog_gosta"
                label={tGost('second_guest_first_name')}
                defaultValue={formData.gost_ime_drugog_gosta}
                error={errors.gost_ime_drugog_gosta?.[0]}
              />
              <InputField
                name="gost_prezime_drugog_gosta"
                label={tGost('second_guest_last_name')}
                defaultValue={formData.gost_prezime_drugog_gosta}
                error={errors.gost_prezime_drugog_gosta?.[0]}
              />
            </div>
            {/* Dugmad za akcije forme */}
            <FormActions
              submitLabel={tRez('book_now')}
              cancelLabel={tRez('cancel')}
              cancelHref="/rezervacije"
            />
          </form>
        </div>
      </div>
    </>
  );
}
