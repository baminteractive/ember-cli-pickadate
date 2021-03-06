import Ember from 'ember';
import layout from '../templates/components/pick-a-date';

export default Ember.Component.extend({
  layout: layout,
  picker: null,
  placeholder: "Select a date",
  options: {},
  value: null,
  date: null,
  classNames: ['ember-pick-a-date'],

  connectPickadate: Ember.on('didInsertElement', function() {
    var options = this.get('options');
    options.onClose = options.onClose || this.onClose;
    this.$('input').pickadate(options);
    this.set('picker', this.$('input').pickadate('picker'));
  }),

  onClose: function(){
    // Prevent pickadate from re-opening on focus
    Ember.$(document.activeElement).blur();
  },

  updateDate: Ember.observer('value', function() {
    var date = this.get('date');

    if (!date) {
      date = new Date();
      this.set('date', date);
    }

    var dateItem = this.get('picker').get('select');
    if (!dateItem) {
      return;
    }
    date.setYear(dateItem.year);
    date.setMonth(dateItem.month);
    date.setDate(dateItem.date);
  })
});
