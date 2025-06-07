import axios from 'axios';

// Replace with your Discogs API consumer key
const DISCOGS_API_URL = "https://api.discogs.com";
const CONSUMER_KEY = process.env.REACT_APP_DISCOGS_CONSUMER_KEY || "nsppNOZgnVkOpzkpiMfV";
const CONSUMER_SECRET = process.env.REACT_APP_DISCOGS_CONSUMER_SECRET || "SnKZTMBUEbOLcBBRkIzVIwlTmsZmjSHX";

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("API Key and secret not found! Please check your .env file or environment variables are set.");
}

export const fetchVinylRecords = async (albumName: string, artistName: string) => {
    try {
        // Step 1: Search for the album by name and artist
        const searchResponse = await axios.get(`${DISCOGS_API_URL}/database/search`, {
            params: {
                q: albumName, // Search query
                artist: artistName, // Filter by artist name
                type: "release", // We want to search for specific releases
                per_page: 10, // Number of results to return (adjust as needed)
                key: CONSUMER_KEY, // Correct way to pass auth
                secret: CONSUMER_SECRET, // Correct way to pass auth
            },
        });

        const releases = searchResponse.data.results;

        if (!releases || releases.length === 0) {
            console.error("No releases found.");
            return [];
        }

        let cheapestRecords = [];

        // Step 2: Get marketplace listings for each release
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
                        .sort((a: any, b: any) => a.price.value - b.price.value); // Sort by price

                    if (filteredListings.length > 0) {
                        cheapestRecords.push(filteredListings[0]); // Get the cheapest one
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