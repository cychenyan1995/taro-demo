import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtDivider } from 'taro-ui'
import './index.scss'
import { baseUrl } from '../../assets/js/common'
import { RepoItem } from '../../components/repo-item/index';

// 定义接口
interface IState {
  recordList: any[],
  currPage: number
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
    // 下拉刷新  设置为true时才有效果
    enablePullDownRefresh: true
  }

  constructor() {
    super();
    this.state = {
      recordList: [],
      currPage: 1
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  // onShow生命周期函数
  componentDidShow() {
    this.showLogin()
  }

  componentDidHide() { }

  // 小程序自带的生命周期函数 
  // 下拉时触发
  onPullDownRefresh() {
    this.setState({ currPage: 1 }, () => {
      this.showRecordList()
    })
  }
  // 小程序自带的生命周期函数 
  // 到达底部时触发
  onReachBottom() {
    let num: number = this.state.currPage
    this.setState({ currPage: ++num }, () => {
      this.showRecordList()
    })
  }

  showLogin = () => {
    // if (Taro.getStorageSync('userInfo') && JSON.parse(Taro.getStorageSync('userInfo')).name) {
    //   // console.log('登录成功')
    //   // 登录成功后加载数据
    //   this.showRecordList()
    // } else {
    //   Taro.redirectTo({ url: '/page/login/index' })
    // }
    // 返回值中只会出现小程序已经向用户请求过的权限。
    Taro.getSetting({
      success: function(response){
        if(response.authSetting['scope.userInfo']){
          if(Taro.getStorageSync('userInfo') && JSON.parse(Taro.getStorageSync('userInfo')).name){
            // console.log('登录成功')
            // 登录成功后加载数据
            this.showRecordList()
          }else{
            Taro.redirectTo({url: '/pages/login/index'})
          }
        }else{
          console.log('验证失败')
          // 认证
          Taro.redirectTo({url: '/pages/auth/index'})
        }
      }
    })
  }

  showRecordList = () => {
    Taro.showLoading({
      title: '数据加载中...'
    })
    //请求后台数据
    Taro.request({
      url: `${baseUrl}/users/calabash519/starred?page=${this.state.currPage}`,
      method: 'GET'
    }).then(res => {
      if (res.data.length) {
        this.setState({ recordList: this.state.currPage === 1 ? res.data : this.state.recordList.concat(res.data) })
      }
      // 当页面在刷新时 通知页面停止下拉刷新效果
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    }).catch(err => {
      Taro.hideLoading()
    })
  }
  // 搜索
  toSearch = () => {
    Taro.navigateTo({
      url: '/page/search/index'
    })
  }
  render() {
    const { recordList } = this.state
    return (
      <View className='page'>
        <View className='page-search' onClick={this.toSearch}>
          <View className='page-search-main'>
            <View className='page-search-main-text'>请输入关键字搜索</View>
            <View className='page-search-main-line'></View>
            <AtIcon className='page-search-main-icon' value='search' size='20' color='#8D93A8'></AtIcon>
          </View>
        </View>
        <View className='page-content'>
          {
           recordList.map(item => (
            <RepoItem data={item} key={item.id}></RepoItem>
          ))
          }
        </View>
        <View hidden={recordList.length === 0} className='page-empty'>
          <AtDivider content='暂无数据' fontColor='#d2d2d2' lineColor='#f2f2f2'></AtDivider>
        </View>
      </View>
    )
  }
}
