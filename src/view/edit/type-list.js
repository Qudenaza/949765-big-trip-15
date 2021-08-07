import { TRIP_TYPES } from '../../const.js';

const createTypeItemTemplate = (type) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === 'taxi' ? 'checked' : ''}>
  <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;

export const createTypeListTemplate = (type) => {
  const typeItemsTemplate = TRIP_TYPES.slice(0).map((typeTitle) => createTypeItemTemplate(typeTitle)).join('');

  return `<div class="event__type-wrapper">
    <label class="event__type event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${typeItemsTemplate}
      </fieldset>
    </div>
  </div>`;
};
