<template>
  <div>
    <div>
      <div>
        <span class="featureTitle">参与运算的特征：</span>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" border size="small">全选</el-checkbox>
        <h3>人口学特征</h3>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedFeatures" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in peopleFeatures" :label="item.name" :key="item.name" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <h3>生理学特征</h3>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedFeatures" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in medicalFeatures" :label="item.name" :key="item.name" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <h3>社会学特征</h3>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
        <span class="featureTitle">已知相关特征：</span>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" border size="small">全选</el-checkbox>
        <h3>人口学特征</h3>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedFeatures" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in peopleFeatures" :label="item.name" :key="item.name" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <h3>生理学特征</h3>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedFeatures" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in medicalFeatures" :label="item.name" :key="item.name" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <h3>社会学特征</h3>
      </div>
    </div>

</template>

<script>
import {Features} from "@/components/tab/constData.js"
export default {
  name:"FeatureSelect",
  computed:{
    allFeatures(){
      let features = [];
      Features.peopleFeatures.forEach(item =>{
        features.push(item.name);
      })
      Features.medcialFeatures.forEach(item =>{
        features.push(item.name);
      })
      return features;
    }
  },
  data(){
    return {
      peopleFeatures : Features.peopleFeatures,
      medicalFeatures: Features.medcialFeatures,
      checkAll: false,
      selectedFeatures: [],
    }
  },
  methods: {
    handleCheckAllChange(val) {

      this.selectedFeatures = val ? this.allFeatures : [];
    },
    handleCheckedCitiesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
    }
  }
}
</script>

<style scoped>
.featureTitle{
  font-size: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
}
</style>