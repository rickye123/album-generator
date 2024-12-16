import axios from "axios";

const BASE_URL = "https://api.discogs.com/";

export interface VinylListing {
  title: string;
  price: number;
  condition: string;
  uri: string;
}

export const getToken = async (): Promise<string> => {
    const response = await axios.post(
      'https://api.discogs.com/oauth/request_token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization:
            'Basic ' +
            btoa(`nsppNOZgnVkOpzkpiMfV:SnKZTMBUEbOLcBBRkIzVIwlTmsZmjSHX`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  };

export const fetchVinylListings = async (query: string): Promise<VinylListing[]> => {
    try {
        const token = getToken();
      const response = await axios.get(`${BASE_URL}marketplace/search`, {
        headers: {
          Authorization: `Discogs token=${token}`,
        },
        params: {
          q: query, // Search query (e.g., "What's Going On Marvin Gaye")
          format: "Vinyl",
          currency: "GBP",
          country: "UK",
          condition: "VG+,NM,M", // Filter by condition
          per_page: 50,          // Max results per page
          sort: "price",
          sort_order: "asc",     // Sort by lowest price
        },
      });
  
      const results = response.data.results;
  
      // Map results to a more usable format
      console.log('Results: ', results);
      return results.map((result: any) => ({
        title: result.title,
        price: result.price?.value || 0, // Default to 0 if no price is available
        condition: result.condition || "Unknown",
        uri: `https://www.discogs.com${result.uri}`,
      }));
    } catch (error) {
      console.error("Error fetching data from Discogs API:", error);
      throw new Error("Failed to fetch vinyl listings.");
    }
};
  
