const products = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1516906571665-49af58989c4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80',
    name: 'MacBook Pro',
    onStock: false,
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'iPhone',
    onStock: false,
  },
];

const App = {
  data() {
    return {
      products: [],
      isShow: false,
      temp: { id: 0, name: '', imageUrl: '', onStock: false },
    };
  },
  methods: {
    showItem(item) {
      this.toggle(this.isShow);
      this.temp = { ...item };
    },
    editItem(e) {
      e.preventDefault();
      this.products.forEach((ele, idx) => ele.id === this.temp.id && (this.products[idx] = this.temp));
      this.toggle(this.isShow);
    },
    removeItem(id) {
      this.products = this.products.filter((ele) => ele.id !== id);
    },
    addItem(e) {
      e.preventDefault();
      this.temp.id = new Date().getTime();
      this.products.push(this.temp);
      this.toggle(this.isShow);
    },
    toggle(isShow) {
      if (isShow) {
        this.temp = {};
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  created() {
    this.products = products;
  },
};

Vue.createApp(App).mount('#app');
