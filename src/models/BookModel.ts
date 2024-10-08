// 백엔드에서 받은 응답 데이터를 매핑하여 클라이언트에서 Book 데이터를 쉽게 사용하는 용도
// DTO 역할 (클라이언트와 서버 간에 데이터 주고 받는 수단)

class BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;

    constructor(id: number,
            title: string,
            author: string,
            description: string,
            copies: number,
            copiesAvailable: number,
            category: string,
            img: string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
    }
}

export default BookModel;