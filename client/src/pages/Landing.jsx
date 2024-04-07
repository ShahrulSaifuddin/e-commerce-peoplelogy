import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>E-Commerce</h1>
          <p>
            Are you tired of the hassle of coordinating schedules, managing
            appointments, and keeping track of deadlines? Say goodbye to the
            chaos and hello to simplicity with ScheduleEase – your all-in-one
            web application for streamlined scheduling.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="to do" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
