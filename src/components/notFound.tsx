import { FunctionComponent } from "react";

interface NotFoundProps {
    
}
 
const NotFound: FunctionComponent<NotFoundProps> = () => {
    return ( 
        <div className="not-found">
            <h1>Page Not Found</h1>
        </div>
     );
}
 
export default NotFound;