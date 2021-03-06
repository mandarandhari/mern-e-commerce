import React from 'react';

const Gallery = () => {
    return (
        <>
            <section className="gallery">
                <div className="container">
                    <h2 className="heading-center">Our Gallery</h2>
                    <div className="gallery">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src={require('./../../utils/img/gallery-1-small.jpg')} alt="abcdefg" />
                                    <a href="/#">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src={require('./../../utils/img/gallery-2-small.jpg')} alt="hijklmn" />
                                    <a href="/#">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src={require('./../../utils/img/gallery-4-small.jpg')} alt="opqrstu" />
                                    <a href="/#">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src={require('./../../utils/img/gallery-3-small.jpg')} alt="vwxyz" />
                                    <a href="/#">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery;