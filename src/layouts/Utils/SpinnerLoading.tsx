// 로딩 스피너

export default function SpinnerLoading() {
    return (
        <div 
            className="container m-5 d-flex justify-content-center"
            style={{ height: 550 }}
        >
            <div 
                className="spinner-border text-primary"
                role="status"
                style={{ width: '3rem', height: '3rem' }}
            >
                <span className="visually-hidden">
                    Loading..
                </span>
            </div>
        </div>
    )
}