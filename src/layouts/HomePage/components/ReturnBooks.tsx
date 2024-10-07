export default function ReturnBooks() {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
                <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='151' height='233' alt='book' />
                <h6 className='mt-2'>Book Title 1</h6>
                <p>Author Name 1</p>
                <a className='btn main-color text-white' href='#'>Reserve</a>
            </div>
        </div>
    )
}