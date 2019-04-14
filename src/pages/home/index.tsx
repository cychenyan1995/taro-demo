import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// @connect(({ home }) => ({
//     ...home
// }))
@connect(({ home }) => ({
    ...home
  }))
class Home extends Component{
    config: {
        navigationBarTitleText: '首页'
    }

    // constructor(props){
    //     super(props)
    // }

    componentDidMount = () => {
        // const { dispatch } = this.props
        // this.props.dispatch({
        //     type: 'load',
        //     payload: ''
        // })
        
    }

    render () {
        return (
            <View>
hhhhhhhh
            </View>
        )
    }
}

export default Home