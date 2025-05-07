import React from 'react';

const makeCancelable = (promise, finallyCb = () => {}) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val) => {
        if (!hasCanceled) {
          resolve(val);
          finallyCb();
        }
      },
      (error) => {
        if (!hasCanceled) {
          reject(error);
          finallyCb();
        }
      },
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export const withCancellables = WrappedComponent => class extends React.Component {
    cancellableActions = [];

    componentWillUnmount() {
      this.cancelCancellables();
    }

    cancelCancellables = () => {
      this.cancellableActions.forEach((cancellable, i) => {
        cancellable.cancel();
        delete this.cancellableActions[i];
      });

      delete this.cancellableActions;
    };

    cancellableAction = (promise, finallyCb = () => {}) => {
      const cancellable = makeCancelable(promise, finallyCb);
      this.cancellableActions.push(cancellable);
      return cancellable.promise;
    };

    render() {
      return <WrappedComponent cancellable={this.cancellableAction} {...this.props} />;
    }
};
