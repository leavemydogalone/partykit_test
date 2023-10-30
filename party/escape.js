export default function escape(s) {
  var map = {
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
