<template>
  <div class="container"
       style="width:100%;">

    <div>
      <div class="back">
        <el-button @click="$router.go(-1)"
                   type="primary">返回</el-button>
      </div>
      <h2>{{this.testName}}测试情况</h2>
      <div id="chart_example">
      </div>

    </div>
  </div>
</template>
<script>
import PopupTreeInput from "@/components/PopupTreeInput"
import KtTable from "@/utils/KtTable"
import KtButton from "@/utils/KtButton"
import * as echarts from 'echarts';
export default {
  watch: {
    //监测路由变化，只要变化了就调用路由参数方法将数据存储本组件即可
    '$route': 'getQuerys',
  },
  components: {
    PopupTreeInput,
    KtTable,
    KtButton
  },
  data () {
    return {
      accuseitem: {},
      dialogVisible: false,
      filters: {
        name: ''
      },
      totalPage: 0,
      deptData: [],
      findResult: null,
      deptTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted () {
    this.detailFind(this.testid)
  },

  methods: {

    detailFind (number) {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findtestcount', {
        params: {
          testID: this.testid
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          var dataList = [];
          for (var i = 0; i < res.data.data.length; i++) {
            dataList.push(res.data.data[i])
          }
          let this_ = this;
          let myChart = echarts.init(document.getElementById('chart_example'));
          let option = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '8', '10']
            },
            yAxis: {
              type: 'value',
              minInterval: 1
            },
            series: [{
              data: dataList,
              type: 'line',
              areaStyle: {},
              smooth: true
            }]
          };
          myChart.setOption(option);
          window.addEventListener('resize', function () { myChart.resize() });
        })
    },
    getQuerys: function () {
      let routeTestId = this.$route.query.testid
      let routeTestName = this.$route.query.testName
      this.testid = routeTestId
      this.testName = routeTestName
    },
  },
  created () {
    this.getQuerys();
  }

}
</script>

<style  scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.top {
  flex: 1;
}
.bottom {
  flex: 5;
}

h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart_example {
  width: 90%;
  height: 500px;
  margin: 0 auto;
}
.back {
  position: relative;
  left: 40%;
  margin-top: 20px;
}
</style>