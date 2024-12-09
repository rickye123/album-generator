# 🎶 **Album Explorer App**

Welcome to the **Album Explorer App**, a web application that allows users to explore albums, view details about them, find links to their Wikipedia pages, and check Spotify album details, including tracklists, genres, release dates, and more.

---

## 🚀 **Features**

The app has the following features:

- **Album Search & Details:**
  - View album details such as name, artist, and album cover.
  - Fetch details about albums via Amplify's backend.
  - Dynamically fetch relevant Wikipedia links based on album name and artist.

- **Spotify Integration:**
  - Display details from Spotify, including:
    - Release year
    - Genres
    - Total tracks
    - Total running time of the album
    - List of all tracks with their respective durations.

- **Responsive & Interactive UI:**
  - Render all details with modern CSS animations.
  - Display tables for track information with alternating row colors and hover effects.

- **Wikipedia Link Integration:**
  - If available, a clickable Wikipedia logo links to the album's Wikipedia page.

---

## 🛠️ **Technologies Used**

The app has been built using the following stack:

- **Frontend:**
  - React
  - React Router
  - CSS
  - TypeScript
- **Backend:**
  - AWS Amplify
- **Spotify Integration:**
  - Spotify Web API
- **CSS Styling:**
  - Custom CSS with modern UX enhancements.

---

## ⚙️ **Setup & Installation**

To get started with development, follow the steps below:

### 1. Clone the Repository
Clone this project locally:

git clone <repository-url>
cd album-explorer

### 2. Install Dependencies
Install all required dependencies:

Copy code
yarn install
### 3. Configure AWS Amplify
To set up AWS Amplify integration:

Set up AWS Amplify credentials by running:

amplify configure

Then initialize Amplify in your project:

amplify init
Push changes to the backend:
bash
Copy code
amplify push
If you already have configured amplifyApi, ensure you import it correctly into your app.

### 4. Set Environment Variables
Configure environment variables for Spotify & other credentials. Create a .env file at the root of your project:

env
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/
### 5. Start the Development Server
To start the app in development mode:

yarn start
The app will be available at: http://localhost:3000/

🔧 Build for Production
To create a production-ready build:

yarn build
This will create optimized build files in the build/ directory.

To test the production build locally:

npx serve -s build

📚 API Integration
Spotify API
We pull details such as:

Release year from the release date.
Total tracks and running times.
List of tracks with their durations.
AWS Amplify
Amplify is used to fetch album details from a backend database. Ensure your backend is properly configured using amplify init and amplify push.

💡 Key Commands
Install dependencies:


yarn install
Start development server:


yarn start
Build for production:


yarn build
Clean the build cache:


rm -rf build/
yarn build
Serve production build:


npx serve -s build

🧪 Testing
There are no explicit tests yet. Future work will involve adding unit tests using Jest or React Testing Library to ensure the app remains stable during updates.