export default function ExploreTopBooks() {
    return (
        <div className="p-5 mb-4 bg-dark header shadow-lg rounded">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-5 fw-bold" style={{ letterSpacing: '2px' }}>
                        이달의 도서를 찾아보세요
                    </h1>
                    <p className="col-md-8 fs-4 mx-auto" style={{ lineHeight: '1.8' }}>
                        내 손으로 시작되는 상상의 스토리
                    </p>
                    <a
                        type="button"
                        className="btn main-color btn-lg text-white rounded-pill px-4"
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                        href="#"
                    >
                        인기 도서 탐색하기
                    </a>
                </div>
            </div>
        </div>
    );
}
