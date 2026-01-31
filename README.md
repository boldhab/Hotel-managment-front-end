# Hotel Management Frontend

A modern, responsive frontend application for a Hotel Management System, built with **React** and **Vite**. This application provides an interactive interface for guests to view rooms, check amenities, read testimonials, and book their stay.

## 🚀 Features

- **Home Page**: Welcoming landing page with a hero section and quick links.
- **Room Browsing**: detailed views of available rooms (`RoomsPage`, `RoomCard`).
- **Booking System**: Interactive booking form (`BookNowPage`, `BookingForm`) to reserve rooms.
- **Amenities & Experiences**: Showcases hotel amenities and special experiences (`AmenitiesPage`, `ExperiencesPage`).
- **Special Offers**: dedicated section for promotions and offers (`OffersPage`).
- **Testimonials**: Guest reviews and testimonials (`TestimonialsPage`).
- **Contact**: Contact information and inquiry form (`Contact`).
- **Internationalization**: Multi-language support powered by `i18next`.
- **Responsive Design**: Optimized for various screen sizes.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Internationalization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Linting**: ESLint

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Steps

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will typically start at `http://localhost:5173`.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, etc.)
├── components/      # Reusable UI components (Header, Footer, BookingForm, etc.)
├── i18n/            # Internationalization configuration and translations
├── pages/           # Application pages (Home, About, BookNow, etc.)
├── styles/          # Global styles
├── utils/           # Utility functions
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## 🌍 Internationalization

This project supports multiple languages using `i18next`. Translation files are located in the `src/i18n` directory.

## 🤝 Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

*Generated for the Hotel Management Project.*
*Developed by Habtamu Befekadu (bold hab)*
