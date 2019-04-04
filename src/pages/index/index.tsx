import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import './index.scss'
import logo from '../../assets/images/logo.jpg'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  nameChange () {}

  submit () {}

  render () {
    return (
      <View className='page'>
        <Image src={logo} className="image"></Image>
        <View className='page-form'>
          <AtInput type="text" name="userName" onChange={this.nameChange} placeholder="请输入用户名"/>
          <AtButton type="primary" onClick={this.submit}>登录</AtButton>
        </View>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
