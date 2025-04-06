import {Col, Pagination, Row} from "antd";
import React, {useEffect, useState} from "react";
import CardPlaylistOfSinger from "../CardPlaylistOfSinger";
import {useLocation} from "react-router-dom";
import {searchAllPlaylistByNameForUser} from "../../../services/api/playlist/index.js";
import CardSingerHomepage from "../CardSingerHomepage/index.jsx";
import CardItemSongHomepage from "../CardItemSongHomepage/index.jsx";

const ListSearchResultPlaylist = () => {
    const location = useLocation();
    const searchString = (new URLSearchParams(location.search)).get('search');
    const [listPlaylist, setListPlaylist] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);


    const onChange = (values) => {
        setCurrent(values);
    }
    const onSizeChange = (values) => {
        setPageSize(values);
    }
    useEffect(() => {
        (async () => {
            const data = await searchAllPlaylistByNameForUser(searchString, current-1, pageSize);
            if (data.content) {
                setListPlaylist(data.content);
                setTotal(data.count);
            }
        })()
    }, [searchString]);
    return (
        <>
            <Row>
                <Col span={24}>
                    <Row gutter={[20, 20]}>
                        {listPlaylist.map((item, index) => <Col span={7}>
                            <div style={{width: "93%"}}><CardItemSongHomepage key={index} itemPlaylist={item}/></div>
                        </Col>)}
                    </Row>
                </Col>
            </Row>
            <Row>
                <Pagination
                    total={total}
                    current = {current}
                    size={pageSize}
                    onChange={onChange}
                    onSizeChange={onSizeChange}
                    showSizeChanger
                    showTotal={(total) => `Total ${total} items`}
                />
            </Row>
        </>
    );
};

export default ListSearchResultPlaylist;
