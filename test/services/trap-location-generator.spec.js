/* global describe, it */

import { expect } from 'chai';
import Generator from '../../src/services/trap-location-generator';

describe('trap location generator', function() {
  it('returns new trap locations', function() {

    // Arrange

    const count = 3;
    const height = 3;
    const width = 3;

    // Act

    const generator = new Generator();
    const locations = generator.generateLocations(width, height, count);

    // Assert

    const keys = Object.keys(locations);
    expect(keys.length).to.be.greaterThan(0);

    keys.forEach(xValue => {
      expect(Number(xValue), 'x co-ordinate should be at least 0').to.be.at.least(0);

      locations[xValue].forEach(yValue => {
        expect(yValue, 'y co-ordinate should be at least 0').to.be.at.least(0);
      });
    });
  });

  it('returns different locations each time', function() {

    // Arrange

    const count = 3;
    const height = 3;
    const width = 3;

    // Act

    const generator = new Generator();
    const locations1 = generator.generateLocations(width, height, count);
    const locations2 = generator.generateLocations(width, height, count);

    // Assert

    expect(locations1).not.to.deep.equal(locations2);
  });
});
