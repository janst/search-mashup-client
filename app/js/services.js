var EnhetsServices = angular.module('enhetsServices', ['ngResource']);

EnhetsServices.factory('EnhetsService', ['$resource',
  function($resource){
    return $resource("http://data.brreg.no/enhetsregisteret/enhet.json?page=:page&size=:size&$filter=startswith(navn,%27:query%27)", {}, {
      query: {method:'GET', params:{query:'dummy', page: 0, size: 10}, isArray:false}
    });
  }]);

  EnhetsServices.factory('TwitterService', ['$resource',
    function($resource){
      return $resource("http://localhost:8081/twitter/status/search/:query", {}, {
        query: {method:'GET', params:{query:'dummy'}, isArray:true}
      });
    }]);
