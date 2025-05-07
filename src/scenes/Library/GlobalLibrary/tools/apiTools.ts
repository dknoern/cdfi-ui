import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/es/form';
import { Company, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { FolderView, GlobalLibrary } from 'types/libraryViews';
import { library as libraryManager } from 'dataManagement';
import { showAPIError } from 'tools/APITools';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import { libraryStore } from 'scenes/Library/FMLibrary/store';
import { globalLibraryStore } from '../store';

export const loadGlobalLibraries = (setError: VoidFn): Promise<void> => {
  return libraryManager
    .getGlobalLibraries()
    .then((result) => {
      globalLibraryStore.initWithData(result);
    })
    .catch((e) => {
      globalLibraryStore.reset();
      showAPIError(uiText('library', 'loadError'))(e);
      setError(true);
    });
};

export const createGlobalLibrary = (
  values: Store,
  onFinish: VoidFn,
  form: FormInstance,
): Promise<void> => {
  return libraryManager
    .createLibrary({
      name: values.name,
      folders: values.folders ?? [],
      pcCompanies: (values.companies ?? []).map((companyId: Company['id']) => ({
        id: companyId,
      })),
    })
    .then(() => {
      notifyUser.ok(uiText('library', 'createOk'));
      libraryStore.reset();
      onFinish();
    })
    .catch(
      handleServerFormError({
        form,
        category: 'library',
        messId: 'createError',
      }),
    );
};

export const updateGlobalLibrary = (
  libraryId: GlobalLibrary['id'],
  values: Pick<GlobalLibrary, 'id' | 'name'>,
  onFinish: VoidFn,
  form: FormInstance,
): void => {
  libraryManager
    .updateLibrary(libraryId, {
      id: libraryId,
      name: values.name,
    })
    .then(() => {
      notifyUser.ok(uiText('library', 'updateOk'));
      libraryStore.reset();
      onFinish();
    })
    .catch(
      handleServerFormError({
        form,
        category: 'library',
        messId: 'updateError',
      }),
    );
};

export const createGlobalFolder = (
  libraryId: GlobalLibrary['id'],
  values: Pick<FolderView, 'name' | 'frequency' | 'description'>,
  onFinish: VoidFn,
): Promise<void> => {
  return libraryManager
    .createGlobalFolder(libraryId, values)
    .then(() => {
      notifyUser.ok(uiText('library', 'folderAddOk'));
      libraryStore.reset();
      onFinish();
    })
    .catch(showAPIError(uiText('library', 'folderAddError')));
};

export const editGlobalFolder = (
  libraryId: GlobalLibrary['id'],
  values: Pick<FolderView, 'frequency' | 'name' | 'description' | 'id'>,
  onFinish: VoidFn,
): Promise<void> => {
  return libraryManager
    .updateGlobalFolder(libraryId, values.id, values)
    .then(() => {
      notifyUser.ok(uiText('library', 'folderEditOk'));
      libraryStore.reset();
      onFinish();
    })
    .catch(showAPIError(uiText('library', 'folderEditError')));
};

export const deleteLibrary = (
  libraryId: GlobalLibrary['id'],
  onFinish: VoidFn,
): Promise<void> => {
  return libraryManager
    .deleteGlobalLibrary(libraryId)
    .then(() => {
      notifyUser.ok(uiText('library', 'deleteOk'));
      onFinish();
    })
    .catch(showAPIError(uiText('library', 'deleteError')));
};
