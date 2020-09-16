import React from 'react';
import OwlCarousel  from 'react-owl-carousel';

import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css';

const data = [
    {
        user: {
            name: 'Steven Robinson',
            address: 'Rome, Italy',
            image: require('./../../utils/img/user-1.jpg')
        },
        quote: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
    },
    {
        user: {
            name: 'Arya Smith',
            address: 'Berlin, Germany',
            image: require('./../../utils/img/user-2.jpg')
        },
        quote: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
    },
    {
        user: {
            name: 'Frank Williams',
            address: 'San Francisco, US',
            image: require('./../../utils/img/user-3.jpg')
        },
        quote: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
    },
    {
        user: {
            name: 'Ashley Wood',
            address: 'Ostrava, Czech republic',
            image: require('./../../utils/img/user-4.jpg')
        },
        quote: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
    },
];

const Testimonial = () => {
    return (
        <>
            <section className="testimonials">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="heading-left">How Our Clients <br /> Appreciate Our <br />Service</h2>
                        </div>
                        <div className="col-md-6 text-left text-md-center slider">
                            <i className="fa fa-quote-left d-none d-md-inline-block"></i>
                            {
                                <OwlCarousel
                                    loop={true}
                                    margin={20}
                                    dots={true}
                                    responsiveClass={true}
                                    responsive={
                                        {
                                            0: {
                                                items: 1,
                                                nav: true
                                            }, 
                                            600: {
                                                items: 1, 
                                                nav: false
                                            },
                                            1000: {
                                                items: 1,
                                                nav: true,
                                                loop: false
                                            }
                                        }
                                    }
                                >
                                {
                                    data.map((d, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="quote">
                                                    <p className="lead">{d.quote}</p>
                                                    <div className="user">
                                                        <div className="user-profile">
                                                            <img src={d.user.image} alt={`user-${i+1}`} className="rounded-circle" />
                                                        </div>
                                                        <div className="user-title text-left">
                                                            <h6 className="h5">{d.user.name}</h6><span>{d.user.address}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                </OwlCarousel>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial;