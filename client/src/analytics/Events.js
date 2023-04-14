import ReactGA from 'react-ga'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

export function sendAnaliticsEvent(category, action, data) {
  ReactGA.event({
    category: category,
    action: action,
    label: '{'+data+ ', "date": '+formatDate(new Date())+'}'
  });
};

const Events = (category, action, data) => {
    sendAnaliticsEvent(category, action, data);
};

export default Events; 