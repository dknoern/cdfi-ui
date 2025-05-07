import { when } from 'mobx';

export const waitStoreData = storePart => new Promise((resolve, reject) => {
  when(() => !!storePart.data || !storePart.isLoading)
    .then(() => {
      if (Array.isArray(storePart.data)) {
        resolve(storePart.data);
      } else {
        reject(new Error('Loaded data is not an Array'));
      }
    });
});
