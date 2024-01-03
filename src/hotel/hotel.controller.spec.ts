import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('HotelController (e2e)', () => {
  let app: INestApplication;
  let hotelId: string;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  
    app = moduleFixture.createNestApplication();
    await app.init();
  
    await request(app.getHttpServer())
    .post('/user')
    .send({ username: 'username', password: 'Password123' });

    const loginResponse = await request(app.getHttpServer())
    .post('/login')
    .send({ username: 'username', password: 'Password123' });

    authToken = loginResponse.body.token.access_token;

    // Create a hotel and get its id
    const response = await request(app.getHttpServer())
    .post('/hotel')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ name: 'Test Hotel', city: 'Test City', address: 'Test Address', image: 'Test Image', rooms: [] });
    
    // console.log(response);

    hotelId = response.body._id;
  });

  it('/POST', async () => {
    const createHotelDto = {
      name: 'Test Hotel',
      city: 'Test City',
      address: 'Test Address',
      image: 'Test Image',
      rooms: [],
    };
  
    // Send a POST request to create the hotel
    const response = await request(app.getHttpServer())
      .post('/hotel')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createHotelDto)
      .expect(201);
  
    // Check that the response has the created hotel data
    expect(response.body).toMatchObject({
      "_id": expect.any(String),
      "name": "Test Hotel",
      "city": "Test City",
      "address": "Test Address",
      "image": "Test Image",
      "rooms": [],
      "__v": expect.any(Number)
    });
  
    // Save the id of the created hotel for later tests
    hotelId = response.body._id;
  });


  it('/hotel (GET)', () => {
    return request(app.getHttpServer())
      .get('/hotel')
      .expect(200)
      .expect((res) => {
        res.body.forEach((item) => {
          expect(item).toMatchObject({
            "_id": expect.any(String),
            "name": expect.any(String),
            "city": expect.any(String),
            "address": expect.any(String),
            "image": expect.any(String),
            "rooms": expect.any(Array),
            "__v": expect.any(Number)
          });
        });
      });
  });

  it('/GET bycity/:city', () => {
    return request(app.getHttpServer())
      .get('/hotel/bycity/testcity')
      .expect(200)
      .expect((res) => {
        res.body.forEach((item) => {
          expect(item).toMatchObject({
            "_id": expect.any(String),
            "name": expect.any(String),
            "city": "testcity",
            "address": expect.any(String),
            "image": expect.any(String),
            "rooms": expect.any(Array),
            "__v": expect.any(Number)
          });
        });
      });
  });

  it('/GET :id', () => {
    return request(app.getHttpServer())
      .get(`/hotel/${hotelId}`)
      .expect(200)
      .expect({
        "_id": hotelId,
        "name": "Test Hotel",
        "city": "Test City",
        "address": "Test Address",
        "image": "Test Image",
        "rooms": [],
        "__v": 0
      })
  });

  it('/PATCH :id', async () => {
    const updateHotelDto = {
      name: 'Updated Hotel',
      city: 'Updated City',
      address: 'Updated Address',
      image: 'Updated Image',
      rooms: [],
    };

    // Send a PATCH request to update the hotel
    await request(app.getHttpServer())
    .patch(`/hotel/${hotelId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateHotelDto)
    .expect(200);

    // Send a GET request to verify that the hotel was updated
    const response = await request(app.getHttpServer())
    .get(`/hotel/${hotelId}`)
    .expect(200);

    // Check that the response has the updated hotel data
    expect(response.body).toMatchObject({
      "_id": hotelId,
      "name": "Updated Hotel",
      "city": "Updated City",
      "address": "Updated Address",
      "image": "Updated Image",
      "rooms": [],
      "__v": expect.any(Number)
    });
  });

  it('/DELETE :id', async () => {
    // Send a DELETE request to remove the hotel
    console.log("hotelId", hotelId)
    await request(app.getHttpServer())
      .delete(`/hotel/${hotelId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});