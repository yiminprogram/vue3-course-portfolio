const API_URL = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

const App = {
  data() {
    return {
      place: [],
      history: [],
      current: {},
      query: '',
    };
  },
  computed: {
    filterPlace() {
      return this.place.filter((ele) => ele.Name.includes(this.query));
    },
  },
  methods: {
    fetchData() {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          this.place = [...data.result.records];
          this.current = { ...data.result.records[0] };
        });
    },
    resetQuery() {
      this.query = '';
    },
    setCurrent(item) {
      this.current = { ...item };
    },
    pushData(value) {
      this.history = [...this.history.filter((ele) => ele.Name !== value.Name), { ...value }];
    },
  },
  watch: {
    current(value) {
      const info = document.querySelector('#info');
      info.scrollTo({ top: 0, behavior: 'smooth' });
      if (this.history.length === 10) {
        this.history.shift();
        this.pushData(value);
      } else {
        this.pushData(value);
      }
    },
  },
  created() {
    this.fetchData();
  },
};

Vue.createApp(App).mount('#app');
