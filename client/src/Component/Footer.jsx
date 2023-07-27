import React from 'react'
import './Footer.css'
import FooterCard from './FooterCard'

const Footer = () => {
  return (
    <>
    <div className='footer'>
    <hr/>
      <div className='footer-div-1'>
        <div className='flexfoot1'>
          <h2 className='ishopheadfoot'>iSHOP</h2>
          <p>Apple Inc. is an American multinational technology company headquartered in Cupertino, California, United States. Apple is the largest technology company by revenue (totaling US$365.8 billion in 2021) and, as of June 2022</p>
        </div>
        <div className='flexfoot1'>
          <h3>Follow Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur saepe cupiditate,</p>
        </div>
        <div className='flexfoot1'>
<h3>Contact Us</h3>
<p>iShop: address @building 124 <br/>Call us now: 0123-456-789 <br/>Email: support@whatever.com</p>
        </div>
      </div>
      <div className='footer-div-2'>
<FooterCard 
head='Information'/>
<FooterCard 
head='Service'/>
<FooterCard 
head='Extras'/>
<FooterCard 
head='My Account'/>
<FooterCard 
head='UseFull Links'/>
<FooterCard 
head='Our Offers'/>
      </div>
      </div>
    </>
  )
}

export default Footer