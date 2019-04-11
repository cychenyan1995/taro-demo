import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import { renderTime } from "../../assets/js/common.js"
import forks from '../../assets/images/forks.png'
import star from '../../assets/images/star.png'
import './index.scss'

interface IProps{
    data: {
        watchers: number,
        forks: number,
        full_name: string,
        description: string,
        updated_at: string
    }
}
export class RepoItem extends Component<IProps, {}>{
    constructor(props){
        super(props)
    }
    render(){
        const { data } = this.props
        return (
            <View className='list'>
                <View className='list-title'>
                    <Text>{data.full_name}</Text>
                </View>
                <View className='list-description'>
                    <Text>{data.description}</Text>
                </View>
                <View className='list-operation'>
                    <View className='list-operation-star'>
                        <Image src={star}></Image>
                        <Text className='list-operation-star-text'>{data.watchers}</Text>
                    </View>
                    <View className='list-operation-fork'>
                        <Image src={forks}></Image>
                        <Text  className='list-operation-fork-text'>{data.forks}</Text>
                    </View>
                    <View className='list-operation-date'>
                        <Text className='list-operation-date-text'>{renderTime(data.updated_at)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
// RepoItem.propTypes = {
//     data: PropTypes.object,
//     len: PropTypes.number
// }
