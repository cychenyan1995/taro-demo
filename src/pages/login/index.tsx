import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtInput, AtButton, AtModal, AtModalHeader,AtModalContent,AtModalAction } from 'taro-ui'
import './index.scss'
import logo from '../../assets/images/logo.jpg'
import { baseUrl } from '../../assets/js/common'

// 定义接口
interface IState {
  userName: string,
  modalVisible: boolean
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
    navigationBarTitleText: '登录'
  }

  constructor() {
    super();
    this.state = {
      userName: '',
      modalVisible: false
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  nameChange(value) {
    this.setState({ userName: value })
  }

  submit = (e) => {
    e.stopPropagation();
    if (!this.state.userName) {
      Taro.showToast({
        title: '请输入用户名!',
        icon: 'none',
        duration: 1500
      })
    } else {
      Taro.request({
        url: `${baseUrl}/users/${this.state.userName}`,
        method: 'GET'
      }).then(res => {
        if (res.data.name) {
          Taro.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1500
          });
          // 保存用户信息
          Taro.setStorage({ key: 'userInfo', data: JSON.stringify(res.data) })
            .then(res => {
              // 跳转到登录首页
              Taro.switchTab({ url: '/pages/index/index' })
            })
        } else {
          this.setState({ modalVisible: true })
        }
      }).catch(err => {
        console.log(err)
      })
    }

  }

  handleConfirm = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <View className='page'>
        <Image src={logo} className="image"></Image>
        <View className='page-form'>
          <AtInput type="text" name="userName" value={this.state.userName} onChange={this.nameChange.bind(this)} placeholder="请输入用户名" />
          <AtButton className="page-form-submit" type="primary" onClick={this.submit}>登录</AtButton>
        </View>
        <AtModal isOpened={this.state.modalVisible} title='提示' content='用户名不存在'
          confirmText='确认' 
          onConfirm={ this.handleConfirm }/>
        {/* <AtModal isOpened={this.state.modalVisible} closeOnClickOverlay={false}>
          <AtModalHeader>提示</AtModalHeader>
          <AtModalContent>用户不存在</AtModalContent>
          <AtModalAction>
            <Button>确定</Button>
          </AtModalAction>
        </AtModal> */}

      </View>

    )
  }
}
