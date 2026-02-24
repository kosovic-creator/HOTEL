import { getLocaleMessages } from "@/i18n/i18n";
import { getRequestLocale } from "@/lib/locale";

export default async function Home() {
  const lang = await getRequestLocale();
  const t = await getLocaleMessages(lang, 'common');
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">{t.welcome}</h1>
        </div>
      </div>
    </>
  );
}
