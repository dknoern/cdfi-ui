import { decorate, observable, action, toJS, computed } from 'mobx';
import { FormInstance } from 'antd/lib/form';
import { Portfolio } from 'types';
import { Contact } from 'types/company';
import { Log } from 'tools';
import { FormStep, PortfolioCompanyCreate } from './types';
import { storeData2SaveModel } from './tools';

export type PlainValue = string | number | boolean | null | undefined;
export type ObjectValue = { [key: string]: Value };
export type Value = PlainValue | PlainValue[] | ObjectValue | ObjectValue[];
export type Data = {
  [key in FormStep]?: Value;
};

export type Path = string | string[];

class PCCreateFormStore {
  portfolioId: Portfolio['id'] | null = null;

  data: Data = {};

  triggerParse = (step: FormStep, form: FormInstance): void => {
    const data = form.getFieldsValue();

    Log.log('[formStore] form parsed data', toJS(data));

    this.data[step] = data;
  };

  setData = (step: FormStep, data: Value): void => {
    Log.log('[formStore] form set data ', step, toJS(data));

    this.data[step] = data;
  };

  setDataPart = (step: FormStep, path: Path | null, data: Value): void => {
    if (path === null) {
      this.data[step] = data;
    } else if (Array.isArray(path)) {
      // TODO: deep change
      this.data[step] = data;
    } else {
      (this.data[step] as ObjectValue)[path] = data;
    }
  };

  setPortfolioId = (portfolioId: Portfolio['id']): void => {
    this.portfolioId = portfolioId;
  };

  resetForm = (): void => {
    this.data = {};
    this.portfolioId = null;
  };

  resetStepData = (step: FormStep): void => {
    Log.log('[formStore] reset', step);

    delete this.data[step];
  };

  prepareDataForSave = (): Partial<PortfolioCompanyCreate> => {
    return storeData2SaveModel(toJS(this.data));
  };

  get contacts(): Contact[] {
    const result: Contact[] = [];
    if (this.data[FormStep.generalInfo]) {
      const stepData = this.data[FormStep.generalInfo] as any;
      if (stepData.primaryContact && stepData.primaryContact.email) {
        result.push({ ...stepData.primaryContact, primary: true } as Contact);
      }
      if (stepData.additionalContacts) {
        result.push(
          ...(stepData.additionalContacts.filter(
            (item: Contact) => item.email,
          ) as Contact[]),
        );
      }
    }
    return toJS(result);
  }

  get primaryContact(): Contact | undefined {
    return this.contacts.find((item) => item.primary);
  }
}

decorate(PCCreateFormStore, {
  data: observable,
  triggerParse: action,
  setPortfolioId: action,
  resetStepData: action,
  contacts: computed,
  primaryContact: computed,
  resetForm: action,
});

export const formStore = new PCCreateFormStore();
