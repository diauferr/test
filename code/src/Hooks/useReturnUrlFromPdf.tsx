export function useReturnUrlFromPdf() {
  const storageKey = 'pdfReturnUrl';

  return {
    returnToHereFromPdf: () => {
      if ('localStorage' in window) {
        localStorage.setItem(
          storageKey,
          window.location.pathname + window.location.search
        );
      }
    },
    getReturnUrl: (): string => {
      if ('localStorage' in window) {
        const url = localStorage.getItem(storageKey);
        return url || '/';
      }
    }
  };
}
