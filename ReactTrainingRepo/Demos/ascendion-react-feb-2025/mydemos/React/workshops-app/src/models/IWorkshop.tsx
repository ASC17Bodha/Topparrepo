export interface ILocation{
    address: string;
    city: string;
    state: string;
}

export interface IModes{
    inPerson: boolean;
    online: boolean;

}

export interface IWorkshop {
    id: number;
    name: string;
    description: string;
    location: ILocation;
    modes: IModes;
    isFavorite: boolean;
    category: string;
    startDate: string;
    endDate: string;
    time: string;
    imageUrl: string;
}