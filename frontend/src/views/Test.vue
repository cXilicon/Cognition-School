<template>
  <div class="container"
       style="width:100%;">
    <!--表格内容栏-->
    <el-table :data="pageResult"
              stripe
              highlight-current-row
              border
              class="myTable"
              style="width: 90% "
              header-cell-class-name="myTable">

      <el-table-column prop="testItemId"
                       label="测试ID"
                       align="center"></el-table-column>
      <el-table-column prop="testName"
                       label="测试名称"
                       align="center"></el-table-column>
      <el-table-column prop="testType"
                       label="测试类型"
                       align="center"></el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleLook(scope.$index, scope.row)">查看测试情况</el-button>
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
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput"
import KtTable from "@/utils/KtTable"
import KtButton from "@/utils/KtButton"
export default {

  components: {
    PopupTreeInput,
    KtTable,
    KtButton
  },
  data () {
    return {
      filters: {
        name: ''
      },
      pageRequest: { pageNum: 1, pageSize: 8 },
      pageResult: [],
      totalPage: 0,
      deptData: [],
      deptTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },


  methods: {
    Search () {
      this.$set(this.pageRequest, 'pageNum', 1);
      this.findPage();

    },

    load (val) {
      this.$set(this.pageRequest, 'pageNum', val);
      this.findPage();
    },
    // 获取分页数据
    findPage: function () {

      this.$axios.get('https://www.hsaeno.space:443/test/findall', {
        params: {
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          this.pageResult = res.data.data
        })
    },
    handleLook (index, row) {
      this.$router.push({
        path: '/testdetail', query: {
          testid: row.testItemId,
          testName: row.testName
        }
      })
    }
  },
  created () {
    this.findPage()
  }

}
</script>

<style  scoped>
.container {
  position: relative;
  top: 80px;
  left: 5%;
}
.pagination {
  position: relative;
  text-align: right;
  right: 10%;
  margin-top: 10px;
}
</style>
