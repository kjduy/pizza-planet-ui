/**
 * Set the id to query the order
 */

let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get("_id");

fetch(`http://127.0.0.1:5000/order/id/${_id}`)
  .then((response) => response.json())
  .then((order) => {
    let template = createRowTemplate(order);
    $("#order").append(template);
    formatDateTime(order.date, "formatted-date", "date");
    formatDateTime(order.date, "formatted-time", "time");
  });

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createRowTemplate(order) {
  let template = $("#order-template")[0].innerHTML;
  return Mustache.render(template, order);
}

function formatDateTime(dateTime, elementId, formatType) {
  const inputDate = new Date(dateTime);
  const differenceMinutes = new Date().getTimezoneOffset();
  const utcTime = inputDate.getTime() - differenceMinutes * 60000;
  const utcDate = new Date(utcTime);
  const options = {
    dateStyle: formatType === "date" ? "short" : undefined,
    timeStyle: formatType === "time" ? "short" : undefined,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDateTime = formatter.format(utcDate);
  const formattedElement = document.getElementById(elementId);
  formattedElement.textContent = formattedDateTime;
}
