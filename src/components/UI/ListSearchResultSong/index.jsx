import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchSongByKeyword} from "../../../services/api/song/index.js";
import {Col, List, Pagination, Row} from "antd";
import CardSongItem from "../CardSongItem/index.jsx";
import "./index.scss"

const ListSearchResultSong = () => {
    const location = useLocation();
    const searchString = (new URLSearchParams(location.search)).get('search');
    const [listSong, setListSong] = useState([]);
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
            const data = await searchSongByKeyword(searchString,current-1,pageSize);
            if(data.content){
                setListSong(data.content);
                setTotal(data.count);
            }
        })()
    }, [searchString,current,pageSize]);
    return (<>
            <Row>
                <Col span={24}>
                    <List
                        size="small"
                        itemLayout="horizontal"
                        dataSource={listSong}
                        renderItem={(item, index) => <CardSongItem key={index} item={item}/>}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination
                        className="pagination"
                        total={total}
                        current={current}
                        align="center"
                        onSizeChange={onSizeChange}
                        onChange={onChange}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                        responsive={true}
                    />
                </Col>
            </Row>
    </>

    );
};

export default ListSearchResultSong;
