import axios from 'axios';

const DISCOGS_API_URL = "https://api.discogs.com";
const CONSUMER_KEY = process.env.DISCOGS_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.DISCOGS_CONSUMER_SECRET;

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("API Key and secret not found! Please check your .env file or environment variables are set.");
}

export const fetchVinylRecords = async (albumName: string, artistName: string) => {
    try {
        const searchResponse = await axios.get(`${DISCOGS_API_URL}/database/search`, {
            params: {
            q: albumName,
            artist: artistName,
            type: "release",
            per_page: 10,
            key: CONSUMER_KEY,
            secret: CONSUMER_SECRET,
            },
        });
  
        const releases = searchResponse.data.results;
  
        if (!releases || releases.length === 0) {
            console.error("No releases found.");
            return [];
        }

        let cheapestRecords = [];

        for (const release of releases) {
            console.log(`Fetching marketplace data for release ${release.id}`);
            const releaseId = release.id;

            try {
                const marketplaceResponse = await axios.get(`${DISCOGS_API_URL}/marketplace/listings/${releaseId}`, {
                    params: {
                        key: CONSUMER_KEY,
                        secret: CONSUMER_SECRET,
                    }
                });
                console.log(`Marketplace data for release ${releaseId}:`, marketplaceResponse.data);

                const listings = marketplaceResponse.data.listings;

                if (listings && listings.length > 0) {
                    const filteredListings = listings
                        .filter((listing: any) => listing.condition.includes("VG+") || listing.condition.includes("NM"))
                        .filter((listing: any) => listing.ships_from === "United Kingdom")
                        .sort((a: any, b: any) => a.price.value - b.price.value);

                    if (filteredListings.length > 0) {
                        cheapestRecords.push(filteredListings[0]);
                    }
                }
            } catch (marketplaceError) {
                console.warn(`No marketplace data for release ${releaseId}`);
            }
        }

        return cheapestRecords.slice(0, 5);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching vinyl records from Discogs:", error.response?.data || error.message);
        } else {
            console.error("Error fetching vinyl records from Discogs:", error);
        }
        throw error;
    }
};