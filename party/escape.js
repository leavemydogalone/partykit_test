export default function escape(s) {
  var map = {
    // TODO implement escpaing to below values and handle them properly on frontend
    // "&": "&amp;",
    // "<": "&lt;",
    // ">": "&gt;",
    // '"': "&quot;",
    // "'": "&#039;",
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
