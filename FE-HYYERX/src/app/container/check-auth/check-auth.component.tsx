import { FC, Fragment, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserDetail } from '~/app/api/auth/auth.api'

export const CheckAuth: FC<any> = ({ children }): any => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')
    const userSystem = localStorage.getItem('userId')
    const userSystem1 = localStorage.getItem('roleUser')
    useEffect(() => {
        getUserDetail(userSystem).then((res) => {
            if (res.data.role !== 'ADMIN') {
                navigate('/')
                return null
            }
        })
    }, [navigate])

    return <Fragment>{accessToken && userSystem1 === 'ADMIN' ? children : <Navigate to='/' />}</Fragment>
}