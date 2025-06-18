import { Outlet } from "react-router-dom";
import ClassCover from "../../../../components/ClassRoom/ClassCover";
import SideBar from '../../../../components/Teacher/SideBar';

const PostLayout = ({post}) => {
  return (
    <>

    <div className='class-list-content row full-width'>
    
    <div className='side-bar col-2'>
        <SideBar/>
    </div>

        <div className='main-content col-10'>
          <div className="class-detail-content">
            <ClassCover name = {post?.title}/>

              <div className="row">
                <div className="col-xl-12">
                    <Outlet/>
                </div>
              </div>

          </div>
        </div>
        
    </div>

    </>



  );
};

export default PostLayout;
