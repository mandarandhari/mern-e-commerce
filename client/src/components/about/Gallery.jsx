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
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/gallery-1-small.jpg" alt="image-1" />
                                    <a href="img/gallery-1.jpg" data-lightbox="image-1" data-title="Image Caption">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/gallery-2-small.jpg" alt="image-2" />
                                    <a href="img/gallery-2.jpg" data-lightbox="image-1" data-title="Image Caption">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/gallery-4-small.jpg" alt="image-3" />
                                    <a href="img/gallery-4.jpg" data-lightbox="image-1" data-title="Image Caption">
                                        <span className="fa fa-search"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/gallery-3-small.jpg" alt="image-4" />
                                    <a href="img/gallery-3.jpg" data-lightbox="image-1" data-title="Image Caption">
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