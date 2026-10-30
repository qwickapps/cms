/**
 * Initial data supplied by a server layout to avoid a client-side footer fetch.
 */
export interface FooterInitialData {
  settings?: unknown;
  footer?: unknown | null;
}

export function getFooterInitialState(initialData?: FooterInitialData) {
  return {
    footerData: initialData?.footer ?? null,
    loading: initialData === undefined,
  };
}

export function shouldFetchFooter(initialData?: FooterInitialData) {
  return initialData === undefined;
}
