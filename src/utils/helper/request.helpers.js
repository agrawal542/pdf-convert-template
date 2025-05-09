import { AsyncLocalStorage } from 'async_hooks';

export const asyncLocalStorage = new AsyncLocalStorage(); // Create an instance of AsyncLocalStorage

export const getCorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore();
  return (asyncStore && asyncStore.correlationId) || 'unknown-error-while-creating-correlation-id'; // Default fallback
};
