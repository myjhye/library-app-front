import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ReturnBooks from "./ReturnBooks";
import SpinnerLoading from "../../Utils/SpinnerLoading";

export default function Carousel() {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            // 첫 번째 페이지의 9개 도서 데이터 요청
            const url: string = `${baseUrl}?page=0&size=9`;
            // 비동기 데이터 요청
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // 응답을 JSON으로 변환
            const responseJson = await response.json();
            // JSON 객체의 _embedded.books 내부의 도서 데이터를 추출 
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                // 각 도서 데이터(responseData[key])를 BookModel 객체로 변환하여 loadedBooks 배열에 추가
                // [key]: 각 데이터에 하나씩 접근 용도
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].image,
                })
            }

            //* books 상태 업데이트
            setBooks(loadedBooks);
            setIsLoading(false);
        };

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    // 로딩 중일 때 스피너 표시
    if (isLoading) {
        return (
            <div className="container m-5"> 
                <SpinnerLoading />
            </div>
        )
    }

    // HTTP 요청 실패 시 에러 메세지 표시
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            {/* 데스크탑 */}
            <div id='carouselExampleControls' className='carousel slide mt-5 d-none d-lg-block' data-bs-interval='false'>
                <div className='carousel-inner'>
                    {Array(Math.ceil(books.length / 3)).fill(null).map((_, groupIndex) => (
                        <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                            {/* 간격 추가 */} 
                            <div 
                                className='d-flex justify-content-center'
                                style={{ gap: '30px' }}
                            > 
                                {books.slice(groupIndex * 3, groupIndex * 3 + 3).map((book) => (
                                    <div key={book.id} className='mx-3'>
                                        <ReturnBooks
                                            key={book.id} 
                                            book={book} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Carousel 이전 버튼 */}
                <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='prev' style={{ width: '5%' }}>
                    <span className='carousel-control-prev-icon' aria-hidden='true' style={{ filter: 'invert(1)' }}></span> {/* 화살표 색상 변경 */}
                    <span className='visually-hidden'>Previous</span>
                </button>
                {/* Carousel 다음 버튼 */}
                <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='next' style={{ width: '5%' }}>
                    <span className='carousel-control-next-icon' aria-hidden='true' style={{ filter: 'invert(1)' }}></span> {/* 화살표 색상 변경 */}
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>
    
            {/* 모바일 */}
            <div className='d-lg-none mt-3'>
                <div className='d-flex justify-content-center align-items-center'>
                    {books.slice(0, 3).map((book) => (
                        <div key={book.id} className='mx-3'>
                            <ReturnBooks book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}    