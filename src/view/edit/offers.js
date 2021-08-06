export const createOffersTemplate = (offers) => offers.length ? `<section class="event__section event__section--offers">
  <h3 class="event__section-title event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offers.map((offer) => {
    const randomId = Math.random().toFixed(3);

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${randomId}" type="checkbox" name="event-offer-${randomId}">
        <label class="event__offer-label" for="event-offer-${randomId}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }).join('')}
  </div>
</section>` : '';
