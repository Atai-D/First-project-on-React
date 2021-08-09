import React from 'react';
// import "./src/components/Footer/footer.css"
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* column1 */}
                    <div className="col">
                        <h4>
                            ABOUT US
                        </h4>
                        <p>
                            lorem svhvjbjbmmhhgyghbnmbnvhvgfnhv bn nvhjjbm nghjm nvgfcb bnbh
                        </p>
                    </div>
                    {/* column2 */}
                    <div className="col">
                    <h4>
                            CONTACT US
                        </h4>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.instagram.com/akashkarbek/">Visit our Insta</a>
                            </li>
                            <li><a href="mailto:b-bblog@gmail.com">Send Email</a></li>
                            <li>+996555776612</li>

                        </ul>

                    </div>
                    {/* column3 */}
                    <div className="col">
                    <h4>
                            B-BB COUPONS
                        </h4>
                        <ul className="list-unstyled">
                            <li>Food and Drinks</li>
                            <li>Art and Culture</li>
                            </ul>
                    </div>
                </div>
                <br />
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} Best Bishkek Blog | All rights reserved 
                        </p>
                    </div>
            </div>
        </div>
    );
};






export default Footer;



