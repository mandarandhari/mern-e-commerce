import React from 'react';

const Divider = () => {
    return (
        <>
            <section style={{background: `url(${require("./../../utils/img/divider-bg.jpg")}) no-repeat`}} className="divider">
                <div className="overlay">
                    <div className="container text-center">
                        <h2>Limited Time Online</h2>
                        <h3>Click &amp; Collect Next Day Delivery <a href="/#" className="text-primary">Free Over Rs.300</a></h3>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Divider;