import { React, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';

import { searchListings } from '../actions/hotels';
import HotelCard from '../components/cards/HotelCard';
import Search from '../components/Search';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState();

  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const bed = searchParams.get('bed');

  useEffect(() => {
    searchListings({ location, date, bed }).then((res) => setHotels(res.data));
  }, [window.location.search]);

  return (
    <Container>
      <Row>
        <Search locationProps={location} dateProps={date} bedProps={bed} />
      </Row>
      <Row>
        <Col>
          {hotels && (
            <h4 className="mb-4">
              {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} found
            </h4>
          )}
        </Col>
      </Row>
      <Row>
        {hotels && hotels.length ? (
          hotels.map((hotel) => (
            <Col key={hotel._id} md={3}>
              <Link
                to={`/hotels/${hotel._id}`}
                className="text-decoration-none text-dark"
              >
                <HotelCard hotel={hotel} />
              </Link>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center dashboard-bookings">
            <h4 className="text-muted"> No Hotels Found</h4>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default SearchResult;
