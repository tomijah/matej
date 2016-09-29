declare var baseUrl: string;

interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string
}

interface IMovie {
    id: number;
    title: string;
    serialNumber: string;
    isAvailable: boolean;
}

interface IRental {
    id: number;
    movieId: number;
    customerId: number;
    rentalDate: Date;
    returnDate?: Date;
}

interface IRentalhistoryItem {
    rentalId: number;
    title: string;
    serial: string;
    rentalDate: Date;
    returnDate?: Date;
}