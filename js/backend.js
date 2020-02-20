'use strict';

window.backend = (function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SERVER_UNAVAILABLE: 503,
    SERVER_OFF: 521
  };
  var TIMEOUT_IN_MS = 10000; // 10 s;

  var dataPictures = [];

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        throw new Error('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('timeout', function () {
      throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  return {
    load: load,
    dataPictures: dataPictures
  };
})();
