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
  props: ['total', 'page'],
  template: `
  <nav class="nav-page">
        <ul class="m-0 p-0">
          <li><a href="#app" @click="$emit('decrease')"><i class="bi bi-caret-left-fill"></i></a></li>
          <li v-for="item in total">
            <a href="#app" :class="{'my-active':page===item}" @click="$emit('current',item)">{{item}}</a>
          </li>
          <li><a href="#app" @click="$emit('increase')"><i class="bi bi-caret-right-fill"></i></a></li>
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
      total: 0,
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
          this.total = length;
          for (let i = 1; i <= length; i++) {
            const temp = place.splice(0, 20);
            this.data.push({ page: i, data: temp });
          }
          if (this.data.length >= 1) {
            this.page = 1;
          }
        })
        .catch(() => alert('錯誤！，請稍後再試'));
    },
    increasePage() {
      if (this.page < this.total) {
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
      this.list = this.data.find((ele) => ele.page === page).data;
    },
  },
  created() {
    this.getData();
  },
};

Vue.createApp(App).mount('#app');
