<template>
  <div>
    <el-table ref="userTable" :data="tableData">
      <template v-for="item in tableConfig.tHead">
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType == 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { loadTableData } from "@/api/common";
import tableLoadData from "@/mixins/tableLoadData";
export default {
  name: "tableVue",
  mixins:[tableLoadData],
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableConfig: {
        tHead: [],
        requestData: {}
      },
      tableData: []
    };
  },
  beforeMount() {
    this.initTableConfig();
  },
  methods: {
    initTableConfig() {
      let configData = this.config;
      let keys = Object.keys(this.tableConfig); //Object.keys()方法将对象转换成数组
      for (let key in configData) {
        if (keys.includes(key)) {
          //  ["selection", "recordCheckbox", "requestUrl", "tHead"].includes("selection")
          this.tableConfig[key] = configData[key];
        }
      }
    }
  }
};
</script>

<style></style>
