import {Col, List, Pagination, Row} from "antd";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getAllSinger, searchSingersByKeyword} from "../../../services/api/singer/index.js";
import CardSingerHomepage from "../CardSingerHomepage/index.jsx";
import "./index.scss"

const ListSearchResultSinger = () => {
  const location = useLocation();
  const searchString = (new URLSearchParams(location.search)).get('search');
  const [listSinger, setListSinger] = useState([]);
  const [current,setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const onChange = (values)=>{
    setCurrent(values);
  }
  const onSizeChange = (values)=>{
    setPageSize(values);
  }
  useEffect(() => {
    (async () => {
      const data = (await searchSingersByKeyword(searchString,current-1,pageSize));
      console.log("data ",data);
      if(data.content){
        setListSinger(data.content);
        setTotal(data.count);
      }
    })()
  }, [searchString,pageSize,current]);
  return (
    <>
      <Row>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            {listSinger.map((item, index) => <Col span={6}><CardSingerHomepage key={index} itemSinger={item}/></Col>)}
          </Row>
        </Col>
      </Row>
      <Row>
        <Pagination
            className="pagination"
            current={current}
            pageSize={pageSize}
            onChange={onChange}
            onSizeChange={onSizeChange}
            total={total}
            showSizeChanger
            showTotal={(total) => `Total ${total} items`}
        />
      </Row>
    </>
  );
};

export default ListSearchResultSinger;
