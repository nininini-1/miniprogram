import React,{Component} from 'react'
import Taro ,{getCurrentInstance } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import {AtActivityIndicator,AtPagination} from 'taro-ui'
import './index.scss'


export default class news extends Component {

  state = {
    current: 1,
    data:{},
  }

  async componentWillMount () { 
    console.log(getCurrentInstance().router.params);
    const id = getCurrentInstance().router.params.id
    await Taro.request({
      url: `https://www.fastmock.site/mock/602d2e41c5aa2423c03099413ee1e97b/food/newsdetail?id=${id}`,
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        this.setState({
          data:res.data.data
        })
      }
      )
  }

  componentDidMount () { 

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPageChange = (e) =>{
    const {current}=e;
    // type next   current 2
    // type prev current 1
    Taro.navigateTo({
      url:  `../newsDetail/index?id=${current-1}`
    })
  }

  render () {
    const {data:{id}}=this.state
    return (
      <View className='at-article'>
        <View className='at-article__h1'>
          {id && id.title}
        </View>
        <View className='at-article__info'>
          {id && id.date}&nbsp;&nbsp;&nbsp;
        </View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            {/* <View className='at-article__h2'>这是二级标题</View>
            <View className='at-article__h3'>这是三级标题</View> */}
            <View className='at-article__p'>
              {id && id.description}
            </View>
            {/* <View ew className='at-article__p'>
              这是文本段落。这是文本段落。
            </View> */}
            <Image 
              className='at-article__img' 
              src={id && id.img} 
              mode='widthFix' />
          </View>
        </View>
        <AtPagination 
          icon
          total={18} 
          pageSize={1}
          current={Number(getCurrentInstance().router.params.id)+1}
          onPageChange={this.onPageChange}
        ></AtPagination>
        <AtActivityIndicator mode='center' isOpened={!id}></AtActivityIndicator>
      </View>
    )
  }
}
