import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './index.scss'

import repo from '../../assets/images/repo.png'
import stars from '../../assets/images/star.png'
import following from '../../assets/images/following.png'
import followers from "../../assets/images/follower.png"
import logout from "../../assets/images/logout.png"
import enter from "../../assets/images/enter.png"

interface IState{
  userName: string,
  avatar: string
}
export default class Main extends Component<{}, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }
  constructor(props) {
    super(props)
    this.state={
      userName: '',
      avatar: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    //得到用户的登录信息
    let userInfo = JSON.parse(Taro.getStorageSync('userInfo')) 
    this.setState({
      userName: userInfo.name,
      avatar: userInfo.avatar_url
    })
  }

  componentDidHide () { }

  showRepositories = () => {

  }
  
  render () {
    return (
      <View className='page'>
        <View className='page-title'>
          <AtAvatar circle image={this.state.avatar}></AtAvatar>
          <View>
          <Text>{this.state.userName}</Text>
          </View>
        </View>
        <View className='page-admin'>
          <View className='page-admin-item' onClick={this.showRepositories}>
            <Image src={repo}></Image>
            <Text className='text'>我的仓库</Text>
            <Image src={enter} className='right'></Image>
          </View>
          <View className='page-admin-item'>
            <Image src={stars} />
            <Text className='text' >我的收藏</Text>
            <Image className='right' src={enter} />
          </View>
          <View className='page-admin-item'>
            <Image src={followers}></Image>
            <Text className='text'>关注我的</Text>
            <Image src={enter} className='right'></Image>
          </View>
          <View className='page-admin-item'>
            <Image src={following}></Image>
            <Text className='text'>我关注的</Text>
            <Image src={enter} className='right'></Image>
          </View>
          <View className='page-admin-item'>
            <Image src={logout}></Image>
            <Text className='text'>退出登录</Text>
            <Image src={enter} className='right'></Image>
          </View>
        </View>
      </View>
    )
  }
}
