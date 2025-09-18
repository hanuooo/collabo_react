import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";
import { Table } from "react-bootstrap";

function App(){
    const [elementList, setElementList] = useState([]) ; 

    useEffect(()=>{
        const url = `${API_BASE_URL}/element/list`;

        axios
            .get(url,{})
            .then((response)=>{
               // console.log(response.data);

                setElementList(response.data);
            });

    },[]);

    return(
        <>
           <Table hover style={{ margin : '5px'}}>
            <thead>
                <tr>
                    <th>아이디</th>
                    <th>상품명</th>
                    <th>단가</th>
                    <th>카테고리</th>
                    <th>재고</th>
                    <th>이미지</th>
                    <th>상세정보</th>
                </tr>
            </thead>
            <tbody>
                {elementList.map((element)=>
                <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{Number(element.price).toLocaleString()}원</td>
                    <td>{element.category}</td>
                    <td>{Number(element.stock).toLocaleString()}개</td>
                    <td>{element.image}</td>
                    <td>{element.description}</td>
                </tr>
                )}
            </tbody>
           </Table>
        </>
    );
}

export default App ;