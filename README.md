# date-of-birth

> 日期时间选择器
## 安装依赖前准备

```
1：需安装Vue；
2：需安装Element-UI；

```
## 安装依赖

``` bash
# install dependencies
npm install date-of-birth --save
# or with yarn
yarn add date-of-birth
```
## 使用步骤
``` bash
# 在main.js中引入并注册
import DateOfBirth from 'date-of-birth';
Vue.use(DateOfBirth);
# 在页面中使用
<date-of-birth width="100%" @change="getValue" :title="title"></date-of-birth>

data () {
  return {
    title: {
      year: 'Year',
      month: 'Month',
      dat: 'Day',
    }
  }
}
methods: {
  getValue (value) {
    console.log(value); // 'YYYY-MM-DD'
  }
}
```
## 参数说明
``` bash
# width (required: false)
该组件的宽度
# title (required: true)
该组件中的title，分别对应年月日，可自定义
# @change
该组件返回的值
```
