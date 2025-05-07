import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { PageSectionWrapper, LibraryTable, TablePlace } from 'components';
import { useCompanies, useCompaniesWithoutLibrary } from 'dataManagement';
import { items2FilterOptions } from 'tools';
import { rootLibraryColumns } from './constants';
import { CreateLibrary } from './components';
import { globalLibraryStore } from './store';
import { loadGlobalLibraries } from './tools/apiTools';
import { globalLibraries4GlobalLibraryRows } from './tools/tools';
import { createLibraryButton } from '../tools';

// Root page of Global library. Consists of list of all global libraries for FM
const GlobalLibraryFn: FC = () => {
  const {
    data: companiesData,
    isLoading: companiesLoading,
  } = useCompaniesWithoutLibrary();
  const { data: fmCompanies, isLoading: fmCompaniesLoading } = useCompanies();

  const [isLibrariesLoading, setIsLibrariesLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showCreateLibraryModal, setShowCreateLibraryModal] = useState(false);

  const { libraries } = globalLibraryStore;
  const loadLibraries = useCallback(() => {
    setIsLibrariesLoading(true);
    setError(false);
    loadGlobalLibraries(setError).finally(() => {
      setIsLibrariesLoading(false);
    });
  }, []);

  useEffect(() => {
    if (
      isLibrariesLoading ||
      error ||
      (globalLibraryStore.libraries && globalLibraryStore.dataLoaded)
    )
      return;

    loadLibraries();
  }, [isLibrariesLoading, loadLibraries, error]);

  const globalLibraries = useMemo(() => {
    if (isLibrariesLoading || !libraries || !globalLibraryStore.dataLoaded)
      return [];

    return globalLibraries4GlobalLibraryRows(libraries ?? []);
  }, [isLibrariesLoading, libraries]);

  const companies = useMemo(() => {
    if (companiesLoading) return [];
    return (companiesData ?? []).map((company) => ({
      value: company.id,
      label: company.name,
    }));
  }, [companiesLoading, companiesData]);

  const filters = useMemo(() => {
    if (fmCompaniesLoading) return { companies: [] };
    return {
      companies: items2FilterOptions(
        (fmCompanies ?? []).filter((company) =>
          globalLibraries.find((library) =>
            library.pcCompanies.find(
              (pcCompany) => pcCompany.id === company.id,
            ),
          ),
        ),
      ),
    };
  }, [fmCompaniesLoading, fmCompanies, globalLibraries]);

  const handleReload = useCallback(() => {
    setShowCreateLibraryModal(false);
    loadLibraries();
  }, [loadLibraries]);

  return (
    <>
      <PageSectionWrapper
        title="All Libraries"
        actionButtons={[
          createLibraryButton((): void => setShowCreateLibraryModal(true)),
        ]}
      >
        <TablePlace>
          {(tableHeight): JSX.Element => (
            <LibraryTable
              id="globalLibrary"
              rowKey="id"
              dataSource={globalLibraries}
              columnNamesList={rootLibraryColumns}
              pagination={false}
              showSorterTooltip={false}
              isLoading={isLibrariesLoading}
              filters={filters}
              scroll={{ y: tableHeight }}
            />
          )}
        </TablePlace>
      </PageSectionWrapper>
      <CreateLibrary
        onClose={(): void => setShowCreateLibraryModal(false)}
        onFinish={handleReload}
        companies={companies}
        visible={showCreateLibraryModal}
      />
    </>
  );
};

export const GlobalLibrary = observer(GlobalLibraryFn);
