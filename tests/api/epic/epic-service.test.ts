import axios from 'axios';
import { EpicService } from 'src/api/epic/service/epic.service';
import config from 'src/loaders/config';
import { findClosestCoordinate } from 'src/utils/helperFunctions';

jest.mock('axios');
jest.mock('src/utils/helperFunctions');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedFindClosestCoordinate = findClosestCoordinate as jest.MockedFunction<typeof findClosestCoordinate>;

describe('EpicService', () => {
  let epicService: EpicService;

  beforeEach(() => {
    epicService = new EpicService();
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('getEpicImageUrl', () => {
    it('should throw an error for invalid date format', async () => {
      const payload = {
        date: '2024/10/02',
        geoJson: {} as any,
      };

      await expect(epicService.getEpicImageUrl(payload)).rejects.toThrow('Invalid date.');
    });

    it('should throw an error if no matching coordinate is found', async () => {
      const payload = {
        date: '2024-10-02',
        geoJson: {} as any,
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: [
          { centroid_coordinates: { lat: 1, lon: 1 }, image: 'image1' },
        ],
      });

      mockedFindClosestCoordinate.mockReturnValueOnce(-1);

      await expect(epicService.getEpicImageUrl(payload)).rejects.toThrow('Unable to find image url.');
    });

    it('should return the correct image URL when a matching coordinate is found', async () => {
      const payload = {
        date: '2024-10-02',
        geoJson: {} as any,
      };

      const mockData = [
        { centroid_coordinates: { lat: 1, lon: 1 }, image: 'image1' },
        { centroid_coordinates: { lat: 2, lon: 2 }, image: 'image2' },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });
      mockedFindClosestCoordinate.mockReturnValueOnce(1);

      const expectedUrl = `${config.epicArchiveUrl}/natural/2024/10/02/png/image2.png`;

      const result = await epicService.getEpicImageUrl(payload);
      expect(result).toEqual(expectedUrl);
    });

    it('should throw an error when the API request fails', async () => {
      const payload = {
        date: '2024-10-02',
        geoJson: {} as any,
      };

      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

      await expect(epicService.getEpicImageUrl(payload)).rejects.toThrow('API error');
    });
  });
});
