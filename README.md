# OShop - Angular E-Commerce Application

A full-featured e-commerce web application built with Angular 16, Firebase, and Tailwind CSS. This project demonstrates modern web development practices including real-time data synchronization, role-based authentication, responsive design, and a comprehensive admin dashboard.

## Live Demo

https://abdulrahmansallam.github.io/oshop/products

## Features

### Shopping Experience

- Browse products with category-based filtering
- Real-time shopping cart with quantity management
- Add and remove items with instant UI updates
- Complete checkout flow with shipping form
- Order summary and confirmation

### Authentication and Authorization

- Google sign-in via Firebase Authentication
- Role-based access control for customers and administrators
- Protected routes using Angular route guards
- Persistent user sessions with profile management

### Admin Dashboard

- Full CRUD operations for product management
- Order tracking and management interface
- Interactive data tables with search, sort, and pagination
- Image preview when creating or editing products
- Custom confirmation dialogs for destructive actions

### User Interface

- Dark and light theme support using CSS custom properties
- Fully responsive design optimized for mobile, tablet, and desktop
- Smooth animations and micro-interactions
- BEM methodology for maintainable and scalable styles
- Clean, modern design with consistent spacing and typography

### Technical Highlights

- Built with Angular 16 and TypeScript
- Firebase Realtime Database for live data synchronization
- Reactive forms with custom validation
- Lazy-loaded feature modules for optimal performance
- Angular animations for enhanced user experience
- Modular architecture with clear separation of concerns

## Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| Frontend Framework | Angular 16                 |
| Language           | TypeScript                 |
| Styling            | Tailwind CSS 3, SCSS       |
| CSS Methodology    | BEM                        |
| Backend            | Firebase Realtime Database |
| Authentication     | Firebase Auth (Google)     |
| Icons              | Font Awesome               |
| Data Tables        | DataTables.net             |
| Build Tool         | Angular CLI                |

## Project Structure

- **admin/** - Admin module with product management, order management, and admin guards
- **core/** - Core module containing navbar, footer, and 404 page components
- **shopping/** - Shopping module with products, cart, checkout, and my orders components
- **services/** - Firebase services for authentication, products, orders, and shopping cart
- **models/** - TypeScript interfaces for order, shopping cart, and app user types
- **assets/** - Static assets including images and fonts
- **styles.scss** - Global styles and theme CSS custom properties
