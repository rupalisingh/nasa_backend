import axios from 'axios';
import { EonetService } from '../../../src/api/eonet/service/eonet.service';
import config from '../../../src/loaders/config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EonetService', () => {
  let eonetService: EonetService;

  beforeEach(() => {
    eonetService = new EonetService();
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('getAllCategories', () => {
    it('should return the list of categories', async () => {
      
      const mockCategories = [
        { id: '1', title: 'Wildfires' },
        { id: '2', title: 'Volcanoes' },
      ];

      mockedAxios.get.mockResolvedValueOnce({
        data: { categories: mockCategories },
      });

      
      const categories = await eonetService.getAllCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${config.eonetBaseUrl}/categories`);
      expect(categories).toEqual(mockCategories);
    });

    it('should return an empty array when there are no categories', async () => {
    
      mockedAxios.get.mockResolvedValueOnce({ data: { categories: [] } });

      const categories = await eonetService.getAllCategories();

      expect(categories).toEqual([]);
    });

    it('should throw an error when the API request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

      await expect(eonetService.getAllCategories()).rejects.toThrow('API error');
    });
  });

  describe('getEvents', () => {
    it('should return the list of events for a given number of days', async () => {
      const mockEvents = [
        { id: '1', title: 'Event 1' },
        { id: '2', title: 'Event 2' },
      ];

      mockedAxios.get.mockResolvedValueOnce({
        data: { events: mockEvents },
      });

      const days = 30;
      const events = await eonetService.getEvents(days);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${config.eonetBaseUrl}/events?days=${days}`);
      expect(events).toEqual(mockEvents);
    });

    it('should return an empty array when there are no events', async () => {
     
      mockedAxios.get.mockResolvedValueOnce({ data: { events: [] } });

      const events = await eonetService.getEvents(7);

      expect(events).toEqual([]);
    });

    it('should throw an error when the API request fails', async () => {
      // Mock axios to reject the promise
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

      await expect(eonetService.getEvents(7)).rejects.toThrow('API error');
    });
  });
});
