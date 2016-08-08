describe("Filter Test", function () {
    var $filter;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Test matchMonthAndYear', function () {
        var items = [{
            "year": 2016,
            "month": 8,
        }, {
            "year": 2016,
            "month": 8,
        }, {
            "year": 2015,
            "month": 11,
        }, {
            "year": 2014,
            "month": 12,
        }];
        var matchMonthAndYear = $filter("matchMonthAndYear");
        expect(matchMonthAndYear(items, 8, 2016).length).toEqual(2);
        expect(matchMonthAndYear(items, 11, 2015).length).toEqual(1);
        expect(matchMonthAndYear(items, 12, 2014).length).toEqual(1);
    });

    it('Test dateRange', function () {
        var items = [{
            "date": "2016-08-01"
        }, {
            "date": "2016-08-31"
        }, {
            "date": "2016-05-30"
        }, {
            "date": "2014-12-15"
        }];
        var dateRange = $filter("dateRange");
        expect(dateRange(items, 8, 2016).length).toEqual(2);
        expect(dateRange(items, 5, 2016).length).toEqual(1);
    });


});

