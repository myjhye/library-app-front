// 도서 검색 페이지

import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../Utils/SpinnerLoading";
import SearchBook from "./components/SearchBook";
import Pagination from "../Utils/Pagination";

export default function SearchBooksPage() {

    // 서버에서 불러온 도서 목록
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // 현재 페이지 번호
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 표시할 도서 수(5) 
    const [booksPerPage] = useState(5);
    // 전체 도서 수
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    // 전체 페이지 수
    const [totalPages, setTotalPages] = useState(0);

    // 사용자가 입력한 검색어
    const [search, setSearch] = useState('');
    // 사용자가 입력한 검색어에 따른 API 요청 URL 
    const [searchUrl, setSearchUrl] = useState('');
    // 선택된 도서 카테고리
    const [categorySelection, setCategorySelection] = useState('도서 카테고리');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            let url: string = '';

            // 검색어가 없을 경우, 페이지 정보만 포함한 기본 URL로 요청
            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }
            // 검색어가 있을 경우, 검색어와 페이지 정보 추가
            // http://localhost:8080/api/books + /search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}
            else {
                // searchUrl의 <pageNumber>를 ${currentPage - 1}로 대체
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

            //* 비동기 데이터 요청
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // 응답을 JSON으로 변환
            const responseJson = await response.json();
            // JSON 객체의 _embedded.books 내부의 도서 데이터를 추출 
            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
                    img: responseData[key].img,
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

        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    //* 검색 버튼 클릭 함수 (검색어에 따라 searchUrl 업데이트)
    const searchHandleChange = () => {
        // 검색 때마다 현재 페이지를 1로 초기화
        setCurrentPage(1);

        if (search === '') {
            setSearchUrl('');
        }
        else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('도서 카테고리')
    }

    //* 카테고리 버튼 클릭 함수 (카테고리에 따라 categorySelection 업데이트)
    const categoryField = (value: string) => {
        setCurrentPage(1);

        if (value.toLowerCase() === 'fe' || value.toLowerCase() === 'be' || value.toLowerCase() === 'data' || value.toLowerCase() === 'devops' ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`);
        }
        else {
            setCategorySelection('전체');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }

    }

    // 페이지 번호 클릭 함수 (currentPage 상태를 클릭된 페이지 번호로 업데이트)
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input 
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="도서 제목을 입력하세요"
                                    aria-labelledby="Search"
                                    onChange={((e) => setSearch(e.target.value))}
                                />
                                <button 
                                    className="btn btn-outline-success"
                                    onClick={searchHandleChange}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button 
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {categorySelection}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li onClick={() => categoryField('전체')}>
                                        <a className="dropdown-item">
                                            전체
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('fe')}>
                                        <a className="dropdown-item">
                                            Frond End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('be')}>
                                        <a className="dropdown-item">
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('data')}>
                                        <a className="dropdown-item">
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('devops')}>
                                        <a className="dropdown-item">
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* 검색된 도서의 총 개수 표시 */}
                    {/* 검색된 도서가 없는 경우 문구 표시 */}
                    {totalAmountOfBooks > 0 ? (
                        <div className="mt-3">
                            <h5>({totalAmountOfBooks})개의 도서가 검색되었습니다</h5>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <h5>찾는 도서가 없으신가요? <br /> 아래에 문의해보세요</h5>
                            <a
                                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                                href="#"
                            >
                                Library Services
                            </a>
                        </div>
                    )}
                    {/* 검색된 도서 목록 */}
                    {books.map((book) => (
                        <SearchBook 
                            key={book.id}
                            book={book}
                        />
                    ))}
                    {/* 페이지 수가 1개 이상일 경우, 페이징 표시 */}
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}