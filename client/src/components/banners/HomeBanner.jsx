import { Link } from 'react-router-dom';
import Hotels from '../Hotels';

const HomeBanner = () => {
  return (
    <div className="home-banner mb-5">
      <div className="text-center home-banner__heading header__text-box">
        <div className="home-banner__heading--background">
          <h1 className="home-banner__heading--primary">
            Plan your best vacation here
          </h1>
          <Link href="#" className="btn home-banner__btn" to="/hotels">
            Discover available hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
