import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HotelCard from './cards/HotelCard';
import { userHotelBookings } from '../actions/hotels';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Bookings = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [hotels, setHotels] = useState([]);

  const getBookedHotels = async () => {
    try {
      const res = await userHotelBookings(token);
      console.log('Hello res => ', res.data);
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(hotels);
  useEffect(() => {
    getBookedHotels();
  }, []);

  return (
    <>
      <Container className="w-100 h-100">
        <Row className="w-100 h-100 mb-3">
          {hotels && hotels.length ? (
            hotels.map((hotel) => {
              return (
                <Col key={hotel._id} md={3}>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard hotel={hotel} />
                  </Link>
                </Col>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center dashboard-bookings">
              <h4 className="text-muted"> No Hotels Found</h4>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Bookings;
