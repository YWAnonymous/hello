import {
  loadTableData
} from "@/api/common";

let tableLoadData = {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    this.tableLoadData();
  },
  methods: {
    tableLoadData() {
      let requestJson = this.tableConfig.requestData;

      let requestData = {
        url: requestJson.url,
        method: requestJson.method,
        data: requestJson.data
      };

      loadTableData(requestData)
        .then(response => {
            console.log(`tableData`);
          // 赋值
          this.tableData = response.data.data.users;
        })
        .catch(error => {});
    }
  }
}
export default tableLoadData;
