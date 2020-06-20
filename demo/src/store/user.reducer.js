/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-20 13:44:54
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 14:08:57
 */
function userReducer(user = {}, action) {
    //user是state action是reducer用于改变state的操作
    switch (action.type) {
        case 'SETUSER':
            user = action.user;
            return user
        case 'REMOVEUSER':
            user = {};
            return user;
        default:
            return {}
    }
}
//通过该函数 将user挂载到组件的props中
export const mapState = user/*userReducer中的state */ => ({ user })
//将store的dispatch方法挂载到组件的props中
export const mapDispatch = dispatch => (
    {
        //组件中使用该方法时 要当前的user对象  然后dispath(action) action中要增加一个属性user 在reducer是通过action.user管理user的
        setUser: user => dispatch({ type: 'SETUSER', user }),
        removeUser: _ => dispatch({ type: 'REMOVEUSER' })
    }
)
export default userReducer