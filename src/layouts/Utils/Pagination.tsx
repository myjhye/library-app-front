// 페이징 컴포넌트

import { useState } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: any;
}

// props: SearchBooksPage(현재 페이지, 전체 페이지 수, 페이지 변경 함수)
export default function Pagination(props: PaginationProps) {
    // 페이지 그룹(0)
    // pageGroup이 0 = 1-5번 페이지 번호(pageNumbers)
    const [pageGroup, setPageGroup] = useState(0);
    // 한 페이지 그룹당 표시할 페이지 수(5)
    // 5일 경우 1-5, 6-10, 11-15 식으로 나눈다
    const pagesPerGroup = 5; 

    // 현재 페이지 그룹의 시작 페이지 번호 계산
    // pageGroup = 0일 때, startPage = (0 * 5) + 1 = 1 (1번 페이지부터 표시)
    // pageGroup = 1일 때, startPage = (1 * 5) + 1 = 6 (6번 페이지부터 표시)
    const startPage = (pageGroup * pagesPerGroup) + 1;

    // 현재 페이지 그룹의 마지막 페이지 번호 계산
    const endPage = Math.min((pageGroup + 1) * pagesPerGroup, props.totalPages);

    // 현재 페이지 그룹에 포함되는 페이지 번호들을 저장할 배열
    // pageGroup = 0일 때, [1, 2, 3, 4, 5] 페이지 번호가 추가된다
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // '다음' 페이지 그룹으로 이동 (1-5 -> 6-10)
    const nextPageGroup = () => {
        // 다음 페이지 그룹으로 이동(pageGroup + 1)할 수 있는지 확인
        // 현재 페이지 그룹이 0이고, 전체 페이지가 10일 때, (0 + 1) * 5 < 10 이므로 이동 가능
        if ((pageGroup + 1) * pagesPerGroup < props.totalPages) {
            setPageGroup(pageGroup + 1);
        }
    };

    // '이전' 페이지 그룹으로 이동
    const prevPageGroup = () => {
        // 이전 페이지 그룹이 0 이상일 때만 이동 가능
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
        }
    };

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {/* 이전 버튼 */}
                <li
                    // 페이지 그룹이 첫 번째 그룹(0)일 때 'disable' 클래스 적용
                    className={`page-item ${pageGroup === 0 ? "disabled" : ""}`}
                    onClick={prevPageGroup}
                >
                    <button className="page-link">
                        이전
                    </button>
                </li>
                {/* 페이지 번호 목록 */}
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        // 클릭 시 해당 번호로 페이지 이동
                        onClick={() => props.paginate(number)}
                        // 현재 페이지 번호와 일치 시 'active' 클래스 적용
                        className={'page-item ' + (props.currentPage === number ? 'active' : '')}
                    >
                        <button className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                {/* 다음 버튼 */}
                <li
                    className={`page-item ${(pageGroup + 1) * pagesPerGroup >= props.totalPages ? "disabled" : ""}`}
                    onClick={nextPageGroup}
                >
                    <button className="page-link">
                        다음
                    </button>
                </li>
            </ul>
        </nav>
    );
}
