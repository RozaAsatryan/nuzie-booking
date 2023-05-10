import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allHotels } from '../actions/hotels';
import { Col, Row, Container } from 'react-bootstrap';
import Hotels from './Hotels';

const AllAvailableHotels = () => {
  const [hotels, setHotels] = useState([]);
  const getAllHotels = async () => {
    try {
      const res = await allHotels();
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error('Err', err.message);
    }
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      <Container className="w-100 h-100">
        <Row className="w-100 h-100 mb-3">
          <Col
            md={12}
            className="mt-4 mb-5 d-flex justify-content-center align-items-center"
          >
            <div
              className="text-center"
              style={{ fontSize: '24px', fontWeight: '500' }}
            >
              All Available Hotels
            </div>
          </Col>
        </Row>
        <Row>
          <Hotels />
        </Row>
      </Container>
    </>
  );
};

export default AllAvailableHotels;
