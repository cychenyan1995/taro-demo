import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton, AtIcon } from 'taro-ui'
import './index.scss'
import logo from '../../assets/images/logo.jpg'

// 定义接口
interface IState {
  userName: string
}
export default class Index extends Component<{}, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    // 下拉刷新
    enablePullDownRefresh: true
  }

  constructor () {
    super();
    this.state = {
      userName: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  // onShow生命周期函数
  componentDidShow () {
    this.showLogin()
   }

  componentDidHide () { }

  showLogin = () => {
    Taro.getSetting({
      success: function(response){
        if(response.authSetting['scope.userInfo']){
          if(Taro.getStorageSync('userInfo') && JSON.parse(Taro.getStorageSync('userInfo')).name){
            console.log('登录成功')
          }else{
            Taro.redirectTo({url: '/page/login/index'})
          }
        }else{
          console.log('验证失败')
        }
      }
    })
  }
  render () {
    return (
      <View className='page'>
        <View className='page-search'>
          <View className='page-search-main'>
            <View className='page-search-main-text'>请输入关键字搜索</View>
            <View className='page-search-main-line'></View>
            <AtIcon className='page-search-main-icon' value='search' size='20' color='#8D93A8'></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
