import * as assert from 'assert';

import { summary } from './summary';

describe('summary tests', () => {
    it('testing data method', (done) => {
        assert.deepStrictEqual(
            summary([2, 3, 7, -2, 0, 1, 1]).data(),
            [2, 3, 7, -2, 0, 1, 1]
        );

        done();
    });

    it('testing sort method', (done) => {
        const data = [2, 3, 7, -2, 0, 1, 1];

        assert.deepStrictEqual(
            summary(data, true).sort(),
            [2, 3, 7, -2, 0, 1, 1]
        );
        assert.deepStrictEqual(data, [2, 3, 7, -2, 0, 1, 1], 'data shouldn\'t mutate');

        assert.deepStrictEqual(
            summary(data, false).sort(),
            [-2, 0, 1, 1, 2, 3, 7]
        );
        assert.deepStrictEqual(data, [2, 3, 7, -2, 0, 1, 1], 'data shouldn\'t mutate');

        assert.deepStrictEqual(
            summary(data).sort(),
            [-2, 0, 1, 1, 2, 3, 7]
        );
        assert.deepStrictEqual(data, [2, 3, 7, -2, 0, 1, 1], 'data shouldn\'t mutate');

        done();
    });

    it('testing size method', (done) => {
        assert.deepStrictEqual(
            summary([1, 10]).size(),
            2
        );

        done();
    });

    it('testing sum method', (done) => {
        assert.deepStrictEqual(
            summary([1, 10]).sum(),
            11
        );

        done();
    });

    it('testing mode method', (done) => {
        assert.deepStrictEqual(
            summary([10, 11, 12, 11, 12, 7, 12]).mode(),
            12
        );

        assert.deepStrictEqual(
            summary([10, 13, 12, 13, 12, 13, 12]).mode(),
            13
        );

        assert.deepStrictEqual(
            summary([1, 2, 3]).mode(),
            3
        );

        done();
    });

    it('testing mean method', (done) => {
        assert.deepStrictEqual(
            summary([2, 4]).mean(),
            3
        );

        done();
    });

    it('testing quartile method', (done) => {
        var data = summary([
            2, 27, 10, 29, 16, 8, 5, 19, 2, 2, 18, 28,
            7, 28, 28, 25, 19, 14, 18, 21, 25, 29, 7,
            3, 21, 3, 24, 18, 12, 25
        ]);

        assert.deepStrictEqual(data.quartile(0.00), 2.00);
        assert.deepStrictEqual(data.quartile(0.13), 3.00);
        assert.deepStrictEqual(data.quartile(0.26), 7.00);
        assert.deepStrictEqual(data.quartile(0.39), 14.0);
        assert.deepStrictEqual(data.quartile(0.52), 18.0);
        assert.deepStrictEqual(data.quartile(0.65), 21.0);
        assert.deepStrictEqual(data.quartile(0.78), 25.0);
        assert.deepStrictEqual(data.quartile(0.91), 28.0);
        assert.deepStrictEqual(data.quartile(1.00), 29.0);

        done();
    });

    it('testing median method', (done) => {
        var data = summary([
            2, 27, 10, 29, 16, 8, 5, 19, 2, 2, 18, 28,
            7, 28, 28, 25, 19, 14, 18, 21, 25, 29, 7,
            3, 21, 3, 24, 18, 12, 25
        ]);

        assert.deepStrictEqual(data.median(), 18);

        done();
    });

    it('testing variance method', (done) => {
        assert.deepStrictEqual(summary([-2, -1, 0, 1, 2]).variance(), 2.5);

        done();
    });

    it('testing sd method', (done) => {
        assert.deepStrictEqual(summary([-2, -1, 0, 1, 2]).sd(), Math.sqrt(2.5));

        done();
    });

    it('testing max method', (done) => {
        assert.deepStrictEqual(summary([6, 10, 2, 5]).max(), 10);

        done();
    });

    it('testing min method', (done) => {
        assert.deepStrictEqual(summary([6, 10, 2, 5]).min(), 2);

        done();
    });

    it('typed array', (done) => {
        assert.deepStrictEqual(summary(new Int8Array([2, 4])).mean(), 3);

        done();
    });
});
