export function simulateAsync<T>(result: T, delay = 2000, failRate = 0.1): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < failRate ? reject("Simulated error") : resolve(result)
      }, delay)
    })
  }
  