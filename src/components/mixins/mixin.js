export const tabSwitch = {
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}

export const resetForm = {
  methods: {
    resetForm(formName) {
      // 不加if判断会报错找不到resetFields，因为form用的v-if，不显示时找不到DOM结构
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    }
  },
};