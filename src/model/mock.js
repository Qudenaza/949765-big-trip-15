export default class Mock {
  constructor(offers, destinations) {
    this._offers = offers;
    this._destinations = destinations;
  }

  get offers() {
    return this._offers;
  }

  get destinations() {
    return this._destinations;
  }

  setOffersData(data) {
    this._offers = data;
  }

  setDestinationsData(data) {
    this._destinations = data;
  }

  static adaptOffersToClient(offers) {
    const adaptedOffers = {};

    offers.forEach((offer) => adaptedOffers[offer.type] = offer.offers);

    return adaptedOffers;
  }

  static adaptDestinationsToClient(destinations) {
    const adaptedDestinations = {};

    destinations.forEach((destination) => {
      adaptedDestinations[destination.name] = {
        'description': destination.description,
        'pictures': destination.pictures,
        'name': destination.name,
      };
    });

    return adaptedDestinations;
  }
}
