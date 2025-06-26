import resultUtils from "@/utils/resultUtils";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, RequestHandler } from 'express';


 const data = [
        {
            id: uuidv4(),
            title: "2022百度AI大会前夕，解读百度大脑的半年“豹变”",
            desc: "Facebook为未来的VR社交打造了一款逼真的虚拟头像系统，该系统的特点是，利用数百颗摄像头对人脸进行动作捕捉，并能生成与人脸相似度很高的虚拟头像，这些头像还能模仿人脸的大量表情。",
            time: "2022-01-20 10:00:00",
            cover: "img/now/n_1.png",
        },
        {
            id: uuidv4(),
            title: "创投早报｜美国商业化核聚变创企获投；音乐版权公司完成融资",
            desc: "举办第六届中华印制大奖颁奖典礼、亚洲印刷展览联盟会议、国家主题日等多场专业、先进、丰富的同期活动，全面把握产业趋势与动态，共同探讨印刷业现状和未来。",
            time: "2022-01-20 10:00:00",
            cover: "img/now/n_2.png",
        },
        {
            id: uuidv4(),
            title: "【千龙网】广告行业标准指导性意见将出台",
            desc: "国际印刷工业发展论坛由中国印刷及设备器材工业协会主办，始创于2005年，四年一届，已成功举办三届，每届论坛选择5-6个发达国家和5-6个发展中国家印刷协会的主席或总裁发表演讲",
            time: "2022-01-20 10:00:00",
            cover: "img/now/n_3.png",
        },
        {
            id: uuidv4(),
            title: "支持触觉反馈，Manus VR推出全新Prime VR手套",
            desc: "第三届国际印刷工业发展论坛（Forum-PI 2013）于2013年5月13日在北京举行，主办方邀请了来自中国、美国、德国、英国、意大利、日本、澳大利亚、俄罗斯、印度、印尼、南非、巴西、",
            time: "2022-01-20 10:00:00",
            cover: "img/now/n_4.png",
        }
    ]

interface HotNowItem {
    id: string;
    title: string;
    desc: string;
    time: string;
    cover: string;
}

const getHotNow: RequestHandler = (req, res) => {
    res.json(resultUtils.success<HotNowItem[]>(data));
}

export default {
    getHotNow
}

export {}