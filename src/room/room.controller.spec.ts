import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import mongoose from 'mongoose';

describe('RoomController (e2e)', () => {
  let app: INestApplication;
  let hotelId: string;
  let authToken: string;
  let roomId: string;

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

    const response = await request(app.getHttpServer())
    .post('/hotel')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ name: 'Test Hotel', city: 'Test City', address: 'Test Address', image: 'Test Image', rooms: [] });
    

    hotelId = response.body._id;
    console.log(hotelId);
  });

  describe('GET /room', () => {
    it('should return all rooms', async () => {
      const response = await request(app.getHttpServer())
        .get('/room')
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /room', () => {
    it('should create a room', async () => {
      const createRoomDto = 
        {
            "adultGuests": 1,
            "childGuests": 1,
            "infantGuests": 1,
            "price": 1,
            "description": "Test Description",
            "image": "Test Image",
            "label": "Test Label",
            "hotelId": hotelId,
            "roomFeatures": [
              {
                "_id": new mongoose.Types.ObjectId().toHexString(),
                "img": "Test Image",
                "name": "Test Name"
              }
            ]
          }
      
  
      const response = await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createRoomDto);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');

      roomId = response.body._id;

    });

      
    it('should update a room', async () => {
        const updateRoomDto = {
            "description": "Test Description2",
            "image": "Test Image2",
        };
      
        const response = await request(app.getHttpServer())
          .patch(`/room/${roomId}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(updateRoomDto);
      
         expect(response.status).toBe(200);
        });
      });


    it('should delete a room', async () => {
        const response = await request(app.getHttpServer())
          .delete(`/room/${roomId}`)
          .set('Authorization', `Bearer ${authToken}`);
      
        expect(response.status).toBe(200);
     });

    //  it('should add features to a room', async () => {
    //     const roomFeatures = 
    //         {
    //             "img": "Test Image2",
    //             "name": "Test Name2"
    //         }
        
      
    //     const response = await request(app.getHttpServer())
    //       .post(`/room/${roomId}/add-features`)
    //       .set('Authorization', `Bearer ${authToken}`)
    //       .send(roomFeatures);
      
    //     expect(response.status).toBe(200);
    //   });

});