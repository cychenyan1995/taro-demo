import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import logo from '../../assets/images/logo.jpg'

interface IState{
    text: string
}
export default class Auth extends Component<{}, IState>{
    config: Config = {
        navigationBarTitleText: '授权'
    }
    constructor(props){
        super(props)
        this.state= {
            text:'获取微信授权登录'
        }
    }

    confirmModal = (e) => {
        if(e.detail.userInfo){
            if(Taro.getStorageSync('userInfo') && JSON.parse(Taro.getStorageSync('userInfo')).name){
                Taro.switchTab({
                    url: '/page/index/index'
                })
            }else{
                Taro.redirectTo({
                    url: '/page/login/index'
                })
            }
        }
    }
    render(){
        return (
            <View className='page'>
                <Image src={logo}></Image>
                <Button className='page-btn' openType='getUserInfo' onGetUserInfo={this.confirmModal}>
                {this.state.text}
                </Button>
            </View>
        )
    }
}