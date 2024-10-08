import BookModel from "../../../models/BookModel";

export default function ReturnBooks(props: { book: BookModel }) {
    return (
        <div className='d-flex justify-content-center align-items-center mt-4'>
            <div className='text-center book-card p-3'>
                {props.book.img ? (
                    <img 
                        src={props.book.img} 
                        width='151' 
                        height='233' 
                        alt='book' 
                        className='img-fluid rounded'
                    />
                ) : (
                    <img 
                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                        width='151' 
                        height='233' 
                        alt='book' 
                        className='img-fluid rounded'
                    />
                )}
                <h6 className='mt-3 font-weight-bold' style={{ color: '#495057' }}>{props.book.title}</h6>
                <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>{props.book.author}</p>
                <a 
                    className='btn btn-outline-primary rounded-pill mt-2 px-4' 
                    href='#'
                    style={{ fontWeight: '500', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s' }}
                >
                    예약하기
                </a>
            </div>
        </div>
    );
}
