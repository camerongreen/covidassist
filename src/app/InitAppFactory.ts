import {DataSourceService} from './data-source.service';

export function initAppFactory(dataSourceService: DataSourceService) {
  return () => {
    return dataSourceService
      .getResources()
      .toPromise()
      .then(response => dataSourceService.parseResources(response));
  };
}
