<template>
  <div>
    <div>
      {{ m_result }}
      <div>
        <el-button type="primary" @click="next()" round>完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import vuex_mixin from "@/components/mixins/vuex_mixin";
export default {
  name: "Result",
  mixins: [vuex_mixin],
  props: {
    moduleName: {
      type: String,
      default: "disFactor",
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    next() {
      this.m_changeStep(1);
    },
  },
};
</script>

<style scoped></style>
