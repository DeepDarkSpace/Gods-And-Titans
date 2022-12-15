import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const olymp = [
        { id: 1, name: 'Athene'},
        { id: 2, name: 'Zeus' },
        { id: 3, name: 'Hera' },
        { id: 4, name: 'Hades' },
        { id: 5, name: 'Poseidon' },
        { id: 6, name: 'Demeter' },
        { id: 7, name: 'Ares' },
        { id: 8, name: 'Hephaistos' },
        { id: 9, name: 'Hebe' },
        { id: 10, name: 'Eileithyia' },
        { id: 11, name: 'Dyonissus' }
      ];
      const tartaros = [
        { id: 1, name: 'Hyperion' },
      ];
      return {olymp, tartaros};
    }
}
