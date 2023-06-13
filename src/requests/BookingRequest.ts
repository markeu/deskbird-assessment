import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBookingRequest {
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  parkingSpotId: number;
}
