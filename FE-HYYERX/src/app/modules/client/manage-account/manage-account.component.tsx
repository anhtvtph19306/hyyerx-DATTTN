import MenuSideBar from '~/app/component/stack/menu-sidebar/menu-sidebar.component'
import MainManageAccount from './component/main-nanage-account.component'

const ManageAccounts = () => {
    return (
        <div className='sm:w-[1140px] m-auto sm:flex mt-16 '>
            <div>
                <MenuSideBar />
            </div>
            <div>
                <MainManageAccount />
            </div>
        </div>
    )
}

export default ManageAccounts