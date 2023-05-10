import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { register } from '../../actions/auth/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import upload from '/upload_icon.jpg';

//  Formik
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../../validations/register';

const Register = () => {
  const navigate = useNavigate();
  const initialValues = { name: '', email: '', password: '', image: '' };
  const [values, setValues] = useState(initialValues);
  const [preview, setPreview] = useState(upload);

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    setValues({ ...values, image: e.target.files[0] });
  };

  const registerHandler = async (values, actions) => {
    try {
      // const formData = new FormData();
      // formData.append('name', values.name);
      // formData.append('email', values.email);
      // formData.append('password', values.password);
      // values.image && formData.append('image', values.image);
      // const res = await register(formData);
      // console.log('formdata-->', formData, 'res-->', res);

      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.image,
      });
      // console.log(response);
      toast.success('You have successfully registered');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error('Something went wrong. Please, try again');
    }
    actions.resetForm();
  };

  return (
    <Container className="register-page" fluid>
      <Row
        style={{ height: '400px' }}
        className="d-flex justify-content-center align-items-cente"
      >
        {/* <Col className="" md={6}></Col> */}
        {/* <Col md={{ span: 4, offset: 2 }}>
           <label className="pointer d-flex justify-content-center">
            <img
              src={preview}
              style={{ borderRadius: '10px', height: '200px' }}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label> 
        </Col> */}
        <Col md={{ span: 4, outlet: 3 }} className="r">
          <Formik
            validateOnBlur
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={registerHandler}
          >
            <Form className="d-flex mt-5 flex-column">
              <div className="h3">Sign up</div>
              <p className="text-muted mb-5">
                Create account to start booking hotels with Nuzie.
              </p>
              <div className="mb-3">
                <span>Name</span>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <ErrorMessage name="name">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <span>Email</span>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage name="email">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <span>Password</span>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>{' '}
              </div>
              <div>
                <button className="register-page__button p-1" type="submit">
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
