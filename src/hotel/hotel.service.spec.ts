import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getModelToken } from '@nestjs/mongoose';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';

interface MockModelType extends jest.Mock {
  find: jest.Mock;
  findById: jest.Mock;
  updateOne: jest.Mock;
  deleteOne: jest.Mock;
}

describe('HotelService', () => {
  let service: HotelService;
  let model: any;

  beforeEach(async () => {
    const MockModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: 'randomId',
      save: jest.fn().mockResolvedValueOnce({ ...dto, _id: 'randomId' }),
    })) as unknown as MockModelType;

    MockModel.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    });
    MockModel.findById = jest.fn().mockResolvedValueOnce(null);
    MockModel.updateOne = jest.fn().mockResolvedValueOnce({ nModified: 1 });
    MockModel.deleteOne = jest.fn().mockResolvedValueOnce({ deletedCount: 1 });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getModelToken(Hotel.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    model = module.get(getModelToken(Hotel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); 

  it('should create a hotel', async () => {
    const createHotelDto: CreateHotelDto = {
      name: 'Test Hotel',
      city: 'Test City',
      address: 'Test Address',
      image: 'Test Image',
    };

    expect(await service.create(createHotelDto)).toEqual({
      ...createHotelDto,
      _id: 'randomId',
    });
    expect(model).toHaveBeenCalledWith(createHotelDto);
  });

  // it('should find all hotels', async () => {
  //   const result: Hotel[] = [];
  //   jest.spyOn(model, 'find').mockResolvedValueOnce(result);
  //   expect(await service.findAll()).toBe(result);
  // });
});
