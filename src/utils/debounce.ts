const debounce = (callback: Function, ms: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, args), ms);
  };
};

export default debounce;
