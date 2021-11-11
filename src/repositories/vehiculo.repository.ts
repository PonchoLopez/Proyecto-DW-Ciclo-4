import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly pedidos: HasOneRepositoryFactory<Pedidos, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.pedidos = this.createHasOneRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
