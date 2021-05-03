const card = {
  props: ['place'],
  template: `
      <article class="my-card">
        <div class="image">
          <img :src="place.Picture1" :alt="place.Picdescribe1" />
        </div>
          <h2 class="m-0 my-card-title">{{place.Name}}</h2>
          <div class="my-card-info">
            <p><i class="bi bi-clock-fill me-2"></i>{{place.Opentime}}</p>
            <address>
              <p><i class="bi bi-map-fill me-2"></i>{{place.Add}}</p>
              <p><i class="bi bi-telephone-fill me-2"></i>{{place.Tel}}</p>
              <p v-if="place.Ticketinfo">
                <i class="bi bi-megaphone-fill text-warning me-2"></i>{{place.Ticketinfo}}
              </p>
            </address>
          </div>
      </article>
  `,
};

const pagination = {
  props: ['props'],
  computed: {
    filterPage() {
      const arr = this.props.data.filter((ele) => ele.pagination === this.props.pagination);
      return arr.map((ele, idx) => ele.pagination * 10 + idx + 1);
    },
  },
  template: `
  <nav class="nav-page">
        <ul class="m-0 p-0">
          <li><a href="#app" @click="$emit('decrease')" :class="{'my-disabled':props.page===1}"><i class="bi bi-caret-left-fill"></i></a></li>
          <li v-for="item in filterPage">
            <a href="#app" :class="{'my-active':props.page===item}" @click="$emit('current',item)">{{item}}</a>
          </li>
          <li><a href="#app" @click="$emit('increase')" :class="{'my-disabled':props.page===props.data.length}"><i class="bi bi-caret-right-fill"></i></a></li>
        </ul>
      </nav>
  `,
};

const API_KEY = 'https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c';

const App = {
  data() {
    return {
      data: [],
      list: [],
      page: 0,
      pagination: 0,
    };
  },
  components: {
    card,
    pagination,
  },
  methods: {
    getData() {
      fetch(API_KEY)
        .then((res) => res.json())
        .then((data) => {
          const place = data.data.XML_Head.Infos.Info;
          const length = Math.ceil(data.data.XML_Head.Infos.Info.length / 20);
          let pagination = 0;
          for (let i = 1; i <= length; i++) {
            const temp = place.splice(0, 20);
            this.data.push({ page: i, data: temp, pagination });
            i === 1 && (this.page = 1);
            i % 10 === 0 && pagination++;
          }
        })
        .catch(() => alert('錯誤！，請稍後再試'));
    },
    increasePage() {
      if (this.page < this.data.length) {
        this.page++;
      }
    },
    decreasePage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    currentPage(page) {
      this.page = page;
    },
  },
  watch: {
    page(page) {
      const findData = this.data.find((ele) => ele.page === page);
      this.list = findData.data;
      this.pagination = findData.pagination;
    },
  },
  created() {
    this.getData();
  },
};

Vue.createApp(App).mount('#app');
