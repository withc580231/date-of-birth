<template>
  <div class="date-of-birth" :style="{width:width}">
    <div class="relative">
      <span class="title" v-if="showYear">{{$translate("Year")}}</span>
      <el-select v-model="year" style="width:100%" @change="selectYear" :class="showYear?'select':''" :placeholder="$translate('Year')">
        <el-option v-for="(item,index) in yearList" :key="index" :value="item.value" :label="item.name"></el-option>
      </el-select>
    </div>
    <div class="relative mgl">
      <span class="title" v-if="showMonth">{{$translate("Month")}}</span>
      <el-select v-model="month" style="width:100%" @change="selectMonth" :class="showMonth?'select':''" :placeholder="$translate('Month')">
        <el-option v-for="(item,index) in monthList" :key="index" :value="item.value" :label="$translate(item.name)"></el-option>
      </el-select>
    </div>
    <div class="relative">
      <span class="title" v-if="showDay">{{$translate("Day")}}</span>
      <el-select v-model="day" style="width:100%;" @change="selectDay" :class="showDay?'select':''" :placeholder="$translate('Day')">
        <el-option v-for="(item,index) in dayList" :key="index" :value="item.value" :label="item.name"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%',
    },
  },
  created() {
    this.monthList = [];
    this.dayList = [];
    this.yearList = [];
    let now = new Date().getFullYear();
    this.monthList = this.getArray(1, 12, 10);
    this.dayList = this.getArray(1, 31, 10);
    this.yearList = this.getArray(now - 200, now + 200, 999);
  },
  data() {
    return {
      dayList: [],
      monthList: [],
      yearList: [],
      day: '',
      month: '',
      year: '',
      showDay: false,
      showMonth: false,
      showYear: false,
    };
  },
  methods: {
    // 选择日
    selectDay(value) {
      this.showDay = true;
      if (this.year && this.month && this.day) {
        let birth = this.year + '-' + this.month + '-' + this.day;
        this.$emit('change',birth);
      } else {
        this.$emit('change', null);
      }
    },
    // 选择月
    selectMonth(value) {
      this.showMonth = value ? true : false;
      this.dayList = [];
      if (value === '02' && this.year === '') {
        this.dayList = this.getArray(1, 28, 10);
        if (this.day > 28) {
          this.day = '';
          this.showDay = false;
        }
      } else if (
        value === '02' &&
        this.year !== '' &&
        this.isRN(this.year) === true
      ) {
        this.dayList = this.getArray(1, 29, 10);
        if (this.day > 29) {
          this.day = '';
          this.showDay = false;
        }
      } else if (
        value === '02' &&
        this.year !== '' &&
        this.isRN(this.year) !== true
      ) {
        this.dayList = this.getArray(1, 28, 10);
        if (this.day > 28) {
          this.day = '';
          this.showDay = false;
        }
      } else if (value !== '02' && value % 2 !== 0) {
        this.dayList = this.getArray(1, 31, 10);
      } else if (value !== '02' && value % 2 === 0) {
        this.dayList = this.getArray(1, 30, 10);
        if (this.day > 30) {
          this.day = '';
          this.showDay = false;
        }
      }
      if (value === '08' || value === '10' || value === '12') {
        this.dayList = this.getArray(1, 31, 10);
      }
      if (value === '09' || value === '11') {
        this.dayList = this.getArray(1, 30, 10);
        if (this.day > 30) {
          this.day = '';
          this.showDay = false;
        }
      }
      if (this.year && this.month && this.day) {
        let birth = this.year + '-' + this.month + '-' + this.day;
        this.$emit('change',birth);
      } else {
        this.$emit('change', null);
      }
    },
    // 选择年
    selectYear(value) {
      this.showYear = true;
      this.selectMonth(this.month);
    },
    // 是否是闰年
    isRN(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    },
    // 生成年月日数组
    getArray(start, end, divider) {
      let res = [];
      for (let i = start; i <= end; i++) {
        if (i < divider) {
          res.push({
            name: '0' + i,
            value: '0' + i,
          });
        } else {
          res.push({
            name: '' + i,
            value: '' + i,
          });
        }
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
.date-of-birth {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .relative {
    position: relative;
    .title {
      position: absolute;
      top: 7px;
      left: 16px;
      color: #888;
      font-family: 'Montserrat-Italic';
      line-height: 24px;
      font-size: 16px;
    }
  }
  .mgl{
    margin: 0 8px;
  }
  .select {
    .el-input--suffix .el-input__inner {
      padding-top: 16px;
      height: 58px;
      background: transparent;
      transition: all 0.2s;
    }
  }
}
</style>