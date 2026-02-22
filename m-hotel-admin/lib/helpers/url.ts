/**
 * Helper funkcije za rukovanje sa URL parametrima
 */

/**
 * Konvertuje datum u YYYY-MM-DD format za date input
 */
export function toDateInput(val: unknown): string {
  if (!val) return '';

  // Ako je već u ispravnom formatu
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return val;
  }

  const d = new Date(val as string);
  if (isNaN(d.getTime())) return '';

  return d.toISOString().slice(0, 10);
}

/**
 * Ekstrauje greške iz search params
 */
export function extractErrors(params: Record<string, string | undefined>): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (key.endsWith('Error') && value) {
      const fieldName = key.replace('Error', '');
      errors[fieldName] = value;
    }
  });

  return errors;
}

/**
 * Ekstrauje vrijednosti forme iz search params sa fallback na default vrijednosti
 */
// export function extractFormValues<T extends Record<string, unknown>>(
//   params: Record<string, string | undefined>,
//   defaultValues: T
// ): T {
//   const formValues = { ...defaultValues };

//   Object.keys(defaultValues).forEach((key) => {
//     if (params[key] !== undefined && params[key] !== '') {
//       // @ts-expect-error - Dynamic key access
//       formValues[key] = params[key];
//     }
//   });

//   return formValues;
// }

/**
 * Vraća vrijednost polja sa prioritetom: params > dbValue > ''
 */
export function getFieldValue(
  paramVal: string | undefined,
  dbVal: unknown,
  isDate = false
): string {
  if (isDate) {
    if (paramVal && paramVal !== '') return toDateInput(paramVal);
    if (dbVal) return toDateInput(dbVal);
    return '';
  }

  if (paramVal && paramVal !== '') return paramVal;
  return dbVal ? String(dbVal) : '';
}
