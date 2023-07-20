# Scalable Eventify - Scalable Event Booking Site

Scalable Eventify aims to provide a scalable event booking platform. It consists of three main services: Search Service, Booking Service, and Reminder Service. These services work together to create a seamless experience for users who want to search for events, book tickets, and receive reminders for their upcoming events.

## Services Overview:
### Search Service:

The Search Service is responsible for managing event data and providing a search interface for users to find events based on various criteria such as location, date, category, and keyword.
It fetches event data from the database and allows users to discover upcoming events that match their preferences.

### Booking Service:

The Booking Service handles the booking process for users who want to attend specific events.
Users can select events they are interested in and proceed with the booking process, including selecting the number of tickets and completing the booking.

<!-- ### Reminder Service:

The Reminder Service ensures that users receive timely reminders for their booked events.
It sends notifications to users, reminding them of the upcoming event date and other relevant details. -->

## Database Schema:
The Search Service utilizes a database to store and manage event data. The DB Schema provides an overview of the database structure, including tables for events, event categories, event locations, and more. The schema is designed to efficiently store and retrieve event information for fast and accurate search results.

- Search Service Schema: https://erd.dbdesigner.net/designer/schema/1689421178-scalable-eventify

Installation and Setup:
To run Scalable Eventify on your local machine, follow these steps:

- Clone the repository: $ git clone git@github.com:AsisRout/Scalable-Eventify.git
- Install dependencies for each service: $ npm install
- Set up the database: 
- Start each service: $ npm run dev for Search Service, Booking Service, and Reminder Service.

## Technology Stack:
- Node.js
- Express.js
- MySQL