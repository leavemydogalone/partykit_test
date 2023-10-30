export default function escape(s) {
  var map = {
    "&": "",
    "<": "",
    ">": "",
    '"': "",
    "'": "",
  };

  return s.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}
