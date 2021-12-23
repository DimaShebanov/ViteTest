export const mockResponse = <T>(data: T, wait?: number) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), wait ?? 2000));
