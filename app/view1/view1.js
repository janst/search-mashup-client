'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngSanitize'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', [function() {

  }])

  .controller('SearchCtrl', ['$scope', 'EnhetsService', 'TwitterService', 'GoogleSearchService', '$http',
                    function($scope, EnhetsService, TwitterService, GoogleSearchService, $http) {
    var search = this;

    search.enhet = this;  // Check this out!
    search.twitter = this;

    search.search = function() {
      search.enhetresult = EnhetsService.query({query: search.query});
      search.twitterresult = TwitterService.query({query: search.query});
      search.googleresult = GoogleSearchService.query({query: search.query});
    };

    search.hasEnhetData = function() {
      if (search.enhetresult == undefined)
        return false;
      if (search.enhetresult.data == undefined)
          return false;
      var numOfResultsOnCurrentPage = search.enhetresult.data.length;
      console.log("numOfResultsOnCurrentPage " + numOfResultsOnCurrentPage);
      if (numOfResultsOnCurrentPage > 0)
        return true;
      else
        return false;
    };

    search.hasTwitterData = function() {
      if (search.twitterresult == undefined)
        return false;
      else if (search.twitterresult.length == 0)
          return false;
      else
        return true;

    };

    search.hasGoogleData = function() {
      if (search.googleresult == undefined)
        return false;
      else if (search.googleresult.items == undefined)
            return false;
      else if (search.googleresult.items.length == 0)
          return false;
      else
        return true;

    };

    search.nextEnhet = function() {
      var size = search.enhetresult.page.size;
      var page = search.enhetresult.page.page;
      var numOfResultsOnCurrentPage = search.enhetresult.data.length;
      console.log("Page: " + page + ", Size: " + size);

      if (numOfResultsOnCurrentPage == size)
        page = page + 1;
      search.enhetresult = EnhetsService.query({query: search.query, page: page});
    };

    search.nextGoogle = function() {
      var nextPage = search.googleresult.queries.nextPage[0];
      var nextIndex;
      if (nextPage != undefined) {
        nextIndex = nextPage.startIndex;
        search.googleresult = GoogleSearchService.query({query: search.query, startIndex: nextIndex});
      }

    };

    search.previousEnhet = function() {
      var size = search.enhetresult.page.size;
      var page = search.enhetresult.page.page;
      console.log("Page: " + page + ", Size: " + size);

      if (page > 0)
        page = page - 1;
      search.enhetresult = EnhetsService.query({query: search.query, page: page});
    };

    search.previousGoogle = function() {
      if (search.googleresult.queries.previousPage == undefined)
        return;
      var previousPage = search.googleresult.queries.previousPage[0];
      var previousIndex;
      if (previousPage != undefined) {
        previousIndex = previousPage.startIndex;
        search.googleresult = GoogleSearchService.query({query: search.query, startIndex: previousIndex});
      }
    };


  }]);
