/* eslint-disable @typescript-eslint/no-explicit-any */

export function createErrorRedirect(
  path: string,
  errors: Record<string, string[] | undefined>,
  formValues: Record<string, string | number | boolean>
): string {
  const params = new URLSearchParams();

  // Dodaj greške
  Object.entries(errors).forEach(([key, value]) => {
    if (value?.[0]) {
      params.append(`${key}Error`, value[0]);
    }
  });

  // Dodaj vrijednosti
  Object.entries(formValues).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return `${path}?${params.toString()}`;
}

/**
 * Kreira URL za success redirect
 */
export function createSuccessRedirect(
  path: string,
  message: string
): string {
  const params = new URLSearchParams();
  params.append('success', message);
  return `${path}?${params.toString()}`;
}

/**
 * Kreira URL za error redirect
 */
export function createFailureRedirect(
  path: string,
  message: string
): string {
  const params = new URLSearchParams();
  params.append('error', message);
  return `${path}?${params.toString()}`;
}

