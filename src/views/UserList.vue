<template>
  <div class="list">
    <div class="search">
      <div class="title">用户信息管理</div>
      <div class="types">
        <span>用户类型：</span>
        <el-select class="txt" size="mini" placeholder="请选择用户类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>账号：</span>
        <el-input class="txt" size="mini" placeholder="请输入账号"></el-input>
        <span>用户名：</span>
        <el-input class="txt" size="mini" placeholder="请输入用户名"></el-input>
        <el-button class="btn" size="mini">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-button size="mini" @click="$router.push('/layout/adduser')">添加</el-button>
      <el-table size="mini" :data="tableData" style="width: 98%">
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="type" label="用户类型" width="180"></el-table-column>
        <el-table-column prop="username" label="账号" width="120"></el-table-column>
        <el-table-column prop="name" label="用户名" width="120"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="createid" label="创建人ID" width="100"></el-table-column>
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "医生",
        },
        {
          value: "3",
          label: "挂号员",
        },
      ],
      tableData: [
        {
          id: '1',
          type: '系统管理员',
          username: 'admin',
          name: '管理员',
          createtime:'2011-11-11 11:11:11',
          createid:1,
          state:'启用'
        },
        {
          id: '2',
          type: '系统管理员',
          username: 'admin',
          name: '管理员',
          createtime:'2011-11-11 11:11:11',
          createid:1,
          state:'启用'
        },
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style scoped lang="scss">
.list {
  .search {
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    .title {
      font-size: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .types {
      display: flex;
      align-items: center;
      .txt {
        width: 200px;
      }
      span {
        margin-left: 10px;
      }
      .btn {
        margin-left: 10px;
        background-color: #3979b8;
        color: white;
      }
    }
  }
  .content{
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    margin-top: 10px;
  }
}
</style>
