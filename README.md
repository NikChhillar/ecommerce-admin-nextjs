# E-commerce Admin Dashboard with Next.js


Welcome to the documentation for the E-commerce Admin Dashboard project, a comprehensive administration and content management system built using Next.js. This powerful dashboard serves as a central hub for multiple vendors and stores, allowing for efficient management of categories, products, images, filters, billboards, orders, and sales. Leveraging the Shadcn UI framework, this project delivers a sleek and feature-rich experience for e-commerce businesses.

## Table of Contents

- [Demo](#demo)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Demo

Experience the live demo of the project [here]().

## Key Features

- **Shadcn UI Integration**: Utilizes Shadcn UI for an elegant and responsive admin dashboard interface.

- **Centralized CMS**: Functions as a comprehensive CMS, admin panel, and API hub, facilitating control over multiple vendors and stores within a single dashboard.

- **Category Management**: Allows for the creation, updating, and deletion of product categories, offering flexibility and customization.

- **Product Management**: Enables the creation, updating, and deletion of products with support for multiple images, providing versatility in showcasing merchandise.

- **Filter Management**: Facilitates the creation, updating, and deletion of filters like "Color" and "Size" and allows for their association with products.

- **Billboard Creation**: Provides the ability to create, update, and delete billboards, which can be attached to specific categories or used independently. The admin generates API routes for various billboard use cases.

- **Search and Pagination**: Empowers users to search through categories, products, sizes, colors, billboards, with built-in pagination for efficient navigation.

- **Featured Products**: Allows control over which products are marked as "featured" for prominent display on the homepage.

- **Order and Sales Management**: Offers insights into order data, sales, and revenue with the ability to view graphical representations.

- **Authentication**: Implements Clerk Authentication for secure access to the admin dashboard.

- **Order Creation**: Enables the creation of new orders and manages the entire order process.

- **Stripe Integration**: Seamlessly integrates with Stripe for secure payment processing and checkout.

- **Stripe Webhooks**: Utilizes Stripe webhooks to handle payment-related events and updates.

- **Database and ORM**: Utilizes MySQL as the database, Prisma as the ORM, and PlanetScale for scalability and robust data management.

This E-commerce Admin Dashboard showcases my expertise in building complex web applications that serve as powerful tools for businesses. It demonstrates my ability to integrate various technologies to create a dynamic and user-friendly interface for managing e-commerce operations efficiently.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following in place:

- Node.js and npm
- Clerk Authentication setup
- Stripe API keys
- MySQL database
- Prisma and PlanetScale setup

### Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`

### Configuration

1. Copy the `.env.example` file and rename it to `.env`.
2. Fill in the required configuration values in the `.env` file, including Clerk Authentication, Stripe API keys, and database connection details.

## Usage

1. Start the development server: `npm run dev`
2. Access the admin dashboard in your browser at `http://localhost:3000`.

## Technologies Used

- Next.js
- Shadcn UI
- Clerk Authentication
- Stripe
- MySQL
- Prisma
- PlanetScale
- and more...

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Create a pull request describing your changes.

