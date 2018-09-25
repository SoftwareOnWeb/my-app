import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [{
      id: 1,
      name: 'prd1',
      price: 10,
      details: 'details here'
    },
    {
      id: 2,
      name: 'prd2',
      price: 20,
      details: 'details here'
    },
    {
      id: 3,
      name: 'prd3',
      price: 30,
      details: 'details here'
    }
    ];
    return { products };
  }
}