import {
    Avatar,
    Button, Checkbox,
    Col,
    ConfigProvider,
    Divider,
    Form,
    Input,
    List,
    Modal,
    notification,
    Popconfirm,
    Row,
    Select,
    Tag,
    Upload,
} from "antd";
import {useEffect, useRef, useState} from "react";
import Dragger from "antd/es/upload/Dragger";
import {IoCloudUploadOutline} from "react-icons/io5";
import {PlusOutlined} from "@ant-design/icons";
import {LuUpload} from "react-icons/lu";
import {deleteSongById, updateSong} from "../../../services/api/song/index.js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAllSinger} from "../../../services/api/singer/index.js";
import {genres} from "../../../constants/genres.js";
import {moods} from "../../../constants/moods.js";
import {convertSingersToSingerOption, convertStringToArray} from "../../../common/common.js";

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CardSongEditOfSinger = (props) => {
    const {item, listTrack, setListTrack} = props;
    const authInfo = useSelector(state => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listSinger, setListSinger] = useState([]);
    const [previewSoundSrc, setPreviewSoundSrc] = useState(item.sound);
    const [previewThumbnailSrc, setPreviewThumbnailSrc] = useState(item.thumbnail);
    const [previewLyricSrc, setPreviewLyricSrc] = useState([]);
    const [visible, setVisible] = useState(item.visible);
    const audioRef = useRef(null)
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (title, description) => {
        api['success']({
            key: 1,
            message: title,
            description: description,
        });
    };

    const onChangeCheckBox = ()=>{
        setVisible(!visible);
    }


    const showModal = () => {
        setIsModalOpen(true);
    };
    const optionSinger = listSinger.map((i) => {
        if (i.id === authInfo.id) {
            return {
                value: i.id,
                label: i.name,
                disabled: true
            }
        }
        return {
            value: i.id,
            label: i.name
        }
    });
    const handleRemoveTrack = () => {
        (async () => {
            await deleteSongById(item.id);
            setListTrack(listTrack.filter(i => i.id !== item.id));
        })();
    }
    const onFinish = (values) => {
        (async () => {
            setLoading(true);
            let formData = new FormData();
            if (values.sound || values.lyric || values.thumbnail) {
                if (values.sound) formData.append("sound", values.sound.file);
                if (values.lyric) formData.append("lyric", values.lyric.file);
                if (values.thumbnail) formData.append("thumbnail", values.thumbnail[0].originFileObj);
            }
            // TODO:
            let dataUpdate = {
                ...item,
                title: values.title,
                singers: values.singers.map(i=>i.value),
                genres: values.genres.join(","),
                moods: values.moods.join(","),
                visible: values.visible,
            }
            formData.append("song", new Blob([JSON.stringify(dataUpdate)], {type: "application/json"}));
            let songAfterUpdate = (await updateSong(formData));
            if(songAfterUpdate.content){
                setListTrack(listTrack.map(i => {
                    if (i.id === songAfterUpdate.id) return songAfterUpdate;
                    return i;
                }))
                openNotification("Update success", "Update your track was success, get back for more information");
                setLoading(false);
                setIsModalOpen(false);
            }else {
                openNotification("Update FAILED", "Update your track was failed, get back for more information");
                setIsModalOpen(false);
                setLoading(false);

            }
        })();

    }
    useEffect(() => {
        (async () => {
            setListSinger((await getAllSinger()).content);
        })()
        fetch(item.lyric)
            .then((res) => res.text())
            .then((content) => {
                const data = content.split('[').map(i => {
                    if (i.length > 1) return "[" + i;
                })
                if (data.length <= 1) setPreviewLyricSrc(['No lyric']);
                else setPreviewLyricSrc(data);
            });
    }, []);
    return (
        <>
            {contextHolder}
            <List.Item className="song-item-list-a">
                <List.Item.Meta
                    avatar={
                        <>{item.thumbnail ?
                            (
                                <Avatar
                                    size={"large"}
                                    shape="square"
                                    src={item.thumbnail}
                                />
                            ) : (
                                <Avatar
                                    size={"large"}
                                    shape="square"
                                    src={`https://play-lh.googleusercontent.com/D9X7m5dTNzjeSPxBqzh1RwrZLXJDFTpht9-8W8RJtiaOAlFxNvL5MnSDRxoDnQRYhz0`}
                                />
                            )
                        }</>
                    }
                    title={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                  <span className="display-name-song-of-playlist">
                    {item.title}
                  </span>
                                {"   -   "}
                                <span
                                    className="display-name-singer-of-playlist"
                                    style={{color: "#999999", fontWeight: "300"}}
                                >
                    {item.genres}
                  </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                }}
                            >
                                <Button onClick={() => showModal()} type={"primary"}>Edit</Button>
                                <Popconfirm
                                    title={"Delete this track"}
                                    description={"Are you sure to delete this track ?"}
                                    onConfirm={handleRemoveTrack}
                                >
                                    <Button type={"primary"} danger>Remove</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    }
                    // description={
                    //     <span>Status:{" "}{requestSend === 0 ? <Tag color="red">Private</Tag> : requestSend === 1 ?
                    //         <Tag color="yellow">Pending</Tag> :
                    //         <Tag color="green">Public</Tag>} - Singer: {item.singers.map((p, ind) => (<span
                    //         key={ind}
                    //         onClick={() => navigate(`/singer-profile/${p.id}`)}
                    //         className={"hover-decoration"} style={{cursor: "pointer"}}>{p.name} </span>
                    //         ))} </span>
                    // }
                />
            </List.Item>
            <Modal
                title="Edit song"
                open={isModalOpen}
                cancelButtonProps={{style: {display: "none"}}}
                okButtonProps={{style: {display: "none"}}}
                onCancel={() => {
                    setIsModalOpen(false);
                    audioRef.current.pause();
                }}
                style={{top: 20}}
                width={"1000px"}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#31c27c",
                            colorPrimaryHover: "#31c27c",
                            colorPrimaryBorder: "#31c27c",
                        },
                        components: {
                            Input: {
                                activeBorderColor: "#31c27c",
                                hoverBorderColor: "#31c27c",
                            },
                        },
                    }}
                >
                    <Row gutter={[15, 15]}>
                        <Col span={12}>
                            <Divider plain orientation={"left"} style={{fontSize: 16, fontWeight: 700}}>
                                Form edit
                            </Divider>
                            <Form
                                onFinish={onFinish}
                                form={form}
                                layout="vertical"
                                size="medium"
                                initialValues={{
                                    title: item.title,
                                    genres: convertStringToArray(item.genres, ","),
                                    moods: convertStringToArray(item.moods, ","),
                                    singers: convertSingersToSingerOption(item.singers),
                                    visible: item.visible
                                }}
                            >
                                <Row justify={"center"}>
                                    <Col span={24}>

                                        <Form.Item name={"sound"}>
                                            <Dragger
                                                multiple={false}
                                                beforeUpload={(file) => {
                                                    const reader = new FileReader();
                                                    reader.onload = e => {
                                                        setPreviewSoundSrc(e.target?.result + "");
                                                    }
                                                    reader.readAsDataURL(file);
                                                    return false;
                                                }}
                                                showUploadList={false}
                                                accept="audio/*"
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <IoCloudUploadOutline style={{fontSize: 60}}/>
                                                </p>
                                                <p className="ant-upload-text">
                                                    Click or drag song file to this area to upload
                                                </p>
                                            </Dragger>
                                        </Form.Item>
                                        <Form.Item name={"visible"}>
                                            <Checkbox checked={visible} onClick={onChangeCheckBox}>
                                                Public
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item rules={[{required: true}]} label="Title" name={"title"}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item rules={[{required: true}]} label="Genres" name={"genres"}>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: "100%",
                                                }}
                                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                                placeholder="Please select category"
                                                options={genres}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Moods" name={"moods"}>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: "100%",
                                                }}
                                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                                placeholder="Please select category"
                                                options={moods}
                                            />
                                        </Form.Item>
                                        <Form.Item name={"singers"} rules={[{required: true}]} label="Collab Singer">
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: "100%",
                                                }}
                                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                                placeholder="Please select singer"
                                                options={optionSinger}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Upload Thumbnail"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            name={"thumbnail"}
                                        >
                                            <Upload
                                                multiple={false}
                                                beforeUpload={(file) => {
                                                    const reader = new FileReader();
                                                    reader.onload = e => {
                                                        setPreviewThumbnailSrc(e.target?.result + "");
                                                    }
                                                    reader.readAsDataURL(file);
                                                    return false;
                                                }}
                                                showUploadList={false}
                                                listType="picture-card"
                                            >
                                                <button
                                                    style={{
                                                        border: 0,
                                                        background: "none",
                                                    }}
                                                    type="button"
                                                >
                                                    <PlusOutlined/>
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </button>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item label="Upload lyrics" name={"lyric"} style={{margin: 0}}>
                                            <Upload
                                                multiple={false}
                                                beforeUpload={(file) => {
                                                    const reader = new FileReader();
                                                    reader.onload = e => {
                                                        fetch(e.target?.result + "")
                                                            .then((res) => res.text())
                                                            .then((content) => {
                                                                const data = content.split('[').map(i => {
                                                                    if (i.length > 1) return "[" + i;
                                                                })
                                                                if (data.length <= 1) setPreviewLyricSrc(['No lyric']);
                                                                else setPreviewLyricSrc(data);
                                                            });
                                                    }
                                                    reader.readAsDataURL(file);
                                                    return false;
                                                }}
                                                showUploadList={false}
                                                accept=".lrc"
                                            >
                                                <Button icon={<LuUpload/>}>
                                                    Click to upload lyrics file
                                                </Button>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item style={{display: "flex", justifyContent: "end"}}>
                                            <div style={{display: "flex", gap: 10}}>
                                                <Button loading={loading} type="primary" htmlType="submit">
                                                    Update
                                                </Button>
                                            </div>
                                        </Form.Item>

                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <Divider plain orientation={"right"} style={{fontSize: 16, fontWeight: 700}}>
                                Content preview
                            </Divider>
                            <Row>
                                <h4 style={{width: "100%"}}>Sound</h4>
                                <Col span={24}>
                                    <audio loop ref={audioRef} src={previewSoundSrc} controls style={{width: "100%"}}/>
                                </Col>
                                <h4 style={{width: "100%"}}>Thumbnail</h4>
                                <Col span={24}>
                                    <img src={previewThumbnailSrc}
                                         style={{
                                             width: "60%",
                                             aspectRatio: "1/1",
                                             objectFit: "cover",
                                             borderRadius: "9px"
                                         }}/>
                                </Col>
                                <h4 style={{width: "100%"}}>Lyric</h4>
                                <div id={"scrollableDiv"} style={{
                                    height: 200,
                                    overflow: "auto",
                                    backgroundColor: "#e3e3e3",
                                    borderRadius: 9,
                                    padding: 7,
                                    width: "100%"
                                }}>
                                    {previewLyricSrc.map((i, ind) => <span style={{display: "block"}}
                                                                           key={ind}>{i}</span>)}
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </ConfigProvider>
            </Modal>
        </>
    );
};

export default CardSongEditOfSinger;
