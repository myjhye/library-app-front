import ReturnBooks from "./ReturnBooks";

export default function Carousel() {
    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            {/* 데스크탑 */}
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 d-none d-lg-block' data-bs-interval='false'>
                <div className='carousel-inner'>
                    {/* Carousel Item 1 */}
                    <div className='carousel-item active'>
                        <ReturnBooks />
                    </div>
                    {/* Carousel Item 2 */}
                    <div className='carousel-item'>
                        <ReturnBooks />
                    </div>
                </div>
                {/* Carousel 컨트롤 화살표 */}
                <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* 모바일 */}
            <div className='d-lg-none mt-3'>
                <div className='d-flex justify-content-center align-items-center'>
                    <ReturnBooks />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href='/search'>View More</a>
            </div>
        </div>
    )
}