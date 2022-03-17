import React, { useState } from 'react';
import { GrafanaTheme2, NavModelItem } from '@grafana/data';
import { Input, useStyles2, Spinner } from '@grafana/ui';
import { config } from '@grafana/runtime';
import AutoSizer from 'react-virtualized-auto-sizer';
import { css } from '@emotion/css';

import Page from 'app/core/components/Page/Page';
import { SearchPageDashboards } from './SearchPageDashboards';
import { useAsync } from 'react-use';
import { getGrafanaSearcher } from '../service';
import { Table } from './table/Table';

const node: NavModelItem = {
  id: 'search',
  text: 'Search',
  icon: 'dashboard',
  url: 'search',
};

export default function SearchPage() {
  const styles = useStyles2(getStyles);
  const [query, setQuery] = useState('');

  const results = useAsync(() => {
    return getGrafanaSearcher().search(query);
  }, [query]);

  if (!config.featureToggles.panelTitleSearch) {
    return <div className={styles.unsupported}>Unsupported</div>;
  }

  console.log(results?.body, 'what are these');

  return (
    <Page navModel={{ node: node, main: node }}>
      <Page.Contents>
        <Input value={query} onChange={(e) => setQuery(e.currentTarget.value)} autoFocus spellCheck={false} />
        <br /> <br />
        {results.loading && <Spinner />}
        {results.value?.body && (
          <div>
            <AutoSizer style={{ width: '100%', height: '1000px' }}>
              {({ width }) => {
                return (
                  <div>
<<<<<<< HEAD
                    <SearchPageDashboards dashboards={results.value!.body} width={width} />
=======
                    <Table data={results?.body!} width={width} />
                    <SearchPageDashboards dashboards={results?.body!} width={width} />
>>>>>>> f2ba010c15 (initial commit)
                  </div>
                );
              }}
            </AutoSizer>
          </div>
        )}
      </Page.Contents>
    </Page>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  unsupported: css`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 18px;
  `,
});
