// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'cognition-school-3f9w80x22b0d491',
    traceUser: true,
})
const db = cloud.database()
const user = db.collection('user')
// 云函数入口函数
exports.main = async (event, context) => {

    if (event.option === "add") {
        let userInfo = event.userInfo
        user.add({
            data: {
                nickName: userInfo.nickName,
                gender: userInfo.gender
            }
        }).then(res => {
            console.log(res)
        })
    }
}