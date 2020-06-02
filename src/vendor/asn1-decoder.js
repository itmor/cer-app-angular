(function() {
  var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;

  function decodeAsn(file, callback, errCallback) {
    read(file, callback, errCallback);
  }

  function getAsn(der, callback, errCallback) {
    try {
      const asn1 = window.ASN1.decode(der);
      if (asn1.typeName() !== 'SEQUENCE') {
        errCallback('Неверная структура сертификата (ожидается SEQUENCE)');
      } else {
        callback(asn1);
      }

    } catch (e) {
      errCallback(e);
    }
  }

  function decodeBinaryString(str, callback, errCallback) {
    let der;
    try {
      if (reHex.test(str)) {
        der = window.Hex.decode(str);
      } else if (window.Base64.re.test(str)) {
        der = window.Base64.unarmor(str);
      } else {
        der = str;
        getAsn(der, callback, errCallback);
      }
    } catch (e) {
      errCallback(e);
    }
  }

  function read(file, callback, errCallback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        errCallback(`Your browser couldn't read the specified file (error code ${reader.error.code}.`)
      } else {
        decodeBinaryString(reader.result, callback, errCallback);
      }
    };

    reader.readAsBinaryString(file);
  }

  window.decodeAsn = decodeAsn;
})();