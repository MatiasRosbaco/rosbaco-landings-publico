import ReactGA from 'react-ga'

const analytics_initializer = (api_tracking_id) => {
    ReactGA.initialize(api_tracking_id, { debug: true });
    ReactGA.pageview(window.location.pathname + window.location.search);
};

export default analytics_initializer; 