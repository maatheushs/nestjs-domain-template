import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('HealthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/health (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/health');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        status: 'ok',
        info: { database: { status: 'up' }, redis: { status: 'up' } },
      }),
    );
  });
});
