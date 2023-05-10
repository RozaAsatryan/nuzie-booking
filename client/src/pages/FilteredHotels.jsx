// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { allHotels } from '../actions/hotels';
// import { Link } from 'react-router-dom';
// import HotelCard from '../components/cards/HotelCard';
// import { Col, Row, Container, Dropdown } from 'react-bootstrap';
// import Hotels from '../components/Hotels';

// const FilteredHotels = () => {
//   const [hotels, setHotels] = useState('');
//   const regions = [
//     'Aragatsotn',
//     'Ararat',
//     'Armavir',
//     'Gegharkunik',
//     'Kotayk',
//     'Lori',
//     'Shirak',
//     'Syunik',
//     'Tavush',
//     'Vayots Dzor',
//     'Yerevan',
//   ];
//   //   const [location, setLocation] = useState('');
//   const loc = useSearchParams().get('location');
//   //   console.log(hotels);
//   const getAllHotels = async () => {
//     try {
//       const res = await allHotels();
//       if (res.data) {
//         setHotels(res.data);
//       }
//     } catch (err) {
//       toast.error('Err');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // navigate(`/hotels?location=${location}`);
//   };
//   const handleFilter = () => {};

//   useEffect(() => {
//     getAllHotels();
//   }, []);

//   return (
//     <>
//       <Container className="w-100 h-100">
//         <Row className="w-100 h-100 mb-3">
//           <Col
//             md={12}
//             className="mt-4 mb-5 d-flex justify-content-center align-items-center"
//           >
//             <div
//               className="text-center"
//               style={{ fontSize: '24px', fontWeight: '500' }}
//             >
//               All Available Hotels in {loc}
//             </div>
//           </Col>
//           <Dropdown className="d-flex justify-content-end">
//             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//               Show filters
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//               {hotels.filter((h) => {
//                 // return h.location.contains(loc);
//                 return (
//                   <Dropdown.Item
//                     // href={`/hotels?location=${location}`}
//                     onClick={handleFilter}
//                     value={r}
//                   >
//                     {r}{' '}
//                   </Dropdown.Item>
//                 );
//               })}
//             </Dropdown.Menu>
//           </Dropdown>
//           {hotels.filter((h, i) => {
//             if (h.location.contains(loc)) return <Hotels key={i} />;
//           })}
//           <Hotels />
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default FilteredHotels;
