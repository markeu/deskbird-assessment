import { Service } from 'typedi';
import ParkSpot from '../models/ParkSpot';

const parkingSpotmockData = [{ name: 'sandex' }, { name: 'sandex' }, { name: 'twillo' }];

@Service()
export default class UserRepository {
  createSeedParkSpot = async (): Promise<string> => {
    for (const item of parkingSpotmockData) {
      const user = ParkSpot.build(item);
      await user.save();
    }
    return 'Successfully Seeded Parking Spots!!';
  };

  findByName = async (name: string): Promise<ParkSpot | null> => {
    return await ParkSpot.findOne({ where: { name } });
  };

  getAllParkSpot = async (): Promise<ParkSpot[]> => {
    return await ParkSpot.findAll();
  };
}
