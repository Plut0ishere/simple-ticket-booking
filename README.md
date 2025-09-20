# ✈ Simple Ticket Booking Webpage ✈ (PER)
This is a simple webpage for booking train and flight tickets.

## Table Of Contents

- [Preview](#preview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Search Example](#search-example)
- [License](#license)
- [Conclusion](#conclusion)

## Preview
![Screenshot 2025-06-12 at 16-00-11 آسان سفر! - خرید بلیط هواپیما و قطار](https://github.com/user-attachments/assets/dafaaf5f-5083-4318-8110-cfd4a5da7d7a)

## Technologies Used
- **HTML**
- **CSS**
- **JS**

## Getting Started
To get started with ticket booking project, you will need to clone the repository and install the necessary dependencies. Follow the steps below:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Plut0ishere/simple-ticket-booking.git
   cd simple-ticket-booking
   ```
2. **Install Dependencies**:

   Make sure you have Node.js and npm installed. Run the following command:
   ```bash
   npm install
   ```
3. **Run the Webpage**:

   Start the Webpage with:
   ```bash
   npm run dev
   ```
   and after running this command, open the localhost link in your browser.

## Usage 
Once the webpage is running, you can navigate through interface. Use the navigation bar to find and search flight or train tickets.

## Search Example
To do a search, you have to open script.js file and edit the date to match today's date.(for both flights and trains)

For example :

```bash
const flights = [
    {
        id: 'FL123',
        airline: 'Iran Air',
        logo: 'images/iran-air.png',
        departure: 'Shiraz',
        arrival: 'Tehran',
        departureTime: '08:00',
        arrivalTime: '10:30',
        duration: '2h 30m',
        price: 20000000,
        date: '2025-06-03'//<-------edit this date to today's date.
    }
```
also match the departure and arrival in webpage with the ones in script.js file for the result to show up. For trains, you also have to match the class in webpage with the ones in script.js file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Conclusion

The Ticket Booking Project is a simple project where you can reserve tickets for flights and trains with ease!
