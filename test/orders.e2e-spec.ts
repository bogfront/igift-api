import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { CreateOrderDto } from '../src/orders/dto/create-order.dto';

const testDto: CreateOrderDto = {
  status: 'registered',
  paymentUri: '',
  address: 'Санкт-Петербург',
  products: [
    {
      uri: 'lala',
      title: 'Чашка с лисой',
      count: 2,
      comment: '',
    },
  ],
  packages: [
    {
      productIds: ['1', '2'],
      designId: '2',
      comment: 'Красивая упаковка',
      price: 100000,
    },
  ],
  delivery: {
    name: 'Bogdan',
    phone: '+7111111111',
    city: 'SPb',
    address: 'Наличная улица',
    comment: 'Empty',
  },
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orders/create (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/orders/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  it('/orders/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/orders/' + createdId)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
