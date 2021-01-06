<template>
  <div class="container"
       style="width:100%;">
    <!--工具栏-->
    <div class="toolbar"
         style="padding:18px;">
      <el-form :inline="true"
               :model="filters"
               size="small">
        <el-form-item>
          <el-input v-model="filters.name"
                    placeholder="用户名"
                    autofocus='true'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="Search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <div>
      <el-table :data="pageResult"
                highlight-current-row
                border
                style="width: 80%"
                class="myTable">
        <el-table-column prop="id"
                         label="用户ID"
                         align="center"></el-table-column>
        <el-table-column prop="userName"
                         label="用户名称"
                         align="center"></el-table-column>
        <el-table-column prop="openid"
                         label="openID"
                         align="center"></el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         align="center"></el-table-column>
        <el-table-column prop="birthday"
                         label="生日"
                         align="center"></el-table-column>
        <el-table-column prop="area"
                         label="地区"
                         align="center"></el-table-column>
        <el-table-column prop="education"
                         label="教育程度"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleLook(scope.$index, scope.row)">查看</el-button>
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
      pageRequest: { pageNum: 1, pageSize: 6 },
      pageResult: [],
      totalPage: 0,

      // 新增编辑界面数据
      dataForm: {
        id: 0,
        userName: '',
        openid: '',
        area: '',
        birthday: '',
        education: '',
        sex: '',
      },
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

      this.$axios.get('https://www.hsaeno.space:443/user/findbypage', {
        params: {
          page: this.pageRequest.pageNum,
          size: this.pageRequest.pageSize,
          userID: this.filters.name
        }, headers: {
          "Content-Type": "application/json;charset=utf-8" //头部信息
        }
      })
        .then((res) => {
          this.pageResult = res.data.data
          this.totalPage = res.data.size
        })
    },
    handleLook (index, row) {
      this.$router.push({
        path: '/userinfolook', query: {
          userid: row.openid,
          userName: row.userName
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
  overflow-y: auto;
  overflow-x: hidden;
  left: 5%;
}
.toolbar {
  padding: 16px 0px !important;
  text-align: left;
}
.myTable {
  position: relative;
  display: flex;
  flex-direction: column;
}
.pagination {
  margin-top: 10px;
  text-align: right;
  position: relative;
  right: 19.5%;
}
</style>
