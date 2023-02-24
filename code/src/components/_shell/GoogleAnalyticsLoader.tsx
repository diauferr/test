import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Stage } from '../../enums/Stage.enum';

const { REACT_APP_ENVIRONMENT, REACT_APP_GOOGLE_ANALYTICS_TRACKING_CODE } =
  process.env;

export const GoogleAnalyticsLoader: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (REACT_APP_ENVIRONMENT !== Stage.Production) {
      return;
    }

    // console.log("iniciando google analytics.");
    ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_TRACKING_CODE);
    history.listen((location) => {
      ReactGA.pageview(location.pathname);
    });
  }, []);

  return null;
};
