import './People.scss'
import Paginate from '../../../components/paging/Paginate'
import { IoTrashBin } from "react-icons/io5";
import NavBarComponent from '../../../components/ClassRoom/ClassDetail/NavBar';
import { IoIosTime } from "react-icons/io";
import ClassCover from "../../../components/ClassRoom/ClassCover"

const PeopleComponent = () => {
    return <>
        <ClassCover/>

        <div className="container-people ">
            <div className='col-md-12 navbar '>
                <NavBarComponent/>
            </div>
            <div className="col-md-12">
                <div className="page-people-directory row">
                <div className="col-md-12">
                <div className="well">
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Student list</h3>
                    </div>
                    <div className="col-md-6">
                         <button type="button" className="btn btn-primary btn-raised btn-add-new-contact"><span className="icon-plus" data-toggle="modal" data-target="#modal-pull-right-add"> Add New Contact</span></button>
                    </div>
                </div>
                
                <div className="list-group contact-group z-depth-2">

                    <a href="#" className="list-group-item header-table">
                        <div className="media">
                            <div className="pull-left">
                                <img width={30} height={50} className="img-circle" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="..."/>
                            </div>
                            <div className="media-body">
                                <div className="media-content">
                                    <ul className="list-unstyled">
                                        <li><i class="fa-solid fa-user"></i>Name</li>
                                        <li><i class="fa-solid fa-phone"></i> Phone</li>
                                        <li><i class="fa-solid fa-envelope"></i>email</li>
                                        <li><IoIosTime />most recent visit</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </a>
                    <hr style={{ margin: 10 }} />

                    <div className='list-user-content'>

                        <a href="#" className="list-group-item">
                            <div className="media">
                                <div className="pull-left mx-auto d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                    <img className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..."/>
                                </div>
                                <div className="media-body">
                                    <div className="media-content">
                                        <ul className="list-unstyled">
                                            <li> jdoe.doe</li>
                                            <li> +63 912 212 2451</li>
                                            <li> <span className="__cf_email__" data-cfemail="117b7e74757e7451747c70787d3f727e7c">[email&#160;protected]</span></li>
                                            <li> 3 day ago</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <button className='btn btn-danger'><IoTrashBin /></button>
                                </div>
                            </div>
                        </a>

                        <a href="#" className="list-group-item">
                            <div className="media">
                                <div className="pull-left mx-auto d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                    <img className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..."/>
                                </div>
                                <div className="media-body">
                                    <div className="media-content">
                                        <ul className="list-unstyled">
                                            <li> jdoe.doe</li>
                                            <li> +63 912 212 2451</li>
                                            <li> <span className="__cf_email__" data-cfemail="117b7e74757e7451747c70787d3f727e7c">[email&#160;protected]</span></li>
                                            <li> 3 day ago</li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <button className='btn btn-danger'><IoTrashBin /></button>
                                </div>
                            </div>
                        </a>

                        <a href="#" className="list-group-item">
                            <div className="media">
                                <div className="pull-left mx-auto d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                    <img className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..."/>
                                </div>
                                <div className="media-body">
                                    <div className="media-content">
                                        <ul className="list-unstyled">
                                            <li> jdoe.doe</li>
                                            <li> +63 912 212 2451</li>
                                            <li> <span className="__cf_email__" data-cfemail="117b7e74757e7451747c70787d3f727e7c">[email&#160;protected]</span></li>
                                            <li> 3 day ago</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <button className='btn btn-danger'><IoTrashBin /></button>
                                </div>
                            </div>
                        </a>


                    </div>

            

                    
                    
                </div>


                </div>

                </div>
            </div>



            <nav className='paginate-container' aria-label="Page navigation">
                <Paginate itemsPerPage = {8} pageCount = {3} currentPage = {1} />
            </nav>



        </div>
    
    
    
    </>
}

export default PeopleComponent