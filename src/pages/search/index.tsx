import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtDivider, AtModal } from 'taro-ui'
import { baseUrl } from '../../assets/js/common'

interface IState {
    searchWord: string
    keyWord: string
    recordList: any[]
    currPage: number
}
export default class Search extends Component<{}, IState>{
    config ={
        navigationBarTitleText: '搜索'
    }
    constructor(props) {
        super(props)
        this.state = {
            searchWord: '搜索',
            keyWord:'',
            recordList: [],
            currPage: 1
        }
    }

    showRecordList = () => {
        Taro.showLoading({
            title: '数据加载中...'
        })
        Taro.request({
            url: `${baseUrl}/users/calabash519/starred?page=${this.state.currPage}&keyWord=${this.state.keyWord}`,
            method: 'GET'
        }).then((res) => {
            if(res.data.length){
                this.setState({recordList: this.state.currPage === 1 ? res.data : this.state.recordList.concat(res.data)}) 
            }
        }).catch((err) => {
            console.log(err)
            Taro.hideLoading()
        })
    }

    // 点击键盘的search按钮
    comfrimChange = (e) => {
        if(e.detail.value) {
            // setState的回调函数 同步
            this.setState({
                keyWord: e.detail.value,
                currPage: 1
            }, () => {
                this.showRecordList()
            })
        }
    }

    searchChange = (e) => {
        this.setState({keyWord: e.detail.value})
        if(!e.detail.value){
            this.setState({recordList: []})
        }
    }

    search = () => {
        if(this.state.keyWord){
            this.setState({currPage: 1}, () => {
                this.showRecordList()
            })
        }else{
            Taro.showToast({
                title: '请输入搜索内容',
                icon: 'none',
                duration: 3000
            })
        }
    }

    // 碰到底部时触发的函数
    onReachBottom () {
        let num = this.state.currPage
        this.setState({ currPage: num++}, () => {
            this.showRecordList()
        })
    }

    render() {
        const { searchWord } = this.state;
        return (
            <View className='page'>
                <View className='page-search'>
                    <View className='page-search-left'>
                        <Input className='page-search-left-input'
                            type='text' focus={true} confirmType='search'
                            onConfirm={this.comfrimChange} 
                            onInput={this.searchChange}
                            value={this.state.keyWord}></Input>
                    </View>
                    <View className='page-search-icon'></View>
                    <View className='page-search-right' onClick={this.search}>
                        <Text>{searchWord}</Text>
                    </View>
                </View>
                <View className='page-content'></View>
                <View className='page-devide'>
                    <AtDivider content='没有更多数据' fontColor='#d2d2d2' lineColor='#f2f2f2'></AtDivider>
                </View>
                <View hidden={this.state.recordList.length === 0} className='page-empty'>
                    <AtDivider content='暂无数据' fontColor='#d2d2d2' lineColor='#f2f2f2'></AtDivider>
                </View>
            </View>
        )
    }
}