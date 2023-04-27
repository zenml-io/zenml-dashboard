// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncFunction = (...args: any[]) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const memoisePromiseFn = <T extends AnyAsyncFunction>(fn: T) => {
  const cache = new Map<string, ReturnType<T>>();

  return async (...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    const cached = cache.get(key);
    if (cached !== undefined) return cached;

    const result = await fn(...args).catch((error) => {
      // Delete cache entry if API call fails
      cache.delete(key);
      return Promise.reject(error);
    });

    cache.set(key, result);
    return result;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const debounce = <T extends AnyFunction>(func: T, waitMs: number) => {
  let timerId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
};
