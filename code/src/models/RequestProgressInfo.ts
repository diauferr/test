/**
 * Estrutura de dados que respresenta o andamento de um request.
 * @author Ricardo Onodera
 * @see PeriodicContextProvider
 */
export class RequestProgressInfo<T> {
  constructor(
    public result: T = null,
    public loading = false,
    public error: any = null
  ) {}

  setError(error: any) {
    return new RequestProgressInfo(null, false, error);
  }

  setLoading(isLoading = true) {
    return new RequestProgressInfo(
      isLoading ? null : this.result,
      isLoading,
      false
    );
  }

  setResult(result: T) {
    return new RequestProgressInfo(result, false, null);
  }
}
