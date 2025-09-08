
# Crime Reporting System (Frontend)

An interactive web application for visualizing and reporting crimes on a map. This project aims to help communities stay informed and contribute to public safety by allowing users to view and report incidents in real time.

## Motivation
This website was created as part of a challenge I participated in during March 2025, organized by the company Rihal. The goal was to build a crime reporting and mapping system to empower communities and authorities with real-time information and a user-friendly interface for viewing and submitting crime reports.

## Features
- View reported crimes on an interactive map (Leaflet.js)
- Submit new crime reports with location and details
- Responsive design for desktop and mobile
- Light/Dark mode toggle
- Real-time updates and data storage via Firebase
- Secure authentication (optional, can be enabled via Firebase Auth)

## Tech Stack
- **React (Vite):** Fast, modern frontend development
- **Leaflet.js:** Interactive mapping and geolocation
- **Firebase:** Hosting, real-time database, authentication
- **CSS Modules:** Scoped styling for components

## Prerequisites
- Node.js & npm
- Firebase account (for hosting and database)

## Getting Started
1. Clone the repository:
	```bash
	git clone https://github.com/Mohammed-Alhassni/frontEnd-crimeReportingSystem.git
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Create a `.env` file in the root directory and add your Firebase configuration:
	```env
	VITE_FIREBASE_API_KEY=your_api_key
	VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
	VITE_FIREBASE_PROJECT_ID=your_project_id
	VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
	VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
	VITE_FIREBASE_APP_ID=your_app_id
	VITE_FIREBASE_DATABASE_URL=your_database_url
	```
4. Start the development server:
	```bash
	npm run dev
	```
5. Build for production:
	```bash
	npm run build
	# Output will be in the dist/ folder
	```

## Usage
- **View Crimes:** Browse the map to see reported incidents. Click markers for details.
- **Report a Crime:** Use the report form to submit a new incident. Location can be selected on the map.
- **Theme Toggle:** Switch between light and dark modes for better visibility.

## Deployment
1. Initialize Firebase hosting:
	```bash
	firebase init
	```
2. Set `dist/` as the public folder in Firebase config.
3. Build the project:
	```bash
	npm run build
	```
4. Deploy to Firebase:
	```bash
	firebase deploy
	```

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss your ideas.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, contact [Mohammed Alhassni](www.linkedin.com/in/mohammed-al-hassni-38a84b2b1) or open an issue on GitHub.


