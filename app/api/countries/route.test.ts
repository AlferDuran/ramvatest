import axios from 'axios';
import { NextRequest } from 'next/server';
import { GET } from './route';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//Issue testing handlers due to JSDOM config in jest, might have to use a diferent test suite for this
describe.skip('GET function', () => {
  const createNextRequest = (url: string): NextRequest => {
    return {
      nextUrl: new URL(url),
    } as unknown as NextRequest;
  };

  test('fetches countries successfully', async () => {
    const mockData = [{ name: 'Country 1' }, { name: 'Country 2' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const request = createNextRequest('http://localhost/api?search=test');
    const response = await GET(request);

    const jsonResponse = await response.json();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://api.countrylayer.com/v2/name/test',
      { params: { access_key: process.env.ACCESS_KEY } }
    );
    expect(jsonResponse).toEqual(mockData);
    expect(response.status).toBe(200);
  });

  test('handles API error correctly', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    const request = createNextRequest('http://localhost/api?search=test');
    const response = await GET(request);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://api.countrylayer.com/v2/name/test',
      { params: { access_key: process.env.ACCESS_KEY } }
    );
    expect(response.status).toBe(400);
    const textResponse = await response.text();
    expect(textResponse).toBe('API ERROR');
  });
});