import './style.scss'
import Card from '~/components/common/Card'
import { FaUserEdit } from "react-icons/fa";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';

const PostContent = ({title, content, createBy, createDate, image}) => {

    return <>
        <Card className={'post-content'} name={<><h3 className='font-weight-bold'>{title}</h3></>} 
            subTitle={<>
                {!image ? <>{<FaUserEdit />}</> : <> 
                <img
                    src={image}
                    referrerPolicy="no-referrer"
                    alt="User Avatar"
                    className="mx-2 rounded-circle"
                    width={30}
                    height={30}
                /></>}
                Được viết vào {createDate} bởi {createBy}
                </>}
            children={
                <>
                    <div className='content'>
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                            {content}
                        </Markdown>
                    </div>
                </>
            }
        />
    </>
}

export default PostContent