import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { diffDays, getHotelById, isAlreadyBooked } from '../../actions/hotels';
import { toast } from 'react-toastify';
import { BiBed, BiCalendarAlt, BiLocationPlus } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';

const SingleHotel = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [alreadyBooked, setAlreadyBooked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const getSingleHotel = async () => {
    try {
      const res = await getHotelById(params.id);
      if (res.data) {
        setHotel(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate('/login');
      return;
    }

    setLoading(true);

    let res = await getSessionId(auth.token, params.id);
    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_KEY}`);

    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log('result', result));
  };

  useEffect(() => {
    getSingleHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, params.id).then((res) => {
        console.log(res);
        setAlreadyBooked(false);
      });
    }
  }, []);

  return (
    <>
      {Object.keys(hotel).length && (
        <Container className="mt-4 w-100 h-100">
          <Row className="h-100 w-100 d-flex justify-content-center">
            <Col
              className="single-hotel__top d-flex justify-content-center align-items-center"
              md={10}
              style={{
                backgroundImage: `linear-gradient(to right bottom, rgba(66, 99, 92, 0.7), rgba(40, 180, 133, 0.7) ), url(${
                  import.meta.env.VITE_APP_API
                }/hotel/image/${params.id})`,
              }}
            >
              <h2 className="single-hotel__top--primary text-center">
                {hotel.title}
              </h2>
              <div>
                <p className="d-flex align-items-center text-light fs-5">
                  <BiLocationPlus
                    className="fs-3"
                    style={{ marginRight: '7px', fontWeight: 'bold' }}
                  />{' '}
                  {hotel.location}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-5">
            <Col md={10}>
              <ListGroup horizontal>
                <ListGroup.Item style={{ width: '70%' }}>
                  <Card.Title className="fs-2 mb-3">Overview</Card.Title>

                  <h3 className="fs-4">{hotel.title}</h3>
                  <p>{hotel.content}</p>
                </ListGroup.Item>
                <ListGroup.Item style={{ width: '30%' }}>
                  <Card.Title className="fs-3 mb-3">
                    Additional Information
                  </Card.Title>

                  <div>
                    <h4 className="lead fw-bold">Location</h4>
                    <p className="d-flex align-items-center">
                      <GoLocation
                        className="fs-4"
                        style={{ marginRight: '7px' }}
                      />{' '}
                      {hotel.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="lead fw-bold">Available</h4>

                    <p className="d-flex align-items-center">
                      <BiCalendarAlt
                        className="fs-4"
                        style={{ marginRight: '7px' }}
                      />
                      for {diffDays(hotel.from, hotel.to)}{' '}
                      {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                      {/* from {new Date(hotel.from).toLocaleDateString()} */}
                    </p>
                  </div>
                  <div>
                    <h4 className="lead fw-bold">Beds</h4>

                    <p className="d-flex align-items-center">
                      <BiBed className="fs-4" style={{ marginRight: '7px' }} />
                      {hotel.bed} {hotel.bed <= 1 ? ' bed' : ' beds'}
                    </p>
                  </div>
                  <p>
                    Available from {new Date(hotel.from).toLocaleDateString()}
                  </p>
                </ListGroup.Item>
              </ListGroup>

              <Button
                disabled={loading || alreadyBooked}
                variant="dark"
                className="mb-5 mt-5 w-100"
                onClick={handleBooking}
              >
                {loading
                  ? 'Loading...'
                  : alreadyBooked
                  ? 'Already Booked'
                  : auth && auth.token
                  ? 'Book Now'
                  : 'Login to Book'}
              </Button>
            </Col>
            <Col md={10} style={{ marginBottom: '30px', height: '30%' }}>
              <>
                <div
                  style={{
                    position: 'relative',
                    textAlign: 'right',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      overflow: 'hidden',
                      background: 'none',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <iframe
                      height="400px"
                      width="100%"
                      src={`https://maps.google.com/maps?q=${hotel.location}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleHotel;
