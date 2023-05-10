import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/1.png';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    );
  }

  function translateLanguage(lang) {
    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
      alert('Error: Could not find Google translate frame.');
      return false;
    }
    $frame
      .contents()
      .find('.goog-te-menu2-item span.text:contains(' + lang + ')')
      .get(0)
      .click();
    return false;
  }

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container className="header__container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto d-flex justify-content-between align-items-center w-100">
            <>
              <div className="d-flex gap-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/" className="nav-link">
                  Contact Us
                </Link>
              </div>
              <Link to="/" className="navbar-brand lead fst-italic">
                <img
                  className="header__conatainer--logo"
                  src={logo}
                  alt="logo"
                  width="200px"
                  height="80px"
                />
              </Link>
            </>
            {auth && auth.token ? (
              <>
                <div className="d-flex gap-2 align-items-center">
                  <span id="google_translate_element"></span>

                  <Image
                    width="38px"
                    height="38px"
                    src="https://i.pinimg.com/originals/bb/93/99/bb93993d644835d9aa673c760cad0585.jpg"
                    roundedCircle
                    className="avatar"
                    onClick={() => navigate('/dashboard/seller')}
                  />
                  <NavDropdown align="end" title={auth.user.name}>
                    <NavDropdown.Item
                      as={Link}
                      style={{ color: '#42635c' }}
                      to="/dashboard/seller"
                    >
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      style={{ color: '#42635c' }}
                      onClick={logout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex gap-3">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

// return (
//   <>
//     <header class="header">
//       <div class="header__navigation">
//         <div class="header__logo-box">
//           {/* <svg
//           xmlns="http://www.w3.org/2000/svg"
//           xmlns:xlink="http://www.w3.org/1999/xlink"
//           width="200px"
//           zoomAndPan="magnify"
//           viewBox="0 0 375 374.999991"
//           height="200"
//           preserveAspectRatio="xMidYMid meet"
//           version="1.0"
//         >
//           <defs>
//             <clipPath id="5c1490c851">
//               <path
//                 d="M 132.613281 123.714844 L 242.089844 123.714844 L 242.089844 233.214844 L 132.613281 233.214844 Z M 132.613281 123.714844 "
//                 clip-rule="nonzero"
//               />
//             </clipPath>
//           </defs>
//           <g clip-path="url(#5c1490c851)">
//             <path
//               fill="#f4f4f4"
//               d="M 213.871094 221.21875 L 198.285156 202.128906 C 198.21875 202.042969 198.15625 201.953125 198.089844 201.890625 L 189.136719 190.921875 L 196.730469 181.617188 L 223.066406 213.886719 C 220.308594 216.667969 217.222656 219.117188 213.871094 221.21875 Z M 179.132812 228.113281 L 186.378906 219.226562 L 193.820312 228.355469 C 191.695312 228.640625 189.53125 228.792969 187.320312 228.792969 C 184.539062 228.792969 181.800781 228.550781 179.132812 228.113281 Z M 174.335938 227.085938 C 170.441406 226.035156 166.71875 224.546875 163.261719 222.640625 L 186.332031 194.378906 L 193.6875 203.378906 Z M 210 223.386719 C 206.472656 225.160156 202.707031 226.539062 198.789062 227.457031 L 189.246094 215.746094 L 196.511719 206.835938 Z M 151.59375 213.863281 L 187.339844 170.082031 L 193.929688 178.136719 L 159.472656 220.34375 C 156.628906 218.460938 154 216.273438 151.59375 213.863281 Z M 187.339844 128.09375 C 214.375 128.09375 236.488281 149.503906 237.625 176.253906 L 229.085938 176.253906 C 227.882812 154.625 209.910156 137.265625 188.0625 137.136719 C 187.976562 137.136719 187.886719 137.136719 187.820312 137.136719 C 176.941406 137.136719 166.652344 141.402344 158.816406 149.152344 C 151.417969 156.488281 147.105469 166.03125 146.535156 176.253906 L 137.058594 176.253906 C 138.195312 149.503906 160.304688 128.09375 187.339844 128.09375 Z M 228.890625 206.835938 C 227.992188 208.128906 227.050781 209.398438 226.042969 210.601562 L 222.980469 206.835938 Z M 235.152344 194.226562 C 234.210938 197.09375 233.027344 199.832031 231.605469 202.457031 L 219.433594 202.457031 L 212.710938 194.226562 Z M 226.964844 180.632812 L 237.625 180.632812 C 237.492188 183.785156 237.054688 186.871094 236.355469 189.847656 L 209.121094 189.847656 L 201.613281 180.632812 Z M 176.65625 176.253906 L 164.027344 176.253906 C 165.734375 164.847656 175.476562 156.09375 187.121094 155.917969 C 187.230469 155.917969 187.363281 155.917969 187.472656 155.917969 C 199.140625 155.917969 209.210938 164.785156 210.941406 176.253906 L 198 176.253906 L 189.003906 165.242188 C 188.171875 164.214844 186.441406 164.214844 185.613281 165.242188 Z M 215.363281 176.253906 C 213.566406 162.246094 201.265625 151.363281 187.054688 151.539062 C 173.023438 151.757812 161.378906 162.464844 159.625 176.253906 L 150.933594 176.253906 C 151.503906 167.214844 155.335938 158.765625 161.902344 152.285156 C 168.910156 145.34375 178.101562 141.511719 187.820312 141.511719 C 187.886719 141.511719 187.976562 141.511719 188.042969 141.511719 C 207.480469 141.621094 223.503906 157.011719 224.710938 176.253906 Z M 165.535156 189.871094 C 165.449219 189.847656 165.363281 189.847656 165.273438 189.847656 L 138.304688 189.847656 C 137.605469 186.871094 137.1875 183.785156 137.035156 180.632812 L 173.066406 180.632812 Z M 155.269531 202.457031 L 143.097656 202.457031 C 141.675781 199.855469 140.492188 197.09375 139.550781 194.226562 L 161.992188 194.226562 Z M 145.792969 206.835938 L 151.703125 206.835938 L 148.636719 210.601562 C 147.628906 209.375 146.667969 208.128906 145.792969 206.835938 Z M 234.605469 206.003906 C 234.734375 205.828125 234.867188 205.632812 234.953125 205.414062 C 237.1875 201.496094 238.9375 197.269531 240.164062 192.824219 C 240.207031 192.695312 240.25 192.5625 240.273438 192.433594 C 241.457031 187.964844 242.089844 183.28125 242.089844 178.445312 C 242.070312 148.257812 217.527344 123.714844 187.339844 123.714844 C 157.152344 123.714844 132.613281 148.257812 132.613281 178.445312 C 132.613281 183.28125 133.246094 187.945312 134.429688 192.410156 C 134.453125 192.585938 134.496094 192.738281 134.5625 192.890625 C 135.765625 197.3125 137.515625 201.515625 139.75 205.414062 C 139.835938 205.632812 139.945312 205.828125 140.097656 206.003906 C 142.046875 209.332031 144.324219 212.441406 146.90625 215.285156 C 147.015625 215.441406 147.148438 215.59375 147.300781 215.703125 C 147.324219 215.703125 147.324219 215.726562 147.34375 215.726562 C 150.652344 219.269531 154.394531 222.359375 158.511719 224.941406 C 158.53125 224.960938 158.53125 224.960938 158.554688 224.984375 C 158.597656 225.027344 158.664062 225.050781 158.730469 225.09375 C 163.523438 228.050781 168.800781 230.28125 174.402344 231.640625 C 174.445312 231.660156 174.492188 231.660156 174.558594 231.683594 C 178.671875 232.667969 182.960938 233.214844 187.363281 233.214844 C 197.148438 233.214844 206.34375 230.609375 214.3125 226.101562 C 214.484375 226.035156 214.640625 225.949219 214.792969 225.839844 C 214.792969 225.839844 214.792969 225.816406 214.8125 225.816406 C 219.476562 223.101562 223.722656 219.707031 227.378906 215.789062 C 227.402344 215.769531 227.402344 215.769531 227.425781 215.769531 C 227.578125 215.636719 227.707031 215.503906 227.816406 215.351562 C 230.378906 212.441406 232.65625 209.332031 234.605469 206.003906 "
//               fill-opacity="1"
//               fill-rule="nonzero"
//             />
//           </g>
//         </svg> */}
//           <Link to="/" className="navbar-brand lead fst-italic">
//             <img className="header__conatainer--logo" src={logo} alt="logo" />
//           </Link>
//         </div>
//         <div className="d-flex header__nav-bar">
//           <Link to="/about" className="nav-link text-light">
//             About us
//           </Link>
//           <Link to="/contacts" className="nav-link text-light">
//             Contact us
//           </Link>
//           <Link to="/login" className="nav-link text-light">
//             Login
//           </Link>
//           <Link to="/register" className="nav-link text-light">
//             Register
//           </Link>
//         </div>
//         {/* <div className="header__nav-bar">
//           <ul>
//             <li>About us</li>
//             <li>Contact us</li>
//           </ul>
//         </div> */}
//       </div>

//       <div class="header__text-box">
//         <div class="heading-primary">
//           <span class="heading-primary--main">Nuzie</span>
//           <span class="heading-primary--sub">
//             plan your best vacation here
//           </span>
//         </div>

//         <Link href="#" class="btn btn--animated btn--white">
//           Discover available hotels
//         </Link>
//       </div>
//     </header>
//   </>
// );
