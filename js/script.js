// مثال برای پرواز ها
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
        date: '2025-06-03'
    },
    {
        id: 'FL456',
        airline: 'Iran Aseman',
        logo: 'images/iranaseman.png',
        departure: 'Tehran',
        arrival: 'Shiraz',
        departureTime: '12:30',
        arrivalTime: '15:00',
        duration: '2h 30m',
        price: 19900000,
        date: '2025-06-04'
    },
    {
        id: 'FL789',
        airline: 'Mahan Air',
        logo: 'images/mahan-air.png',
        departure: 'Shiraz',
        arrival: 'Yazd',
        departureTime: '18:45',
        arrivalTime: '21:15',
        duration: '2h 30m',
        price: 14200000,
        date: '2025-06-05'
    },
    {
        id: 'FL321',
        airline: 'Iran Airtour',
        logo: 'images/iran-airtour.png',
        departure: 'Shiraz',
        arrival: 'Mashhad',
        departureTime: '07:30',
        arrivalTime: '10:00',
        duration: '2h 30m',
        price: 21000000,
        date: '2025-06-07'
        
    }
];

// مثال برای قطار  ها
const trains = [
    {
        id: 'TR123',
        name: 'Raja',
        number: '12951',
        departure: 'Shiraz',
        arrival: 'Mashhad',
        departureTime: '16:55',
        arrivalTime: '08:35',
        duration: '15h 40m',
        price: 8000000,
        date: '2025-06-03',
        class: '3AC'
    },
    {
        id: 'TR456',
        name: 'Simorgh',
        number: '12213',
        departure: 'Mashhad',
        arrival: 'Shiraz',
        departureTime: '22:15',
        arrivalTime: '15:30',
        duration: '17h 15m',
        price: 8600000,
        date: '2025-06-04',
        class: '3AC'
    },
    {
        id: 'TR789',
        name: 'Sabz',
        number: '12009',
        departure: 'Shiraz',
        arrival: 'Tehran',
        departureTime: '06:10',
        arrivalTime: '22:45',
        duration: '16h 35m',
        price: 5400000,
        date: '2025-06-05',
        class: '2AC'
    }
];

// داده های رزرو
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// اینیت کردن صفحه ها
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'flights.html') {
        setupFlightSearch();
    } else if (path === 'trains.html') {
        setupTrainSearch();
    } else if (path === 'confirmation.html') {
        displayBookings();
    } else if (path === 'index.html' || path === '') {
        setupHomePage();
    }
});

// ستاپ جستجو پرواز ها
function setupFlightSearch() {
    const form = document.getElementById('flight-search-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            searchFlights();
        });
    }
    
    // ست کردن تاریخ به امروز
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure-date').min = today;
    document.getElementById('return-date').min = today;
}

// جستجو پرواز ها
function searchFlights() {
    const from = document.getElementById('flight-from').value.toLowerCase();
    const to = document.getElementById('flight-to').value.toLowerCase();
    const date = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const passengers = document.getElementById('passengers').value;
    const flightClass = document.getElementById('flight-class').value;
    
    // فیلتر پرواز ها
    let results = flights.filter(flight => {
        return (flight.departure.toLowerCase().includes(from) || 
                flight.arrival.toLowerCase().includes(to)) &&
               flight.date === date;
    });
    
    displayFlightResults(results);
}

// نمایش پرواز ها
function displayFlightResults(flights) {
    const container = document.getElementById('flight-results');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (flights.length === 0) {
        container.innerHTML = '<p>هیچ پروازی برای رزرو یافت نشد.</p>';
        return;
    }
    
    flights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'result-card';
        flightCard.innerHTML = `
            <div class="result-logo">
                <img src="${flight.logo}" alt="${flight.airline}">
            </div>
            <div class="result-details">
                <h3>${flight.airline} - ${flight.id}</h3>
                <div class="result-meta">
                    <span>${flight.departureTime} - ${flight.arrivalTime}</span>
                    <span>${flight.duration}</span>
                    <span>${flight.departure} → ${flight.arrival}</span>
                </div>
            </div>
            <div class="result-price">
                <div class="price">﷼${flight.price}</div>
                <button class="btn book-btn" data-id="${flight.id}">رزرو!</button>
            </div>
        `;
        container.appendChild(flightCard);
    });
    
    // اضافه کردن ایونت لیسنر به دکمه ها
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const flightId = this.getAttribute('data-id');
            bookFlight(flightId);
        });
    });
}

// رزرو پرواز
function bookFlight(flightId) {
    const flight = flights.find(f => f.id === flightId);
    if (!flight) return;
    
    const booking = {
        id: generateBookingId(),
        type: 'flight',
        details: flight,
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
        passengers: document.getElementById('passengers').value || '1',
        class: document.getElementById('flight-class').value || 'اقتصادی'
    };
    
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    alert(`پرواز ${flight.id} باموفقیت رزرو شد!`);
    window.location.href = 'confirmation.html';
}

// ستاپ جستجو قطار ها
function setupTrainSearch() {
    const form = document.getElementById('train-search-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            searchTrains();
        });
    }
    
    // ست کردن تاریخ به امروز
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('journey-date').min = today;
    document.getElementById('return-train-date').min = today;
}

// جستجو قطار
function searchTrains() {
    const from = document.getElementById('train-from').value.toLowerCase();
    const to = document.getElementById('train-to').value.toLowerCase();
    const date = document.getElementById('journey-date').value;
    const returnDate = document.getElementById('return-train-date').value;
    const passengers = document.getElementById('train-passengers').value;
    const trainClass = document.getElementById('train-class').value;
    
    // فیلتر قطار ها
    let results = trains.filter(train => {
        return (train.departure.toLowerCase().includes(from) || 
                train.arrival.toLowerCase().includes(to)) &&
               train.date === date &&
               train.class.toLowerCase().includes(trainClass.toLowerCase());
    });
    
    displayTrainResults(results);
}

// نمایش نتیجه رزرو قطار ها
function displayTrainResults(trains) {
    const container = document.getElementById('train-results');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (trains.length === 0) {
        container.innerHTML = '<p>هیچ قطاری برای رزرو یافت نشد.</p>';
        return;
    }
    
    trains.forEach(train => {
        const trainCard = document.createElement('div');
        trainCard.className = 'result-card';
        trainCard.innerHTML = `
            <div class="result-logo">
                <img src="images/train-icon.png" alt="قطار">
            </div>
            <div class="result-details">
                <h3>${train.name} - ${train.number}</h3>
                <div class="result-meta">
                    <span>${train.departureTime} - ${train.arrivalTime}</span>
                    <span>${train.duration}</span>
                    <span>${train.departure} → ${train.arrival}</span>
                    <span>کلاس: ${train.class}</span>
                </div>
            </div>
            <div class="result-price">
                <div class="price">﷼${train.price}</div>
                <button class="btn book-btn" data-id="${train.id}">رزرو!</button>
            </div>
        `;
        container.appendChild(trainCard);
    });
    
    // اضافه کردن ایونت لیسنر به دکمه ها
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const trainId = this.getAttribute('data-id');
            bookTrain(trainId);
        });
    });
}

// رزرو قطار
function bookTrain(trainId) {
    const train = trains.find(t => t.id === trainId);
    if (!train) return;
    
    const booking = {
        id: generateBookingId(),
        type: 'train',
        details: train,
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
        passengers: document.getElementById('train-passengers').value || '1',
        class: document.getElementById('train-class').value || 'sleeper'
    };
    
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    alert(`قطار ${train.number} با موفقیت رزرو شد!`);
    window.location.href = 'confirmation.html';
}

// نمایش رزرو ها بر روی صفحه رزرو های من
function displayBookings() {
    const container = document.getElementById('bookings-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">شما هنوز رزروی انجام نداده اید. برای رزرو بلیط، <a href="index.html">شروع به جستجو کنید.</a></p>';
        return;
    }
    
    bookings.forEach(booking => {
        const bookingCard = document.createElement('div');
        bookingCard.className = 'booking-card';
        
        let detailsHtml = '';
        if (booking.type === 'flight') {
            detailsHtml = `
                <div class="booking-info">
                    <h3>${booking.details.airline} - ${booking.details.id}</h3>
                    <div class="booking-meta">
                        <span>${booking.details.departure} → ${booking.details.arrival}</span>
                        <span>${booking.details.departureTime} - ${booking.details.arrivalTime}</span>
                        <span>${booking.details.date}</span>
                    </div>
                    <p>تعداد مسافران: ${booking.passengers} | کلاس: ${booking.class}</p>
                </div>
            `;
        } else {
            detailsHtml = `
                <div class="booking-info">
                    <h3>${booking.details.name} - ${booking.details.number}</h3>
                    <div class="booking-meta">
                        <span>${booking.details.departure} → ${booking.details.arrival}</span>
                        <span>${booking.details.departureTime} - ${booking.details.arrivalTime}</span>
                        <span>${booking.details.date}</span>
                    </div>
                    <p>تعداد مسافران: ${booking.passengers} | کلاس: ${booking.class}</p>
                </div>
            `;
        }
        
        bookingCard.innerHTML = `
            <div class="booking-header">
                <span class="booking-id">کد رزرو :${booking.id}</span>
                <span class="booking-status status-${booking.status}">${booking.status}</span>
            </div>
            <div class="booking-details">
                ${detailsHtml}
                <div class="booking-actions">
                    <button class="btn">مشاهده بلیط</button>
                    <button class="btn cancel-btn" data-id="${booking.id}">لغو</button>
                </div>
            </div>
        `;
        
        container.appendChild(bookingCard);
    });
    
    // اضافه کردن ایونت لیسنر به دکمه لغو
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            cancelBooking(bookingId);
        });
    });
}

// لغو رزرو
function cancelBooking(bookingId) {
    if (confirm('آیا مطمئن هستید که می خواهید این رزرو را لغو کنید؟')) {
        bookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        displayBookings();
    }
}

// جنریت کردن شماره تصادفی برای شماره رزرو
function generateBookingId() {
    return 'BK' + Math.floor(100000 + Math.random() * 900000);
}

// ستاپ قابلیت جستجو در صفحه خانه
function setupHomePage() {
    const flightForm = document.getElementById('quick-flight-search');
    const trainForm = document.getElementById('quick-train-search');
    
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'flights.html';
        });
    }
    
    if (trainForm) {
        trainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'trains.html';
        });
    }
    
    // ست کردن تاریخ به امروز در هرکدام از فرم ها
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('flight-date').min = today;
    document.getElementById('train-date').min = today;
}
