import { reaction } from 'mobx';

export const subscribeForRestData = ({
  storePart, setData, setIsLoading,
}) => {
  const notify = () => {
    setData(storePart.data);
    setIsLoading(storePart.isLoading);
  };

  if (storePart.data || !storePart.isLoading) {
    notify();
  }

  const disposer = reaction(
    () => [storePart.data, storePart.isLoading],
    () => {
      notify();
    },
  );
  return disposer;
};
