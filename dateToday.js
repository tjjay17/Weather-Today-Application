exports.theDate = Today;

function Today(){
  var fullDate = new Date();
  const format = {weekday:'long',month:'long',day:'numeric',year:'numeric'};
  var today = fullDate.toLocaleDateString('en-US',format);

  return today;
}
