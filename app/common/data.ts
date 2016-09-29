import _ = require("lodash");
import utils = require("common/utils");

var customers: ICustomer[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Snow",
        email: "test1@gmail.com",
        address: "Test"
    },
    {
        id: 2,
        firstName: "Hilary",
        lastName: "Clinton",
        email: "test2@gmail.com",
        address: "Test2"
    },
];

var customerIdentity = 2;


var movies: IMovie[] = [
    {
        id: 1,
        isAvailable: true,
        title: "Matrix I",
        serialNumber: "1234"
    },
    {
        id: 2,
        isAvailable: true,
        title: "Matrix I",
        serialNumber: "2221"
    },
    {
        id: 3,
        title: "Shrek II",
        serialNumber: "12312",
        isAvailable: true
    }
];

var moviesIdentity = 3;

var rentals: IRental[] = [
    {
        id: 1,
        customerId: 1,
        movieId: 1,
        rentalDate: new Date("1/1/2014 15:00:00"),
        returnDate: new Date("1/1/2014 15:30:00")
    }
];

var rentalIdentity = 1;

export function getAllCustomers(searchTerm: string): JQueryPromise<ICustomer[]> {
    
    return utils.createPromise(_.filter(customers, item => item.lastName.toLowerCase().indexOf((searchTerm || "").toLowerCase()) !== -1), 100);
}

export function createCustomer(customer: ICustomer) {
    customers.push(customer);
    customer.id = ++customerIdentity;

    return utils.createPromise(customer.id, 100);
}

export function getCustomer(id: number): JQueryPromise<ICustomer> {
    var found = _.find(customers, (cust) => cust.id === id);
    if (!found) {
        return utils.createPromise(null, 100, true);
    }

    return utils.createPromise(found, 100);
}

export function getAllMovies(title: string, serial: string): JQueryPromise<IMovie[]> {
    return utils.createPromise(movies, 100);
}

export function searchAvailableMovies(term: string) {
    if (!term) {
        return utils.createPromise([], 10);
    }
    return utils.createPromise(_.filter(movies,
        item => item.isAvailable && (item.title.toLowerCase().indexOf((term || "").toLowerCase()) !== -1 || item.serialNumber === term)), 10);
}

export function createMovie(movie: IMovie) {
    movies.push(movie);
    movie.id = ++moviesIdentity;

    return utils.createPromise(movie, 100);
}

export function rentMovie(movieId: number, customerId: number): JQueryPromise<boolean> {
    var movie = _.find(movies, m => m.id === movieId);
    if (!movie.isAvailable) {
        return utils.createPromise(false, 100);
    }

    movie.isAvailable = false;

    rentals.push({ id: ++rentalIdentity, customerId: customerId, movieId: movieId, rentalDate: new Date() });
    return utils.createPromise(true, 100);
}

export function returnMovie(rentalId: number) : JQueryPromise<boolean>{
    var foundRental = _.find(rentals, rental => rental.id === rentalId);
    if (!foundRental) {
        return utils.createPromise(false, 10);
    }
    foundRental.returnDate = new Date();

    var movie = _.find(movies, m => m.id === foundRental.movieId);
    movie.isAvailable = true;

    return utils.createPromise(true);
}

export function getRentalHistory(customerId: number) {
    var items = _.filter(rentals, r => r.customerId === customerId);
    var result = _.map(items, i => {
        var movie = _.find(movies, m => m.id === i.movieId);
        return <IRentalhistoryItem>{ rentalDate: i.rentalDate, returnDate: i.returnDate, rentalId: i.id, serial: movie.serialNumber, title: movie.title };
    });

    return utils.createPromise(result, 100);
}