const products = [
  {
    name: '珍珠鮮奶茶',
    engName: 'Pearl Milk Tea',
    price: 60,
    defaults: {
      toppings: ['珍珠'],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '椰果鮮奶茶',
    engName: 'Coconut Milk Tea',
    price: 60,
    defaults: {
      toppings: ['椰果'],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '鮮奶茶',
    engName: 'Milk Tea',
    price: 50,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '古意冬瓜茶 (糖固定)',
    engName: 'Winter Melon Drink',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '全糖',
      ice: '',
    },
  },
  {
    name: '蜜香紅茶',
    engName: 'Black Tea',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '包種青茶',
    engName: 'Black Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '檸檬烏龍',
    engName: 'Lemon Oolong Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '薑母茶 (熱飲)',
    engName: 'Ginger Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '熱',
    },
  },
  {
    name: '青草茶',
    engName: 'Herbal Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '金桔檸檬',
    engName: 'Kumquat Lemonade',
    price: 40,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
  {
    name: '柳澄青茶',
    engName: 'Orange Mountain Tea',
    price: 45,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '',
    },
  },
];

const App = {
  data() {
    return {
      iceType: ['正常冰', '少冰', '微冰', '去冰', '熱'],
      sugarType: ['全糖', '七分', '半糖', '三分', '無糖'],
      toppingsType: ['珍珠', '粉條', '小粉圓', '椰果', '芋頭'],
      products: [],
      cart: [],
      selectItem: '',
      hasSelected: false,
      complete: false,
      temp: {},
    };
  },
  methods: {
    selectProduct(item) {
      this.hasSelected = true;
      this.selectItem = item.name;
      this.temp = {
        id: new Date().getTime(),
        name: item.name,
        price: item.price,
        quantity: 1,
        ice: item.defaults.ice || '正常冰',
        sugar: item.defaults.sugar || '全糖',
        toppings: [],
        memo: '',
      };
    },
    toppingState(item) {
      return this.products.find((ele) => ele.name === this.temp.name)?.defaults.toppings.includes(item);
    },
    iceState() {
      return this.products.find((ele) => ele.name === this.temp.name)?.defaults.ice !== '';
    },
    sugerState() {
      return this.products.find((ele) => ele.name === this.temp.name)?.defaults.sugar !== '';
    },
    selectReset() {
      this.temp = {};
      this.hasSelected = false;
      this.selectItem = '';
    },
    addToCart() {
      this.cart = [...this.cart, this.temp];
      this.selectReset();
    },
    removeProduct(id) {
      this.cart = this.cart.filter((ele) => ele.id !== id);
    },
    total() {
      return this.cart.length === 0
        ? 0
        : this.cart.reduce((acc, cur) => {
            return acc + (cur.price + cur.toppings.length * 10) * cur.quantity;
          }, 0);
    },
    completeOrder() {
      this.cart.length !== 0 && (this.complete = true);
    },
    continueOrder() {
      this.complete = false;
      this.cart = [];
    },
  },
  created() {
    this.products = products;
  },
};

Vue.createApp(App).mount('#app');
