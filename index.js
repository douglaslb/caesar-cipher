const fs = require("fs");
const answer = require("./answer.json");
const crypto = require("crypto");

function decrypt() {
  var result = "";
  var text = answer.cifrado;
  var shift = answer.numero_casas;
  shift = (26 - shift) % 26;
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + shift) % 26) + 97);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }

  answer.decifrado = result;
  fs.writeFileSync("./src/answer.json", JSON.stringify(answer));

  encrypt();
}

function encrypt() {
  var sha1 = crypto
    .createHash("sha1")
    .update(answer.decifrado, "binary")
    .digest("hex");
  answer.resumo_criptografico = sha1;
  fs.writeFileSync("./src/answer.json", JSON.stringify(answer));
}

decrypt();
