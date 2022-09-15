<!-- const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1, children: [{ text: 'xxx', id: 1 }] },
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ]; -->
<template>
  <div>
    <select :value="province" @change="selectProvince" :options="provinceList"></select>
    <select :value="city" @change="selectCity" :options="cityList"></select>
    <select :value="town" @change="selectTown"></select>
  </div>
</template>
<script>
export default {
  computed(){
    provinceList: {
      // {
      //   value: '1',
      //   label: '浙江'
      // }
      return this.list.reduce((arr, item)=>{
        return {
          value: item.id,
          label: item.text
        }
      }, [])
    },
    cityList: {
      if(province) return []
      const cityArr = this.list.filter(item=>item.id===this.province)
      return cityArr[0].children || []
    }
  },
  data(){
    list: [
      {
        id: 11,
        text: '浙江',
        children: [
          { text: '杭州', id: 1, children: [{ text: 'xxx', id: 1 }] },
          { text: '温州', id: 2 },
        ],
      },
      {
        id: 12,
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ]
  },
  methods: {
    selectProvince(){

    }
  }
}
</script>