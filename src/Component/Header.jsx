import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { CartContext } from '../App';


const Header = () => {
    const [cart] = useContext(CartContext)
    const navigate = useNavigate();
    const homeclick = () => {
        navigate('/')
    }
    const storeclick = () => {
        navigate('/store')
    }
    const iphoneclick = () => {
        navigate('/iphone')
    }
    const ipadclick = () => {
        navigate('/ipad')
    }
    const macbookclick = () => {
        navigate('/macbook')
    }
    const accessoriesclick = () => {
        navigate('/accessories')
    }
    const [showdata, setshowdata] = useState(false);
    const show = () => {
        setshowdata(!showdata)
    }
    const navigatetoadd = ()=>{
        navigate('/cart')
    }
    const profile=()=>{
        navigate('/login')
    }
    return (
        <>
            <div className='header'>
                <div className='cartnav'>
                   <span onClick={profile}>
                   <PermContactCalendarIcon />
                    </span> 
                     <div onClick={navigatetoadd} className='cart-num-nav'>
                        <ShoppingCartIcon className='cart-symbol'/>
                        <div className='cartnumber' >{cart.length}</div>
                    </div></div>
                <div className='header-heading'>iSHOP</div>
                <div className='hamber-logo' onClick={show}>|||</div>
                <div className={showdata ? 'navbarshow' : 'navbar'}>
                    <span  className='navbarspan' onClick={homeclick}>HOME</span>
                    <span  className='navbarspan' onClick={storeclick}>STORE</span>
                    <span  className='navbarspan' onClick={iphoneclick}>IPHONE</span>
                    <span  className='navbarspan' onClick={ipadclick}>IPAD</span>
                    <span className='navbarspan'  onClick={macbookclick}>MACKBOOK</span>
                    <span  className='navbarspan' onClick={accessoriesclick}>ACCESSORIES</span>
                </div>
            </div>
        </>
    )
}

export default Header