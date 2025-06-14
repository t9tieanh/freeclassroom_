import './HomePage.scss';
import freeclassroom from '../../assets/media/others/classroom3.png';

const HomePage = () => {
    return ( 
        <div className='homepage-container'>
            <div className="row">
                    <div className="col-6 main_section">
                        <h5>Welcome to</h5>
                        <h1> Free Classroom</h1>
                        <span>
                            Where you can <strong>Enjoy</strong> <br />Your <strong>Study</strong>
                        </span>
                        <br />
                        <hr />
                        <a href="" className="btn btn-info"> Student</a> &nbsp; 
                        <a href="" className="btn btn-primary">Teacher</a>
                    </div>
                    <div className="col-6">
                        <img src = {freeclassroom} alt="Classroom" />
                    </div>
                </div>
        </div>
    );
}

export default HomePage;
