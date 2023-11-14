import { FC } from 'react';
import { useStateContext } from '../../stateContext/StateContext';


const AdminsPage: FC<any> = () => {

    const {admin, changeName} = useStateContext()



    return(<>
    <h1>Admin</h1>
    <h2>{admin.balance}</h2>
    <h2>{admin.userName}</h2>


    
    </>)
}

AdminsPage.displayName = 'AdminsPage';

export default AdminsPage;