import FeedItem from 'components/feedItem'
import { feedItemType } from 'components/interfaces/interfaces';

interface proptype {
    itemProps: feedItemType[]
    categoryTitle: string
}

function FeedGroup({itemProps, categoryTitle}:proptype) {
    return ( 
        <div className="feed-group">
            <h1 className='group-title'>{categoryTitle}</h1>
            <hr className='group-title-hr'/>
            <div className="item-container">
                {itemProps.map((item) => (
                    <FeedItem key={item._id} categoryGroup={categoryTitle} itemProps={item}></FeedItem>
                ))}
            </div>
        </div>
     );
}



export default FeedGroup;