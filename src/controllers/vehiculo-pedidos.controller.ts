import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Pedidos,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoPedidosController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo has one Pedidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pedidos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos> {
    return this.vehiculoRepository.pedidos(id).get(filter);
  }

  @post('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.vehiculoRepository.pedidos(id).create(pedidos);
  }

  @patch('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.vehiculoRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.vehiculoRepository.pedidos(id).delete(where);
  }
}
