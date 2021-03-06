import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('pick-a-date', 'Integration | Component | pick a date', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{pick-a-date}}`);

  assert.equal(this.$('.ember-pick-a-date').length, 1);
  assert.equal(this.$('.ember-pick-a-date input').length, 1);
});

test('placeholder is set', function(assert) {
  assert.expect(1);
  this.render(hbs`{{pick-a-date placeholder='pew'}}`);

  assert.equal(this.$('.ember-pick-a-date input').attr('placeholder'), 'pew');
});

test('clicking input opens picker', function(assert) {
  assert.expect(2);
  this.render(hbs`{{pick-a-date}}`);
  let $input = this.$('.ember-pick-a-date input');

  assert.notOk($input.hasClass('picker__input--active'));

  $input.click();
  assert.ok($input.hasClass('picker__input--active'));
});

test('date is updated', function(assert) {
  assert.expect(4);
  let date = new Date();
  let initialDate = new Date(date);
  this.set('date', date);
  this.render(hbs`{{pick-a-date date=date}}`);

  assert.ok(this.get('date') === date, "Date set");

  this.$('.ember-pick-a-date input').click();

  Ember.run.next(() => {
    this.$('.ember-pick-a-date .picker__day--infocus').click();

    assert.ok(this.get('date') !== initialDate, "Date changed");

    // Check hours and minutes didn't get reset / changed
    assert.ok(this.get('date').getHours() === initialDate.getHours(), "Hours didn't change");
    assert.ok(this.get('date').getMinutes() === initialDate.getMinutes(), "Minutes didn't change");
  });
});
