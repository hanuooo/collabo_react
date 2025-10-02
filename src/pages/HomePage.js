import { Carousel, Container } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
    // products : 메인 화면에 보여주고자 하는 상품 정보들 (파일 이름에 "bigsize" 문자열이 들어 있음)
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        // 이미지 파일 이름에 "bigs"라는 글자가 포함되어 있는 이미지만 추출합니다.
        const url = `${API_BASE_URL}/product?filter=bigs`;
        axios
             .get(url)
             .then((response)=>setProducts(response.data))
             .catch((error)=>console.log(error));
    }, []);

    const detailView = (id) => {
        navigate(`product/detail/${id}`);
    };

    return (
        <Container className="mt-4">
            <Carousel>
                {products.map((bean)=>(
                <Carousel.Item key={bean.id}>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/${bean.image}`}
                        alt={bean.name}
                        style={{cursor:'pointer'}} // 마우스 오버시 손가락 모양
                        onClick={()=>detailView(bean.id)} // 클릭시 상세 보기 페이지
                    />
                    <Carousel.Caption>
                        <p>
                                {/* 긴 글자는 짧게 보여 주고, 후위에 ...을 보여줍니다. */}
                                {bean.description.length > 15
                                    ? bean.description.substring(0, 15) + '...'
                                    : bean.description
                                }
                            </p>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default App;