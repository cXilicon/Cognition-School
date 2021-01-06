<template>
  <div class="container"
       style="width:100%;">
    <div class="left">
      <div class="latestRecord"
           id="chart_1">
      </div>
      <div class="radar"
           id="chart_2">
      </div>
      <div></div>
    </div>
    <div class="right">
      <div style="inline"
           class="tips">
        <span style="margin:10px">
          用户名：{{this.userName}}
        </span>
        <el-button @click="$router.go(-1)"
                   type="primary">返回</el-button>
      </div>
      <div class="myTable">
        <el-table :data="pageResult"
                  stripe
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  border
                  class="myTable"
                  style="width: 60% "
                  :height="600+'px'"
                  header-cell-class-name="myTable">
          <el-table-column prop="testNumber"
                           label="测试次数"
                           align="center"></el-table-column>
          <el-table-column prop="testTime"
                           label="测试时间"
                           align="center"></el-table-column>
          <el-table-column prop="testAllScore"
                           label="测试总分"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleLook(scope.row.testNumber)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background
                         layout="prev, pager, next"
                         :current-page="pageRequest.pageNum"
                         :page-size="pageRequest.pageSize"
                         :total="totalPage"
                         @current-change="load">
          </el-pagination>
        </div>
        <el-dialog title="测试分项"
                   :visible.sync="dialogVisible"
                   width="20%">
          <el-form>
            <el-form-item label="舒尔特方格"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test1)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="数字匹配"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test2)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="表达性注意"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test3)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="注意力保持"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test4)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="图形记忆"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test5)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="矩阵问题"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test6)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="颜色记忆"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test7)"
                        style="width: 50% "></el-input>
            </el-form-item>
            <el-form-item label="数字回忆"
                          label-width="150px">
              <el-input :disabled="true"
                        :placeholder="(findResult.test8)"
                        style="width: 50% "></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     @click="dialogVisible = false">关 闭</el-button>
        </el-dialog>

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
      pageRequest: { pageNum: 1, pageSize: 8 },
      pageResult: [],
      findResult: [],
      totalPage: 0,
      totalTestNum: 0,
      dialogVisible: false,
      deptData: [],
      deptTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },


  methods: {
    handleLook (number) {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findbyuseropenidandtestnumber', {
        params: {
          testNumber: number,
          userOpenID: this.userid
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          this.findResult = res.data
        })
      this.dialogVisible = true
    },
    Search () {
      this.$set(this.pageRequest, 'pageNum', 1);
      this.findPage();
    },
    getQuerys: function () {
      let routeUserid = this.$route.query.userid
      let routeUserName = this.$route.query.userName
      this.userid = routeUserid
      this.userName = routeUserName
    },
    load (val) {
      this.$set(this.pageRequest, 'pageNum', val);
      this.findPage();
    },

    // 获取分页数据
    findPage: function () {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findbyuseropenid', {
        params: {
          page: this.pageRequest.pageNum,
          size: this.pageRequest.pageSize,
          userOpenID: this.$route.query.userid
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          this.pageResult = res.data.data
          this.totalTestNum = res.data.size
        })
    },
    findLatest: function () {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findlatestbyuseropenid', {
        params: {
          userOpenID: this.$route.query.userid,
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          var score = [];
          var finishTime = [];
          var set = [];
          if (res.data.port != '500') {
            score = res.data.data;
            finishTime = res.data.time
            for (var i = 0; i < score.length; i++) {
              set.push({ 'score': score[i], 'time': finishTime[i] })
            }
          }
          let this_ = this;
          let myChart = echarts.init(document.getElementById('chart_1'));
          let option = {
            title: {
              text: '最近3次测试情况'
            },
            xAxis: {
              type: 'category',
              data: []
            },
            yAxis: {
              type: 'value',
              minInterval: 1
            },
            tooltip: {
              triggerOn: "mousemove",
              axisPointer: {
                crossStyle: {
                  color: '#999'
                }
              },
              formatter: function (params) {
                return "完成时间：" + finishTime[params.dataIndex];
                // for(x in params){
                //   return "测试得分："+
                // }
              }
            },
            series: [{
              data: score,
              type: 'line',

              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: 'black',
                      fontSize: 14,
                    }
                  }
                }
              }
            }]
          };
          myChart.setOption(option);
          window.addEventListener('resize', function () { myChart.resize() });
        })
    },
    handleCurrentChange (val) {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findbyuseropenidandtestnumber', {
        params: {
          testNumber: val.testNumber,
          userOpenID: this.$route.query.userid,
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          var pass = []
          pass.push(res.data.p)
          pass.push(res.data.a)
          pass.push(res.data.s1)
          pass.push(res.data.s2)
          let this_ = this;
          let myChart2 = echarts.init(document.getElementById('chart_2'));
          let option = {
            title: {
              text: 'PASS雷达图',
            },
            tooltip: {},
            radar: {
              // shape: 'circle',
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: [
                { name: '计划(Plan)', max: 20 },
                { name: '注意(Attention)', max: 20 },
                { name: '同时性加工(Succesive)', max: 20 },
                { name: '继时性加工(Processing)', max: 20 },
              ]
            },
            series: [{
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [{
                value: pass,
                name: 'PASS分布'
              }]
            }],

          };
          myChart2.setOption(option);
          window.addEventListener('resize', function () { myChart2.resize() });
        })
    },
    defaultShow () {
      this.$axios.get('https://www.hsaeno.space:443/usertotest/findbyuseropenidandlatesttestnumber', {
        params: {
          userOpenID: this.$route.query.userid,
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          var pass = []
          pass.push(res.data.p)
          pass.push(res.data.a)
          pass.push(res.data.s1)
          pass.push(res.data.s2)
          let this_ = this;
          let myChart2 = echarts.init(document.getElementById('chart_2'));
          let option = {
            title: {
              text: 'PASS雷达图'
            },
            tooltip: {},
            radar: {
              // shape: 'circle',
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: [
                { name: '计划(Plan)', max: 20 },
                { name: '注意(Attention)', max: 20 },
                { name: '同时性加工(Succesive)', max: 20 },
                { name: '继时性加工(Processing)', max: 20 },
              ]
            },
            series: [{
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [{
                value: pass,
                name: 'PASS分布'
              }]
            }],

          };
          myChart2.setOption(option);
          window.addEventListener('resize', function () { myChart2.resize() });
        })
    }
  },
  created () {
    this.findPage();
    this.getQuerys();
  },
  mounted () {
    this.defaultShow();
    this.findLatest();
  }

}
</script>

<style  scoped>
.pagination {
  flex: 1;
  margin-top: 10px;
  position: relative;
  text-align: right;
  right: 30%;
}
.container {
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.right {
  flex: 1;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}
.tips {
  position: relative;
  text-align: right;
  right: 30%;
  flex: 1;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.myTable {
  flex: 5;
  margin-left: 9%;
  margin-top: 10px;
  position: relative;
}
#chart_1 {
  position: absolute;
  width: 50%;
  height: 50%;
  margin: 10px 10px 10px 20px;
}
#chart_2 {
  position: absolute;
  width: 50%;
  height: 50%;
  margin: 10px 10px 10px 20px;
}
.radar {
  position: absolute;
  top: 50%;
}
</style>