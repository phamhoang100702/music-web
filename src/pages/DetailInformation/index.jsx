import "./style.css";
import {Col, Row, Tabs} from "antd";
import ChangeInformation from "../../components/UI/ChangeInformation/index.jsx";
import ChangePassword from "../../components/UI/ChangePassword/index.jsx";

const items = [
    {
        key: '1',
        label: (
            <a
                className="tab-label ant-tabs-tab ant-tabs-tab-btn"
                style={{fontSize: 18}}
            >
                Change Information
            </a>
        ),
        children: <ChangeInformation/>,
    },
    {
        key: '2',
        label: (
            <a
                className="tab-label ant-tabs-tab ant-tabs-tab-btn"
                style={{fontSize: 18}}
            >
                Change Password
            </a>
        ),
        children: <ChangePassword/>,
    }

]
const DetailInformation = () => {
    const onChange = (key) => {
        console.log("onChange", key);
    }
    return (
        <>
            <Row justify={"center"}>
                <Col span={4}> </Col>
                <Col span={18}>
                    <Tabs items={items} onChange={onChange}> </Tabs>
                </Col>
            </Row>
        </>
    );
};
export default DetailInformation;
